from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta, datetime
from config import settings
from models import LoginRequest, Token, User, RegisterMemberRequest, RegisterMemberResponse, UserInDB, UserRole, EventCreate, Event, UpdateUserRole, ServiceHourCreate, ServiceHourStatus, ServiceHourApproval, PasswordResetRequest, PasswordReset
from auth import verify_password, get_password_hash, create_access_token, get_current_officer, get_current_active_user, get_current_admin_or_president, get_current_officer_or_higher, get_current_admin
from database import get_database
from bson import ObjectId
import secrets

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=Token)
async def login(login_request: LoginRequest):
    db = get_database()
    user = db.users.find_one({"email": login_request.email})

    if not user or not verify_password(login_request.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register-member", response_model=RegisterMemberResponse)
async def register_member(
    member_data: RegisterMemberRequest,
    current_user: UserInDB = Depends(get_current_officer_or_higher)
):
    """Register new members or officers (officers, president, admin)"""
    db = get_database()

    full_name = f"{member_data.first_name} {member_data.last_name}"

    # Generate default password (firstname + "123")
    default_password = f"{member_data.first_name.lower()}123"

    # Only admins can assign president or admin roles
    if member_data.role in [UserRole.PRESIDENT, UserRole.ADMIN]:
        if current_user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only admins can assign president or admin roles"
            )

    # Team assignment logic
    team_id = member_data.team_id
    if current_user.role == UserRole.ADMIN:
        # Admin can assign to any team or no team
        pass
    else:
        # Officers and presidents can only register members to their own team
        if not current_user.team_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You must be assigned to a team to register members"
            )
        if team_id and team_id != current_user.team_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only register members to your own team"
            )
        team_id = current_user.team_id  # Force their own team

    # Check if user already exists
    if db.users.find_one({"email": member_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Create new user
    user_dict = {
        "email": member_data.email,
        "name": full_name,
        "role": member_data.role,
        "hashed_password": get_password_hash(default_password),
        "created_at": datetime.utcnow(),
        "is_active": True,
        "team_id": team_id
    }

    result = db.users.insert_one(user_dict)

    # Return user info with default password
    return RegisterMemberResponse(
        email=member_data.email,
        name=full_name,
        role=member_data.role,
        default_password=default_password,
        team_id=team_id
    )

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_active_user)):
    """Get current user information"""
    return User(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        role=current_user.role,
        created_at=current_user.created_at,
        is_active=current_user.is_active,
        team_id=current_user.team_id
    )

@router.post("/forgot-password")
async def forgot_password(request: PasswordResetRequest):
    """Request password reset - sends email with reset token"""
    db = get_database()
    
    # Check if user exists
    user = db.users.find_one({"email": request.email})
    if not user:
        # Don't reveal if user exists or not for security
        return {"message": "If the email exists, a password reset link has been sent"}
    
    # Generate secure reset token
    reset_token = secrets.token_urlsafe(32)
    
    # Store token in database with expiration (1 hour)
    db.password_resets.insert_one({
        "email": request.email,
        "token": reset_token,
        "created_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(hours=1),
        "used": False
    })
    
    # Send email with reset link
    from email_routes import send_email
    
    reset_link = f"{settings.frontend_url}/#/reset-password?token={reset_token}"
    
    # Get user's name for personalization
    user_name = user.get("name", "").split()[0] if user.get("name") else "there"
    
    email_body = f"""
    <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1e3a8a; padding: 20px; text-align: center;">
                <h1 style="color: #fbbf24; margin: 0;">PRISM</h1>
                <p style="color: white; margin: 5px 0;">Promoting Research, Innovation, Science & Math</p>
            </div>
            
            <div style="padding: 30px; background-color: #f9fafb;">
                <h2 style="color: #1e3a8a;">Password Reset Request</h2>
                <p>Hi {user_name},</p>
                <p>We received a request to reset the password for your PRISM account ({request.email}). If you made this request, click the button below to set a new password:</p>
                
                <p style="margin: 30px 0; text-align: center;">
                    <a href="{reset_link}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                        Reset My Password
                    </a>
                </p>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="background-color: white; padding: 10px; border: 1px solid #e5e7eb; word-break: break-all; font-size: 12px;">
                    {reset_link}
                </p>
                
                <p style="margin-top: 30px;"><strong>This link will expire in 1 hour.</strong></p>
                <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                
                <p style="margin-top: 30px;">Best regards,<br>The PRISM Team</p>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 12px; background-color: #f3f4f6;">
                <p>This is an automated message from PRISM. Please do not reply to this email.</p>
                <p>© 2025 PRISM - Promoting Research, Innovation, Science & Math</p>
            </div>
        </body>
    </html>
    """
    
    # Plain text version for better deliverability
    text_version = f"""
PRISM - Promoting Research, Innovation, Science & Math

Password Reset Request

Hi {user_name},

We received a request to reset the password for your PRISM account ({request.email}). 

To reset your password, click the link below or copy and paste it into your browser:

{reset_link}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

Best regards,
The PRISM Team

---
This is an automated message from PRISM. Please do not reply to this email.
© 2025 PRISM - Promoting Research, Innovation, Science & Math
    """
    
    send_email(
        to_email=request.email,
        subject="Reset Your PRISM Password",
        body=email_body,
        text_version=text_version
    )
    
    return {"message": "If the email exists, a password reset link has been sent"}

