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
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-gradient rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-neutral-900">SkillSync</span>
                    </Link>

                    {/* Desktop Navigation */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/dashboard" className="text-neutral-700 hover:text-brand-purple transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/exchange" className="text-neutral-700 hover:text-brand-purple transition-colors">
                                Exchange
                            </Link>
                            <Link to="/swaps" className="text-neutral-700 hover:text-brand-purple transition-colors">
                                My Swaps
                            </Link>
                            <Link to="/notifications" className="text-neutral-700 hover:text-brand-purple transition-colors">
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
