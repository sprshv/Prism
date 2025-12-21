from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

email_router = APIRouter(prefix="/email", tags=["email"])

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
    interestedInSoftwareDev: Optional[bool] = False  # New field
    understandsCommitment: bool
    agreeToContact: Optional[bool] = False

def send_email(to_email: str, subject: str, body: str):
    """Send email using Gmail SMTP"""
    try:
        # Gmail SMTP configuration
        from config import settings
        sender_email = settings.smtp_email
        sender_password = settings.smtp_password
        
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))
        
        # Send email via Gmail SMTP
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
        
        print(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
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
    subject = f"PRISM Application: {application.firstName} {application.lastName}"
    body = f"""
    <html>
    <body>
        <h2>New PRISM Mentor Application</h2>
        
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone or 'Not provided'}</p>
        
        <h3>School Information</h3>
        <p><strong>Student Type:</strong> {'High School' if application.schoolType == 'highschool' else 'College'}</p>
        <p><strong>{'High School' if application.schoolType == 'highschool' else 'University'}:</strong> {application.school}</p>
        <p><strong>{'Grade' if application.schoolType == 'highschool' else 'Year'}:</strong> {application.grade}</p>
        <p><strong>Weighted GPA:</strong> {application.weightedGPA or 'Not provided'}</p>
        <p><strong>Unweighted GPA:</strong> {application.unweightedGPA or 'Not provided'}</p>
        
        <h3>STEM Background</h3>
        <p><strong>Current STEM Classes:</strong></p>
        <p>{application.stemClasses or 'Not provided'}</p>
        
        <p><strong>Program Interests:</strong></p>
        <p>{application.programInterests or 'Not provided'}</p>
        
        <h3>Application Questions</h3>
        <p><strong>Why do you want to join PRISM?</strong></p>
        <p>{application.whyJoin or 'Not provided'}</p>
        
        <p><strong>Previous teaching/mentoring experience:</strong></p>
        <p>{application.experience or 'Not provided'}</p>
        
        <p><strong>Availability:</strong></p>
        <p>{application.availability or 'Not provided'}</p>
        
        <h3>Additional Information</h3>
        <p><strong>Interested in Officer Position:</strong> {'Yes' if application.interestedInOfficer else 'No'}</p>
        <p><strong>Interested in Software Development Role:</strong> {'Yes' if application.interestedInSoftwareDev else 'No'}</p>
        <p><strong>Understands Commitment:</strong> {'Yes' if application.understandsCommitment else 'No'}</p>
        <p><strong>Agrees to be Contacted:</strong> {'Yes' if application.agreeToContact else 'No'}</p>
    </body>
    </html>
    """
    
    success = send_email("prismprogramscv@gmail.com", subject, body)
    
    if success:
        return {"message": "Application submitted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to send email")

