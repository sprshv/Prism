from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from datetime import datetime
from models import TeamCreate, Team, TeamUpdate, UserInDB, UserRole
from auth import get_current_admin, get_current_active_user
from database import get_database
from bson import ObjectId

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("", response_model=Team, status_code=status.HTTP_201_CREATED)
async def create_team(
    team_data: TeamCreate,
    current_user: UserInDB = Depends(get_current_admin)
):
    """Create a new team (admin only)"""
    db = get_database()
    
    # Check if team name already exists
    if db.teams.find_one({"name": team_data.name}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Team with this name already exists"
        )
    
    team_dict = {
        "name": team_data.name,
        "description": team_data.description,
        "created_at": datetime.utcnow(),
        "created_by": current_user.email
    }
    
    result = db.teams.insert_one(team_dict)
    team_dict["_id"] = str(result.inserted_id)
    
    return Team(
        id=team_dict["_id"],
        name=team_dict["name"],
        description=team_dict["description"],
        created_at=team_dict["created_at"],
        created_by=team_dict["created_by"]
    )

@router.get("", response_model=List[Team])
async def get_teams(current_user: UserInDB = Depends(get_current_active_user)):
    """Get all teams (authenticated users)"""
    db = get_database()
    teams = list(db.teams.find())
    
    return [
        Team(
            id=str(team["_id"]),
            name=team["name"],
            description=team.get("description"),
            created_at=team["created_at"],
            created_by=team["created_by"]
        )
        for team in teams
    ]

@router.get("/{team_id}", response_model=Team)
async def get_team(
    team_id: str,
    current_user: UserInDB = Depends(get_current_admin)
):
    """Get a specific team (admin only)"""
    db = get_database()
    
    try:
        team = db.teams.find_one({"_id": ObjectId(team_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid team ID"
        )
    
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    return Team(
        id=str(team["_id"]),
        name=team["name"],
        description=team.get("description"),
        created_at=team["created_at"],
        created_by=team["created_by"]
    )

@router.put("/{team_id}", response_model=Team)
async def update_team(
    team_id: str,
    team_update: TeamUpdate,
    current_user: UserInDB = Depends(get_current_admin)
):
    """Update a team (admin only)"""
    db = get_database()
    
    try:
        team = db.teams.find_one({"_id": ObjectId(team_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid team ID"
        )
    
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    update_data = {k: v for k, v in team_update.model_dump().items() if v is not None}
    
    if update_data:
        db.teams.update_one(
            {"_id": ObjectId(team_id)},
            {"$set": update_data}
        )
    
    updated_team = db.teams.find_one({"_id": ObjectId(team_id)})
    
    return Team(
        id=str(updated_team["_id"]),
        name=updated_team["name"],
        description=updated_team.get("description"),
        created_at=updated_team["created_at"],
        created_by=updated_team["created_by"]
    )

@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(
    team_id: str,
    current_user: UserInDB = Depends(get_current_admin)
):
    """Delete a team (admin only)"""
    db = get_database()
    
    try:
        team = db.teams.find_one({"_id": ObjectId(team_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid team ID"
        )
    
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    # Check if any users are assigned to this team
    if db.users.find_one({"team_id": team_id}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete team with assigned users. Reassign users first."
        )
    
    db.teams.delete_one({"_id": ObjectId(team_id)})
    return None
