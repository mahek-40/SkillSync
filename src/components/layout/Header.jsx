import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-logo-purple to-logo-mint rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              SkillSync
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-brand-purple'
                      : 'text-text-secondary hover:text-brand-purple'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/exchange"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/exchange')
                      ? 'text-brand-purple'
                      : 'text-text-secondary hover:text-brand-purple'
                  }`}
                >
                  Exchange
                </Link>
                <Link
                  to="/swaps"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/swaps')
                      ? 'text-brand-purple'
                      : 'text-text-secondary hover:text-brand-purple'
                  }`}
                >
                  My Swaps
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/browse"
                  className="text-sm font-medium text-text-secondary hover:text-brand-purple transition-colors"
                >
                  Browse Skills
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-text-secondary hover:text-brand-purple transition-colors"
                >
                  About
                </Link>
              </>
            )}
          </nav>
          
          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full" />
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Avatar src={user?.avatar} fallback={user?.name} size="sm" />
                  </button>
                  
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft-lg border border-gray-100 py-2"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm">My Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors text-pink-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/exchange"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Exchange
                  </Link>
                  <Link
                    to="/swaps"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Swaps
                  </Link>
                  <Link
                    to="/profile"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-sm font-medium text-pink-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/browse"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Browse Skills
                  </Link>
                  <Link
                    to="/about"
                    className="block py-2 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;