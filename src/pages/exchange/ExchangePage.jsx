import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Input } from '../../components/ui/Input';
import { SkillCard } from '../../components/features/skills/SkillCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonCard } from '../../components/common/SkeletonLoader';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { Search, Users } from 'lucide-react';

export function ExchangePage() {
    const { user } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [swapRequests, setSwapRequests] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getAllUsers(user.id);
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user.id]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredUsers(users);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = users.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.location?.toLowerCase().includes(query) ||
            u.skillsOffered?.some(s => s.toLowerCase().includes(query)) ||
            u.skillsWanted?.some(s => s.toLowerCase().includes(query))
        );

        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleRequestSwap = async (receiverId) => {
        try {
            await api.createSwap({
                requesterId: user.id,
                receiverId,
                requesterSkills: user.skillsOffered,
                receiverSkills: users.find(u => u.id === receiverId)?.skillsOffered || [],
            });

            setSwapRequests(prev => ({ ...prev, [receiverId]: 'pending' }));
            toast.success('Swap request sent!');
        } catch (error) {
            console.error('Error creating swap:', error);
            toast.error('Failed to send swap request');
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        Exchange Skills
                    </h1>
                    <p className="text-neutral-600">
                        Find your perfect skill-swap match
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-card shadow-soft p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Search className="w-5 h-5 text-neutral-400" />
                        <Input
                            placeholder="Search by name, location, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="No matches found"
                        description={searchQuery
                            ? "Try adjusting your search to find more users"
                            : "No users available at the moment"
                        }
                    />
                ) : (
                    <>
                        <p className="text-sm text-neutral-600">
                            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map(u => (
                                <SkillCard
                                    key={u.id}
                                    user={u}
                                    onRequestSwap={handleRequestSwap}
                                    currentSwapStatus={swapRequests[u.id]}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
