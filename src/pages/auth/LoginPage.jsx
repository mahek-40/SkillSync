import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { toast } from 'react-toastify';

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
            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2 text-center">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-600 mb-8 text-center">
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
                                <Link to="/signup" className="text-brand-purple font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Demo credentials hint */}
                        <div className="mt-6 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-600">
                            <p className="font-medium mb-1">Demo Credentials:</p>
                            <p>User: alice@example.com / password123</p>
                            <p>Admin: admin@skillsync.com / admin123</p>
                        </div>
                    </div>
                </Card>
            </div>
        </PublicLayout>
    );
}
