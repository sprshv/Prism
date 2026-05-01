from pymongo import MongoClient
from config import settings
from auth import verify_password

client = MongoClient(settings.mongodb_url)
db = client[settings.database_name]

user = db.users.find_one({"email": "sparsh.virwaney@gmail.com"})

if user:
    print(f"Email: {user['email']}")
    print(f"Name: {user.get('name')}")
    print(f"Role: {user.get('role')}")
    print(f"Has password hash: {'hashed_password' in user}")
    
    # Test the password
    test_pwd = "sparsh123"
    if "hashed_password" in user:
        is_valid = verify_password(test_pwd, user["hashed_password"])
        print(f"Password '{test_pwd}' is valid: {is_valid}")
else:
    print("User not found")

client.close()
