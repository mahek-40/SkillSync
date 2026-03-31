# Quick Reference Card

## 🚀 Start Backend (One Command)

```powershell
cd D:\skillsync\backend
.\start-backend.ps1
```

---

## 📋 Essential Commands

```powershell
# Test everything is working
python test_imports.py

# Check MongoDB status
.\check-mongodb.ps1

# Start backend manually
uvicorn app.main:app --reload --port 5000

# Test API
curl http://localhost:5000/api/health
```

---

## 🔧 MongoDB Commands

```powershell
# Start MongoDB (as Administrator)
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check status
Get-Service MongoDB

# Connect to MongoDB shell
mongosh
```

---

## 🌐 Important URLs

- **Backend API**: http://localhost:5000
- **API Docs (Swagger)**: http://localhost:5000/docs
- **API Docs (ReDoc)**: http://localhost:5000/redoc
- **Health Check**: http://localhost:5000/api/health

---

## 👤 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| alice@example.com | password123 | User |
| bob@example.com | password123 | User |
| admin@skillsync.com | admin123 | Admin |

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # Entry point
│   ├── api/routes/          # API endpoints
│   ├── core/                # Config & security
│   ├── db/                  # Database
│   ├── schemas/             # Data models
│   └── services/            # Business logic
├── .env                     # Environment variables
└── requirements.txt         # Dependencies
```

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not running | `net start MongoDB` (as Admin) |
| Dependencies missing | `pip install -r requirements.txt` |
| Port 5000 in use | Use `--port 5001` |
| Import errors | Run `python test_imports.py` |
| Can't find .env | Check `backend/.env` exists |

---

## 📚 Documentation Files

- **INSTALL_MONGODB_NOW.md** - Install MongoDB (start here!)
- **TROUBLESHOOTING.md** - Fix common issues
- **FIXED_ISSUES.md** - What was fixed
- **VERIFICATION.md** - Complete testing checklist
- **README.md** - Full documentation

---

## 🧪 Test API Endpoints

### Login
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"alice@example.com","password":"password123"}'
```

### Get Users
```powershell
curl http://localhost:5000/api/users
```

### Health Check
```powershell
curl http://localhost:5000/api/health
```

---

## ⚡ Quick Setup (First Time)

```powershell
# 1. Install dependencies
cd D:\skillsync\backend
pip install -r requirements.txt

# 2. Install MongoDB
# Download from: https://www.mongodb.com/try/download/community
# Run installer as Administrator

# 3. Start backend
.\start-backend.ps1

# 4. Test
curl http://localhost:5000/api/health
```

---

## 🔄 Daily Workflow

```powershell
# Morning: Start everything
cd D:\skillsync\backend
.\start-backend.ps1

# During development: Backend auto-reloads on file changes

# Evening: Stop (CTRL+C in terminal)
```

---

## 🐛 Debug Mode

```powershell
# Run with more verbose output
uvicorn app.main:app --reload --port 5000 --log-level debug

# Check all imports
python test_imports.py

# Check MongoDB
.\check-mongodb.ps1
```

---

## 📦 Dependencies

```
fastapi              # Web framework
uvicorn              # ASGI server
motor                # MongoDB async driver
pydantic             # Data validation
pydantic-settings    # Settings management
passlib[bcrypt]      # Password hashing
python-jose          # JWT tokens
python-dotenv        # Environment variables
```

---

## 🔐 Environment Variables

Located in `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=your_super_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
```

---

## 💡 Pro Tips

1. **Use the startup script**: `.\start-backend.ps1` checks everything
2. **Keep MongoDB running**: Set it as a Windows service
3. **Use API docs**: http://localhost:5000/docs for testing
4. **Check logs**: Terminal shows all requests and errors
5. **Auto-reload**: Backend restarts on code changes

---

## 🆘 Need Help?

1. Run diagnostics: `python test_imports.py`
2. Check MongoDB: `.\check-mongodb.ps1`
3. Read: `TROUBLESHOOTING.md`
4. Check: `FIXED_ISSUES.md`

---

## ✅ Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] MongoDB installed and running
- [ ] Backend starts without errors
- [ ] Can access http://localhost:5000/docs
- [ ] Can login with demo credentials
- [ ] API endpoints respond correctly

---

## 🎯 Success Indicators

When backend starts successfully, you'll see:

```
✓ Initial users seeded successfully
INFO: Application startup complete.
```

Then visit http://localhost:5000/docs and you should see the API documentation.

---

**Quick Start**: `.\start-backend.ps1` → http://localhost:5000/docs 🚀
