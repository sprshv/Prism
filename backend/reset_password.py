from pymongo import MongoClient
from config import settings
import bcrypt

# New password to set
new_password = "test123"

# Hash the password
hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Connect to database
client = MongoClient(settings.mongodb_url, serverSelectionTimeoutMS=5000)
db = client[settings.database_name]

# Update user password
email = "sparsh.virwaney@gmail.com"
result = db.users.update_one(
    {"email": email},
    {"$set": {"hashed_password": hashed_password}}
)

if result.modified_count > 0:
    print(f"✓ Password reset successfully for {email}")
    print(f"  New password: {new_password}")
else:
    print(f"✗ User not found or password not updated")

client.close()
