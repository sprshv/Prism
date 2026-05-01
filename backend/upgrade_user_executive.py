#!/usr/bin/env python3
"""Upgrade user to executive role"""
from pymongo import MongoClient
from config import settings

client = MongoClient(settings.mongodb_url)
db = client[settings.database_name]

# Upgrade sparsh.virwaney@gmail.com to executive
result = db.users.update_one(
    {"email": "sparsh.virwaney@gmail.com"},
    {"$set": {"role": "executive"}}
)

if result.modified_count > 0:
    print("✓ Role updated for sparsh.virwaney@gmail.com to executive")
    
    # Verify the update
    user = db.users.find_one({"email": "sparsh.virwaney@gmail.com"})
    print(f"Current role: {user.get('role')}")
else:
    print("✗ User not found or role not updated")

client.close()
