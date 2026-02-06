import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Input Component - SkillSync Design System
 */
const Input = forwardRef(({ 
  className, 
  type = 'text',
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl',
        'focus:border-brand-purple focus:ring-2 focus:ring-purple-100',
        'outline-none transition-all bg-white text-text-primary',
        'placeholder:text-text-muted',
        error && 'border-status-error focus:border-status-error focus:ring-red-100',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;