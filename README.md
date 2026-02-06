# SkillSync - Skill Exchange Platform

![SkillSync Banner](https://via.placeholder.com/1200x400/8E7DBE/FFFFFF?text=SkillSync+-+Exchange+Skills,+Grow+Together)

> A production-ready skill-sharing platform built with React.js, enabling users to exchange skills without money in a trusted, community-driven environment.

## 🌟 Features

### For Users
- **Profile Management** - Create detailed profiles with skills offered and wanted
- **Smart Matching** - Browse and search users by skills, location, and availability
- **Swap Requests** - Send, accept, reject, and cancel skill exchange requests
- **Real-time Status** - Track swap requests from pending to completed
- **Ratings & Reviews** - Build reputation through peer feedback
- **Messaging** - Communicate directly with swap partners
- **Dashboard** - Centralized view of all your activities

### For Admins
- **User Moderation** - Ban/unban users who violate policies
- **Content Moderation** - Review and approve skill descriptions
- **Swap Monitoring** - Monitor all platform swaps
- **Analytics** - Track user activity and platform metrics
- **Reports** - Download user activity and feedback logs

## 🎨 Design System

### Color Palette
```css
/* Core Brand Colors */
--bg-primary: #F4F8D3;      /* Light Yellow - Main backgrounds */
--brand-purple: #8E7DBE;     /* Purple - Primary CTAs */
--brand-mint: #A6D6D6;       /* Mint - Skill tags, highlights */
--brand-pink: #F7CFD8;       /* Pink - Warnings, cancel states */

/* Logo Gradient Colors */
--logo-mint: #A8E6CF;
--logo-lavender: #C7CEEA;
--logo-purple: #B19CD9;
--logo-peach: #FFB6C1;
--logo-teal: #8DD3DD;
```

## 🚀 Tech Stack

- **Frontend Framework:** React 18+ (Vite)
- **Routing:** React Router v6
- **State Management:** Zustand + React Query
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Validation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Toastify
- **HTTP Client:** Axios

## 📁 Project Structure

```
skillsync/
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   │   ├── features/        # Feature-specific components
│   │   └── common/          # Shared components
│   ├── pages/
│   │   ├── public/          # Public pages (Landing, Login, Signup)
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── exchange/        # Exchange/Match page
│   │   ├── swaps/           # Swap management
│   │   ├── profile/         # User profile
│   │   ├── notifications/   # Notifications
│   │   └── admin/           # Admin panel
│   ├── routes/              # Route guards and config
│   ├── services/            # API services
│   ├── store/               # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Backend API running (or mock data configured)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skillsync.git
cd skillsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your API URL and other configs
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔐 Authentication Flow

```
1. User Registration → Email Verification (optional)
2. Login → JWT Token → Store in Zustand + LocalStorage
3. Protected Routes → Check auth status
4. Logout → Clear token and state
```

## 🎯 Key User Flows

### Skill Exchange Flow
```
1. User creates profile with skills offered/wanted
2. Browse Exchange page to find matches
3. Send swap request → Recipient receives notification
4. Recipient accepts/rejects request
5. If accepted → Swap becomes active
6. After completion → Both users leave reviews
```

### Swap Request States
- **Pending** - Waiting for recipient's response
- **Accepted** - Both parties agreed, swap is active
- **Rejected** - Recipient declined the request
- **Cancelled** - Requester cancelled before acceptance
- **Completed** - Skill exchange finished successfully

## 🔌 API Integration

Replace mock data with actual API calls in:

```javascript
// src/services/authService.js
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },
  // ... other methods
};
```

### Expected API Endpoints

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id

GET    /api/swaps
POST   /api/swaps
PUT    /api/swaps/:id
DELETE /api/swaps/:id

GET    /api/reviews
POST   /api/reviews

GET    /api/notifications
PUT    /api/notifications/:id/read
```

## 🎨 Component Usage Examples

### Button Component
```jsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Get Started
</Button>
```

### Card Component
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>My Profile</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Modal Component
```jsx
import Modal from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={handleClose} title="Confirm Action">
  <p>Are you sure?</p>
</Modal>
```

## 🧪 Testing (Future Enhancement)

```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** - Automatic deployment from Git
- **Netlify** - Drag & drop or Git integration
- **AWS S3 + CloudFront** - Static hosting
- **Docker** - Containerized deployment

### Example Vercel Deployment
```bash
npm install -g vercel
vercel deploy --prod
```

## 🔧 Customization

### Change Color Palette
Edit `tailwind.config.js`:
```javascript
colors: {
  'brand-purple': '#YOUR_COLOR',
  // ... update other colors
}
```

### Add New Feature
1. Create page in `src/pages/`
2. Add route in `src/App.jsx`
3. Create components in `src/components/features/`
4. Add API service in `src/services/`

## 🐛 Troubleshooting

### Common Issues

**Issue:** Build fails with "Module not found"
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Styles not loading
```bash
# Solution: Ensure Tailwind is configured in postcss.config.js
# and imported in src/styles/globals.css
```

**Issue:** API calls failing
```bash
# Solution: Check .env file and VITE_API_URL
# Ensure CORS is enabled on backend
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a pull request

## 💬 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/skillsync/issues)
- Email: support@skillsync.com

## 🎉 Acknowledgments

- Design inspiration from modern SaaS platforms
- Built with ❤️ using React and Tailwind CSS
- Icons by Lucide React

---

**Made with passion by the SkillSync Team** 🚀