# SkillSync Backend API 🚀

![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-green?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

> Production-ready FastAPI backend with MongoDB for SkillSync skill exchange platform

---

## 🌟 Features

- ✅ **JWT Authentication** (Access + Refresh tokens)
- ✅ **MongoDB Database** (Fully integrated with Motor async driver)
- ✅ **Role-Based Access** (User / Admin)
- ✅ **Complete API** (Auth, Users, Swaps, Ratings, Admin)
- ✅ **CORS Configured** (React frontend ready)
- ✅ **Auto API Docs** (Swagger UI + ReDoc)
- ✅ **Standardized Responses** (Frontend-friendly JSON)
- ✅ **Database Indexes** (Optimized queries)
- ✅ **CSV Export** (Admin reports)

---

## 📋 Prerequisites

- Python 3.9 or higher
- MongoDB 4.4 or higher (local or Atlas)
- pip (Python package manager)

---

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd SkillSync/backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use in .env file

### 5. Configure Environment

```bash
# Copy example
cp .env.example .env

# Generate secure SECRET_KEY
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Edit .env and paste the generated key
```

**Required .env variables:**
```bash
SECRET_KEY=your-generated-secret-key-here
MONGODB_URL=mongodb://skillsync_admin:skillsync123@localhost:27017/skillsync?authSource=admin
# Or for Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/skillsync
```

### 6. Run Server

```bash
python run.py
```

**Server starts at:** `http://localhost:8000`  
**API Docs:** `http://localhost:8000/docs` 🎉

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── database.py          # MongoDB connection
│   ├── schemas.py           # Pydantic models
│   ├── dependencies.py      # Auth dependencies
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # Settings
│   │   └── security.py      # JWT & password hashing
│   └── api/
│       ├── __init__.py
│       ├── auth.py          # Authentication
│       ├── users.py         # User management
│       ├── swaps.py         # Swap requests
│       ├── notifications.py # Notifications
│       ├── ratings.py       # Reviews
│       └── admin.py         # Admin panel
├── .env                     # Environment variables (create this!)
├── .env.example
├── requirements.txt
├── run.py
└── README.md
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # Login
POST   /api/auth/refresh       # Refresh access token
GET    /api/auth/me            # Get current user
POST   /api/auth/logout        # Logout
```

### Users (`/api/users`)
```
GET    /api/users/me           # Get my profile
PUT    /api/users/me           # Update my profile
GET    /api/users/{id}         # Get user by ID
GET    /api/users/{id}/ratings # Get user ratings
GET    /api/users              # Search users (for Exchange page)
```

### Swap Requests (`/api/swaps`)
```
POST   /api/swaps/request      # Create swap request
GET    /api/swaps/sent         # Get sent requests
GET    /api/swaps/received     # Get received requests
PUT    /api/swaps/{id}/accept  # Accept request
PUT    /api/swaps/{id}/reject  # Reject request
DELETE /api/swaps/{id}         # Cancel request
GET    /api/swaps              # Get all my swaps
```

### Ratings (`/api/ratings`)
```
POST   /api/ratings            # Create rating
GET    /api/ratings            # Get my ratings
```

### Notifications (`/api/notifications`)
```
GET    /api/notifications              # Get all notifications
PUT    /api/notifications/{id}/read    # Mark as read
PUT    /api/notifications/read-all     # Mark all as read
DELETE /api/notifications/{id}         # Delete notification
```

### Admin (`/api/admin`)
```
GET    /api/admin/users                # Get all users
PUT    /api/admin/users/{id}/ban       # Ban/unban user
GET    /api/admin/swaps                # Get all swaps
POST   /api/admin/announcements        # Create announcement
GET    /api/admin/stats                # Platform statistics
GET    /api/admin/reports/users        # Export users CSV
GET    /api/admin/reports/swaps        # Export swaps CSV
```

---

## 🔐 Authentication Flow

### 1. Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "data": {
    "user": {...},
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "token_type": "bearer"
  }
}
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Use Token
```bash
curl -X GET http://localhost:8000/api/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 💾 MongoDB Collections

### users
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed",
  "role": "user",
  "location": "New York",
  "skills_offered": ["React", "Python"],
  "skills_wanted": ["UI Design"],
  "is_public": true,
  "is_banned": false,
  "created_at": "2024-01-01T00:00:00"
}
```

### swap_requests
```json
{
  "_id": ObjectId("..."),
  "requester_id": "user1_id",
  "receiver_id": "user2_id",
  "skill_offered": "React",
  "skill_wanted": "Python",
  "status": "pending",
  "created_at": "2024-01-01T00:00:00"
}
```

### ratings
```json
{
  "_id": ObjectId("..."),
  "swap_id": "swap_id",
  "reviewer_id": "user1_id",
  "reviewee_id": "user2_id",
  "rating": 5,
  "comment": "Great experience!",
  "created_at": "2024-01-01T00:00:00"
}
```

---

## 🔗 Frontend Integration

### Update React Frontend

In your React frontend `.env`:
```bash
VITE_API_URL=http://localhost:8000/api
```

### Example API Call
```javascript
// src/services/authService.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // { success, message, data }
  }
};
```

---

## 👨‍💼 Default Admin Account

**Email:** `admin@skillsync.com`  
**Password:** `admin123`

**⚠️ IMPORTANT:** Change admin password in production!

---

## 🧪 Testing

### Using Swagger UI (Recommended)
1. Open `http://localhost:8000/docs`
2. Click "Authorize" button
3. Login to get token
4. Test any endpoint

### Using cURL
```bash
# Login first
TOKEN=$(curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@skillsync.com","password":"admin123"}' \
  | jq -r '.data.access_token')

# Use token
curl -X GET http://localhost:8000/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `Connection refused`

**Solution:**
```bash
# Check MongoDB is running
mongosh

# Start MongoDB
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Import Error

**Error:** `ModuleNotFoundError`

**Solution:**
```bash
# Make sure venv is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall
pip install -r requirements.txt
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
- Check `FRONTEND_URL` in `.env` matches your React app URL
- Restart backend after changing `.env`

---

## 📊 Database Indexes

Automatically created on startup:

```python
# Users
- email (unique)
- role
- is_banned
- skills_offered
- skills_wanted

# Swap Requests
- requester_id
- receiver_id
- status

# Ratings
- reviewee_id
- swap_id (unique)

# Notifications
- user_id
- is_read
```

---

## 🚀 Deployment

### Railway (Free Tier)
```bash
railway login
railway init
railway up
railway variables set MONGODB_URL=your-atlas-url
```

### Render (Free Tier)
1. Push to GitHub
2. Create Web Service on Render
3. Connect repo
4. Add environment variables
5. Deploy

---

## 📝 Environment Variables

**Required:**
```bash
SECRET_KEY=           # Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))"
MONGODB_URL=          # MongoDB connection string
DATABASE_NAME=skillsync
```

**Optional:**
```bash
FRONTEND_URL=http://localhost:3000
HOST=0.0.0.0
PORT=8000
DEBUG=True
ENVIRONMENT=development
```

---

## 🎯 Response Format

**Success:**
```json
{
  "success": true,
  "message": "Action completed",
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📚 Tech Stack

- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **python-jose** - JWT implementation
- **passlib** - Password hashing
- **Uvicorn** - ASGI server

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## 📄 License

MIT License

---

## 💬 Support

- API Docs: `/docs`
- Check logs for errors
- Verify MongoDB connection
- Check `.env` configuration

---

**Built with ❤️ for SkillSync** 🚀
