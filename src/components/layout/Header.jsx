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
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SkillSync" className="h-20" />
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/dashboard" className="text-neutral-700 hover:text-brand-purple transition-all duration-300 hover:scale-105 font-medium">
                                Dashboard
                            </Link>
                            <Link to="/exchange" className="text-neutral-700 hover:text-brand-purple transition-all duration-300 hover:scale-105 font-medium">
                                Exchange
                            </Link>
                            <Link to="/swaps" className="text-neutral-700 hover:text-brand-purple transition-all duration-300 hover:scale-105 font-medium">
                                My Swaps
                            </Link>
                            <Link to="/notifications" className="text-neutral-700 hover:text-brand-purple transition-all duration-300 hover:scale-105 font-medium">
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
                                    <span className="hidden md:block text-sm font-medium text-neutral-900">
                                        {user?.name}
                                    </span>
                                </button>

                                {/* Dropdown menu */}
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-soft-lg py-2 border border-neutral-200">
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                            onClick={() => setProfileMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
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
                    <div className="md:hidden py-4 border-t border-neutral-200">
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/dashboard"
                                className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/exchange"
                                className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Exchange
                            </Link>
                            <Link
                                to="/swaps"
                                className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Swaps
                            </Link>
                            <Link
                                to="/notifications"
                                className="px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
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
