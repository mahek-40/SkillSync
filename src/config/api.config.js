// API Configuration
// Change this URL based on your environment

const config = {
    // Development
    development: {
        apiUrl: 'http://localhost:5000',
    },
    // Production
    production: {
        apiUrl: import.meta.env.VITE_API_URL || 'https://your-production-api.com',
    },
};

// Determine current environment
const environment = import.meta.env.MODE || 'development';

// Export the current config
export const API_CONFIG = config[environment];

// Export API base URL
export const API_BASE_URL = API_CONFIG.apiUrl;
