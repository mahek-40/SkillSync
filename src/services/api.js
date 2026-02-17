// Mock API service using localStorage for data persistence
// This simulates async API calls and can be easily swapped with real API later

const STORAGE_KEYS = {
    USERS: 'skillsync_users',
    SWAPS: 'skillsync_swaps',
    NOTIFICATIONS: 'skillsync_notifications',
};

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Get data from localStorage
const getStorageData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

// Set data to localStorage
const setStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Initialize mock data if not exists
const initMockData = () => {
    if (!getStorageData(STORAGE_KEYS.USERS)) {
        const mockUsers = [
            {
                id: '1',
                name: 'Alice Johnson',
                email: 'alice@example.com',
                password: 'password123',
                avatar: null,
                location: 'San Francisco, CA',
                bio: 'Passionate about web development and design. Love to teach and learn!',
                availability: ['Weekends', 'Evenings'],
                skillsOffered: ['React', 'JavaScript', 'UI/UX Design'],
                skillsWanted: ['Python', 'Machine Learning', 'Spanish'],
                role: 'user',
            },
            {
                id: '2',
                name: 'Bob Smith',
                email: 'bob@example.com',
                password: 'password123',
                avatar: null,
                location: 'New York, NY',
                bio: 'Data scientist with a love for teaching. Always eager to learn new skills.',
                availability: ['Weekdays', 'Mornings'],
                skillsOffered: ['Python', 'Data Science', 'SQL'],
                skillsWanted: ['React', 'Node.js', 'Guitar'],
                role: 'user',
            },
            {
                id: '3',
                name: 'Admin User',
                email: 'admin@skillsync.com',
                password: 'admin123',
                avatar: null,
                location: 'Remote',
                bio: 'Platform administrator',
                availability: [],
                skillsOffered: [],
                skillsWanted: [],
                role: 'admin',
            },
        ];
        setStorageData(STORAGE_KEYS.USERS, mockUsers);
    }

    if (!getStorageData(STORAGE_KEYS.SWAPS)) {
        setStorageData(STORAGE_KEYS.SWAPS, []);
    }

    if (!getStorageData(STORAGE_KEYS.NOTIFICATIONS)) {
        setStorageData(STORAGE_KEYS.NOTIFICATIONS, []);
    }
};

// Initialize on load
initMockData();

// API methods
export const api = {
    // Authentication
    async login(email, password) {
        await delay();
        const users = getStorageData(STORAGE_KEYS.USERS) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    async signup(userData) {
        await delay();
        const users = getStorageData(STORAGE_KEYS.USERS) || [];

        // Check if email exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            ...userData,
            avatar: null,
            role: 'user',
        };

        users.push(newUser);
        setStorageData(STORAGE_KEYS.USERS, users);

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    // Users
    async getAllUsers(currentUserId) {
        await delay();
        const users = getStorageData(STORAGE_KEYS.USERS) || [];
        return users
            .filter(u => u.id !== currentUserId && u.role !== 'admin')
            .map(({ password, ...user }) => user);
    },

    async getUserById(id) {
        await delay();
        const users = getStorageData(STORAGE_KEYS.USERS) || [];
        const user = users.find(u => u.id === id);
        if (!user) throw new Error('User not found');
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    async updateUser(id, updates) {
        await delay();
        const users = getStorageData(STORAGE_KEYS.USERS) || [];
        const index = users.findIndex(u => u.id === id);

        if (index === -1) throw new Error('User not found');

        users[index] = { ...users[index], ...updates };
        setStorageData(STORAGE_KEYS.USERS, users);

        const { password, ...userWithoutPassword } = users[index];
        return userWithoutPassword;
    },

    // Swaps
    async createSwap(swapData) {
        await delay();
        const swaps = getStorageData(STORAGE_KEYS.SWAPS) || [];

        const newSwap = {
            id: Date.now().toString(),
            ...swapData,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        swaps.push(newSwap);
        setStorageData(STORAGE_KEYS.SWAPS, swaps);

        // Create notification for receiver
        this.createNotification({
            userId: swapData.receiverId,
            type: 'swap_request',
            message: `You have a new swap request!`,
            swapId: newSwap.id,
        });

        return newSwap;
    },

    async getSwapsByUser(userId) {
        await delay();
        const swaps = getStorageData(STORAGE_KEYS.SWAPS) || [];
        return swaps.filter(s => s.requesterId === userId || s.receiverId === userId);
    },

    async updateSwapStatus(swapId, status) {
        await delay();
        const swaps = getStorageData(STORAGE_KEYS.SWAPS) || [];
        const index = swaps.findIndex(s => s.id === swapId);

        if (index === -1) throw new Error('Swap not found');

        swaps[index].status = status;
        swaps[index].updatedAt = new Date().toISOString();
        setStorageData(STORAGE_KEYS.SWAPS, swaps);

        return swaps[index];
    },

    async submitFeedback(swapId, userId, feedback) {
        await delay();
        const swaps = getStorageData(STORAGE_KEYS.SWAPS) || [];
        const index = swaps.findIndex(s => s.id === swapId);

        if (index === -1) throw new Error('Swap not found');

        if (!swaps[index].feedback) {
            swaps[index].feedback = {};
        }

        swaps[index].feedback[userId] = feedback;
        setStorageData(STORAGE_KEYS.SWAPS, swaps);

        return swaps[index];
    },

    // Notifications
    async createNotification(notificationData) {
        const notifications = getStorageData(STORAGE_KEYS.NOTIFICATIONS) || [];

        const newNotification = {
            id: Date.now().toString(),
            ...notificationData,
            read: false,
            createdAt: new Date().toISOString(),
        };

        notifications.push(newNotification);
        setStorageData(STORAGE_KEYS.NOTIFICATIONS, notifications);

        return newNotification;
    },

    async getNotificationsByUser(userId) {
        await delay();
        const notifications = getStorageData(STORAGE_KEYS.NOTIFICATIONS) || [];
        return notifications
            .filter(n => n.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    async markNotificationAsRead(notificationId) {
        await delay();
        const notifications = getStorageData(STORAGE_KEYS.NOTIFICATIONS) || [];
        const index = notifications.findIndex(n => n.id === notificationId);

        if (index !== -1) {
            notifications[index].read = true;
            setStorageData(STORAGE_KEYS.NOTIFICATIONS, notifications);
        }

        return notifications[index];
    },
};
