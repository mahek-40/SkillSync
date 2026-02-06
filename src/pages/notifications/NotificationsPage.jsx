import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  Star,
  Users,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/common/EmptyState';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock notifications - replace with API
  const notifications = [
    {
      id: 1,
      type: 'swap_accepted',
      user: 'Sarah Chen',
      message: 'accepted your swap request for React Development',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle,
      iconColor: 'mint',
    },
    {
      id: 2,
      type: 'swap_request',
      user: 'Marcus Johnson',
      message: 'sent you a swap request for Guitar Lessons',
      time: '5 hours ago',
      read: false,
      icon: Users,
      iconColor: 'purple',
    },
    {
      id: 3,
      type: 'review',
      user: 'Emily Rodriguez',
      message: 'left you a 5-star review',
      time: '1 day ago',
      read: true,
      icon: Star,
      iconColor: 'pink',
    },
    {
      id: 4,
      type: 'message',
      user: 'Alex Kumar',
      message: 'sent you a message',
      time: '1 day ago',
      read: true,
      icon: MessageCircle,
      iconColor: 'purple',
    },
    {
      id: 5,
      type: 'swap_rejected',
      user: 'Lisa Anderson',
      message: 'declined your swap request',
      time: '2 days ago',
      read: true,
      icon: XCircle,
      iconColor: 'pink',
    },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });
  
  const markAllAsRead = () => {
    // API call to mark all as read
    console.log('Marking all as read');
  };
  
  const getIconComponent = (type) => {
    const iconMap = {
      swap_accepted: CheckCircle,
      swap_request: Users,
      swap_rejected: XCircle,
      review: Star,
      message: MessageCircle,
    };
    return iconMap[type] || Bell;
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-display font-bold">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
          )}
        </div>
        <p className="text-text-secondary">
          {unreadCount > 0 
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
            : 'You\'re all caught up!'
          }
        </p>
      </motion.div>
      
      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'unread' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </Button>
        <Button
          variant={filter === 'read' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('read')}
        >
          Read
        </Button>
      </div>
      
      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = getIconComponent(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    !notification.read 
                      ? 'border-l-4 border-l-brand-purple bg-purple-50/30' 
                      : ''
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${notification.iconColor}-50 flex-shrink-0`}>
                      <Icon className={`w-5 h-5 text-brand-${notification.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-text-primary">
                          <span className="font-semibold">{notification.user}</span>{' '}
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-brand-purple rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description={
            filter === 'unread' 
              ? "You don't have any unread notifications."
              : "You don't have any notifications yet."
          }
        />
      )}
    </div>
  );
};

export default NotificationsPage;