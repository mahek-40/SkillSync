import { cn } from '@/utils/cn';

/**
 * Badge Component - SkillSync Design System
 * 
 * @param {'purple' | 'mint' | 'pink' | 'pending' | 'accepted' | 'rejected' | 'completed'} variant
 */
const Badge = ({ children, variant = 'purple', className, ...props }) => {
  const variants = {
    purple: 'bg-purple-50 text-purple-600 border border-purple-200',
    mint: 'bg-mint-50 text-mint-600 border border-mint-200',
    pink: 'bg-pink-50 text-pink-600 border border-pink-200',
    pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    accepted: 'bg-mint-50 text-mint-700 border border-mint-200',
    rejected: 'bg-pink-50 text-pink-700 border border-pink-200',
    completed: 'bg-purple-50 text-purple-700 border border-purple-200',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;