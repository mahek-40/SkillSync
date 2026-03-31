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
            // Transform frontend field names to backend format if needed
            const backendData = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                location: userData.location || '',
                bio: userData.bio || '',
                availability: userData.availability || [],
                skillsOffered: userData.skillsOffered || [],
                skillsWanted: userData.skillsWanted || [],
            };
            
            const user = await api.signup(backendData);
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
