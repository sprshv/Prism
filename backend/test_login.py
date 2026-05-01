import requests
import json

api_url = "http://localhost:8000/auth/login"
credentials = {
    "email": "prismprogramscv@gmail.com",
    "password": "Prismadmin20!"
}

try:
    response = requests.post(api_url, json=credentials)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    if response.status_code == 200:
        data = response.json()
        print(f"✓ Login successful!")
        print(f"Token: {data.get('access_token')[:20]}...")
except Exception as e:
    print(f"Error: {e}")
