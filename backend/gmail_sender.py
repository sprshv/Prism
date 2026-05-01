import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import settings

def send_gmail(to_email: str, subject: str, html_body: str):
    """Send email using Gmail SMTP"""
    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = settings.gmail_email
        message["To"] = to_email
        
        # Add HTML part
        html_part = MIMEText(html_body, "html")
        message.attach(html_part)
        
        # Connect to Gmail SMTP and send
        with smtplib.SMTP(settings.smtp_server, settings.smtp_port) as server:
            server.starttls()
            server.login(settings.gmail_email, settings.gmail_password)
            server.sendmail(settings.gmail_email, [to_email], message.as_string())
        
        print(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"Error sending email via Gmail: {str(e)}")
        raise Exception(f"Failed to send email: {str(e)}")
