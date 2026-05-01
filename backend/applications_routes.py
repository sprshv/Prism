from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from postgres_db import get_db
from sql_models import Application, ApplicationStatus
from auth import get_current_active_user
from models import User
import uuid
from datetime import datetime
from email_routes import send_email

applications_router = APIRouter(prefix="/applications", tags=["applications"])

@applications_router.get("/track/{tracking_token}")
async def track_application(tracking_token: str, db: Session = Depends(get_db)):
    """Public endpoint - track application status by token"""
    app = db.query(Application).filter(Application.trackingToken == tracking_token).first()
    
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {
        "firstName": app.firstName,
        "lastName": app.lastName,
        "email": app.email,
        "status": app.status.value,
        "submittedAt": app.createdAt.isoformat(),
    }

@applications_router.get("/")
async def get_applications(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get applications based on user role"""
    
    # Check if user is admin or executive
    if current_user.role == "admin":
        # Admin sees all applications
        apps = db.query(Application).order_by(Application.createdAt.desc()).all()
    elif current_user.role == "executive":
        # Executive team sees all applications
        apps = db.query(Application).order_by(Application.createdAt.desc()).all()
    elif current_user.role == "president":
        # President sees only their team's applications
        apps = db.query(Application).filter(
            Application.team == current_user.team
        ).order_by(Application.createdAt.desc()).all()
    else:
        raise HTTPException(status_code=403, detail="Not authorized to view applications")
    
    return [
        {
            "id": app.id,
            "firstName": app.firstName,
            "lastName": app.lastName,
            "email": app.email,
            "phone": app.phone,
            "location": app.location,
            "team": app.team,
            "school": app.school,
            "grade": app.grade,
            "schoolType": app.schoolType,
            "weightedGPA": app.weightedGPA,
            "unweightedGPA": app.unweightedGPA,
            "stemClasses": app.stemClasses,
            "programInterests": app.programInterests,
            "whyJoin": app.whyJoin,
            "experience": app.experience,
            "availability": app.availability,
            "status": app.status.value,
            "submittedAt": app.createdAt.isoformat(),
            "interestedInOfficer": app.interestedInOfficer == "true",
            "officerRole": app.officerRole,
            "leadershipExperience": app.leadershipExperience,
            "whyOfficerRole": app.whyOfficerRole,
            "interestedInSoftwareDev": app.interestedInSoftwareDev == "true",
            "softwareDevExperience": app.softwareDevExperience,
        }
        for app in apps
    ]

@applications_router.get("/{application_id}")
async def get_application_detail(
    application_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get detailed application info"""
    app = db.query(Application).filter(Application.id == application_id).first()
    
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check authorization
    if current_user.role == "president" and app.team != current_user.team:
        raise HTTPException(status_code=403, detail="Not authorized")
    elif current_user.role not in ["admin", "executive", "president"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return {
        "id": app.id,
        "firstName": app.firstName,
        "lastName": app.lastName,
        "email": app.email,
        "phone": app.phone,
        "location": app.location,
        "team": app.team,
        "schoolType": app.schoolType,
        "school": app.school,
        "grade": app.grade,
        "weightedGPA": app.weightedGPA,
        "unweightedGPA": app.unweightedGPA,
        "stemClasses": app.stemClasses,
        "programInterests": app.programInterests,
        "whyJoin": app.whyJoin,
        "experience": app.experience,
        "availability": app.availability,
        "interestedInOfficer": app.interestedInOfficer == "true",
        "officerRole": app.officerRole,
        "leadershipExperience": app.leadershipExperience,
        "whyOfficerRole": app.whyOfficerRole,
        "interestedInSoftwareDev": app.interestedInSoftwareDev == "true",
        "softwareDevExperience": app.softwareDevExperience,
        "understandsCommitment": app.understandsCommitment == "true",
        "agreeToContact": app.agreeToContact == "true",
        "status": app.status.value,
        "submittedAt": app.createdAt.isoformat(),
        "reviewedBy": app.reviewedBy,
        "reviewedAt": app.reviewedAt.isoformat() if app.reviewedAt else None,
    }

@applications_router.post("/{application_id}/accept")
async def accept_application(
    application_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Accept an application and create user account"""
    from auth import get_password_hash
    
    app = db.query(Application).filter(Application.id == application_id).first()
    
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check authorization
    if current_user.role == "president" and app.team != current_user.team:
        raise HTTPException(status_code=403, detail="Not authorized")
    elif current_user.role not in ["admin", "executive", "president"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if app.status != ApplicationStatus.PENDING:
        raise HTTPException(status_code=400, detail="Application already reviewed")
    
    # Create user account
    from database import get_database
    from models import User as MongoUser
    
    db_mongo = get_database()
    
    # Check if user already exists
    existing_user = db_mongo.users.find_one({"email": app.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Get team_id from teams collection
    team_doc = db_mongo.teams.find_one({"name": app.team})
    team_id = str(team_doc["_id"]) if team_doc else None
    
    # Generate default password (firstname + "123")
    default_password = f"{app.firstName.lower()}123"
    hashed_password = get_password_hash(default_password)
    
    # Create user in MongoDB with team assignment (always as member)
    user_data = {
        "email": app.email,
        "name": f"{app.firstName} {app.lastName}",
        "hashed_password": hashed_password,
        "role": "member",
        "is_active": True,
        "team": app.team,
        "team_id": team_id,  # Assign to team they applied for
        "school": app.school,
        "grade": app.grade,
    }
    
    db_mongo.users.insert_one(user_data)
    
    # Update application status
    app.status = ApplicationStatus.ACCEPTED
    app.reviewedBy = current_user.email
    app.reviewedAt = datetime.utcnow()
    db.commit()
    
    # Send acceptance email via Gmail
    from gmail_sender import send_gmail
    from config import settings
    
    login_url = settings.frontend_url if hasattr(settings, 'frontend_url') else "https://prism-frontend-srf1.onrender.com"
    
    # Send acceptance email (always as member)
    acceptance_email = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #003d7a; padding: 20px; text-align: center; border-radius: 8px;">
            <h1 style="color: #fdc830; margin: 0;">Welcome to PRISM! 🎉</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #003d7a;">Congratulations!</h2>
            <p>Hi {app.firstName},</p>
            <p>We're excited to let you know that your application to join the PRISM {app.team} team has been <strong>ACCEPTED</strong>! 🚀</p>
            
            <p>Your account has been created with Member status. Here are your login details:</p>
            <div style="background-color: #f0f4f8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Password:</strong> {default_password}</p>
                <p><strong>Role:</strong> Member</p>
            </div>
            
            <p><a href="{login_url}/#/login" style="background-color: #003d7a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Log In Now</a></p>
            
            <p style="color: #666; font-size: 14px;">We recommend changing your password after your first login.</p>
            
            <p>Welcome to the team!</p>
            <p>Best regards,<br>The PRISM Team</p>
        </div>
    </body>
    </html>
    """
    
    try:
        send_gmail(
            to_email=app.email,
            subject="🎉 Congratulations! Your PRISM Application Has Been Accepted",
            html_body=acceptance_email
        )
    except Exception as e:
        print(f"Warning: Could not send acceptance email: {e}")
    
    # Delete application from database after accepting
    db.delete(app)
    db.commit()
    
    return {"message": "Application accepted and user created"}

@applications_router.post("/{application_id}/reject")
async def reject_application(
    application_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Reject an application"""
    app = db.query(Application).filter(Application.id == application_id).first()
    
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check authorization
    if current_user.role == "president" and app.team != current_user.team:
        raise HTTPException(status_code=403, detail="Not authorized")
    elif current_user.role not in ["admin", "executive", "president"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if app.status != ApplicationStatus.PENDING:
        raise HTTPException(status_code=400, detail="Application already reviewed")
    
    # Update application status
    app.status = ApplicationStatus.REJECTED
    app.reviewedBy = current_user.email
    app.reviewedAt = datetime.utcnow()
    db.commit()
    
    # Send rejection email via Gmail
    from gmail_sender import send_gmail
    
    rejection_email = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #003d7a; padding: 20px; text-align: center; border-radius: 8px;">
            <h1 style="color: white; margin: 0;">PRISM Application Decision</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
            <p>Hi {app.firstName},</p>
            <p>Thank you for your interest in joining PRISM. We appreciate the effort you put into your application.</p>
            
            <p>After careful review, we have decided not to move forward with your application at this time. This does not diminish your potential, and we encourage you to apply again in the future.</p>
            
            <p>If you have any questions, please feel free to reach out to us.</p>
            
            <p>Best regards,<br>The PRISM Team</p>
        </div>
    </body>
    </html>
    """
    
    try:
        send_gmail(
            to_email=app.email,
            subject="Update on Your PRISM Application",
            html_body=rejection_email
        )
    except Exception as e:
        print(f"Warning: Could not send rejection email: {e}")
    
    # Delete application from database after rejecting
    db.delete(app)
    db.commit()
    
    return {"message": "Application rejected"}

@applications_router.delete("/{application_id}")
async def delete_application(
    application_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete an application (admin/executive/president only)"""
    app = db.query(Application).filter(Application.id == application_id).first()
    
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check authorization
    if current_user.role == "president" and app.team != current_user.team:
        raise HTTPException(status_code=403, detail="Not authorized")
    elif current_user.role not in ["admin", "executive", "president"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db.delete(app)
    db.commit()
    
    return {"message": "Application deleted"}
