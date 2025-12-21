from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta, datetime
from config import settings
from models import LoginRequest, Token, User, RegisterMemberRequest, RegisterMemberResponse, UserInDB, UserRole, EventCreate, Event, UpdateUserRole, ServiceHourCreate, ServiceHourStatus, ServiceHourApproval
from auth import verify_password, get_password_hash, create_access_token, get_current_officer, get_current_active_user, get_current_admin_or_president, get_current_officer_or_higher, get_current_admin
from database import get_database
from bson import ObjectId

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

    # Only admin email can assign president or admin roles
    if member_data.role in [UserRole.PRESIDENT, UserRole.ADMIN]:
        if current_user.email != "prismprogramscv@gmail.com":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the main admin can assign president or admin roles"
            )

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
        "is_active": True
    }

    result = db.users.insert_one(user_dict)

    # Return user info with default password
    return RegisterMemberResponse(
        email=member_data.email,
        name=full_name,
        role=member_data.role,
        default_password=default_password
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
        is_active=current_user.is_active
    )


# Event endpoints
event_router = APIRouter(prefix="/events", tags=["events"])

@event_router.get("/")
async def get_events(current_user: UserInDB = Depends(get_current_active_user)):
    """Get all events (accessible to all authenticated users)"""
    db = get_database()
    events = list(db.events.find().sort("date", 1))

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

    event_dict = {
        "title": event_data.title,
        "date": event_data.date,
        "time": event_data.time,
        "location": event_data.location,
        "description": event_data.description,
        "created_by": current_user.email,
        "created_at": datetime.utcnow()
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
    """Get service hours - all for admin/president, own for others"""
    from auth import get_current_admin_or_president
    from models import UserRole
    db = get_database()

    if current_user.role in [UserRole.ADMIN, UserRole.PRESIDENT]:
        hours = list(db.service_hours.find().sort("created_at", -1))
    else:
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

