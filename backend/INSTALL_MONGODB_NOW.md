# Install MongoDB Right Now - Quick Guide

## Your Current Situation

You got these errors:
- `choco` command not found (Chocolatey not installed)
- `Access is denied` (Need Administrator privileges)

## Solution: Direct MongoDB Installation (5 minutes)

### Step 1: Download MongoDB (1 minute)

1. **Click this link**: https://www.mongodb.com/try/download/community
2. You'll see a download page
3. Make sure these are selected:
   - **Version**: 7.0.x (or latest)
   - **Platform**: Windows
   - **Package**: msi
4. Click the green **"Download"** button
5. Wait for `mongodb-windows-x86_64-7.0.x-signed.msi` to download

### Step 2: Install MongoDB (2 minutes)

1. **Find the downloaded file** (usually in Downloads folder)
2. **Right-click** the `.msi` file
3. Select **"Run as administrator"**
4. Click **"Yes"** on the security prompt
5. In the installer:
   - Click **"Next"**
   - Accept license → **"Next"**
   - Choose **"Complete"** → **"Next"**
   - **IMPORTANT**: Make sure **"Install MongoDB as a Service"** is CHECKED ✓
   - **IMPORTANT**: Make sure **"Run service as Network Service user"** is selected
   - Click **"Next"**
   - (Optional) Uncheck "Install MongoDB Compass" if you want faster installation
   - Click **"Next"**
   - Click **"Install"**
   - Wait for installation (1-2 minutes)
   - Click **"Finish"**

### Step 3: Verify Installation (1 minute)

1. **Close your current PowerShell window**
2. **Open a NEW PowerShell window AS ADMINISTRATOR**:
   - Press `Win + X`
   - Click **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**
   - Click **"Yes"** on the prompt

3. **Run this command**:
```powershell
Get-Service MongoDB
```

You should see:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

If Status is "Running" → **SUCCESS! MongoDB is installed and running!**

### Step 4: Test Connection (30 seconds)

In the same PowerShell (as Admin), run:

```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 7.0.x
```

Type `exit` to quit mongosh.

### Step 5: Start Your Backend (30 seconds)

Now you can start the backend:

```powershell
cd D:\skillsync\backend
uvicorn app.main:app --reload --port 5000
```

You should see:
```
✓ Initial users seeded successfully
INFO:     Application startup complete.
```

**Done! Your backend is running!** 🎉

Visit: http://localhost:5000/docs

---

## If MongoDB Service Didn't Start Automatically

If `Get-Service MongoDB` shows "Stopped":

```powershell
# Start MongoDB (as Administrator)
net start MongoDB

# Check again
Get-Service MongoDB
```

---

## Alternative: Use MongoDB Atlas (Cloud - No Installation)

If you don't want to install MongoDB locally:

### Step 1: Create Free Account (2 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose "Free" tier (M0)
4. Select a cloud provider (AWS recommended)
5. Choose a region close to you
6. Click "Create Cluster"
7. Wait 3-5 minutes for cluster creation

### Step 2: Get Connection String (1 minute)

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Replace `<password>` with your actual password

### Step 3: Update Backend Config (30 seconds)

Edit `D:\skillsync\backend\.env`:

```env
MONGO_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/skillsync_db
```

### Step 4: Start Backend

```powershell
cd D:\skillsync\backend
uvicorn app.main:app --reload --port 5000
```

**Done! Using cloud MongoDB!** ☁️

---

## Troubleshooting

### "Access is denied" Error

**Solution**: Run PowerShell as Administrator
1. Press `Win + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. Click "Yes"

### MongoDB Service Not Found

**Solution**: MongoDB not installed correctly
- Reinstall MongoDB
- Make sure to check "Install as Service" during installation

### Port 27017 Already in Use

**Solution**: Something else is using the port
```powershell
# Find what's using port 27017
netstat -ano | findstr :27017

# Kill the process (replace 1234 with actual PID)
taskkill /PID 1234 /F

# Start MongoDB again
net start MongoDB
```

### Can't Connect to MongoDB

**Solution**: Check if MongoDB is running
```powershell
# Check service status
Get-Service MongoDB

# If stopped, start it
net start MongoDB
```

---

## Quick Commands Reference

```powershell
# Check MongoDB status
Get-Service MongoDB

# Start MongoDB (as Admin)
net start MongoDB

# Stop MongoDB (as Admin)
net stop MongoDB

# Connect to MongoDB shell
mongosh

# Check if port is listening
netstat -an | findstr :27017

# Start backend
cd D:\skillsync\backend
uvicorn app.main:app --reload --port 5000
```

---

## Need More Help?

Run this diagnostic script:

```powershell
cd D:\skillsync\backend
.\check-mongodb.ps1
```

This will check your MongoDB installation and tell you exactly what's wrong.

---

## Summary

**Recommended Path** (Local Installation):
1. ✅ Download MongoDB MSI from mongodb.com
2. ✅ Run installer as Administrator
3. ✅ Choose "Complete" + "Install as Service"
4. ✅ Verify with `Get-Service MongoDB`
5. ✅ Start backend with `uvicorn app.main:app --reload --port 5000`

**Alternative Path** (Cloud):
1. ✅ Sign up for MongoDB Atlas (free)
2. ✅ Create free cluster
3. ✅ Get connection string
4. ✅ Update `.env` file
5. ✅ Start backend

Both work perfectly! Choose what's easier for you.
