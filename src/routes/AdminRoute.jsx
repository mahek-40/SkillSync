import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

/**
 * Admin Route Component
 * Redirects non-admin users to dashboard
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default AdminRoute;