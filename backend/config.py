from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "prism_db"
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # SMTP Email settings
    smtp_email: str = ""
    smtp_password: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
