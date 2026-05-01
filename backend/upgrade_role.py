from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

email = "sparsh.virwaney@gmail.com"
new_role = "executive"

result = db.users.update_one(
    {"email": email},
    {"$set": {"role": new_role}}
)

if result.modified_count > 0:
    print(f"✓ Role updated for {email}")
    
    # Show the updated user
    user = db.users.find_one({"email": email})
    print(f"  Name: {user.get('name')}")
    print(f"  New Role: {user.get('role')}")
else:
    print(f"✗ User not found or role not updated")

client.close()
