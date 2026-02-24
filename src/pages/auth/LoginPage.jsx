import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { toast } from 'react-toastify';
import { LogIn, Sparkles } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await authService.login(formData.email, formData.password);
            login(user);
            toast.success('Welcome back!');

            // Redirect based on user role
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 -z-10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-purple-100 shadow-2xl">
                    <div className="p-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-cyan rounded-2xl flex items-center justify-center shadow-lg">
                                <LogIn className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent mb-2 text-center">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-600 mb-8 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-purple" />
                            Log in to continue your skill exchange journey
                        </p>

                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                Log In
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-neutral-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-brand-purple font-semibold hover:text-brand-cyan transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Demo credentials hint */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-sm text-neutral-700 border border-purple-100">
                            <p className="font-semibold mb-1 text-brand-purple">Demo Credentials:</p>
                            <p>User: alice@example.com / password123</p>
                            <p>Admin: admin@skillsync.com / admin123</p>
                        </div>
                    </div>
                </Card>
            </div>
        </PublicLayout>
    );
}
