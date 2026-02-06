import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Avatar Component - SkillSync Design System
 * 
 * @param {'sm' | 'md' | 'lg' | 'xl'} size
 */
const Avatar = ({ 
  src, 
  alt = 'User avatar', 
  size = 'md', 
  fallback,
  className 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };
  
  // Generate initials from name or fallback
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  const initials = fallback ? getInitials(fallback) : '';
  
  if (!src || imageError) {
    return (
      <div
        className={cn(
          'rounded-full bg-gradient-to-br from-logo-purple to-logo-mint',
          'flex items-center justify-center text-white font-semibold',
          sizes[size],
          className
        )}
      >
        {initials || <User className={iconSizes[size]} />}
      </div>
    );
  }
  
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={cn(
        'rounded-full object-cover',
        sizes[size],
        className
      )}
    />
  );
};

export default Avatar;