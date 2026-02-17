import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';

export function AdminDashboard() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState({
        totalUsers: 0,
        adminUsers: 0,
        regularUsers: 0,
        totalSwaps: 0,
        pendingSwaps: 0,
        completedSwaps: 0,
    });
    const [users, setUsers] = useState([]);
    const [swaps, setSwaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        setIsLoading(true);
        try {
            // Get storage data directly for admin view
            const allUsers = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
            const allSwaps = JSON.parse(localStorage.getItem('skillsync_swaps') || '[]');

            // Calculate statistics
            const adminUsers = allUsers.filter(u => u.role === 'admin');
            const regularUsers = allUsers.filter(u => u.role === 'user');
            const pendingSwaps = allSwaps.filter(s => s.status === 'pending');
            const completedSwaps = allSwaps.filter(s => s.status === 'completed');

            setStats({
                totalUsers: allUsers.length,
                adminUsers: adminUsers.length,
                regularUsers: regularUsers.length,
                totalSwaps: allSwaps.length,
                pendingSwaps: pendingSwaps.length,
                completedSwaps: completedSwaps.length,
            });

            setUsers(allUsers.map(({ password, ...user }) => user));
            setSwaps(allSwaps.slice(0, 10)); // Show last 10 swaps
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const StatCard = ({ label, value, bgColor = 'bg-gradient-to-br from-brand-purple to-brand-pink' }) => (
        <Card className="overflow-hidden">
            <div className={`${bgColor} p-6 text-white`}>
                <div className="text-sm font-medium opacity-90 mb-1">{label}</div>
                <div className="text-4xl font-bold">{value}</div>
            </div>
        </Card>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-purple to-brand-pink text-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-white/90">Welcome back, {user?.name}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard 
                        label="Total Users" 
                        value={stats.totalUsers} 
                        bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                    />
                    <StatCard 
                        label="Regular Users" 
                        value={stats.regularUsers} 
                        bgColor="bg-gradient-to-br from-green-500 to-green-600"
                    />
                    <StatCard 
                        label="Admin Users" 
                        value={stats.adminUsers} 
                        bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                    />
                    <StatCard 
                        label="Total Swaps" 
                        value={stats.totalSwaps} 
                        bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
                    />
                    <StatCard 
                        label="Pending Swaps" 
                        value={stats.pendingSwaps} 
                        bgColor="bg-gradient-to-br from-yellow-500 to-yellow-600"
                    />
                    <StatCard 
                        label="Completed Swaps" 
                        value={stats.completedSwaps} 
                        bgColor="bg-gradient-to-br from-teal-500 to-teal-600"
                    />
                </div>

                {/* Users Table */}
                <Card className="mb-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-neutral-900">All Users</h2>
                            <Button variant="secondary" onClick={loadAdminData}>
                                Refresh
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200">
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Name</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Email</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Location</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Role</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Skills Offered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                                            <td className="py-3 px-4">{u.name}</td>
                                            <td className="py-3 px-4 text-neutral-600">{u.email}</td>
                                            <td className="py-3 px-4 text-neutral-600">{u.location}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                    u.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-700' 
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-neutral-600">
                                                {u.skillsOffered?.join(', ') || 'None'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>

                {/* Recent Swaps */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Recent Swaps</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200">
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Requester Skill</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Receiver Skill</th>
                                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {swaps.length > 0 ? (
                                        swaps.map((swap) => (
                                            <tr key={swap.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                                                <td className="py-3 px-4 font-mono text-sm">{swap.id}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                        swap.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        swap.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {swap.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-neutral-600">{swap.requesterSkill}</td>
                                                <td className="py-3 px-4 text-neutral-600">{swap.receiverSkill}</td>
                                                <td className="py-3 px-4 text-neutral-600">
                                                    {new Date(swap.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-neutral-500">
                                                No swaps yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
