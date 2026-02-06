import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/common/EmptyState';
import { UserCardSkeleton } from '@/components/common/SkeletonLoader';
import SkillCard from '@/components/features/skills/SkillCard';
import Modal from '@/components/ui/Modal';

// Mock data - Replace with API call
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Chen',
    location: 'New York, USA',
    avatar: null,
    rating: 4.9,
    reviewCount: 24,
    skillsOffered: ['Photoshop', 'Illustrator', 'Figma', 'UI Design'],
    skillsWanted: ['React', 'JavaScript'],
    availability: 'Weekends',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    location: 'London, UK',
    avatar: null,
    rating: 5.0,
    reviewCount: 18,
    skillsOffered: ['Guitar', 'Music Theory', 'Piano'],
    skillsWanted: ['Photography', 'Video Editing'],
    availability: 'Evenings',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Barcelona, Spain',
    avatar: null,
    rating: 4.8,
    reviewCount: 32,
    skillsOffered: ['Spanish', 'English', 'French'],
    skillsWanted: ['Web Development', 'SEO'],
    availability: 'Flexible',
  },
  {
    id: 4,
    name: 'Alex Kumar',
    location: 'Mumbai, India',
    avatar: null,
    rating: 4.9,
    reviewCount: 41,
    skillsOffered: ['Python', 'Django', 'Machine Learning'],
    skillsWanted: ['Content Writing', 'Marketing'],
    availability: 'Weekdays',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    location: 'Toronto, Canada',
    avatar: null,
    rating: 5.0,
    reviewCount: 15,
    skillsOffered: ['Yoga', 'Meditation', 'Fitness'],
    skillsWanted: ['Cooking', 'Baking'],
    availability: 'Mornings',
  },
];

const ExchangePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading] = useState(false);
  const [requestStatuses, setRequestStatuses] = useState({});
  
  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const nameMatch = user.name.toLowerCase().includes(searchLower);
        const skillsOfferedMatch = user.skillsOffered.some(skill => 
          skill.toLowerCase().includes(searchLower)
        );
        const skillsWantedMatch = user.skillsWanted.some(skill => 
          skill.toLowerCase().includes(searchLower)
        );
        
        if (!nameMatch && !skillsOfferedMatch && !skillsWantedMatch) {
          return false;
        }
      }
      
      // Availability filter
      if (availabilityFilter !== 'all') {
        if (!user.availability.toLowerCase().includes(availabilityFilter.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, availabilityFilter]);
  
  // Extract all unique skills for filter dropdown
  const allSkills = useMemo(() => {
    const skills = new Set();
    mockUsers.forEach(user => {
      user.skillsOffered.forEach(skill => skills.add(skill));
      user.skillsWanted.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);
  
  const handleRequestSwap = (userId) => {
    // Update request status optimistically
    setRequestStatuses(prev => ({
      ...prev,
      [userId]: 'pending',
    }));
    
    toast.success('Swap request sent!');
    
    // Simulate API call
    // In real app: await swapService.requestSwap(userId)
  };
  
  const handleCancelRequest = (userId) => {
    setRequestStatuses(prev => ({
      ...prev,
      [userId]: null,
    }));
    
    toast.info('Request cancelled');
    
    // In real app: await swapService.cancelRequest(requestId)
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-cream to-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2">
            Find Your <span className="gradient-text">Perfect Match</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Browse {mockUsers.length} skill exchangers and start your learning journey
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-soft p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  type="text"
                  placeholder="Search by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Availability Filter */}
            <Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full md:w-48"
            >
              <option value="all">All Availability</option>
              <option value="weekends">Weekends</option>
              <option value="weekdays">Weekdays</option>
              <option value="evenings">Evenings</option>
              <option value="mornings">Mornings</option>
              <option value="flexible">Flexible</option>
            </Select>
            
            {/* Advanced Filters Button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
          
          {/* Active Filters */}
          {(searchQuery || availabilityFilter !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {searchQuery && (
                <Badge variant="purple" className="gap-2">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:bg-purple-100 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {availabilityFilter !== 'all' && (
                <Badge variant="mint" className="gap-2">
                  {availabilityFilter}
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className="hover:bg-mint-100 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setAvailabilityFilter('all');
                }}
                className="text-sm"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing <span className="font-semibold text-brand-purple">{filteredUsers.length}</span> {filteredUsers.length === 1 ? 'person' : 'people'}
          </p>
        </div>
        
        {/* User Cards Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <SkillCard
                  key={user.id}
                  user={user}
                  onRequestSwap={() => handleRequestSwap(user.id)}
                  requestStatus={requestStatuses[user.id]}
                  onCancelRequest={() => handleCancelRequest(user.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            icon={Search}
            title="No matches found"
            description="Try adjusting your search or filters to find more skill exchangers."
            action={() => {
              setSearchQuery('');
              setAvailabilityFilter('all');
            }}
            actionLabel="Clear Filters"
          />
        )}
      </div>
      
      {/* Advanced Filters Modal */}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Advanced Filters"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Skill Category
            </label>
            <Select>
              <option value="all">All Skills</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="music">Music</option>
              <option value="language">Language</option>
              <option value="fitness">Fitness</option>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location
            </label>
            <Input placeholder="Enter location..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Rating
            </label>
            <Select>
              <option value="all">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </Select>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsFilterOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExchangePage;