import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Zustand
 * Manages authentication state across the app
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Actions
      login: (user, token) => {
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: (userData) => {
        set((state) => ({ 
          user: { ...state.user, ...userData } 
        }));
      },
      
      setToken: (token) => {
        set({ token });
      },
      
      // Getters
      getUser: () => get().user,
      getToken: () => get().token,
      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'skillsync-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);