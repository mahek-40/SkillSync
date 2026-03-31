# SkillSync Backend Setup Guide

Complete step-by-step guide to set up and run the SkillSync backend API.

## Prerequisites

1. **Python 3.8+**
   - Check version: `python --version`
   - Download from: https://www.python.org/downloads/

2. **MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **pip** (Python package manager)
   - Usually comes with Python
   - Check: `pip --version`

## Installation Steps

### Step 1: Install MongoDB

#### Windows:
```bash
# Using Chocolatey
choco install mongodb

# Or download installer from MongoDB website
```

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get install mongodb
```

### Step 2: Start MongoDB

#### Windows:
```bash
net start MongoDB
```

#### macOS:
```bash
brew services start mongodb-community
```

#### Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Verify MongoDB is running:
```bash
# Connect to MongoDB shell
mongosh
# or
mongo
```

### Step 3: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

If you encounter permission errors, use:
```bash
pip install --user -r requirements.txt
```

### Step 4: Configure Environment Variables

The `.env` file is already created. Update if needed:

```env
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=your_super_secret_key_change_this_in_production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
```

**Important**: For production, generate a secure SECRET_KEY:
```bash
# On Linux/macOS
openssl rand -hex 32

# On Windows (PowerShell)
python -c "import secrets; print(secrets.token_hex(32))"
```

### Step 5: Run the Backend Server

#### Option 1: Using uvicorn directly
```bash
cd backend
uvicorn app.main:app --reload --port 5000
```

#### Option 2: Using the start script

**Windows:**
```bash
cd backend
start.bat
```

**Linux/macOS:**
```bash
cd backend
chmod +x start.sh
./start.sh
```

### Step 6: Verify Installation

1. Open browser and visit: `http://localhost:5000`
   - You should see: `{"message": "SkillSync API is running"}`

2. Check API documentation: `http://localhost:5000/docs`
   - Interactive Swagger UI

3. Alternative docs: `http://localhost:5000/redoc`
   - ReDoc documentation

## Testing the API

### Using the Swagger UI (Recommended)

1. Go to `http://localhost:5000/docs`
2. Try the `/api/auth/login` endpoint
3. Use demo credentials:
   - Email: `alice@example.com`
   - Password: `password123`

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get all users
curl http://localhost:5000/api/users
```

### Using Postman

1. Import the API from: `http://localhost:5000/openapi.json`
2. Create requests for each endpoint
3. Test authentication flow

## Initial Data

The backend automatically seeds these users on first startup:

| Name | Email | Password | Role |
|------|-------|----------|------|
| Alice Johnson | alice@example.com | password123 | user |
| Bob Smith | bob@example.com | password123 | user |
| Admin User | admin@skillsync.com | admin123 | admin |

## Troubleshooting

### MongoDB Connection Error

**Error**: `ServerSelectionTimeoutError: localhost:27017`

**Solutions**:
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl status mongod
   ```

2. Check MongoDB port:
   ```bash
   netstat -an | grep 27017
   ```

3. Try connecting manually:
   ```bash
   mongosh mongodb://localhost:27017
   ```

### Import Errors

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

### Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000

# Linux/macOS
lsof -i :5000

# Kill the process or use a different port
uvicorn app.main:app --reload --port 5001
```

### CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**:
- Check that frontend URL is in CORS origins (app/main.py)
- Default allowed: `http://localhost:5173` and `http://localhost:3000`

### Database Not Seeding

**Solution**:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use skillsync_db

# Drop users collection
db.users.drop()

# Restart backend server
```

## Development Tips

### Hot Reload

The `--reload` flag enables auto-restart on code changes.

### Debugging

Add print statements or use Python debugger:
```python
import pdb; pdb.set_trace()
```

### View Logs

The server outputs logs to console. Watch for:
- `✓ Initial users seeded successfully`
- `Application startup complete`
- Request logs with status codes

### Database GUI Tools

Use these tools to inspect MongoDB:
- **MongoDB Compass** (Official GUI)
- **Robo 3T** (Free)
- **Studio 3T** (Commercial)

### API Testing Tools

- **Swagger UI**: Built-in at `/docs`
- **Postman**: Full-featured API client
- **Insomnia**: Alternative to Postman
- **curl**: Command-line testing

## Next Steps

1. **Connect Frontend**: Update frontend API base URL to `http://localhost:5000`
2. **Test Endpoints**: Use Swagger UI to test all endpoints
3. **Create Users**: Register new users via `/api/auth/signup`
4. **Test Swaps**: Create skill exchange requests
5. **Monitor**: Watch server logs for errors

## Production Deployment

Before deploying to production:

1. ✅ Generate secure SECRET_KEY
2. ✅ Use production MongoDB (MongoDB Atlas recommended)
3. ✅ Enable MongoDB authentication
4. ✅ Configure proper CORS origins
5. ✅ Use environment variables (not .env file)
6. ✅ Enable HTTPS/TLS
7. ✅ Use production ASGI server (Gunicorn + Uvicorn)
8. ✅ Set up monitoring and logging
9. ✅ Configure rate limiting
10. ✅ Set up backup strategy

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation at `/docs`
3. Check MongoDB connection and logs
4. Verify all dependencies are installed

## API Endpoints Summary

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user profile

### Swaps
- `POST /api/swaps` - Create swap request
- `GET /api/swaps/user/{user_id}` - Get user's swaps
- `PUT /api/swaps/{swap_id}/status` - Update swap status

### Notifications
- `GET /api/notifications/user/{user_id}` - Get user notifications
- `PUT /api/notifications/{notification_id}/read` - Mark as read

Happy coding! 🚀
