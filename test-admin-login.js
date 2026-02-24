// Test script to verify admin login credentials
// Run this in browser console at http://localhost:5173

console.log('=== Admin Login Test ===');

// Check if users are initialized in localStorage
const usersData = localStorage.getItem('skillsync_users');
console.log('Users in localStorage:', usersData ? JSON.parse(usersData) : 'NOT FOUND');

// Check auth storage
const authStorage = localStorage.getItem('auth-storage');
console.log('Auth storage:', authStorage ? JSON.parse(authStorage) : 'NOT FOUND');

// Test if admin user exists
if (usersData) {
    const users = JSON.parse(usersData);
    const adminUser = users.find(u => u.email === 'admin@skillsync.com');
    console.log('Admin user found:', adminUser);

    if (adminUser) {
        console.log('Admin email:', adminUser.email);
        console.log('Admin password:', adminUser.password);
        console.log('Admin role:', adminUser.role);
    }
}

// Check what happens when we try to login
console.log('\n=== Testing Login Function ===');
const testEmail = 'admin@skillsync.com';
const testPassword = 'admin123';

if (usersData) {
    const users = JSON.parse(usersData);
    const user = users.find(u => u.email === testEmail && u.password === testPassword);

    if (user) {
        console.log('✅ Login would succeed with user:', user);
        const { password, ...userWithoutPassword } = user;
        console.log('User data returned (without password):', userWithoutPassword);
    } else {
        console.log('❌ Login would fail - credentials not found');
    }
}
