from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

users = list(db.users.find({}, {"email": 1, "name": 1, "role": 1}))

print("Users by Role:\n")

# Group by role
roles_dict = {}
for user in users:
    role = user.get('role', 'unknown')
    if role not in roles_dict:
        roles_dict[role] = []
    roles_dict[role].append({
        'email': user.get('email'),
        'name': user.get('name')
    })

# Print by role
for role in ['admin', 'executive', 'president', 'officer', 'member']:
    if role in roles_dict:
        print(f"{role.upper()} - Can access Applications:")
        for user in roles_dict[role]:
            print(f"  • {user['email']} ({user['name']})")
        print()

client.close()
