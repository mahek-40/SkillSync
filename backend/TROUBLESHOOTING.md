# Backend Troubleshooting Guide

## Quick Diagnostics

Run these commands to diagnose issues:

```powershell
# Test all imports
python test_imports.py

# Check MongoDB status
.\check-mongodb.ps1

# Start backend with diagnostics
.\start-backend.ps1
```

---

## Common Errors and Solutions

### Error 1: "ModuleNotFoundError: No module named 'fastapi'"

**Cause**: Dependencies not installed

**Solution**:
```powershell
cd D:\skillsync\backend
pip install -r requirements.txt
```

If that fails:
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

---

### Error 2: "ValidationError: Field required [MONGO_URI, SECRET_KEY]"

**Cause**: Environment variables not loading from .env file

**Solution**: This has been fixed in the latest code. The config now has default values.

Verify the fix:
```powershell
python -c "from app.core.config import settings; print(settings.MONGO_URI)"
```

Should output: `mongodb://localhost:27017`

---

### Error 3: "ServerSelectionTimeoutError: localhost:27017"

**Cause**: MongoDB is not running

**Solutions**:

**Option A: Start MongoDB Service**
```powershell
# Run as Administrator
net start MongoDB
```

**Option B: Check if MongoDB is installed**
```powershell
Get-Service MongoDB
```

If not found, install MongoDB:
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer as Administrator
3. Choose "Complete" + "Install as Service"

**Option C: Use MongoDB Atlas (Cloud)**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync_db
   ```

---

### Error 4: "Access is denied" when starting MongoDB

**Cause**: Need Administrator privileges

**Solution**:
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Click "Yes" on UAC prompt
4. Run: `net start MongoDB`

---

### Error 5: "Port 5000 is already in use"

**Cause**: Another application is using port 5000

**Solution A: Use different port**
```powershell
uvicorn app.main:app --reload --port 5001
```

**Solution B: Kill process using port 5000**
```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

---

### Error 6: "ImportError: cannot import name 'Settings'"

**Cause**: Pydantic version mismatch

**Solution**:
```powershell
pip install --upgrade pydantic pydantic-settings
```

---

### Error 7: "Motor connection timeout"

**Cause**: MongoDB not accessible

**Solutions**:

1. **Check MongoDB is running**:
   ```powershell
   Get-Service MongoDB
   ```

2. **Check port 27017**:
   ```powershell
   netstat -an | findstr :27017
   ```

3. **Test MongoDB connection**:
   ```powershell
   mongosh
   ```

4. **Check firewall**: Make sure port 27017 is not blocked

---

### Error 8: "uvicorn: command not found"

**Cause**: Uvicorn not installed or not in PATH

**Solution**:
```powershell
pip install uvicorn
```

Or run with Python:
```powershell
python -m uvicorn app.main:app --reload --port 5000
```

---

### Error 9: "CORS policy: No 'Access-Control-Allow-Origin'"

**Cause**: Frontend URL not in CORS allowed origins

**Solution**: Edit `app/main.py` and add your frontend URL:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://your-frontend-url.com"  # Add your URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Error 10: "Database 'skillsync_db' not found"

**Cause**: Database hasn't been created yet (this is normal)

**Solution**: The database will be created automatically when the backend starts. Just make sure MongoDB is running.

---

### Error 11: "bcrypt not found" or "passlib error"

**Cause**: Passlib bcrypt extra not installed

**Solution**:
```powershell
pip install passlib[bcrypt]
```

Or:
```powershell
pip install bcrypt
pip install passlib
```

---

### Error 12: "python-jose cryptography error"

**Cause**: Cryptography dependency missing

**Solution**:
```powershell
pip install python-jose[cryptography]
```

Or:
```powershell
pip install cryptography
pip install python-jose
```

---

## Step-by-Step Debugging

### Step 1: Verify Python Installation

```powershell
python --version
```

Expected: Python 3.8 or higher

If not installed: https://www.python.org/downloads/

---

### Step 2: Verify Dependencies

```powershell
cd D:\skillsync\backend
python test_imports.py
```

All checks should pass with ✓

