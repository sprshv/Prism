from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from pymongo import MongoClient
from config import settings
from auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

class UpdateRoleRequest(BaseModel):
    email: str
    role: str

@router.put("/role/update")
async def update_user_role(
    request: UpdateRoleRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Admin only: Update a user's role
    Valid roles: admin, president, executive, officer, member
    Only admins can assign executive role
    """
    # Check if current user is admin
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update user roles")
    
    # Extra validation: only admins can assign executive role
    if request.role == "executive":
        if current_user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Only admins can assign executive role")
    
    # Connect to MongoDB
    client = MongoClient(settings.mongodb_url)
    db = client[settings.database_name]
    
    # Update user role
    result = db.users.update_one(
        {"email": request.email},
        {"$set": {"role": request.role}}
    )
    
    client.close()
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"User {request.email} not found")
    
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Role was not updated")
    
    return {
        "message": f"User {request.email} role updated to {request.role}",
        "email": request.email,
        "role": request.role
    }
