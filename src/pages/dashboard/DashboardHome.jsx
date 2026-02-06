import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Star, 
  Clock,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';

const DashboardHome = () => {
  const { user } = useAuthStore();
  
  // Mock data - replace with API
  const stats = [
    {
      icon: Users,
      label: 'Active Swaps',
      value: '3',
      change: '+2 this week',
      color: 'purple',
    },
    {
      icon: Clock,
      label: 'Pending Requests',
      value: '5',
      change: '2 incoming',
      color: 'mint',
    },
    {
      icon: Star,
      label: 'Your Rating',
      value: '4.9',
      change: '12 reviews',
      color: 'pink',
    },
    {
      icon: Award,
      label: 'Completed',
      value: '8',
      change: '+3 this month',
      color: 'purple',
    },
  ];
  
  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'accepted your swap request',
      skill: 'React Development',
      time: '2 hours ago',
      type: 'accepted',
    },
    {
      id: 2,
      user: 'Marcus Johnson',
      action: 'sent you a swap request',
      skill: 'Guitar Lessons',
      time: '5 hours ago',
      type: 'incoming',
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      action: 'left you a review',
      skill: 'Spanish Lessons',
      time: '1 day ago',
      type: 'review',
    },
  ];
  
  const upcomingSessions = [
    {
      id: 1,
      partner: 'Sarah Chen',
      skill: 'React Development',
      date: 'Tomorrow at 3:00 PM',
      status: 'confirmed',
    },
    {
      id: 2,
      partner: 'Alex Kumar',
      skill: 'Python Basics',
      date: 'Friday at 10:00 AM',
      status: 'confirmed',
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-text-secondary">
          Here's what's happening with your skill exchanges
        </p>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-muted mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-brand-${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/exchange">
              <Button variant="primary" className="w-full">
                <Users className="w-4 h-4" />
                Find Matches
              </Button>
            </Link>
            <Link to="/swaps">
              <Button variant="secondary" className="w-full">
                <Clock className="w-4 h-4" />
                View Requests
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full">
                <Star className="w-4 h-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <Avatar fallback={activity.user} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-sm text-brand-purple font-medium">
                      {activity.skill}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant={
                    activity.type === 'accepted' ? 'accepted' :
                    activity.type === 'incoming' ? 'pending' : 'purple'
                  }>
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <Link to="/notifications">
              <Button variant="ghost" className="w-full mt-4">
                View All Activity
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your confirmed skill exchanges</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl"
                  >
                    <Avatar fallback={session.partner} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary">
                        {session.partner}
                      </p>
                      <p className="text-sm text-brand-purple">
                        {session.skill}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <p className="text-sm text-text-secondary">
                          {session.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="accepted">{session.status}</Badge>
                  </div>
                ))}
                <Link to="/swaps">
                  <Button variant="ghost" className="w-full">
                    View All Swaps
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary mb-4">
                  No upcoming sessions yet
                </p>
                <Link to="/exchange">
                  <Button variant="primary">
                    Find Your First Match
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-mint-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Keep Growing! 🌱
              </h3>
              <p className="text-text-secondary mb-4">
                You've completed 8 skill exchanges. Just 2 more to earn the "Active Learner" badge!
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white rounded-full h-2 max-w-xs">
                  <div className="bg-brand-purple h-2 rounded-full" style={{ width: '80%' }} />
                </div>
                <span className="text-sm font-medium text-brand-purple">
                  8/10
                </span>
              </div>
            </div>
            <TrendingUp className="w-16 h-16 text-brand-purple hidden md:block" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;