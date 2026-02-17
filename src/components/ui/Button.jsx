import { cn } from '../../utils/cn';

export function Button({
    children,
    variant = 'primary',
    className,
    isLoading = false,
    disabled = false,
    ...props
}) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2';

    const variants = {
        primary: 'bg-brand-green text-white hover:bg-brand-green-dark',
        secondary: 'border-2 border-brand-green text-brand-green hover:bg-brand-mint',
        ghost: 'text-brand-green hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
}
