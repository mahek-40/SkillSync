import { api } from './api';

export const authService = {
    async login(email, password) {
        try {
            const user = await api.login(email, password);
            return user;
        } catch (error) {
            throw new Error(error.message || 'Login failed');
        }
    },

    async signup(userData) {
        try {
            const user = await api.signup(userData);
            return user;
        } catch (error) {
            throw new Error(error.message || 'Signup failed');
        }
    },

    async updateProfile(userId, updates) {
        try {
            const user = await api.updateUser(userId, updates);
            return user;
        } catch (error) {
            throw new Error(error.message || 'Profile update failed');
        }
    },
};
