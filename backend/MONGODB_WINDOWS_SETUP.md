# MongoDB Installation Guide for Windows

## Quick Solution - Option 1: MongoDB Community Edition (Recommended)

### Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **Important**: Check "Install MongoDB as a Service"
4. **Important**: Check "Install MongoDB Compass" (optional GUI tool)
5. Click "Next" and "Install"
6. Wait for installation to complete

### Step 3: Verify Installation

Open a **NEW** PowerShell window (as Administrator):

```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# Should show:
# Status   Name               DisplayName
# ------   ----               -----------
# Running  MongoDB            MongoDB Server
```

### Step 4: Test MongoDB Connection

```powershell
# Connect to MongoDB
mongosh

# Or if mongosh is not found, try:
"C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 7.0.x
```

Type `exit` to quit.

---

## Alternative - Option 2: MongoDB Atlas (Cloud - No Installation)

If you prefer not to install MongoDB locally:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0)
4. Get your connection string
5. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsync_db
   ```

---

## Troubleshooting Windows Installation

### Error: "Access is denied"

**Solution**: Run PowerShell as Administrator

1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Click "Yes" on the UAC prompt
4. Try the command again

### MongoDB Service Not Starting

**Option A: Start Manually as Administrator**

```powershell
# Open PowerShell as Administrator
net start MongoDB
```

**Option B: Start from Services**

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB Server" in the list
4. Right-click → Start

**Option C: Check if MongoDB is installed**

```powershell
# Check if MongoDB is installed
Test-Path "C:\Program Files\MongoDB\Server"

# If False, MongoDB is not installed
```

### MongoDB Not Found After Installation

**Add MongoDB to PATH:**

1. Press `Win + X` → System
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find "Path"
5. Click "Edit"
6. Click "New"
7. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
8. Click "OK" on all dialogs
9. **Close and reopen PowerShell**

### Port 27017 Already in Use

```powershell
# Check what's using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

---

## Quick Start Commands (After Installation)

### Start MongoDB (if not running as service)

```powershell
# As Administrator
net start MongoDB
```

### Stop MongoDB

```powershell
# As Administrator
net stop MongoDB
```

### Check MongoDB Status

```powershell
Get-Service MongoDB
```

### Connect to MongoDB Shell

```powershell
mongosh
```

### View MongoDB Logs

```powershell
# Default log location
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 50
```

---

## Alternative: Run MongoDB Without Installation (Portable)

If you can't install MongoDB as a service:

### Step 1: Download MongoDB ZIP

1. Go to: https://www.mongodb.com/try/download/community
2. Select "ZIP" package instead of MSI
3. Download and extract to `C:\mongodb`

### Step 2: Create Data Directory

```powershell
New-Item -ItemType Directory -Path "C:\mongodb\data"
```

### Step 3: Start MongoDB Manually

```powershell
# Navigate to MongoDB bin folder
cd "C:\mongodb\bin"

# Start MongoDB
.\mongod.exe --dbpath "C:\mongodb\data"
```

Keep this window open while using the backend.

### Step 4: Connect (in a new PowerShell window)

```powershell
cd "C:\mongodb\bin"
.\mongosh.exe
```

---

## Verify MongoDB is Working

### Test 1: Service Status

```powershell
Get-Service MongoDB
# Should show "Running"
```

### Test 2: Connection

```powershell
mongosh
# Should connect successfully
```

### Test 3: Create Test Data

```javascript
// In mongosh
use testdb
db.testcollection.insertOne({test: "Hello MongoDB"})
db.testcollection.find()
// Should show the inserted document
```

### Test 4: Backend Connection

```powershell
# In backend folder
cd D:\skillsync\backend
python -c "from motor.motor_asyncio import AsyncIOMotorClient; client = AsyncIOMotorClient('mongodb://localhost:27017'); print('Connected!' if client else 'Failed')"
```

---

## Start Backend After MongoDB is Running

```powershell
# Make sure you're in the backend folder
cd D:\skillsync\backend

# Install dependencies (if not done)
pip install -r requirements.txt

# Start the backend
uvicorn app.main:app --reload --port 5000
```

You should see:
```
✓ Initial users seeded successfully
INFO:     Application startup complete.
```

---

## Common Issues and Solutions

### Issue: "MongoDB service not found"

**Solution**: MongoDB is not installed. Follow Option 1 above.

### Issue: "Connection refused"

**Solution**: MongoDB is not running. Start it:
```powershell
net start MongoDB
```

### Issue: "Access denied" when starting service

**Solution**: Run PowerShell as Administrator:
1. Right-click PowerShell
2. Select "Run as Administrator"

### Issue: MongoDB Compass won't connect

**Solution**: Use connection string:
```
mongodb://localhost:27017
```

---

## Recommended: MongoDB Compass (GUI Tool)

MongoDB Compass provides a visual interface for your database.

**If not installed during MongoDB installation:**

1. Download from: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017`
4. You can now visually browse your `skillsync_db` database

---

## Next Steps After MongoDB is Running

1. ✅ MongoDB is installed and running
2. ✅ Test connection with `mongosh`
3. ⏭️ Start the backend: `uvicorn app.main:app --reload --port 5000`
4. ⏭️ Backend will automatically seed demo users
5. ⏭️ Test API at `http://localhost:5000/docs`

---

## Need Help?

If you're still having issues:

1. Check MongoDB is running: `Get-Service MongoDB`
2. Check logs: `Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 20`
3. Try MongoDB Atlas (cloud option) instead
4. Restart your computer after installation

---

## Summary

**Easiest Path:**
1. Download MongoDB MSI installer
2. Run as Administrator
3. Choose "Complete" installation
4. Check "Install as Service"
5. Finish installation
6. MongoDB will start automatically
7. Start your backend!

**Cloud Alternative:**
- Use MongoDB Atlas (free tier)
- No local installation needed
- Update MONGO_URI in .env
