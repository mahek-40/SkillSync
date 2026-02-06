import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Bell, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: User,
      label: 'My Profile',
      path: '/dashboard/profile',
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/dashboard/notifications',
      badge: 3,
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/settings',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/dashboard/help',
    },
  ];
  
  return (
    <aside className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:mt-16">
      <div className="flex flex-col bg-white border-r border-gray-100 w-64 pt-6">
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative',
                  isActive
                    ? 'bg-purple-50 text-brand-purple font-medium'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-status-error text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;