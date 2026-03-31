# SkillSync Quick Start Guide

Get the SkillSync application running in 5 minutes!

## Prerequisites

- Python 3.8+ installed
- MongoDB installed and running
- Node.js installed (for frontend)

## Backend Setup (2 minutes)

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Start MongoDB (if not running)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# 4. Start the backend server
uvicorn app.main:app --reload --port 5000
```

Backend will be running at: `http://localhost:5000`

API Documentation: `http://localhost:5000/docs`

## Frontend Setup (1 minute)

```bash
# 1. Navigate to project root
cd ..

# 2. Install dependencies (if not already done)
npm install

# 3. Start the frontend
npm run dev
```

Frontend will be running at: `http://localhost:5173`

## Test the Application

1. Open browser: `http://localhost:5173`
2. Click "Log in"
3. Use demo credentials:
   - **Email**: `alice@example.com`
   - **Password**: `password123`
4. Explore the dashboard!

## Demo Accounts

| Name | Email | Password | Role |
|------|-------|----------|------|
| Alice Johnson | alice@example.com | password123 | User |
| Bob Smith | bob@example.com | password123 | User |
| Admin User | admin@skillsync.com | admin123 | Admin |

## What's Included

### Backend Features
- ✅ User authentication (signup/login)
- ✅ User profile management
- ✅ Skill swap requests
- ✅ Notifications system
- ✅ Admin dashboard
- ✅ MongoDB database
- ✅ RESTful API
- ✅ Interactive API docs

### Frontend Features
- ✅ Landing page
- ✅ User authentication
- ✅ Dashboard
- ✅ Profile management
- ✅ Skill exchange browsing
- ✅ Swap request management
- ✅ Notifications
- ✅ Admin panel

## Connecting Frontend to Backend

The frontend currently uses mock localStorage data. To connect to the real backend:

1. Update `src/services/api.js` to make HTTP requests to `http://localhost:5000`
2. See `BACKEND_INTEGRATION.md` for detailed instructions

## Troubleshooting

### MongoDB not running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port already in use
```bash
# Backend: Use different port
uvicorn app.main:app --reload --port 5001

# Frontend: Update vite.config.js
```

### Dependencies not installed
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
npm install
```

## Project Structure

```
skillsync/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # Entry point
│   │   ├── api/         # API routes
│   │   ├── core/        # Config & security
│   │   ├── db/          # Database
│   │   ├── schemas/     # Data models
│   │   └── services/    # Business logic
│   ├── requirements.txt
│   └── .env
├── src/                  # React frontend
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── services/        # API services
│   └── store/           # State management
├── public/
└── package.json
```

## Next Steps

1. ✅ Backend and frontend are running
2. ⏭️ Test all features
3. ⏭️ Connect frontend to backend API
4. ⏭️ Customize and extend
5. ⏭️ Deploy to production

## Documentation

- **Backend Setup**: `backend/SETUP_GUIDE.md`
- **Backend README**: `backend/README.md`
- **Integration Guide**: `BACKEND_INTEGRATION.md`
- **API Docs**: `http://localhost:5000/docs` (when running)

## Support

For detailed setup instructions, troubleshooting, and API documentation, see:
- `backend/SETUP_GUIDE.md` - Complete backend setup
- `BACKEND_INTEGRATION.md` - Frontend-backend integration
- `http://localhost:5000/docs` - Interactive API documentation

Happy coding! 🚀
