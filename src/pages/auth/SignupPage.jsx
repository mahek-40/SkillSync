import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const password = watch('password');
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await authService.register(data);
      login(response.user, response.token);
      toast.success('Account created successfully!');
      navigate('/onboarding');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-logo-lavender to-bg-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-logo-purple to-logo-mint rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="font-display font-bold text-2xl gradient-text">
                  SkillSync
                </span>
              </Link>
            </div>
            <CardTitle className="text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Join our community of skill exchangers
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    error={!!errors.name}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-status-error mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    error={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-status-error mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              {/* Location (Optional) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location <span className="text-text-muted">(Optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    {...register('location')}
                    type="text"
                    placeholder="New York, USA"
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    error={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-status-error mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <Input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    error={!!errors.confirmPassword}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-status-error mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  {...register('terms', {
                    required: 'You must agree to the terms',
                  })}
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-purple focus:ring-purple-200"
                />
                <label className="text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-brand-purple hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-purple hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-status-error mt-1">
                  {errors.terms.message}
                </p>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-text-secondary">
                  Already have an account?
                </span>
              </div>
            </div>
            
            {/* Login Link */}
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;