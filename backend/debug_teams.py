from database import get_database, connect_to_mongo
from postgres_db import SessionLocal
from sql_models import Application

# Connect to MongoDB first
connect_to_mongo()

# Get MongoDB connection
db_mongo = get_database()

# Check all users with president role
print("=== PRESIDENTS IN MONGODB ===")
presidents = list(db_mongo.users.find({"role": "president"}))
for p in presidents:
    print(f"  Email: {p['email']}, Team: '{p.get('team', 'NO TEAM FIELD')}'")

print("\n=== APPLICATIONS IN POSTGRESQL ===")
db = SessionLocal()
apps = db.query(Application).all()
print(f"Total applications: {len(apps)}")
for app in apps:
    print(f"  ID: {app.id}, Name: {app.firstName} {app.lastName}, Team: '{app.team}', Status: {app.status.value}")

# Also check by team filter
print("\n=== FILTERING FOR 'Los Angeles' ===")
la_apps = db.query(Application).filter(Application.team == "Los Angeles").all()
print(f"Applications for 'Los Angeles': {len(la_apps)}")
for app in la_apps:
    print(f"  ID: {app.id}, Name: {app.firstName} {app.lastName}")

db.close()
