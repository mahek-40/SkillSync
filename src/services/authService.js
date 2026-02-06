import api from './api';

/**
 * Authentication Service
 */

export const authService = {
  /**
   * Login user
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },
  
  /**
   * Register new user
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },
  
  /**
   * Logout user
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
  
  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  },
  
  /**
   * Update password
   */
  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/password', passwordData);
    return response;
  },
  
  /**
   * Request password reset
   */
  requestPasswordReset: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  },
  
  /**
   * Reset password with token
   */
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      password: newPassword,
    });
    return response;
  },
};