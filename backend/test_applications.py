#!/usr/bin/env python3
"""Test applications endpoint"""
import requests
import json
from auth import create_access_token
from models import UserInDB
from bson import ObjectId

# Create a test token for an admin user
admin_user = {
    "_id": ObjectId(),
    "email": "prismprogramscv@gmail.com",
    "role": "admin",
    "team": "leadership"
}

# This will simulate what a logged-in user would send
token = create_access_token({"sub": "prismprogramscv@gmail.com"})

print(f"Generated token: {token[:50]}...")

# Test the applications endpoint
try:
    response = requests.get(
        "http://localhost:8000/applications/",
        headers={"Authorization": f"Bearer {token}"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
