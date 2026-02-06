import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Camera, Plus, X, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/authStore';

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [skillsOffered, setSkillsOffered] = useState(user?.skillsOffered || []);
  const [skillsWanted, setSkillsWanted] = useState(user?.skillsWanted || []);
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('offered');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      location: user?.location || '',
      bio: user?.bio || '',
      availability: user?.availability || 'weekends',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      // Simulate API call
      updateUser({
        ...data,
        skillsOffered,
        skillsWanted,
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    if (skillType === 'offered') {
      setSkillsOffered([...skillsOffered, newSkill.trim()]);
    } else {
      setSkillsWanted([...skillsWanted, newSkill.trim()]);
    }
    
    setNewSkill('');
  };
  
  const handleRemoveSkill = (skill, type) => {
    if (type === 'offered') {
      setSkillsOffered(skillsOffered.filter(s => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter(s => s !== skill));
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold mb-2">
          My Profile
        </h1>
        <p className="text-text-secondary">
          Manage your personal information and skills
        </p>
      </motion.div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar 
                  src={user?.avatar} 
                  fallback={user?.name} 
                  size="xl" 
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-brand-purple text-white rounded-full shadow-lg hover:bg-purple-500 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-2">
                  Recommended: Square image, at least 400x400px
                </p>
                <Button type="button" variant="outline" size="sm">
                  Upload New Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              {!isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <Input
                  {...register('name', { required: 'Name is required' })}
                  disabled={!isEditing}
                  error={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-status-error mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <Input
                  {...register('email')}
                  type="email"
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <Input
                  {...register('location')}
                  placeholder="City, Country"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Availability
                </label>
                <Select
                  {...register('availability')}
                  disabled={!isEditing}
                >
                  <option value="weekends">Weekends</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="evenings">Evenings</option>
                  <option value="mornings">Mornings</option>
                  <option value="flexible">Flexible</option>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Bio
                </label>
                <Textarea
                  {...register('bio')}
                  placeholder="Tell others about yourself..."
                  rows={4}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Skills Offered */}
        <Card>
          <CardHeader>
            <CardTitle>Skills I Can Teach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {skillsOffered.map((skill) => (
                <Badge key={skill} variant="mint" className="gap-2 text-base py-2">
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill, 'offered')}
                      className="hover:bg-mint-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {skillsOffered.length === 0 && (
                <p className="text-text-secondary text-sm">
                  No skills added yet
                </p>
              )}
            </div>
            
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setSkillType('offered');
                      handleAddSkill();
                    }
                  }}
                  placeholder="Enter a skill..."
                />
                <Button
                  type="button"
                  onClick={() => {
                    setSkillType('offered');
                    handleAddSkill();
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Skills Wanted */}
        <Card>
          <CardHeader>
            <CardTitle>Skills I Want to Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {skillsWanted.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="gap-2 text-base py-2 border-2 border-purple-200 text-purple-600"
                >
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill, 'wanted')}
                      className="hover:bg-purple-100 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {skillsWanted.length === 0 && (
                <p className="text-text-secondary text-sm">
                  No skills added yet
                </p>
              )}
            </div>
            
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setSkillType('wanted');
                      handleAddSkill();
                    }
                  }}
                  placeholder="Enter a skill..."
                />
                <Button
                  type="button"
                  onClick={() => {
                    setSkillType('wanted');
                    handleAddSkill();
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Save Changes */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;