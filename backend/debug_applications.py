#!/usr/bin/env python3
"""Debug script to check applications and user roles"""
from postgres_db import SessionLocal
from sql_models import Application
from pymongo import MongoClient
from config import settings

# Check PostgreSQL applications
print("=== PostgreSQL Applications ===")
db = SessionLocal()
apps = db.query(Application).all()
print(f"Total applications: {len(apps)}")
for app in apps:
    print(f"- {app.firstName} {app.lastName} ({app.email}) - Status: {app.status}")

# Check MongoDB user
print("\n=== MongoDB User Info ===")
client = MongoClient(settings.mongodb_url)
db_mongo = client[settings.database_name]
user = db_mongo.users.find_one({"email": "sparsh.virwaney@gmail.com"})
if user:
    print(f"Email: {user.get('email')}")
    print(f"Role: {user.get('role')}")
    print(f"Team: {user.get('team')}")
    print(f"Is Active: {user.get('is_active')}")
else:
    print("User not found!")

# Check all executive team members
print("\n=== All Executive Team Members ===")
executives = db_mongo.users.find({"role": "executive"})
exec_list = list(executives)
print(f"Total executives: {len(exec_list)}")
for exec_user in exec_list:
    print(f"- {exec_user.get('email')} - Team: {exec_user.get('team')}")

client.close()
