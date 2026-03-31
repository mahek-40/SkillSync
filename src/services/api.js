// Real API service connecting to FastAPI backend
import { API_BASE_URL } from '../config/api.config';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Request failed' }));
        throw new Error(error.detail || error.message || 'Request failed');
    }
    return response.json();
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse(response);
};

export const api = {
    // Authentication
    async login(email, password) {
        return apiCall('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    async signup(userData) {
        return apiCall('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    // Users
    async getAllUsers(currentUserId) {
        const params = currentUserId ? `?exclude_id=${currentUserId}` : '';
        return apiCall(`/api/users${params}`);
    },

    async getUserById(id) {
        return apiCall(`/api/users/${id}`);
    },

    async updateUser(id, updates) {
        return apiCall(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    // Swaps
    async createSwap(swapData) {
        return apiCall('/api/swaps', {
            method: 'POST',
            body: JSON.stringify(swapData),
        });
    },

    async getSwapsByUser(userId) {
        return apiCall(`/api/swaps/user/${userId}`);
    },

    async updateSwapStatus(swapId, status) {
        return apiCall(`/api/swaps/${swapId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },

    // Notifications
    async getNotificationsByUser(userId) {
        return apiCall(`/api/notifications/user/${userId}`);
    },

    async markNotificationAsRead(notificationId) {
        return apiCall(`/api/notifications/${notificationId}/read`, {
            method: 'PUT',
        });
    },

    // Note: Reviews functionality not implemented in backend yet
    // These are placeholder methods for future implementation
    async getUserReviews(userId) {
        // TODO: Implement reviews in backend
        return [];
    },

    async createReview(reviewData) {
        // TODO: Implement reviews in backend
        return reviewData;
    },
};