@router.post("/reset-password")
async def reset_password(reset_data: PasswordReset):
    """Reset password using token"""
    db = get_database()
    
    # Find valid reset token
    reset_request = db.password_resets.find_one({
        "token": reset_data.token,
        "used": False,
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not reset_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Update user password
    hashed_password = get_password_hash(reset_data.new_password)
    db.users.update_one(
        {"email": reset_request["email"]},
        {"$set": {"hashed_password": hashed_password}}
    )
    
    # Mark token as used
    db.password_resets.update_one(
        {"_id": reset_request["_id"]},
        {"$set": {"used": True}}
    )
    
    return {"message": "Password successfully reset"}


# Event endpoints
event_router = APIRouter(prefix="/events", tags=["events"])

@event_router.get("/")
async def get_events(current_user: UserInDB = Depends(get_current_active_user)):
    """Get all events (accessible to all authenticated users)"""
    db = get_database()
    
    # Filter events based on user's team
    query = {}
    if current_user.role == UserRole.ADMIN:
        # Admins see all events
        pass
    elif current_user.team_id:
        # Members, officers, and presidents see only their team's events
        query["team_id"] = current_user.team_id
    else:
        # Users without a team see only events without a team
        query["team_id"] = None
    
    events = list(db.events.find(query).sort("date", 1))

    # Convert ObjectId to string
    for event in events:
        event["id"] = str(event["_id"])
        del event["_id"]

    return events

@event_router.post("/")
async def create_event(
    event_data: EventCreate,
    current_user: UserInDB = Depends(get_current_officer_or_higher)
):
    """Create a new event (officers, president, admin)"""
    db = get_database()

    # Officers and presidents can only create events for their team
    team_id = event_data.team_id
    if current_user.role in [UserRole.OFFICER, UserRole.PRESIDENT]:
        if not current_user.team_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You must be assigned to a team to create events"
            )
        if team_id and team_id != current_user.team_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only create events for your own team"
            )
        team_id = current_user.team_id  # Force their own team

    event_dict = {
        "title": event_data.title,
        "date": event_data.date,
        "time": event_data.time,
        "location": event_data.location,
        "description": event_data.description,
        "created_by": current_user.email,
        "created_at": datetime.utcnow(),
        "team_id": team_id
    }

    result = db.events.insert_one(event_dict)
    event_dict["id"] = str(result.inserted_id)
    if "_id" in event_dict:
        del event_dict["_id"]

    return event_dict

@event_router.delete("/{event_id}")
async def delete_event(
    event_id: str,
    current_user: UserInDB = Depends(get_current_officer_or_higher)
):
    """Delete an event (officers, president, admin)"""
    db = get_database()

    try:
        result = db.events.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Event not found"
            )
        return {"message": "Event deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid event ID: {str(e)}"
        )


# User Management endpoints
user_router = APIRouter(prefix="/users", tags=["users"])

@user_router.get("/")
async def get_all_users(current_user: UserInDB = Depends(get_current_admin_or_president)):
    """Get all users (admin/president only)"""
    from auth import get_current_admin_or_president
    db = get_database()
    users = list(db.users.find())

    for user in users:
        user["id"] = str(user["_id"])
        del user["_id"]
        del user["hashed_password"]

    return users

@user_router.patch("/{user_id}/role")
async def update_user_role(
    user_id: str,
    role_update: UpdateUserRole,
    current_user: UserInDB = Depends(get_current_admin_or_president)
):
    """Update a user's role (admin/president only)"""
    from auth import get_current_admin_or_president
    from models import UpdateUserRole
    db = get_database()

    # Only admin email can assign president or admin roles
    if role_update.role in [UserRole.PRESIDENT, UserRole.ADMIN]:
        if current_user.email != "prismprogramscv@gmail.com":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the main admin can assign president or admin roles"
            )

    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"role": role_update.role}}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {"message": "User role updated successfully"}

@user_router.patch("/{user_id}/team")
async def update_user_team(
    user_id: str,
    team_update: dict,
    current_user: UserInDB = Depends(get_current_admin)
):
    """Update a user's team (admin only)"""
    db = get_database()

    team_id = team_update.get("team_id")
    
    # Validate team exists if team_id is provided
    if team_id:
        team = db.teams.find_one({"_id": ObjectId(team_id)})
        if not team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Team not found"
            )

    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"team_id": team_id}}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {"message": "User team updated successfully"}

