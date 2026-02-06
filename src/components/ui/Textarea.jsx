import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Textarea Component - SkillSync Design System
 */
const Textarea = forwardRef(({ 
  className, 
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl',
        'focus:border-brand-purple focus:ring-2 focus:ring-purple-100',
        'outline-none transition-all bg-white text-text-primary',
        'placeholder:text-text-muted resize-none',
        error && 'border-status-error focus:border-status-error focus:ring-red-100',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;