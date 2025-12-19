"""
Script to create test users in MongoDB
Run this once to create test officer and member accounts
"""
import sys
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def create_test_users():
    # Connect to MongoDB
    mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    database_name = os.getenv("DATABASE_NAME", "prism_db")
    
    client = MongoClient(mongodb_url)
    db = client[database_name]
    
    # Generate fresh password hash using bcrypt
    import bcrypt
    password = "password123"
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    test_users = [
        {
            "email": "officer@prism.com",
            "name": "Test Officer",
            "role": "officer",
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "email": "member@prism.com",
            "name": "Test Member",
            "role": "member",
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
            "is_active": True
        }
    ]
    
    # Clear existing test users
    db.users.delete_many({"email": {"$in": ["officer@prism.com", "member@prism.com"]}})
    
    # Insert test users
    result = db.users.insert_many(test_users)
    
    print("✅ Test users created successfully!")
    print("\nTest Credentials:")
    print("-" * 50)
    print("OFFICER ACCOUNT:")
    print("  Email: officer@prism.com")
    print("  Password: password123")
    print("  Role: Officer (can register new members)")
    print()
    print("MEMBER ACCOUNT:")
    print("  Email: member@prism.com")
    print("  Password: password123")
    print("  Role: Member")
    print("-" * 50)
    print(f"\nInserted {len(result.inserted_ids)} users into database: {database_name}")
    
    client.close()

if __name__ == "__main__":
    try:
        create_test_users()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
