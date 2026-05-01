from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
import os

class Settings(BaseSettings):
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "prism_db"
    
    # PostgreSQL settings for applications
    database_url: str = "postgresql://user:password@localhost:5432/prism_applications"
    
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Email settings
    resend_api_key: str = ""
    email_from: str = "PRISM <application@prism.publicvm.com>"
    
    # Gmail SMTP settings for application emails
    gmail_email: str = ""
    gmail_password: str = ""
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    
    # Frontend URL for password reset links
    frontend_url: str = "https://prism-frontend-srf1.onrender.com"

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(__file__), ".env"),
        extra="ignore"
    )

settings = Settings()
