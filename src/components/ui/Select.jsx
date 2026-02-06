import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Select Component - SkillSync Design System
 */
const Select = forwardRef(({ 
  className, 
  error = false,
  children,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl',
          'focus:border-brand-purple focus:ring-2 focus:ring-purple-100',
          'outline-none transition-all bg-white text-text-primary',
          'appearance-none cursor-pointer',
          error && 'border-status-error focus:border-status-error focus:ring-red-100',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
    </div>
  );
});

Select.displayName = 'Select';

export default Select;