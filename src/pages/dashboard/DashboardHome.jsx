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
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand via-primary to-brand p-8 text-white shadow-soft-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-2 text-white">
                            Welcome back, {user.name}! 👋
                        </h1>
                        <p className="text-white/90 text-lg">
                            Ready to continue your skill exchange journey?
                        </p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
                </motion.div>

                {/* Stats Grid with animations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="border-l-4 border-l-brand hover:shadow-soft-lg transition-all duration-300 bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-primary/60 mb-1">Pending Requests</p>
                                        <p className="text-4xl font-bold text-primary">{pendingSwaps.length}</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center">
                                        <Clock className="w-7 h-7 text-brand" />
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
                        <Card className="border-l-4 border-l-brand hover:shadow-soft-lg transition-all duration-300 bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-primary/60 mb-1">Active Swaps</p>
                                        <p className="text-4xl font-bold text-primary">{activeSwaps.length}</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center">
                                        <Users className="w-7 h-7 text-brand" />
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
                        <Card className="border-l-4 border-l-accent hover:shadow-soft-lg transition-all duration-300 bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-primary/60 mb-1">Completed</p>
                                        <p className="text-4xl font-bold text-primary">
                                            {swaps.filter(s => s.status === 'completed').length}
                                        </p>
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                                        <CheckCircle className="w-7 h-7 text-accent" />
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
                        <Card className="hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-brand" />
                                    Find Your Next Match
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-primary/60 mb-4">
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
                        <Card className="hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-brand" />
                                    Update Your Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-primary/60 mb-4">
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
                        <Card className="hover:shadow-soft-lg transition-shadow duration-300 bg-white">
                            <CardHeader>
                                <CardTitle>Recent Swaps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {swaps.slice(0, 5).map((swap, index) => (
                                        <motion.div 
                                            key={swap.id} 
                                            className="flex items-center justify-between p-4 bg-white border border-secondary/30 rounded-lg hover:shadow-soft transition-all duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                        >
                                            <div>
                                                <p className="font-medium text-primary">Skill Exchange Request</p>
                                                <p className="text-sm text-primary/60">
                                                    {new Date(swap.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                swap.status === 'pending' ? 'bg-accent/20 text-accent' :
                                                swap.status === 'accepted' ? 'bg-brand/20 text-brand' :
                                                swap.status === 'completed' ? 'bg-brand/30 text-primary' :
                                                'bg-secondary/30 text-primary'
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
