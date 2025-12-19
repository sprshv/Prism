"""
Simple script to add test users via API
"""
import requests
import json

API_BASE = "http://localhost:8000"

def create_test_users_via_api():
    # First, we need to add an officer directly to the database
    # Let's create a manual entry with a simple hash
    print("To create test users, you can:")
    print()
    print("1. Use MongoDB Compass or Atlas UI to manually add:")
    print()
    print("   OFFICER:")
    print("   {")
    print('     "email": "officer@prism.com",')
    print('     "name": "Test Officer",')
    print('     "role": "officer",')
    print('     "hashed_password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5bnK9R8Y8QSCK",')
    print('     "created_at": ISODate(),')
    print('     "is_active": true')
    print("   }")
    print()
    print("   Password for this hash: 'password123'")
    print()
    print("   MEMBER:")
    print("   {")
    print('     "email": "member@prism.com",')
    print('     "name": "Test Member",')
    print('     "role": "member",')
    print('     "hashed_password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5bnK9R8Y8QSCK",')
    print('     "created_at": ISODate(),')
    print('     "is_active": true')
    print("   }")
    print()
    print("   Password: 'password123'")
    print()
    print("2. Or use mongosh:")
    print()
    print('   mongosh "your-connection-string"')
    print('   use prism_db')
    print('   db.users.insertMany([')
    print('     {')
    print('       email: "officer@prism.com",')
    print('       name: "Test Officer",')
    print('       role: "officer",')
    print('       hashed_password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5bnK9R8Y8QSCK",')
    print('       created_at: new Date(),')
    print('       is_active: true')
    print('     },')
    print('     {')
    print('       email: "member@prism.com",')
    print('       name: "Test Member",')
    print('       role: "member",')
    print('       hashed_password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5bnK9R8Y8QSCK",')
    print('       created_at: new Date(),')
    print('       is_active: true')
    print('     }')
    print('   ])')

if __name__ == "__main__":
    create_test_users_via_api()
