from database import get_database, connect_to_mongo
from postgres_db import SessionLocal
from sql_models import Application

connect_to_mongo()
db_mongo = get_database()

print("=== ALL USERS WITH PRESIDENT ROLE ===")
presidents = list(db_mongo.users.find({"role": "president"}))
for p in presidents:
    print(f"  Email: {p['email']}")
    print(f"    Team: '{p.get('team')}'")
    print(f"    Role: {p.get('role')}")
    print()

print("=== ALL TEAMS ===")
teams = list(db_mongo.teams.find())
for t in teams:
    print(f"  Name: '{t['name']}'")
    print()

print("=== CHECKING CURRENT USER IN SESSION ===")
# This would require checking what's in sessionStorage on the frontend
# For now, let's just see what applications would match each president
db = SessionLocal()
apps = db.query(Application).all()
print(f"Total applications in DB: {len(apps)}")

for app in apps:
    print(f"  Application team: '{app.team}'")

db.close()