If any fail:
```powershell
pip install -r requirements.txt
```

---

### Step 3: Verify MongoDB

```powershell
.\check-mongodb.ps1
```

Should show MongoDB is running.

If not, see INSTALL_MONGODB_NOW.md

---

### Step 4: Test Configuration

```powershell
python -c "from app.core.config import settings; print('Config OK')"
```

Should print: `Config OK`

---

### Step 5: Test Database Connection

```powershell
python -c "from motor.motor_asyncio import AsyncIOMotorClient; client = AsyncIOMotorClient('mongodb://localhost:27017'); print('MongoDB connection OK')"
```

Should print: `MongoDB connection OK`

---

### Step 6: Start Backend

```powershell
uvicorn app.main:app --reload --port 5000
```

Expected output:
```
INFO:     Will watch for changes in these directories: ['D:\\skillsync\\backend']
INFO:     Uvicorn running on http://127.0.0.1:5000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
✓ Initial users seeded successfully
INFO:     Application startup complete.
```

---

## Environment Issues

### .env File Not Loading

**Check file exists**:
```powershell
Test-Path .env
```

**Check file contents**:
```powershell
Get-Content .env
```

Should contain:
```
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=your_super_secret_key_change_this_in_production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
```

---

## MongoDB Issues

### MongoDB Won't Start

**Check if installed**:
```powershell
Test-Path "C:\Program Files\MongoDB\Server"
```

**Check service**:
```powershell
Get-Service MongoDB
```

**View logs**:
```powershell
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 50
```

**Reinstall MongoDB**:
1. Uninstall current MongoDB
2. Download fresh installer
3. Run as Administrator
4. Choose "Complete" + "Install as Service"

---

## Network Issues

### Can't Access API from Frontend

**Check backend is running**:
```powershell
curl http://localhost:5000/api/health
```

**Check CORS**:
- Open browser console
- Look for CORS errors
- Verify frontend URL is in `allow_origins` in `app/main.py`

**Check firewall**:
- Windows Firewall might be blocking port 5000
- Add exception for Python or uvicorn

---

## Performance Issues

### Slow API Responses

**Check MongoDB indexes**:
```javascript
// In mongosh
use skillsync_db
db.users.getIndexes()
db.swaps.getIndexes()
```

**Check database size**:
```javascript
// In mongosh
use skillsync_db
db.stats()
```

**Restart services**:
```powershell
net stop MongoDB
net start MongoDB
```

---

## Getting Help

If you're still stuck:

1. **Run diagnostics**:
   ```powershell
   python test_imports.py > diagnostics.txt
   .\check-mongodb.ps1 >> diagnostics.txt
   ```

2. **Check logs**:
   - Backend logs (in terminal)
   - MongoDB logs (C:\Program Files\MongoDB\Server\7.0\log\mongod.log)

3. **Verify setup**:
   - Python version: `python --version`
   - Dependencies: `pip list`
   - MongoDB status: `Get-Service MongoDB`
   - Port availability: `netstat -an | findstr :5000`

4. **Review documentation**:
   - INSTALL_MONGODB_NOW.md
   - MONGODB_WINDOWS_SETUP.md
   - VERIFICATION.md

---

## Clean Restart

If everything is broken, try a clean restart:

```powershell
# 1. Stop everything
taskkill /F /IM python.exe
net stop MongoDB

# 2. Clean Python cache
Remove-Item -Recurse -Force __pycache__
Remove-Item -Recurse -Force app\__pycache__

# 3. Reinstall dependencies
pip uninstall -y -r requirements.txt
pip install -r requirements.txt

# 4. Start MongoDB
net start MongoDB

# 5. Start backend
uvicorn app.main:app --reload --port 5000
```

---

## Quick Reference

```powershell
# Check everything
python test_imports.py
.\check-mongodb.ps1

# Start MongoDB
net start MongoDB

# Start backend
uvicorn app.main:app --reload --port 5000

# Or use startup script
.\start-backend.ps1

# Test API
curl http://localhost:5000/api/health

# View API docs
# Open browser: http://localhost:5000/docs
```
