# SkillSync Backend API

Production-ready FastAPI backend for the SkillSync skill exchange platform.

## Tech Stack

- **Framework**: FastAPI
- **Database**: MongoDB
- **Database Driver**: Motor (async)
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Pydantic

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── core/
│   │   ├── config.py        # Configuration and environment variables
│   │   └── security.py      # JWT and password hashing utilities
│   ├── db/
│   │   └── database.py      # MongoDB connection and initialization
│   ├── models/              # (Not used - using schemas directly)
│   ├── schemas/
│   │   ├── user_schema.py   # User Pydantic models
│   │   ├── auth_schema.py   # Authentication Pydantic models
│   │   └── swap_schema.py   # Swap Pydantic models
│   ├── services/
│   │   └── auth_service.py  # Business logic for authentication
│   └── api/
│       ├── deps.py          # Dependency injection (auth middleware)
│       └── routes/
│           ├── auth_routes.py         # /api/auth endpoints
│           ├── user_routes.py         # /api/users endpoints
│           ├── swap_routes.py         # /api/swaps endpoints
│           └── notification_routes.py # /api/notifications endpoints
├── requirements.txt
├── .env
└── README.md
```

## Installation

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Install and start MongoDB:
```bash
# On Windows with Chocolatey
choco install mongodb

# On macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# On Linux
sudo apt-get install mongodb
```

3. Start MongoDB:
```bash
# Windows
net start MongoDB

# macOS/Linux
brew services start mongodb-community
# or
sudo systemctl start mongod
```

4. Configure environment variables:
Edit `.env` file and update:
- `MONGO_URI`: Your MongoDB connection string
- `SECRET_KEY`: Generate a secure key (use `openssl rand -hex 32`)

## Running the Server

Start the development server on port 5000:

```bash
cd backend
uvicorn app.main:app --reload --port 5000
```

The API will be available at: `http://localhost:5000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (excluding current user and admins)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user profile

### Swaps
- `POST /api/swaps` - Create skill swap request
- `GET /api/swaps/user/{user_id}` - Get all swaps for a user
- `PUT /api/swaps/{swap_id}/status` - Update swap status

### Notifications
- `GET /api/notifications/user/{user_id}` - Get user notifications
- `PUT /api/notifications/{notification_id}/read` - Mark notification as read

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String | null,
  location: String,
  bio: String,
  availability: [String],
  skills_offered: [String],
  skills_wanted: [String],
  experience_level: String,
  role: "user" | "admin",
  created_at: DateTime
}
```

### Swaps Collection
```javascript
{
  _id: ObjectId,
  requester_id: String,
  receiver_id: String,
  requester_skills: [String],
  receiver_skills: [String],
  status: "pending" | "accepted" | "rejected" | "completed",
  created_at: DateTime,
  updated_at: DateTime
}
```

### Notifications Collection
```javascript
{
  _id: ObjectId,
  user_id: String,
  type: String,
  message: String,
  swap_id: String,
  read: Boolean,
  created_at: DateTime
}
```

## Initial Data

The application automatically seeds initial users on first startup:
- User: `alice@example.com` / `password123`
- User: `bob@example.com` / `password123`
- Admin: `admin@skillsync.com` / `admin123`

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with dependency injection
- CORS configuration for frontend integration
- Input validation with Pydantic
- MongoDB injection prevention

## Frontend Integration

The backend is configured to work with the React frontend running on:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Alternative)

All API endpoints are prefixed with `/api` to match frontend expectations.

## Production Deployment

Before deploying to production:

1. Generate a strong SECRET_KEY:
```bash
openssl rand -hex 32
```

2. Update MONGO_URI to production database

3. Configure proper CORS origins in `app/main.py`

4. Use a production ASGI server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --workers 4
```

5. Set up environment variables securely (don't commit .env)

6. Enable HTTPS/TLS

7. Set up MongoDB authentication and access control

## Development

To add new endpoints:

1. Create schema in `app/schemas/`
2. Add business logic in `app/services/`
3. Create route in `app/api/routes/`
4. Register router in `app/main.py`

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify MongoDB port (default: 27017)

**Import Errors:**
- Ensure you're in the backend directory
- Check Python path includes backend folder
- Reinstall requirements: `pip install -r requirements.txt`

**CORS Errors:**
- Verify frontend URL in CORS middleware
- Check browser console for specific CORS error
- Ensure credentials are included in frontend requests
