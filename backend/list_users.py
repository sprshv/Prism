from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

# Find all users and show their email
users = list(db.users.find({}, {"email": 1, "name": 1}))
print(f"Total users: {len(users)}\n")
print("Users in database:")
for user in users:
    print(f"  - {user.get('email', 'NO EMAIL')} ({user.get('name', 'NO NAME')})")

client.close()
