import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { ArrowRight, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardHome() {
    const { user } = useAuthStore();
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSwaps = async () => {
            try {
                const data = await api.getSwapsByUser(user.id);
                setSwaps(data);
            } catch (error) {
                console.error('Error fetching swaps:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSwaps();
    }, [user.id]);

    const pendingSwaps = swaps.filter(s => s.status === 'pending');
    const activeSwaps = swaps.filter(s => s.status === 'accepted');

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Welcome Section with Gradient */}
                <motion.div 
                    className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-brand-purple via-brand-cyan to-brand-purple bg-[length:200%_200%] animate-gradient p-8 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-2">
                            Welcome back, {user.name}! 👋
                        </h1>
                        <p className="text-white/90 text-lg">
                            Ready to continue your skill exchange journey?
                        </p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl" />
                </motion.div>

                {/* Stats Grid with animations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="border-l-4 border-l-brand-purple hover:shadow-glow-purple transition-all duration-300 hover:scale-105">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-500 mb-1">Pending Requests</p>
                                        <p className="text-4xl font-bold text-neutral-900">{pendingSwaps.length}</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center">
                                        <Clock className="w-7 h-7 text-brand-purple" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="border-l-4 border-l-brand-cyan hover:shadow-lg transition-all duration-300 hover:scale-105">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-500 mb-1">Active Swaps</p>
                                        <p className="text-4xl font-bold text-neutral-900">{activeSwaps.length}</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                                        <Users className="w-7 h-7 text-brand-cyan" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="border-l-4 border-l-brand-orange hover:shadow-glow-orange transition-all duration-300 hover:scale-105">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-500 mb-1">Completed</p>
                                        <p className="text-4xl font-bold text-neutral-900">
                                            {swaps.filter(s => s.status === 'completed').length}
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                        <CheckCircle className="w-7 h-7 text-brand-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Quick Actions with gradient cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="hover:shadow-premium transition-all duration-300 hover:scale-105 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-brand-purple" />
                                    Find Your Next Match
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-600 mb-4">
                                    Discover users with the skills you want to learn and connect with them.
                                </p>
                                <Link to="/exchange">
                                    <Button variant="primary" className="w-full">
                                        Browse Skills
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card className="hover:shadow-premium transition-all duration-300 hover:scale-105 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-brand-cyan" />
                                    Update Your Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-600 mb-4">
                                    Keep your skills and availability up to date to get better matches.
                                </p>
                                <Link to="/profile">
                                    <Button variant="secondary" className="w-full">
                                        Edit Profile
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Recent Activity */}
                {swaps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>Recent Swaps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {swaps.slice(0, 5).map((swap, index) => (
                                        <motion.div 
                                            key={swap.id} 
                                            className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-white rounded-lg hover:shadow-md transition-all duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                        >
                                            <div>
                                                <p className="font-medium text-neutral-900">Skill Exchange Request</p>
                                                <p className="text-sm text-neutral-600">
                                                    {new Date(swap.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                swap.status === 'accepted' ? 'bg-brand-cyan/20 text-brand-cyan' :
                                                swap.status === 'completed' ? 'bg-brand-orange/20 text-brand-orange' :
                                                'bg-neutral-100 text-neutral-800'
                                            }`}>
                                                {swap.status}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
}
