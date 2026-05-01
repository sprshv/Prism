from pymongo import MongoClient
from config import settings
import bcrypt

# Connect to database
client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

# Get user
email = "prismprogramscv@gmail.com"
user = db.users.find_one({"email": email})

if not user:
    print(f"✗ User {email} not found")
else:
    # Check if password matches
    test_password = "Prismadmin20!"
    stored_hash = user.get("hashed_password", "")
    
    try:
        is_match = bcrypt.checkpw(test_password.encode('utf-8'), stored_hash.encode('utf-8'))
        if is_match:
            print(f"✓ Password MATCHES for {email}")
            print(f"  Password: {test_password}")
        else:
            print(f"✗ Password does NOT match for {email}")
            print(f"  Tried: {test_password}")
    except Exception as e:
        print(f"✗ Error checking password: {e}")

client.close()
