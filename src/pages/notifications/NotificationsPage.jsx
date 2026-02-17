import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { Bell } from 'lucide-react';

export function NotificationsPage() {
    const { user } = useAuthStore();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await api.getNotificationsByUser(user.id);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user.id]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await api.markNotificationAsRead(notificationId);
            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
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
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Notifications</h1>
                    <p className="text-neutral-600">Stay updated on your skill swaps</p>
                </div>

                {notifications.length === 0 ? (
                    <EmptyState
                        icon={Bell}
                        title="No notifications"
                        description="You're all caught up! New notifications will appear here."
                    />
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            {notifications.map((notification, index) => (
                                <div
                                    key={notification.id}
                                    className={`p-6 ${index !== notifications.length - 1 ? 'border-b border-neutral-200' : ''} ${!notification.read ? 'bg-brand-mint/30' : ''}`}
                                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-neutral-900 font-medium mb-1">{notification.message}</p>
                                            <p className="text-sm text-neutral-600">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <Badge variant="info">New</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
