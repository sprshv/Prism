from database import get_database, connect_to_mongo, close_mongo_connection
from auth import get_password_hash
from datetime import datetime
from models import UserRole

def create_admin_user():
    connect_to_mongo()
    db = get_database()
    
    admin_email = "prismprogramscv@gmail.com"
    admin_password = "admin123"  # Change this to a secure password
    
    # Check if admin already exists
    existing_admin = db.users.find_one({"email": admin_email})
    if existing_admin:
        print(f"Admin user with email {admin_email} already exists!")
        return
    
    # Create admin user
    admin_dict = {
        "email": admin_email,
        "name": "PRISM Admin",
        "role": UserRole.ADMIN.value,
        "hashed_password": get_password_hash(admin_password),
        "created_at": datetime.utcnow(),
        "is_active": True
    }
    
    result = db.users.insert_one(admin_dict)
    print(f"Admin user created successfully!")
    print(f"Email: {admin_email}")
    print(f"Password: {admin_password}")
    print(f"User ID: {result.inserted_id}")
    
    close_mongo_connection()

if __name__ == "__main__":
    create_admin_user()
