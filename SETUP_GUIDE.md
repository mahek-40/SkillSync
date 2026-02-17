# SkillSync Frontend - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- Zustand (state management)
- TanStack React Query
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Toastify
- Lucide React (icons)
- And more...

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Folder Structure Explained

### `/src/components`

**`/ui`** - Reusable UI primitives
- `Button.jsx` - Primary, secondary, ghost, danger variants
- `Card.jsx` - Card container with composable parts
- `Input.jsx` - Form input with label and validation
- `Badge.jsx` - Status badges and skill tags
- `Avatar.jsx` - User avatar with fallback initials
- `Modal.jsx` - Animated modal dialog
- `Select.jsx` - Dropdown select
- `Textarea.jsx` - Multi-line text input

**`/layout`** - Page layouts
- `Header.jsx` - Top navigation bar
- `Footer.jsx` - Site footer
- `PublicLayout.jsx` - Layout for public pages
- `DashboardLayout.jsx` - Layout for authenticated pages

**`/common`** - Shared components
- `EmptyState.jsx` - Empty list placeholders
- `LoadingSpinner.jsx` - Loading indicators
- `SkeletonLoader.jsx` - Skeleton screens

**`/features`** - Feature-specific components
- `skills/SkillCard.jsx` - User card with swap request

### `/src/pages`

Each page is organized by feature area:
- **Public**: Landing page
- **Auth**: Login and signup
- **Dashboard**: User dashboard
- **Exchange**: Skill matching
- **Profile**: User profile management
- **Swaps**: Swap request management
- **Notifications**: Notification center

### `/src/services`

**`api.js`** - Mock API layer using localStorage
- Simulates async API calls
- Persistent data storage
- Easy to replace with real API

**`authService.js`** - Authentication service
- Login/signup/logout
- Profile updates

### `/src/store`

**`authStore.js`** - Zustand store for authentication
- User state management
- Persistent login state
- Client-side auth logic

### `/src/routes`

Route guards for authentication:
- `ProtectedRoute.jsx` - Requires authentication
- `AdminRoute.jsx` - Requires admin role

### `/src/utils`

**`cn.js`** - Tailwind class name merger
- Combines clsx and tailwind-merge
- Handles class conflicts

## Development Workflow

### 1. Making Changes

The development server supports hot module replacement (HMR), so changes will reflect immediately in the browser.

### 2. Adding New Components

Follow the existing component structure:
```jsx
import { cn } from '../../utils/cn';

export function MyComponent({ className, ...props }) {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### 3. Adding New Pages

1. Create page component in appropriate `/src/pages/` subfolder
2. Add route in `/src/App.jsx`
3. Wrap with `ProtectedRoute` if authentication required

### 4. Working with Mock API

The mock API uses localStorage. To reset data:
1. Open browser DevTools
2. Application → Local Storage
3. Clear all SkillSync entries
4. Refresh page

## Design System

### Colors

Access via Tailwind classes:
- `bg-brand-green` - Primary brand color
- `bg-brand-mint` - Light background
- `text-neutral-900` - Dark text
- `text-neutral-600` - Secondary text

### Typography

Headings are automatically styled via globals.css:
- `<h1>` - 4xl/5xl responsive
- `<h2>` - 3xl/4xl responsive
- `<h3>` - 2xl/3xl responsive

### Spacing

Use consistent spacing:
- Cards: `p-6`
- Sections: `py-8` or `py-20`
- Gaps: `gap-4`, `gap-6`

## Common Tasks

### Add a New Skill Tag

Skills are managed in user profiles as arrays. To add:
1. Use the input in Profile or Signup pages
2. Press "Add" or hit Enter

### Create a Swap Request

1. Navigate to Exchange page
2. Browse users or search
3. Click "Request Swap" on user card

### Accept/Reject Swaps

1. Navigate to Swaps page
2. Click "Incoming" tab
3. Use Accept/Reject buttons

## Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Styles Not Loading

Ensure globals.css is imported in main.jsx:
```jsx
import './styles/globals.css'
```

### Components Not Found

Check import paths - they should be relative:
```jsx
import { Button } from '../../components/ui/Button';
```

## Building for Production

### Create Production Build

```bash
npm run build
```

Output will be in `/dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Next Steps

For a real production deployment:

1. **Backend Integration**
   - Replace `/src/services/api.js` with real API calls
   - Add authentication tokens
   - Implement proper session management

2. **File Uploads**
   - Add avatar upload functionality
   - Integrate with cloud storage (AWS S3, Cloudinary)

3. **Real-time Features**
   - Add WebSocket support for live notifications
   - Real-time swap status updates

4. **Testing**
   - Add unit tests (Vitest)
   - Add integration tests (React Testing Library)
   - Add E2E tests (Playwright)

5. **Performance**
   - Implement code splitting
   - Optimize images
   - Add service worker for offline support

6. **Security**
   - Add CSRF protection
   - Implement rate limiting
   - Add input sanitization

## Support

For questions or issues with this template, refer to:
- React docs: https://react.dev
- Vite docs: https://vitejs.dev
- Tailwind CSS docs: https://tailwindcss.com

---

Happy coding! 🚀
