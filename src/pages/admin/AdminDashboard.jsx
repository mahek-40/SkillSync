import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { Users, UserCheck, Shield, ArrowLeftRight, Clock, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
            const allUsers = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
            const allSwaps = JSON.parse(localStorage.getItem('skillsync_swaps') || '[]');

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
            setSwaps(allSwaps.slice(0, 10));
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const StatCard = ({ label, value, icon: Icon, gradient, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className="overflow-hidden hover:shadow-soft-lg transition-all duration-300 border-0 bg-white">
                <div className={`${gradient} p-6 relative`}>
                    <div className="absolute top-4 right-4 opacity-10">
                        <Icon className="w-16 h-16 text-primary" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium text-primary/60 mb-2">{label}</div>
                        <div className="text-4xl font-bold text-primary">{value}</div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
                    <p className="text-primary/60">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-brand via-primary to-brand text-white py-12 px-4 sm:px-6 lg:px-8 shadow-soft-lg relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <p className="text-white/90 text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-white" />
                        Welcome back, {user?.name}
                    </p>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard 
                        label="Total Users" 
                        value={stats.totalUsers} 
                        icon={Users}
                        gradient="bg-gradient-to-br from-white to-brand/10"
                        delay={0.1}
                    />
                    <StatCard 
                        label="Regular Users" 
                        value={stats.regularUsers} 
                        icon={UserCheck}
                        gradient="bg-gradient-to-br from-white to-secondary/20"
                        delay={0.2}
                    />
                    <StatCard 
                        label="Admin Users" 
                        value={stats.adminUsers} 
                        icon={Shield}
                        gradient="bg-gradient-to-br from-white to-brand/15"
                        delay={0.3}
                    />
                    <StatCard 
                        label="Total Swaps" 
                        value={stats.totalSwaps} 
                        icon={ArrowLeftRight}
                        gradient="bg-gradient-to-br from-white to-accent/15"
                        delay={0.4}
                    />
                    <StatCard 
                        label="Pending Swaps" 
                        value={stats.pendingSwaps} 
                        icon={Clock}
                        gradient="bg-gradient-to-br from-white to-brand/10"
                        delay={0.5}
                    />
                    <StatCard 
                        label="Completed Swaps" 
                        value={stats.completedSwaps} 
                        icon={CheckCircle}
                        gradient="bg-gradient-to-br from-white to-accent/10"
                        delay={0.6}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Card className="mb-8 bg-white border border-secondary/30 shadow-soft-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center shadow-sm border border-brand/20">
                                        <Users className="w-6 h-6 text-brand" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-primary">All Users</h2>
                                </div>
                                <Button variant="secondary" onClick={loadAdminData} className="flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-secondary">
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Email</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Location</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Role</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Skills Offered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id} className="border-b border-secondary/30 hover:bg-brand/5 transition-all duration-200">
                                                <td className="py-3 px-4 text-primary">{u.name}</td>
                                                <td className="py-3 px-4 text-primary/60">{u.email}</td>
                                                <td className="py-3 px-4 text-primary/60">{u.location}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                        u.role === 'admin' 
                                                            ? 'bg-brand/10 text-brand border border-brand/20' 
                                                            : 'bg-secondary/30 text-primary border border-secondary'
                                                    }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-primary/60">
                                                    {u.skillsOffered?.join(', ') || 'None'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Card className="bg-white border border-secondary/30 shadow-soft-lg">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shadow-sm border border-accent/20">
                                    <ArrowLeftRight className="w-6 h-6 text-accent" />
                                </div>
                                <h2 className="text-2xl font-bold text-primary">Recent Swaps</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-secondary">
                                            <th className="text-left py-3 px-4 font-semibold text-primary">ID</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Requester Skill</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Receiver Skill</th>
                                            <th className="text-left py-3 px-4 font-semibold text-primary">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {swaps.length > 0 ? (
                                            swaps.map((swap) => (
                                                <tr key={swap.id} className="border-b border-secondary/30 hover:bg-brand/5 transition-all duration-200">
                                                    <td className="py-3 px-4 font-mono text-sm text-primary">{swap.id}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                            swap.status === 'completed' ? 'bg-brand/20 text-brand border border-brand/30' :
                                                            swap.status === 'pending' ? 'bg-accent/20 text-accent border border-accent/30' :
                                                            'bg-secondary/30 text-primary border border-secondary'
                                                        }`}>
                                                            {swap.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-primary/60">{swap.requesterSkill}</td>
                                                    <td className="py-3 px-4 text-primary/60">{swap.receiverSkill}</td>
                                                    <td className="py-3 px-4 text-primary/60">
                                                        {new Date(swap.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="py-8 text-center text-primary/50">
                                                    No swaps yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
