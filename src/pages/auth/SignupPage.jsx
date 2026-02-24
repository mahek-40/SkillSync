import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { toast } from 'react-toastify';
import { X, UserPlus, Sparkles } from 'lucide-react';

export function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuthStore();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        bio: '',
        availability: [],
        skillsOffered: [],
        skillsWanted: [],
    });

    const [skillInput, setSkillInput] = useState({ offered: '', wanted: '' });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleAvailabilityToggle = (option) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.includes(option)
                ? prev.availability.filter(a => a !== option)
                : [...prev.availability, option]
        }));
    };

    const handleAddSkill = (type) => {
        const skill = skillInput[type].trim();
        if (!skill) return;

        const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';

        if (!formData[field].includes(skill)) {
            setFormData(prev => ({
                ...prev,
                [field]: [...prev[field], skill]
            }));
        }

        setSkillInput(prev => ({ ...prev, [type]: '' }));
    };

    const handleRemoveSkill = (type, skillToRemove) => {
        const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter(s => s !== skillToRemove)
        }));
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.password) {
                toast.error('Please fill in all required fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
        }
        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.skillsOffered.length === 0 || formData.skillsWanted.length === 0) {
            toast.error('Please add at least one skill you can offer and one you want to learn');
            return;
        }

        setIsLoading(true);

        try {
            const { confirmPassword, ...userData } = formData;
            const user = await authService.signup(userData);
            signup(user);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];

    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 -z-10" />
                <div className="absolute top-10 right-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 left-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                
                <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-2xl">
                    <div className="p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-cyan rounded-2xl flex items-center justify-center shadow-lg">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className={`w-3 h-3 rounded-full transition-all ${step >= 1 ? 'bg-gradient-to-r from-brand-purple to-brand-cyan' : 'bg-neutral-300'}`} />
                            <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`} />
                            </div>
                            <div className={`w-3 h-3 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-brand-purple to-brand-cyan' : 'bg-neutral-300'}`} />
                            <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`} />
                            </div>
                            <div className={`w-3 h-3 rounded-full transition-all ${step >= 3 ? 'bg-gradient-to-r from-brand-purple to-brand-cyan' : 'bg-neutral-300'}`} />
                        </div>

                        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent mb-2 text-center">
                            {step === 1 && 'Create Your Account'}
                            {step === 2 && 'Tell Us About You'}
                            {step === 3 && 'Your Skills'}
                        </h1>
                        <p className="text-neutral-600 mb-8 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-purple" />
                            {step === 1 && 'Start your skill exchange journey'}
                            {step === 2 && 'Help others find you'}
                            {step === 3 && 'What can you teach? What do you want to learn?'}
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Basic Info */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />

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

                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />

                                    <Button type="button" variant="primary" className="w-full" onClick={handleNextStep}>
                                        Next
                                    </Button>
                                </div>
                            )}

                            {/* Step 2: Profile Details */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <Input
                                        label="Location (Optional)"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="San Francisco, CA"
                                    />

                                    <Textarea
                                        label="Bio (Optional)"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell others about yourself..."
                                        rows={4}
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-900 mb-3">
                                            Availability (Optional)
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {availabilityOptions.map(option => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => handleAvailabilityToggle(option)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.availability.includes(option)
                                                            ? 'bg-brand-purple text-white'
                                                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>
                                            Back
                                        </Button>
                                        <Button type="button" variant="primary" className="w-full" onClick={handleNextStep}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Skills */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    {/* Skills Offered */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-900 mb-2">
                                            Skills I Can Offer *
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <Input
                                                value={skillInput.offered}
                                                onChange={(e) => setSkillInput(prev => ({ ...prev, offered: e.target.value }))}
                                                placeholder="e.g., React, Guitar, Spanish"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddSkill('offered');
                                                    }
                                                }}
                                            />
                                            <Button type="button" variant="primary" onClick={() => handleAddSkill('offered')}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skillsOffered.map((skill, index) => (
                                                <Badge key={index} variant="offered" className="flex items-center gap-1">
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill('offered', skill)}
                                                        className="hover:text-neutral-200"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skills Wanted */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-900 mb-2">
                                            Skills I Want to Learn *
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <Input
                                                value={skillInput.wanted}
                                                onChange={(e) => setSkillInput(prev => ({ ...prev, wanted: e.target.value }))}
                                                placeholder="e.g., Python, Photography, French"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddSkill('wanted');
                                                    }
                                                }}
                                            />
                                            <Button type="button" variant="primary" onClick={() => handleAddSkill('wanted')}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skillsWanted.map((skill, index) => (
                                                <Badge key={index} variant="wanted" className="flex items-center gap-1">
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill('wanted', skill)}
                                                        className="hover:text-neutral-700"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(2)}>
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            isLoading={isLoading}
                                            disabled={isLoading}
                                        >
                                            Create Account
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {step === 1 && (
                            <div className="mt-6 text-center">
                                <p className="text-neutral-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-brand-purple font-semibold hover:text-brand-cyan transition-colors">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </PublicLayout>
    );
}
