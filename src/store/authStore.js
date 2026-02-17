import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (userData) => {
                set({ user: userData, isAuthenticated: true });
            },

            signup: (userData) => {
                set({ user: userData, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
                // Clear all stored data
                localStorage.clear();
            },

            updateUser: (updates) => {
                set((state) => ({
                    user: { ...state.user, ...updates }
                }));
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
