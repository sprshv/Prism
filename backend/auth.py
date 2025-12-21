from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from config import settings
from models import TokenData, UserInDB, UserRole
from database import get_database

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email, role=role)
    except JWTError:
        raise credentials_exception
    
    db = get_database()
    user = db.users.find_one({"email": token_data.email})
    if user is None:
        raise credentials_exception
    
    user["_id"] = str(user["_id"])
    return UserInDB(**user)

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)) -> UserInDB:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_officer(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    if current_user.role != UserRole.OFFICER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only officers can perform this action"
        )
    return current_user


async def get_current_admin_or_president(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    if current_user.role not in [UserRole.ADMIN, UserRole.PRESIDENT]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins and presidents can perform this action"
        )
    return current_user

async def get_current_admin(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can perform this action"
        )
    return current_user

async def get_current_officer_or_higher(current_user: UserInDB = Depends(get_current_active_user)) -> UserInDB:
    if current_user.role not in [UserRole.OFFICER, UserRole.PRESIDENT, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    return current_user
