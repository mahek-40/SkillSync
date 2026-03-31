import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-secondary shadow-soft w-full">
            <nav className="container-custom w-full">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SkillSync" className="h-16" />
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="text-primary hover:text-brand transition-all duration-300 font-medium">
                                Dashboard
                            </Link>
                            <Link to="/exchange" className="text-primary hover:text-brand transition-all duration-300 font-medium">
                                Exchange
                            </Link>
                            <Link to="/swaps" className="text-primary hover:text-brand transition-all duration-300 font-medium">
                                My Swaps
                            </Link>
                            <Link to="/notifications" className="text-primary hover:text-brand transition-all duration-300 font-medium">
                                Notifications
                            </Link>
                        </div>
                    )}

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                                    <span className="hidden md:block text-sm font-medium text-primary">
                                        {user?.name}
                                    </span>
                                </button>

                                {/* Dropdown menu */}
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-soft-lg py-2 border border-secondary">
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-secondary/20"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-secondary/20"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <Button variant="ghost">Log in</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary">Sign up</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && isAuthenticated && (
                    <div className="md:hidden py-4 border-t border-secondary">
                        <div className="flex flex-col gap-2">
                            <Link
                                to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                                className="px-4 py-2 text-primary hover:bg-secondary/20 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/exchange"
                                className="px-4 py-2 text-primary hover:bg-secondary/20 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Exchange
                            </Link>
                            <Link
                                to="/swaps"
                                className="px-4 py-2 text-primary hover:bg-secondary/20 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Swaps
                            </Link>
                            <Link
                                to="/notifications"
                                className="px-4 py-2 text-primary hover:bg-secondary/20 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Notifications
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
