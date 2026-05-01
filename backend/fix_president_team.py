from database import get_database, connect_to_mongo

# Connect to MongoDB first
connect_to_mongo()

# Get MongoDB connection
db_mongo = get_database()

# Update president's team field
result = db_mongo.users.update_one(
    {"email": "ballinglikecurry387@gmail.com"},
    {"$set": {"team": "Los Angeles"}}
)

print(f"Updated {result.modified_count} document(s)")

# Verify
president = db_mongo.users.find_one({"email": "ballinglikecurry387@gmail.com"})
print(f"President team is now: '{president.get('team')}'")
