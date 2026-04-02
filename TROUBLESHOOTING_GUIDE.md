# SkillSync - Troubleshooting "Failed to Fetch" Error

## Current Status
✅ Backend server is running on http://localhost:5000
✅ Frontend server is running on http://localhost:5173
✅ MongoDB is connected and working
✅ API endpoints tested and working from command line

## The Problem
You're seeing "failed to fetch" error when trying to login or signup from the browser.

## Possible Causes & Solutions

### 1. Browser Cache Issue
**Solution:** Clear your browser cache and hard refresh
- Chrome/Edge: Press `Ctrl + Shift + Delete` or `Ctrl + F5`
- Firefox: Press `Ctrl + Shift + Delete`
- Or open in Incognito/Private mode

### 2. CORS Issue (Most Likely)
**Check:** Open browser DevTools (F12) → Console tab
**Look for:** Red error messages mentioning "CORS" or "Access-Control-Allow-Origin"

**If you see CORS errors:**
The backend CORS is configured for `http://localhost:5173` but your browser might be using a different URL.

**Solution:** Check what URL your browser is using:
- If it's `http://127.0.0.1:5173` instead of `http://localhost:5173`, update backend CORS
- If it's a different port, update backend CORS

### 3. Network/Firewall Issue
**Check:** Windows Firewall might be blocking connections

**Solution:**
```powershell
# Allow Python through firewall
netsh advfirewall firewall add rule name="Python" dir=in action=allow program="C:\Users\YourUsername\AppData\Local\Programs\Python\Python311\python.exe" enable=yes
```

### 4. Backend Not Responding
**Test:** Open http://localhost:5000 in your browser
- Should see: `{"message":"SkillSync API is running"}`
- If not, backend crashed

**Solution:** Restart backend server

### 5. Frontend Using Wrong API URL
**Check:** Open browser DevTools → Network tab → Try to login → Look at the request URL

**Should be:** `http://localhost:5000/api/auth/login`
**If different:** Frontend config is wrong

## Step-by-Step Debugging

### Step 1: Test Backend Directly
Open this file in your browser: `test_frontend_connection.html`
- Click "Test Root Endpoint" - should succeed
- Click "Test Health Endpoint" - should succeed
- Click "Test Login" - should succeed

If these work, backend is fine. Problem is in frontend.

### Step 2: Check Browser Console
1. Open http://localhost:5173 in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Try to login
5. Look for error messages

**Common errors:**
- `Failed to fetch` = Network/CORS issue
- `CORS policy` = CORS configuration problem
- `404 Not Found` = Wrong API URL
- `500 Internal Server Error` = Backend error

### Step 3: Check Network Tab
1. Open DevTools → Network tab
2. Try to login
3. Look for the login request
4. Click on it to see details

**Check:**
- Request URL: Should be `http://localhost:5000/api/auth/login`
- Status: Should be 200 (if credentials correct) or 401 (if wrong)
- Response: Should have user data

### Step 4: Test with cURL
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123"}'
```

If this works but browser doesn't, it's a CORS issue.

## Quick Fixes

### Fix 1: Restart Both Servers
```bash
# Stop both servers (Ctrl+C in their terminals)
# Then restart:

# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload --port 5000

# Terminal 2 - Frontend  
npm run dev
```

### Fix 2: Update CORS to Allow All Origins (Development Only!)
Edit `backend/app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (dev only!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then restart backend server.

### Fix 3: Use 127.0.0.1 Instead of localhost
If CORS issues persist, try accessing:
- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:5000

And update `src/config/api.config.js`:
```javascript
development: {
    apiUrl: 'http://127.0.0.1:5000',
},
```

## Test Accounts

### Regular User
- Email: testuser@example.com
- Password: password123

### Admin User
- Email: admin@skillsync.com
- Password: admin123

## Still Not Working?

### Collect Debug Information
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to login
4. Take screenshot of any errors
5. Go to Network tab
6. Try to login again
7. Click on the failed request
8. Take screenshot of Headers and Response tabs

### Check Backend Logs
Look at the terminal where backend is running. Any errors there?

### Verify Environment
```powershell
# Check Python version
python --version  # Should be 3.8+

# Check Node version
node --version  # Should be 18+

# Check if MongoDB is running
Get-Service MongoDB

# Check if ports are in use
netstat -ano | findstr ":5000 :5173"
```

## Contact Information
If none of these solutions work, provide:
1. Screenshots of browser console errors
2. Screenshots of network tab
3. Backend terminal output
4. Operating system and browser version
