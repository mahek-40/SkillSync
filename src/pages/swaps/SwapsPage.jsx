import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ArrowRight, Users } from 'lucide-react';

export function SwapsPage() {
    const { user } = useAuthStore();
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchSwaps = async () => {
            try {
                const data = await api.getSwapsByUser(user.id);
                // Fetch user details for each swap
                const users = JSON.parse(localStorage.getItem('skillsync_users') || '[]');
                const swapsWithUsers = data.map(swap => {
                    const requester = users.find(u => u.id === swap.requesterId);
                    const receiver = users.find(u => u.id === swap.receiverId);
                    return {
                        ...swap,
                        requesterName: requester?.name || 'Unknown',
                        receiverName: receiver?.name || 'Unknown',
                    };
                });
                setSwaps(swapsWithUsers);
            } catch (error) {
                console.error('Error fetching swaps:', error);
                toast.error('Failed to load swaps');
            } finally {
                setLoading(false);
            }
        };

        fetchSwaps();
    }, [user.id]);

    const handleAcceptSwap = async (swapId) => {
        try {
            await api.updateSwapStatus(swapId, 'accepted');
            setSwaps(prev =>
                prev.map(s => s.id === swapId ? { ...s, status: 'accepted' } : s)
            );
            toast.success('Swap request accepted!');
        } catch (error) {
            toast.error('Failed to accept swap');
        }
    };

    const handleRejectSwap = async (swapId) => {
        try {
            await api.updateSwapStatus(swapId, 'rejected');
            setSwaps(prev =>
                prev.map(s => s.id === swapId ? { ...s, status: 'rejected' } : s)
            );
            toast.success('Swap request rejected');
        } catch (error) {
            toast.error('Failed to reject swap');
        }
    };

    const filteredSwaps = swaps.filter(swap => {
        if (activeTab === 'incoming') return swap.receiverId === user.id && swap.status === 'pending';
        if (activeTab === 'outgoing') return swap.requesterId === user.id && swap.status === 'pending';
        if (activeTab === 'active') return swap.status === 'accepted';
        if (activeTab === 'completed') return swap.status === 'completed';
        return true;
    });

    const getStatusBadge = (status) => {
        const variants = {
            pending: 'warning',
            accepted: 'info',
            rejected: 'danger',
            completed: 'success',
        };
        return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner size="lg" className="py-20" />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">My Swaps</h1>
                    <p className="text-primary/60">Manage your skill exchange requests</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-secondary overflow-x-auto">
                    {['all', 'incoming', 'outgoing', 'active', 'completed'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'text-brand border-b-2 border-brand'
                                    : 'text-primary/60 hover:text-primary'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Swaps List */}
                {filteredSwaps.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="No swaps found"
                        description={
                            activeTab === 'all'
                                ? "You haven't started any skill swaps yet. Head to Exchange to find matches!"
                                : `No ${activeTab} swaps at the moment.`
                        }
                        action={
                            activeTab === 'all' && (
                                <Link to="/exchange">
                                    <Button variant="primary">
                                        Find Matches
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            )
                        }
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredSwaps.map(swap => (
                            <Card key={swap.id} className="bg-white border border-secondary/30 hover:shadow-soft-lg transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-primary mb-1">
                                                Skill Swap Request
                                            </h3>
                                            <p className="text-sm text-primary/60 mb-2">
                                                Created {new Date(swap.createdAt).toLocaleDateString()}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-medium text-primary">From:</span>
                                                <Link to={`/user/${swap.requesterId}`} className="text-brand hover:underline font-medium">
                                                    {swap.requesterName}
                                                </Link>
                                                <span className="text-primary/60">→</span>
                                                <span className="font-medium text-primary">To:</span>
                                                <Link to={`/user/${swap.receiverId}`} className="text-brand hover:underline font-medium">
                                                    {swap.receiverName}
                                                </Link>
                                            </div>
                                        </div>
                                        {getStatusBadge(swap.status)}
                                    </div>

                                    <div className="text-sm text-primary/70 mb-4">
                                        <p>
                                            <span className="font-medium">Direction:</span>{' '}
                                            {swap.requesterId === user.id ? 'Outgoing' : 'Incoming'}
                                        </p>
                                    </div>

                                    {/* Action buttons for incoming pending requests */}
                                    {swap.receiverId === user.id && swap.status === 'pending' && (
                                        <div className="flex gap-3">
                                            <Button
                                                variant="primary"
                                                onClick={() => handleAcceptSwap(swap.id)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleRejectSwap(swap.id)}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}

                                    {/* View details link */}
                                    {swap.status === 'accepted' && (
                                        <Link to={`/user/${swap.requesterId === user.id ? swap.receiverId : swap.requesterId}`}>
                                            <Button variant="secondary" className="mt-3">
                                                View Profile
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
