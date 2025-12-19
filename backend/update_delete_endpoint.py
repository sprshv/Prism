with open('routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

old_func = '''@service_hours_router.delete("/{hour_id}")
async def delete_service_hour(
    hour_id: str,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Delete own service hour entry"""
    db = get_database()

    result = db.service_hours.delete_one({
        "_id": ObjectId(hour_id),
        "user_id": current_user.id
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service hour entry not found or unauthorized"
        )

    return {"message": "Service hour deleted successfully"}'''

new_func = '''@service_hours_router.delete("/{hour_id}")
async def delete_service_hour(
    hour_id: str,
    current_user: UserInDB = Depends(get_current_active_user)
):
    """Delete service hour entry - own entries for all roles, any entry for admin/president"""
    from models import UserRole
    db = get_database()

    # Admin and president can delete any entry
    if current_user.role in [UserRole.ADMIN, UserRole.PRESIDENT]:
        query = {"_id": ObjectId(hour_id)}
    else:
        # Other roles can only delete their own entries
        query = {"_id": ObjectId(hour_id), "user_id": current_user.id}

    result = db.service_hours.delete_one(query)

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service hour entry not found or unauthorized"
        )

    return {"message": "Service hour deleted successfully"}'''

content = content.replace(old_func, new_func)

with open('routes.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated delete_service_hour endpoint in routes.py")
