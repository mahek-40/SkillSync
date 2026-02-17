import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

export function ProfilePage() {
    const { user, updateUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
        availability: user.availability || [],
        skillsOffered: user.skillsOffered || [],
        skillsWanted: user.skillsWanted || [],
    });
    const [skillInput, setSkillInput] = useState({ offered: '', wanted: '' });

    const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const updatedUser = await authService.updateProfile(user.id, formData);
            updateUser(updatedUser);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || '',
            location: user.location || '',
            bio: user.bio || '',
            availability: user.availability || [],
            skillsOffered: user.skillsOffered || [],
            skillsWanted: user.skillsWanted || [],
        });
        setIsEditing(false);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
                    {!isEditing && (
                        <Button variant="primary" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </div>

                {/* Profile Card */}
                <Card>
                    <CardContent className="p-8">
                        {/* Avatar and Basic Info */}
                        <div className="flex items-center gap-6 mb-8">
                            <Avatar src={user.avatar} alt={user.name} size="xl" />
                            <div className="flex-1">
                                {isEditing ? (
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        label="Name"
                                    />
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-neutral-900">{user.name}</h2>
                                        {user.location && (
                                            <p className="text-neutral-600 mt-1">{user.location}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        {isEditing && (
                            <div className="mb-6">
                                <Input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    label="Location"
                                    placeholder="San Francisco, CA"
                                />
                            </div>
                        )}

                        {/* Bio */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-900 mb-2">Bio</label>
                            {isEditing ? (
                                <Textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell others about yourself..."
                                />
                            ) : (
                                <p className="text-neutral-700">{user.bio || 'No bio yet'}</p>
                            )}
                        </div>

                        {/* Availability */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-900 mb-3">Availability</label>
                            {isEditing ? (
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
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.availability && user.availability.length > 0 ? (
                                        user.availability.map(a => (
                                            <Badge key={a} variant="default">{a}</Badge>
                                        ))
                                    ) : (
                                        <p className="text-neutral-500">No availability set</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Skills Offered */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-900 mb-3">Skills I Offer</label>
                            {isEditing ? (
                                <>
                                    <div className="flex gap-2 mb-3">
                                        <Input
                                            value={skillInput.offered}
                                            onChange={(e) => setSkillInput(prev => ({ ...prev, offered: e.target.value }))}
                                            placeholder="e.g., React, Guitar"
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
                                </>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.skillsOffered && user.skillsOffered.length > 0 ? (
                                        user.skillsOffered.map((skill, index) => (
                                            <Badge key={index} variant="offered">{skill}</Badge>
                                        ))
                                    ) : (
                                        <p className="text-neutral-500">No skills offered yet</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Skills Wanted */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-neutral-900 mb-3">Skills I Want to Learn</label>
                            {isEditing ? (
                                <>
                                    <div className="flex gap-2 mb-3">
                                        <Input
                                            value={skillInput.wanted}
                                            onChange={(e) => setSkillInput(prev => ({ ...prev, wanted: e.target.value }))}
                                            placeholder="e.g., Python, Photography"
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
                                </>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.skillsWanted && user.skillsWanted.length > 0 ? (
                                        user.skillsWanted.map((skill, index) => (
                                            <Badge key={index} variant="wanted">{skill}</Badge>
                                        ))
                                    ) : (
                                        <p className="text-neutral-500">No skills wanted yet</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        {isEditing && (
                            <div className="flex gap-3 mt-8">
                                <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                                    Save Changes
                                </Button>
                                <Button variant="ghost" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
