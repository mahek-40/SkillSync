import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

/**
 * API Configuration
 * Replace with your actual backend URL
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Axios Instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Request Interceptor - Attach auth token
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle errors globally
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      // Handle unauthorized
      if (status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
      
      return Promise.reject(data || error.message);
    } else if (error.request) {
      // No response received
      return Promise.reject('No response from server');
    } else {
      // Request setup error
      return Promise.reject(error.message);
    }
  }
);

export default api;