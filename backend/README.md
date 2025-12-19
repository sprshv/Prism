# PRISM Backend API

Python FastAPI backend for the PRISM website with MongoDB.

## Setup

1. **Install Python dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Install and run MongoDB:**
   - Download MongoDB Community Server from https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

3. **Configure environment:**
```bash
cp .env.example .env
```
Edit `.env` and set your `SECRET_KEY` (generate a secure random string)

4. **Run the server:**
```bash
python main.py
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## User Roles

- **Officer**: Can register new members, full access
- **Member**: Standard user access

## Authentication

The API uses JWT tokens for authentication. After login, include the token in requests:
```
Authorization: Bearer <your_token>
```

## Endpoints

- `POST /auth/login` - Login with email and password
- `POST /auth/register-member` - Register new member (officer only)
- `GET /auth/me` - Get current user info
