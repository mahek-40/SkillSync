# Backend Verification Checklist

Use this checklist to verify the backend is properly set up and working.

## ✅ File Structure Verification

All required files are present:

```
backend/
├── .env                                    ✓
├── .gitignore                              ✓
├── README.md                               ✓
├── requirements.txt                        ✓
├── SETUP_GUIDE.md                          ✓
├── VERIFICATION.md                         ✓
├── start.bat                               ✓
├── start.sh                                ✓
└── app/
    ├── __init__.py                         ✓
    ├── main.py                             ✓
    ├── api/
    │   ├── __init__.py                     ✓
    │   ├── deps.py                         ✓
    │   └── routes/
    │       ├── __init__.py                 ✓
    │       ├── auth_routes.py              ✓
    │       ├── user_routes.py              ✓
    │       ├── swap_routes.py              ✓
    │       └── notification_routes.py      ✓
    ├── core/
    │   ├── __init__.py                     ✓
    │   ├── config.py                       ✓
    │   └── security.py                     ✓
    ├── db/
    │   ├── __init__.py                     ✓
    │   └── database.py                     ✓
    ├── schemas/
    │   ├── __init__.py                     ✓
    │   ├── auth_schema.py                  ✓
    │   ├── user_schema.py                  ✓
    │   └── swap_schema.py                  ✓
    └── services/
        ├── __init__.py                     ✓
        └── auth_service.py                 ✓
```

## ✅ Dependencies Verification

Run this command to verify all dependencies are installed:

```bash
cd backend
pip list | grep -E "fastapi|uvicorn|motor|pydantic|passlib|jose|dotenv"
```

Expected output should include:
- fastapi
- uvicorn
- motor
- pydantic
- pydantic-settings
- passlib
- python-jose
- python-dotenv

## ✅ MongoDB Verification

### Check if MongoDB is running:

```bash
# Try to connect
mongosh

# Or check the service
# Windows:
net start | findstr MongoDB

# macOS:
brew services list | grep mongodb

# Linux:
sudo systemctl status mongod
```

### Verify MongoDB connection:

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017

# Should connect successfully
```

## ✅ Backend Server Verification

### Start the server:

```bash
cd backend
uvicorn app.main:app --reload --port 5000
```

### Expected startup output:

```
INFO:     Will watch for changes in these directories: ['D:\\skillsync\\backend']
INFO:     Uvicorn running on http://127.0.0.1:5000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
✓ Initial users seeded successfully
INFO:     Application startup complete.
```

## ✅ API Endpoints Verification

### Test each endpoint:

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status":"healthy"}`

#### 2. Root Endpoint
```bash
curl http://localhost:5000/
```
Expected: `{"message":"SkillSync API is running"}`

#### 3. API Documentation
Open in browser: `http://localhost:5000/docs`
Expected: Interactive Swagger UI

#### 4. Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```
Expected: User object with id, name, email, etc.

#### 5. Get Users
```bash
curl http://localhost:5000/api/users
```
Expected: Array of user objects

#### 6. Signup Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "location": "Test City",
    "bio": "Test bio",
    "skillsOffered": ["Testing"],
    "skillsWanted": ["Learning"]
  }'
```
Expected: New user object

## ✅ Database Verification

### Check if data was seeded:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use skillsync_db

# Count users
db.users.countDocuments()
# Expected: 3 (Alice, Bob, Admin)

# View users
db.users.find({}, {password: 0}).pretty()
# Expected: 3 user documents

# Check indexes
db.users.getIndexes()
# Expected: Index on email field

# Check collections
show collections
# Expected: users, swaps, notifications
```

## ✅ CORS Verification

### Test CORS from browser console:

```javascript
fetch('http://localhost:5000/api/users')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Expected: Array of users (no CORS error)

## ✅ Error Handling Verification

### Test invalid login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@example.com","password":"wrong"}'
```
Expected: 401 error with "Invalid credentials"

### Test duplicate email:

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "password": "test123"
  }'
```
Expected: 400 error with "Email already exists"

## ✅ Security Verification

### Password Hashing:

```bash
# In mongosh
use skillsync_db
db.users.findOne({email: "alice@example.com"}, {password: 1})
```
Expected: Password should be hashed (starts with $2b$)

### Environment Variables:

```bash
# Check .env file exists
cat backend/.env
```
Expected: File contains MONGO_URI, SECRET_KEY, etc.

## ✅ Performance Verification

### Response Time:

```bash
time curl http://localhost:5000/api/users
```
Expected: Response in < 1 second

### Concurrent Requests:

```bash
# Run multiple requests
for i in {1..10}; do
  curl http://localhost:5000/api/health &
done
wait
```
Expected: All requests succeed

## ✅ Integration Verification

### Frontend-Backend Integration:

1. Start backend: `uvicorn app.main:app --reload --port 5000`
2. Start frontend: `npm run dev`
3. Open frontend: `http://localhost:5173`
4. Try logging in with demo credentials
5. Check browser network tab for API calls

Expected: API calls to `http://localhost:5000/api/*`

## Troubleshooting

If any verification fails:

### MongoDB Issues:
```bash
# Restart MongoDB
# Windows: net stop MongoDB && net start MongoDB
# macOS: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod
```

### Python Issues:
```bash
# Reinstall dependencies
cd backend
pip install --upgrade -r requirements.txt
```

### Port Issues:
```bash
# Check what's using port 5000
# Windows: netstat -ano | findstr :5000
# Linux/macOS: lsof -i :5000

# Use different port
uvicorn app.main:app --reload --port 5001
```

### Import Issues:
```bash
# Ensure you're in the correct directory
cd backend

# Check Python path
python -c "import sys; print(sys.path)"

# Try running with python -m
python -m uvicorn app.main:app --reload --port 5000
```

## Success Criteria

✅ All files present
✅ Dependencies installed
✅ MongoDB running and accessible
✅ Backend server starts without errors
✅ All API endpoints respond correctly
✅ Database seeded with initial data
✅ CORS configured properly
✅ Error handling works
✅ Passwords are hashed
✅ Environment variables loaded

## Next Steps

Once all verifications pass:

1. ✅ Backend is fully functional
2. ⏭️ Update frontend to use backend API
3. ⏭️ Test end-to-end functionality
4. ⏭️ Add additional features
5. ⏭️ Deploy to production

## Quick Test Script

Run this to test all endpoints at once:

```bash
#!/bin/bash

echo "Testing SkillSync Backend..."

echo "\n1. Health Check:"
curl -s http://localhost:5000/api/health

echo "\n\n2. Root:"
curl -s http://localhost:5000/

echo "\n\n3. Login:"
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

echo "\n\n4. Get Users:"
curl -s http://localhost:5000/api/users

echo "\n\nAll tests complete!"
```

Save as `test_backend.sh` and run: `bash test_backend.sh`
