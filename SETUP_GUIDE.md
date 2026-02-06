# SkillSync - Complete Setup Guide

This guide will walk you through setting up the SkillSync frontend from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- ✅ Node.js v18.0.0 or higher
- ✅ npm v9.0.0 or higher (or yarn/pnpm)
- ✅ Code editor (VS Code recommended)
- ✅ Git installed
- ✅ Terminal/Command prompt access

**Check your versions:**
```bash
node --version    # Should be v18+ 
npm --version     # Should be v9+
```

## 🚀 Step-by-Step Setup

### Step 1: Create Project Directory

```bash
# Create project folder
mkdir skillsync
cd skillsync

# Initialize Git (optional but recommended)
git init
```

### Step 2: Copy Configuration Files

Copy all the files I've created into your project directory following this structure:

```
skillsync/
├── .env.example
├── .eslintrc.cjs
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── SETUP_GUIDE.md (this file)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── ui/
    │   │   ├── Avatar.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Select.jsx
    │   │   └── Textarea.jsx
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── PublicLayout.jsx
    │   │   └── DashboardLayout.jsx
    │   ├── common/
    │   │   ├── EmptyState.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── SkeletonLoader.jsx
    │   └── features/
    │       └── skills/
    │           └── SkillCard.jsx
    ├── pages/
    │   ├── public/
    │   │   └── LandingPage.jsx
    │   ├── auth/
    │   │   ├── LoginPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── dashboard/
    │   │   └── DashboardHome.jsx
    │   ├── exchange/
    │   │   └── ExchangePage.jsx
    │   ├── swaps/
    │   │   └── SwapsPage.jsx
    │   ├── profile/
    │   │   └── ProfilePage.jsx
    │   ├── notifications/
    │   │   └── NotificationsPage.jsx
    │   └── admin/
    │       └── AdminDashboard.jsx
    ├── routes/
    │   ├── ProtectedRoute.jsx
    │   └── AdminRoute.jsx
    ├── services/
    │   ├── api.js
    │   └── authService.js
    ├── store/
    │   └── authStore.js
    ├── utils/
    │   └── cn.js
    └── styles/
        └── globals.css
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all packages defined in `package.json`:
- React & React DOM
- React Router
- Zustand (state management)
- React Query (server state)
- React Hook Form
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- React Toastify
- Axios
- And more...

**Installation should take 1-2 minutes.**

### Step 4: Environment Configuration

```bash
# Create .env file from template
cp .env.example .env

# Edit .env file (use nano, vim, or your code editor)
nano .env
```

**Update these values:**
```bash
VITE_API_URL=http://localhost:5000/api  # Your backend API URL
VITE_APP_NAME=SkillSync
VITE_APP_URL=http://localhost:3000
```

### Step 5: Logo Setup (Optional)

Create or add your logo files:

```bash
# Create public directory if it doesn't exist
mkdir -p public

# Add your logo files
# public/logo.svg      - Main logo
# public/favicon.ico   - Browser tab icon
```

**Generate logo using AI** (as per your prompt):
1. Use DALL-E, Midjourney, or Firefly
2. Use the logo prompt provided
3. Save as SVG/PNG in `public/` folder

### Step 6: Verify File Structure

Run this command to check if all files are in place:

```bash
# On macOS/Linux
find src -type f -name "*.jsx" | wc -l  
# Should show ~30+ files

# On Windows (PowerShell)
(Get-ChildItem -Path src -Recurse -Filter *.jsx).Count
```

### Step 7: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 8: Open in Browser

Visit `http://localhost:3000` - You should see the SkillSync landing page! 🎉

## 🔧 Post-Setup Configuration

### Configure VS Code (Recommended)

Install these extensions:
1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **ESLint**
4. **Prettier**

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

### Set Up Prettier (Optional)

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Configure Git Ignore

Create `.gitignore`:
```
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Editor files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/
```

## 🎨 Customization Guide

### Change Brand Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'brand-purple': '#8E7DBE',  // Change to your primary color
  'brand-mint': '#A6D6D6',    // Change to your secondary color
  // etc...
}
```

Then update `src/styles/globals.css` CSS variables to match.

### Add Custom Fonts

1. **Import in `src/styles/globals.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');
```

2. **Update `tailwind.config.js`:**
```javascript
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
}
```

### Modify Component Styles

All UI components are in `src/components/ui/`.
Example - Change button styles:

**Edit `src/components/ui/Button.jsx`:**
```javascript
const variants = {
  primary: `bg-your-color text-white hover:bg-your-color-dark`,
  // ...
}
```

## 🔌 Connect to Backend API

### Option 1: Use Mock Data (Default)

The app currently uses mock data in pages. Perfect for development!

### Option 2: Connect Real API

1. **Update `.env`:**
```bash
VITE_API_URL=https://your-api.com/api
```

2. **Remove mock data from pages**

For example, in `ExchangePage.jsx`:
```javascript
// OLD: const mockUsers = [...]

// NEW: Use React Query
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: userService.getAll
});
```

3. **Create user service** (`src/services/userService.js`):
```javascript
import api from './api';

export const userService = {
  getAll: async () => {
    return await api.get('/users');
  },
  // ...
};
```

## 🐛 Common Issues & Solutions

### Issue 1: Module Not Found Errors

**Error:** `Cannot find module '@/components/ui/Button'`

**Solution:**
```bash
# Check vite.config.js has path aliases configured
# Restart dev server
npm run dev
```

### Issue 2: Tailwind Styles Not Working

**Error:** Classes not applying

**Solution:**
```bash
# Verify tailwind.config.js content paths
# Check globals.css has Tailwind imports
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Issue 3: React Router 404

**Error:** Direct URL navigation shows 404

**Solution:** Configure your hosting platform:

**Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Issue 4: Build Fails

**Error:** Build process errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## 📚 Learning Resources

### React & React Router
- [React Official Docs](https://react.dev)
- [React Router Documentation](https://reactrouter.com)

### Tailwind CSS
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### State Management
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query Guide](https://tanstack.com/query/latest)

## 🎯 Next Steps

1. ✅ Project is set up and running
2. 📱 Test all pages and features
3. 🔌 Connect to your backend API
4. 🎨 Customize branding (logo, colors)
5. 🧪 Add unit tests (optional)
6. 🚀 Deploy to production

## 💡 Pro Tips

1. **Use React DevTools** - Install browser extension for debugging
2. **Enable Hot Module Replacement** - Vite does this automatically
3. **Use ESLint** - Catch errors early
4. **Component Library** - Reuse `components/ui/` across projects
5. **Git Commits** - Commit frequently with clear messages

## 🎉 Success Checklist

Before considering setup complete:

- [ ] Dev server runs without errors
- [ ] Landing page loads correctly
- [ ] Can navigate between pages
- [ ] Login/Signup forms render
- [ ] Dashboard loads (with mock data)
- [ ] Exchange page shows user cards
- [ ] Swap requests page works
- [ ] Profile page is editable
- [ ] Notifications display
- [ ] Admin dashboard accessible (for admin users)

## 📞 Support

If you encounter issues:

1. **Check this guide** - Most solutions are here
2. **Search error message** - Google/Stack Overflow
3. **GitHub Issues** - Check existing issues
4. **Community Discord** - Ask for help (if available)

---

**Happy Coding! 🚀**

Remember: This is a production-ready frontend. Take time to understand the architecture, customize it to your needs, and build something amazing!

**SkillSync Team**