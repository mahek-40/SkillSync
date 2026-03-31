# 🚀 SkillSync

<div align="center">

<p align="center">
  <img src="src/assets/logo.png" alt="SkillSync Logo" width="200"/>
</p>

[![GitHub stars](https://img.shields.io/github/stars/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/network)
[![GitHub issues](https://img.shields.io/github/issues/mahek-40/SkillSync?style=for-the-badge&logo=github)](https://github.com/mahek-40/SkillSync/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

**A modern platform for seamless skill exchange and collaboration**

[Live Demo](#) • [Report Bug](https://github.com/mahek-40/SkillSync/issues) • [Request Feature](https://github.com/mahek-40/SkillSync/issues)

</div>

---

## 📖 About The Project

SkillSync is a full-stack web application that connects individuals who want to exchange skills. Whether you're a developer looking to learn design, or a musician wanting to understand coding, SkillSync makes it easy to find the perfect skill-swap partner.

### ✨ Key Features

- 🎯 **Skill Discovery** - Browse and search for users offering specific skills
- 👤 **User Profiles** - Create detailed profiles showcasing your skills and interests
- 🤝 **Skill Exchange** - Send and receive skill swap requests
- 🔔 **Real-time Notifications** - Get notified when someone wants to swap skills with you
- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 📊 **Admin Dashboard** - Comprehensive admin panel for platform management
- 📱 **Responsive Design** - Seamless experience across all devices
- ⚡ **Real-time Updates** - Live data synchronization with MongoDB

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0-000000?style=for-the-badge)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Motor](https://img.shields.io/badge/Motor-3.3-13AA52?style=for-the-badge)

### Additional Tools
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons
- **React Toastify** - Toast notifications
- **Pydantic** - Data validation
- **Passlib** - Password hashing (bcrypt)
- **Python-JOSE** - JWT token handling

---

## 📁 Project Structure

```
SkillSync/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # Application entry point
│   │   ├── api/               # API routes
│   │   │   ├── deps.py        # Dependencies
│   │   │   └── routes/        # Route handlers
│   │   │       ├── auth_routes.py
│   │   │       ├── user_routes.py
│   │   │       ├── swap_routes.py
│   │   │       └── notification_routes.py
│   │   ├── core/              # Core functionality
│   │   │   ├── config.py      # Configuration
│   │   │   └── security.py    # Security utilities
│   │   ├── db/                # Database
│   │   │   └── database.py    # MongoDB connection
│   │   ├── schemas/           # Pydantic models
│   │   │   ├── user_schema.py
│   │   │   ├── auth_schema.py
│   │   │   └── swap_schema.py
│   │   └── services/          # Business logic
│   │       └── auth_service.py
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── start-backend.ps1      # Startup script
│
├── src/                       # React Frontend
│   ├── assets/                # Static assets
│   ├── components/            # React components
│   │   ├── common/            # Shared components
│   │   ├── features/          # Feature-specific components
│   │   ├── landing/           # Landing page components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # UI components
│   ├── config/                # Configuration
│   │   └── api.config.js      # API configuration
│   ├── pages/                 # Page components
│   │   ├── admin/             # Admin pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── exchange/          # Exchange pages
│   │   ├── notifications/     # Notification pages
│   │   ├── profile/           # Profile pages
│   │   ├── public/            # Public pages
│   │   └── swaps/             # Swap pages
│   ├── services/              # API services
│   │   ├── api.js             # API client
│   │   └── authService.js     # Auth service
│   ├── store/                 # State management
│   │   └── authStore.js       # Auth store (Zustand)
│   ├── styles/                # Global styles
│   ├── utils/                 # Utility functions
│   └── main.jsx               # Application entry
│
├── public/                    # Public assets
├── .env.development           # Development environment
├── .env.production            # Production environment
├── package.json               # Node dependencies
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v7.0 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/mahek-40/SkillSync.git
cd SkillSync
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit backend/.env with your settings

# Start MongoDB (if not running)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Start the backend server
python -m uvicorn app.main:app --reload --port 5000
```

The backend will be available at `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## ⚙️ Environment Variables

### Backend (.env)

Create a `backend/.env` file:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017

# Security
SECRET_KEY=your_super_secret_key_change_in_production
ALGORITHM=HS256

# Token Expiration
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### Frontend (.env.development)

Create a `.env.development` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

### Frontend (.env.production)

Create a `.env.production` file:

```env
# API Configuration
VITE_API_URL=https://your-production-api.com
```

---

## 🎯 How to Run

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload --port 5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 5000 --workers 4
```

**Frontend:**
```bash
npm run build
npm run preview
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile

### Swaps
- `POST /api/swaps` - Create swap request
- `GET /api/swaps/user/{id}` - Get user's swaps
- `PUT /api/swaps/{id}/status` - Update swap status

### Notifications
- `GET /api/notifications/user/{id}` - Get user notifications
- `PUT /api/notifications/{id}/read` - Mark notification as read

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation (ReDoc)

---

## 🗄️ Database Schema

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

---

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Set environment variables:
```
VITE_API_URL=https://your-backend-api.com
```

### Backend Deployment (Railway/Render/AWS)

1. Set up MongoDB Atlas or use your MongoDB instance

2. Configure environment variables on your hosting platform

3. Deploy using:
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Recommended Hosting

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Railway, Render, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas (Free tier available)

---

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Test Backend
```bash
cd backend
python test_imports.py
```

### Test API
Visit `http://localhost:5000/docs` for interactive API testing

---

## 📸 Screenshots

<!-- Add your screenshots here -->
```
[Landing Page]
[Dashboard]
[Skill Exchange]
[User Profile]
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Authors

**M & A**
- GitHub: [@mahek-40](https://github.com/mahek-40)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [FastAPI](https://fastapi.tiangolo.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [M & A](https://github.com/mahek-40)

</div>
