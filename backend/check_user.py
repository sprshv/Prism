from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

# Check Sparsh accounts
emails = ["sparsh.virwaney@gmail.com", "sparsh.v@outlook.com"]

for email in emails:
    user = db.users.find_one({"email": email})
    if user:
        print(f"\n{email}:")
        print(f"  Name: {user.get('name', 'N/A')}")
        print(f"  Role: {user.get('role', 'N/A')}")
        print(f"  Active: {user.get('is_active', 'N/A')}")
        print(f"  Has hashed_password: {'hashed_password' in user}")
    else:
        print(f"\n{email}: NOT FOUND")

client.close()
