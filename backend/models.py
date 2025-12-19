from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    MEMBER = "member"
    OFFICER = "officer"
    PRESIDENT = "president"
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.MEMBER

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    hashed_password: str
    created_at: datetime
    is_active: bool = True

    class Config:
        populate_by_name = True

class User(UserBase):
    id: str
    created_at: datetime
    is_active: bool = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[UserRole] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterMemberRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole = UserRole.MEMBER

class RegisterMemberResponse(BaseModel):
    email: str
    name: str
    role: str
    default_password: str

class EventBase(BaseModel):
    title: str
    date: str
    time: str
    location: str
    description: str

class EventCreate(EventBase):
    pass

class EventInDB(EventBase):
    id: str = Field(alias="_id")
    created_by: str
    created_at: datetime

    class Config:
        populate_by_name = True

class Event(EventBase):
    id: str
    created_by: str
    created_at: datetime

# Service Hours Models
class ServiceHourStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class ServiceHourBase(BaseModel):
    hours: float
    date: str
    description: str
    activity: str

class ServiceHourCreate(ServiceHourBase):
    pass

class ServiceHourInDB(ServiceHourBase):
    id: str = Field(alias="_id")
    user_id: str
    user_name: str
    user_email: str
    status: ServiceHourStatus = ServiceHourStatus.PENDING
    created_at: datetime
    approved_by: Optional[str] = None
    approved_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None

    class Config:
        populate_by_name = True

class ServiceHour(ServiceHourBase):
    id: str
    user_id: str
    user_name: str
    user_email: str
    status: ServiceHourStatus
    created_at: datetime
    approved_by: Optional[str] = None
    approved_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None

class ServiceHourApproval(BaseModel):
    status: ServiceHourStatus
    rejection_reason: Optional[str] = None

# User Management Models
class UpdateUserRole(BaseModel):
    role: UserRole