@user_router.delete("/{user_id}")
async def delete_user(
    user_id: str,
    current_user: UserInDB = Depends(get_current_admin_or_president)
):
    """Delete a user (admin only)"""
    db = get_database()

    # Only admin can delete users
    if current_user.email != "prismprogramscv@gmail.com":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the admin can delete users"
        )

    # Prevent admin from deleting themselves
    if str(user_id) == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )

    # Delete user
    result = db.users.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Also delete associated service hours
    db.service_hours.delete_many({"user_id": user_id})

    return {"message": "User deleted successfully"}


# Service Hours endpoints
service_hours_router = APIRouter(prefix="/service-hours", tags=["service-hours"])

@service_hours_router.get("/")
async def get_service_hours(current_user: UserInDB = Depends(get_current_active_user)):
    """Get service hours - all for admin, team members for president, own for others"""
    from auth import get_current_admin_or_president
    from models import UserRole
    db = get_database()

    if current_user.role == UserRole.ADMIN:
        # Admins see all service hours
        hours = list(db.service_hours.find().sort("created_at", -1))
    elif current_user.role == UserRole.PRESIDENT:
        # Presidents see service hours for members of their team
        if current_user.team_id:
            # Get all users in the same team
            team_users = list(db.users.find({"team_id": current_user.team_id}))
            team_user_ids = [str(user["_id"]) for user in team_users]
            hours = list(db.service_hours.find({"user_id": {"$in": team_user_ids}}).sort("created_at", -1))
        else:
            hours = []
    else:
        # Members and officers see only their own hours
        hours = list(db.service_hours.find({"user_id": current_user.id}).sort("created_at", -1))

    for hour in hours:
        hour["id"] = str(hour["_id"])
        del hour["_id"]

    return hours

@service_hours_router.post("/")
async def create_service_hour(
    hour_data: ServiceHourCreate,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Log service hours"""
    from models import ServiceHourCreate, ServiceHourStatus
    db = get_database()

    hour_dict = {
        "hours": hour_data.hours,
        "date": hour_data.date,
        "description": hour_data.description,
        "activity": hour_data.activity,
        "user_id": current_user.id,
        "user_name": current_user.name,
        "user_email": current_user.email,
        "status": ServiceHourStatus.PENDING,
        "created_at": datetime.utcnow()
    }

    result = db.service_hours.insert_one(hour_dict)
    hour_dict["id"] = str(result.inserted_id)
    if "_id" in hour_dict:
        del hour_dict["_id"]

    return hour_dict

@service_hours_router.patch("/{hour_id}/approve")
async def approve_service_hour(
    hour_id: str,
    approval: ServiceHourApproval,
    current_user: UserInDB = Depends(get_current_admin_or_president)
):
    """Approve or reject service hours (admin or president)"""
    from auth import get_current_admin_or_president
    from models import ServiceHourApproval, ServiceHourStatus
    db = get_database()

    # Get the service hour entry
    try:
        service_hour = db.service_hours.find_one({"_id": ObjectId(hour_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid service hour ID"
        )

    if not service_hour:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service hour entry not found"
        )

    # Presidents can only approve hours for users in their team
    if current_user.role == UserRole.PRESIDENT:
        # Get the user who submitted the hours
        submitter = db.users.find_one({"_id": ObjectId(service_hour["user_id"])})
        if not submitter:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Check if the submitter is in the same team
        if submitter.get("team_id") != current_user.team_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only approve service hours for members of your team"
            )

    update_data = {
        "status": approval.status,
        "approved_by": current_user.email,
        "approved_at": datetime.utcnow()
    }

    if approval.status == ServiceHourStatus.REJECTED and approval.rejection_reason:
        update_data["rejection_reason"] = approval.rejection_reason

    result = db.service_hours.update_one(
        {"_id": ObjectId(hour_id)},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service hour entry not found"
        )

    return {"message": f"Service hour {approval.status}"}

@service_hours_router.delete("/{hour_id}")
async def delete_service_hour(
    hour_id: str,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Delete service hour entry - own entries for all roles, any entry for admin/president"""
    from models import UserRole
    db = get_database()

    # Admin and president can delete any entry
    if current_user.role in [UserRole.ADMIN, UserRole.PRESIDENT]:
        query = {"_id": ObjectId(hour_id)}
    else:
        # Other roles can only delete their own entries
        query = {"_id": ObjectId(hour_id), "user_id": current_user.id}

    result = db.service_hours.delete_one(query)

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service hour entry not found or unauthorized"
        )

    return {"message": "Service hour deleted successfully"}

