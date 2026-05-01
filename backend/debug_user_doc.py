from database import get_database, connect_to_mongo

connect_to_mongo()
db_mongo = get_database()

# Get the president user document
president = db_mongo.users.find_one({"email": "ballinglikecurry387@gmail.com"})

print("=== FULL PRESIDENT USER DOCUMENT ===")
for key, value in president.items():
    print(f"  {key}: {value}")
