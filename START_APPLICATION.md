# 🚀 Start SkillSync Application

## Current Status: ✅ FULLY WORKING!

Both backend and frontend are running and connected!

## 🌐 Access Your Application

### Frontend (React)
**URL**: http://localhost:5175

### Backend API
**URL**: http://localhost:5000
**API Docs**: http://localhost:5000/docs

### Database
**MongoDB**: Running on port 27017

## 👤 Login Credentials

Use these demo accounts to test:

| Name | Email | Password | Role |
|------|-------|----------|------|
| Alice Johnson | alice@example.com | password123 | User |
| Bob Smith | bob@example.com | password123 | User |
| Admin User | admin@skillsync.com | admin123 | Admin |

## ✅ What's Working

### Authentication
- ✅ Real login with MongoDB
- ✅ Real signup with validation
- ✅ Password hashing (bcrypt)
- ✅ Role-based access (user/admin)

### User Features
- ✅ Browse users from database
- ✅ View user profiles
- ✅ Update your profile
- ✅ Skills management

### Skill Swaps
- ✅ Create swap requests
- ✅ View your swaps
- ✅ Accept/reject requests
- ✅ Status tracking

### Notifications
- ✅ Receive notifications
- ✅ Mark as read
- ✅ Notification history

### Admin Dashboard
- ✅ View all users
- ✅ View all swaps
- ✅ Platform statistics

## 🧪 Test the Integration

### 1. Open the Application
Visit: http://localhost:5175

### 2. Login
- Click "Log in"
- Email: `alice@example.com`
- Password: `password123`

### 3. Explore Features
- View Dashboard
- Browse users in Exchange page
- Create a swap request
- Check notifications
- Update your profile

### 4. Verify Real Data
Open browser DevTools (F12) → Network tab
- You'll see real API calls to `http://localhost:5000/api/*`
- All data is stored in MongoDB (not localStorage!)

## 🔍 Verify Everything is Working

### Check Backend
```powershell
curl http://localhost:5000/api/health
# Should return: {"status":"healthy"}
```

### Check Frontend
Open: http://localhost:5175
- Should load the landing page
- No console errors

### Check Database
```powershell
mongosh
use skillsync_db
db.users.find().pretty()
# Should show 3 users (Alice, Bob, Admin)
```

## 🛑 Stop the Application

### Stop Frontend
Press `CTRL+C` in the frontend terminal

### Stop Backend
Press `CTRL+C` in the backend terminal

### Or Stop All Processes
I can stop them for you if needed.

## 🔄 Restart the Application

### Quick Restart

**Terminal 1 - Backend**:
```powershell
cd D:\skillsync\backend
python -m uvicorn app.main:app --reload --port 5000
```

**Terminal 2 - Frontend**:
```powershell
cd D:\skillsync
npm run dev
```

### Using Scripts

**Backend**:
```powershell
cd D:\skillsync\backend
.\start-backend.ps1
```

**Frontend**:
```powershell
cd D:\skillsync
npm run dev
```

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (User)                        │
│                http://localhost:5175                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │
┌────────────────────▼────────────────────────────────────┐
│              React Frontend (Vite)                       │
│  - React Components                                      │
│  - Zustand State Management                              │
│  - Real API Service (src/services/api.js)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ API Calls
                     │ http://localhost:5000/api/*
                     │
┌────────────────────▼────────────────────────────────────┐
│           FastAPI Backend (Python)                       │
│  - REST API Endpoints                                    │
│  - Business Logic                                        │
│  - Authentication                                        │
│  - Data Validation                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Database Queries
                     │ mongodb://localhost:27017
                     │
┌────────────────────▼────────────────────────────────────┐
│              MongoDB Database                            │
│  - skillsync_db                                          │
│    - users collection                                    │
│    - swaps collection                                    │
│    - notifications collection                            │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Key Changes Made

### 1. Removed Mock Data
- ❌ No more localStorage
- ❌ No more simulated delays
- ❌ No more fake data

### 2. Added Real Backend
- ✅ FastAPI REST API
- ✅ MongoDB database
- ✅ Real authentication
- ✅ Data persistence

### 3. Connected Frontend
- ✅ Real HTTP requests
- ✅ Proper error handling
- ✅ Environment configuration
- ✅ Production-ready

## 📁 Important Files

### Configuration
- `src/config/api.config.js` - API URL configuration
- `.env.development` - Development environment variables
- `backend/.env` - Backend configuration

### Services
- `src/services/api.js` - Real API service
- `src/services/authService.js` - Authentication service
- `backend/app/main.py` - Backend entry point

### Documentation
- `FRONTEND_BACKEND_CONNECTED.md` - Integration details
- `backend/README.md` - Backend documentation
- `backend/TROUBLESHOOTING.md` - Fix common issues

## 🐛 Troubleshooting

### Frontend won't start
```powershell
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Backend won't start
```powershell
# Check MongoDB
Get-Service MongoDB

# Reinstall dependencies
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 5000
```

### Can't login
- Check backend is running: `curl http://localhost:5000/api/health`
- Check credentials: `alice@example.com` / `password123`
- Check browser console for errors

### CORS errors
- Make sure backend is running on port 5000
- Check `backend/app/main.py` CORS configuration
- Frontend should be on localhost:5173 or 5175

## 📚 Documentation

- **FRONTEND_BACKEND_CONNECTED.md** - Integration guide
- **QUICK_START.md** - Quick start guide
- **backend/README.md** - Backend documentation
- **backend/TROUBLESHOOTING.md** - Troubleshooting guide

## 🎉 Success Indicators

When everything is working, you should see:

### Backend Terminal
```
✓ Initial users seeded successfully
INFO: Application startup complete.
INFO: 127.0.0.1:xxxxx - "POST /api/auth/login HTTP/1.1" 200 OK
```

### Frontend Terminal
```
VITE v7.3.1  ready in 671 ms
➜  Local:   http://localhost:5175/
```

### Browser
- No console errors
- Can login successfully
- Can see users from database
- Can create swap requests

### Database
```javascript
// In mongosh
use skillsync_db
db.users.countDocuments()
// Should return: 3
```

## 🚀 You're All Set!

Your SkillSync application is now:
- ✅ Fully functional
- ✅ Connected to real backend
- ✅ Using real database
- ✅ Production-ready architecture
- ✅ No mock data!

**Enjoy your real-world full-stack application!** 🎊

---

**Quick Access**:
- Frontend: http://localhost:5175
- Backend API: http://localhost:5000/docs
- Login: alice@example.com / password123
