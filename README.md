# PRISM Dashboard

A full-stack web application for managing PRISM program activities, events, and member service hours.

## Features

- **Role-Based Access Control**: Member, Officer, President, and Admin roles
- **Event Management**: Create, view, and delete events (officer+)
- **Service Hours Tracking**: Log hours, approval workflow (admin/president approval)
- **User Management**: Register members, update roles (admin/president only)
- **Email Integration**: Contact and application form submissions via email
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React (icons)
- Axios for API calls

### Backend
- FastAPI (Python 3.13)
- MongoDB (Atlas)
- JWT Authentication
- Pydantic for data validation
- Gmail SMTP for emails

## Setup Instructions

### Prerequisites
- Python 3.13+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password

### Backend Setup

1. Navigate to backend directory:
```powershell
cd backend
```

2. Create virtual environment (recommended):
```powershell
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux
```

3. Install Python dependencies:
```powershell
pip install fastapi uvicorn pymongo pydantic pydantic-settings python-jose[cryptography] passlib[bcrypt] python-multipart
```

4. Create .env file in backend directory:
```bash
cp .env.example .env
```

5. Update .env with your credentials:
```env
# MongoDB Configuration
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
DATABASE_NAME=prism_db

# JWT Configuration (generate a secure random string)
SECRET_KEY=your-secret-key-here

# SMTP Email Configuration
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
```

6. Create admin account:
```powershell
python create_admin.py
```

7. Start backend server:
```powershell
python main.py
```

Backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to project root:
```powershell
cd ..
```

2. Install Node.js dependencies:
```powershell
npm install
```

3. Start React development server:
```powershell
npm start
```

Frontend will run on http://localhost:3000

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URL | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/ |
| DATABASE_NAME | Database name | prism_db |
| SECRET_KEY | JWT secret key | Generate with openssl rand -hex 32 |
| ALGORITHM | JWT algorithm | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token expiration | 30 |
| SMTP_EMAIL | Gmail address for sending emails | your-email@gmail.com |
| SMTP_PASSWORD | Gmail App Password | See setup guide below |

### Gmail App Password Setup

1. Enable 2-Step Verification on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Create a new app password for "Mail"
4. Copy the 16-character password to SMTP_PASSWORD in .env

## Default Admin Account

After running create_admin.py:
- **Email**: prismprogramscv@gmail.com
- **Password**: dmin123

 **Change the password immediately after first login!**

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Member** | View events, log own service hours, view own hours |
| **Officer** | All member permissions + create/delete events, register new members |
| **President** | All officer permissions + approve service hours, manage users |
| **Admin** | All permissions + assign president/admin roles, delete users |

## API Endpoints

### Authentication
- POST /auth/login - User login
- POST /auth/register-member - Register new member (officer+)
- GET /auth/me - Get current user info

### Events
- GET /events/ - Get all events
- POST /events/ - Create event (officer+)
- DELETE /events/{id} - Delete event (officer+)

### Service Hours
- GET /service-hours/ - Get service hours
- POST /service-hours/ - Log service hours
- PATCH /service-hours/{id}/approve - Approve/reject hours (admin/president)
- DELETE /service-hours/{id} - Delete own entry

### Users
- GET /users/ - Get all users (admin/president)
- PATCH /users/{id}/role - Update user role (admin/president)
- DELETE /users/{id} - Delete user (admin only)

### Email
- POST /email/contact - Send contact form
- POST /email/application - Send application form

## Development

### Running Tests
```powershell
# Backend tests (when implemented)
cd backend
pytest

# Frontend tests (when implemented)
npm test
```

### Project Structure
```
prism-website/
 backend/
    main.py              # FastAPI application entry
    routes.py            # API routes
    auth.py              # Authentication logic
    models.py            # Pydantic models
    config.py            # Settings & config
    database.py          # MongoDB connection
    email_routes.py      # Email endpoints
    create_admin.py      # Admin setup script
    .env                 # Environment variables (not committed)
    .env.example         # Environment template
 src/
    App.js               # React main component
    index.js             # React entry point
 public/
 package.json
 .gitignore
 README.md
```

## Security Notes

- Never commit .env file to version control
- Always use HTTPS in production
- Rotate JWT secret keys periodically
- Use strong passwords for admin accounts
- Keep dependencies updated

## Deployment

### Backend (e.g., Heroku, Railway, Render)
1. Set environment variables in platform settings
2. Deploy backend as Python/FastAPI app
3. Ensure MongoDB Atlas allows connections from deployment IP

### Frontend (e.g., Netlify, Vercel)
1. Update API base URL to production backend
2. Build production bundle: 
pm run build
3. Deploy uild folder

## Support

For issues or questions, contact: prismprogramscv@gmail.com

## License

Proprietary - PRISM Programs
