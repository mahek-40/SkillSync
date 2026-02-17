import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { ArrowRight, Users, Clock, CheckCircle } from 'lucide-react';

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
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-neutral-600">
                        Ready to continue your skill exchange journey?
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-l-brand-purple">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Pending Requests</p>
                                    <p className="text-3xl font-bold text-neutral-900">{pendingSwaps.length}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-brand-purple" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Active Swaps</p>
                                    <p className="text-3xl font-bold text-neutral-900">{activeSwaps.length}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-brand-orange">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Completed</p>
                                    <p className="text-3xl font-bold text-neutral-900">
                                        {swaps.filter(s => s.status === 'completed').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand-orange" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Find Your Next Match</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 mb-4">
                                Discover users with the skills you want to learn and connect with them.
                            </p>
                            <Link to="/exchange">
                                <Button variant="primary">
                                    Browse Skills
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 mb-4">
                                Keep your skills and availability up to date to get better matches.
                            </p>
                            <Link to="/profile">
                                <Button variant="secondary">
                                    Edit Profile
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                {swaps.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Swaps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {swaps.slice(0, 5).map(swap => (
                                    <div key={swap.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-neutral-900">Swap Request</p>
                                            <p className="text-sm text-neutral-600">
                                                {new Date(swap.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                swap.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                                    swap.status === 'completed' ? 'bg-brand-orange/20 text-brand-orange' :
                                                        'bg-neutral-100 text-neutral-800'
                                            }`}>
                                            {swap.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
