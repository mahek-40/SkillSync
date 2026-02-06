import { Star, Clock, MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

/**
 * UserCard Component for Exchange Page
 * Shows user profile with skills offered/wanted
 */
const SkillCard = ({ 
  user, 
  onRequestSwap, 
  requestStatus = null,
  onCancelRequest 
}) => {
  const getButtonState = () => {
    if (!requestStatus) {
      return {
        label: 'Request Swap',
        variant: 'primary',
        action: onRequestSwap,
        disabled: false,
      };
    }
    
    switch (requestStatus) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'outline',
          action: onCancelRequest,
          disabled: false,
          showCancel: true,
        };
      case 'accepted':
        return {
          label: 'Accepted',
          variant: 'secondary',
          action: null,
          disabled: true,
        };
      case 'rejected':
        return {
          label: 'Request Again',
          variant: 'primary',
          action: onRequestSwap,
          disabled: false,
        };
      default:
        return {
          label: 'Request Swap',
          variant: 'primary',
          action: onRequestSwap,
          disabled: false,
        };
    }
  };
  
  const buttonState = getButtonState();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card hover className="h-full">
        {/* User Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar 
            src={user.avatar} 
            fallback={user.name} 
            size="lg" 
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-text-primary truncate">
              {user.name}
            </h3>
            {user.location && (
              <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{user.rating || '5.0'}</span>
              <span className="text-sm text-text-secondary">
                ({user.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
        </div>
        
        {/* Skills Offered */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-secondary mb-2">
            Skills Offered
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered?.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="mint">
                {skill}
              </Badge>
            ))}
            {user.skillsOffered?.length > 4 && (
              <Badge variant="purple">
                +{user.skillsOffered.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Skills Wanted */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-secondary mb-2">
            Skills Wanted
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted?.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="border-2 border-purple-200 text-purple-600">
                {skill}
              </Badge>
            ))}
            {user.skillsWanted?.length > 4 && (
              <Badge variant="purple">
                +{user.skillsWanted.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Availability */}
        {user.availability && (
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-4 pb-4 border-b border-gray-100">
            <Clock className="w-4 h-4" />
            <span>{user.availability}</span>
          </div>
        )}
        
        {/* Action Button */}
        <div className="flex items-center gap-2">
          {buttonState.showCancel ? (
            <>
              <Button 
                variant={buttonState.variant}
                className="flex-1"
                disabled
              >
                {buttonState.label}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={buttonState.action}
                className="text-pink-600 hover:bg-pink-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              variant={buttonState.variant}
              className="w-full"
              onClick={buttonState.action}
              disabled={buttonState.disabled}
            >
              {buttonState.label}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default SkillCard;