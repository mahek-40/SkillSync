import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Button Component - SkillSync Design System
 * 
 * @param {object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 * @param {boolean} props.isLoading
 * @param {boolean} props.disabled
 * @param {ReactNode} props.children
 * @param {string} props.className
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  className,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium rounded-xl
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: `
      bg-brand-purple text-white hover:bg-purple-500 
      focus:ring-purple-200 shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-brand-mint text-mint-700 hover:bg-mint-300 
      focus:ring-mint-200 shadow-sm hover:shadow-md
    `,
    outline: `
      border-2 border-brand-purple text-brand-purple 
      hover:bg-purple-50 focus:ring-purple-200
    `,
    ghost: `
      text-text-secondary hover:bg-gray-100 focus:ring-gray-200
    `,
    danger: `
      bg-pink-200 text-pink-700 hover:bg-pink-300 
      focus:ring-pink-200 shadow-sm hover:shadow-md
    `,
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;