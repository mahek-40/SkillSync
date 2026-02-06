import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  TrendingUp,
  BarChart3,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Users',
      value: '10,234',
      change: '+12.5%',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Active Swaps',
      value: '1,456',
      change: '+8.2%',
      icon: FileText,
      color: 'mint',
    },
    {
      label: 'Pending Reports',
      value: '23',
      change: '-5.1%',
      icon: AlertCircle,
      color: 'pink',
    },
    {
      label: 'Completion Rate',
      value: '94.2%',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'purple',
    },
  ];
  
  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', date: '2024-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', date: '2024-01-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'pending', date: '2024-01-18' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-cream to-bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Monitor and manage the SkillSync platform
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    <p className={`text-sm mt-1 ${
                      stat.change.startsWith('+') ? 'text-status-success' : 'text-status-error'
                    }`}>
                      {stat.change} from last month
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
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.status === 'active' ? 'accepted' : 'pending'}>
                        {user.status}
                      </Badge>
                      <p className="text-xs text-text-muted mt-1">{user.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Users
              </Button>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="primary" className="justify-start">
                  <Users className="w-4 h-4" />
                  Manage Users
                </Button>
                <Button variant="secondary" className="justify-start">
                  <AlertCircle className="w-4 h-4" />
                  Review Reports
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;