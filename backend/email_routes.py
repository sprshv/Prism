from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import resend
from config import settings

email_router = APIRouter(prefix="/email", tags=["email"])

# Initialize Resend with API key
resend.api_key = settings.resend_api_key

class ContactEmail(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Contact Form Submission"
    message: str

class ApplicationEmail(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = ""
    location: str
    team: str  # Team location: Los Angeles or San Diego
    schoolType: str  # "highschool" or "college"
    school: str  # Changed from highSchool
    grade: str
    weightedGPA: Optional[str] = ""
    unweightedGPA: Optional[str] = ""
    stemClasses: Optional[str] = ""
    programInterests: Optional[str] = ""
    whyJoin: Optional[str] = ""
    experience: Optional[str] = ""
    availability: Optional[str] = ""
    interestedInOfficer: Optional[bool] = False
    officerRole: Optional[str] = ""
    leadershipExperience: Optional[str] = ""
    whyOfficerRole: Optional[str] = ""
    interestedInSoftwareDev: Optional[bool] = False  # New field
    softwareDevExperience: Optional[str] = ""
    understandsCommitment: bool
    agreeToContact: Optional[bool] = False

def send_email(to_email: str, subject: str, body: str, text_version: str = None):
    """Send email using Resend API"""
    try:
        params = {
            "from": settings.email_from,
            "to": [to_email],
            "subject": subject,
            "html": body,
            "reply_to": "application@prism.publicvm.com",
        }
        
        # Add plain text version if provided (helps with spam filters)
        if text_version:
            params["text"] = text_version
        
        response = resend.Emails.send(params)
        print(f"Email sent successfully to {to_email}. ID: {response.get('id')}")
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
        return False

@email_router.post("/contact")
async def send_contact_email(contact: ContactEmail):
    """Send contact form email"""
    subject = f"PRISM Contact: {contact.subject}"
    body = f"""
    <html>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Subject:</strong> {contact.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>{contact.message}</p>
    </body>
    </html>
    """
    
    success = send_email("prismprogramscv@gmail.com", subject, body)
    
    if success:
        return {"message": "Contact form submitted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send email")

@email_router.post("/application")
async def send_application_email(application: ApplicationEmail):
    """Send application form email"""
    subject = f"🎓 New PRISM Mentor Application - {application.firstName} {application.lastName}"
    body = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }}
            .header {{
                background: linear-gradient(135deg, #003d7a 0%, #fdc830 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }}
            .header p {{
                margin: 5px 0 0 0;
                opacity: 0.9;
                font-size: 14px;
            }}
            .content {{
                padding: 30px 20px;
            }}
            .section {{
                margin-bottom: 25px;
            }}
            .section-title {{
                background-color: #f0f4f8;
                color: #003d7a;
                padding: 10px 15px;
                border-left: 4px solid #fdc830;
                font-weight: 600;
                font-size: 16px;
                margin: -30px -20px 15px -20px;
                padding-left: 15px;
            }}
            .section:first-child .section-title {{
                margin-top: 0;
            }}
            .info-row {{
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }}
            .info-row:last-child {{
                border-bottom: none;
            }}
            .info-label {{
                font-weight: 600;
                color: #003d7a;
                min-width: 150px;
            }}
            .info-value {{
                color: #555;
                text-align: right;
                flex: 1;
                padding-left: 20px;
            }}
            .text-section {{
                margin: 15px 0;
            }}
            .text-label {{
                font-weight: 600;
                color: #003d7a;
                margin-bottom: 5px;
                font-size: 14px;
            }}
            .text-value {{
                background-color: #f9f9f9;
                padding: 10px;
                border-left: 3px solid #fdc830;
                border-radius: 2px;
                color: #555;
                font-size: 14px;
                line-height: 1.5;
            }}
            .badge {{
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 5px;
            }}
            .badge.yes {{
                background-color: #d4edda;
                color: #155724;
            }}
            .badge.no {{
                background-color: #f8d7da;
                color: #721c24;
            }}
            .footer {{
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #eee;
            }}
            .team-badge {{
                background-color: #003d7a;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                display: inline-block;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New PRISM Mentor Application</h1>
                <p>Team: <span class="team-badge">{application.team}</span></p>
            </div>
            
            <div class="content">
                <!-- Personal Information -->
                <div class="section">
                    <div class="section-title">👤 Personal Information</div>
                    <div class="info-row">
                        <div class="info-label">Name:</div>
                        <div class="info-value">{application.firstName} {application.lastName}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Email:</div>
                        <div class="info-value">{application.email}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Phone:</div>
                        <div class="info-value">{application.phone or 'Not provided'}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Location:</div>
                        <div class="info-value">{application.location}</div>
                    </div>
                </div>
                
                <!-- School Information -->
                <div class="section">
                    <div class="section-title">🎓 School Information</div>
                    <div class="info-row">
                        <div class="info-label">Student Type:</div>
                        <div class="info-value">{'High School' if application.schoolType == 'highschool' else 'College'}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">{'High School' if application.schoolType == 'highschool' else 'University'}:</div>
                        <div class="info-value">{application.school}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">{'Grade' if application.schoolType == 'highschool' else 'Year'}:</div>
                        <div class="info-value">{application.grade}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Weighted GPA:</div>
                        <div class="info-value">{application.weightedGPA or 'Not provided'}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Unweighted GPA:</div>
                        <div class="info-value">{application.unweightedGPA or 'Not provided'}</div>
                    </div>
                </div>
                
                <!-- STEM Background -->
                <div class="section">
                    <div class="section-title">🔬 STEM Background</div>
                    <div class="text-section">
                        <div class="text-label">Current STEM Classes:</div>
                        <div class="text-value">{application.stemClasses or 'Not provided'}</div>
                    </div>
                    <div class="text-section">
                        <div class="text-label">Program Interests:</div>
                        <div class="text-value">{application.programInterests or 'Not provided'}</div>
                    </div>
                </div>
                
                <!-- Application Questions -->
                <div class="section">
                    <div class="section-title">📝 Application Responses</div>
                    <div class="text-section">
                        <div class="text-label">Why do you want to join PRISM?</div>
                        <div class="text-value">{application.whyJoin or 'Not provided'}</div>
                    </div>
                    <div class="text-section">
                        <div class="text-label">Previous teaching/mentoring experience:</div>
                        <div class="text-value">{application.experience or 'Not provided'}</div>
                    </div>
                    <div class="text-section">
                        <div class="text-label">Availability:</div>
                        <div class="text-value">{application.availability or 'Not provided'}</div>
                    </div>
                </div>
                
                <!-- Officer Position -->
                {"<div class='section'><div class='section-title'>⭐ Officer Position</div><div class='info-row'><div class='info-label'>Role:</div><div class='info-value'>" + application.officerRole + "</div></div><div class='text-section'><div class='text-label'>Leadership Experience:</div><div class='text-value'>" + application.leadershipExperience + "</div></div><div class='text-section'><div class='text-label'>Why This Role:</div><div class='text-value'>" + application.whyOfficerRole + "</div></div></div>" if application.interestedInOfficer and application.officerRole else ""}
                
                <!-- Software Development -->
                {"<div class='section'><div class='section-title'>💻 Software Development</div><div class='text-section'><div class='text-label'>Experience:</div><div class='text-value'>" + application.softwareDevExperience + "</div></div></div>" if application.interestedInSoftwareDev and application.softwareDevExperience else ""}
                
                <!-- Commitments -->
                <div class="section">
                    <div class="section-title">✓ Commitments</div>
                    <div class="info-row">
                        <div class="info-label">Understands Commitment:</div>
                        <div class="info-value"><span class="badge {'yes' if application.understandsCommitment else 'no'}">{'Yes' if application.understandsCommitment else 'No'}</span></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Agrees to Contact:</div>
                        <div class="info-value"><span class="badge {'yes' if application.agreeToContact else 'no'}">{'Yes' if application.agreeToContact else 'No'}</span></div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated email from the PRISM Mentor Application System</p>
                <p>© 2025 PRISM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Route email to appropriate team inbox based on selected team
    if application.team == "San Diego":
        recipient_email = "prismprogramsandiego@gmail.com"
    else:  # Default to Los Angeles
        recipient_email = "prismprogramscv@gmail.com"
    
    success = send_email(recipient_email, subject, body)
    
    if success:
        return {"message": "Application submitted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send email")

