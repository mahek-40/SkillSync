import { cn } from '../../utils/cn';

export function Button({
    children,
    variant = 'primary',
    className,
    isLoading = false,
    disabled = false,
    ...props
}) {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:ring-offset-2 inline-flex items-center justify-center';

    const variants = {
        primary: 'bg-brand-purple text-white hover:bg-brand-purple/90 hover:shadow-lg hover:scale-105',
        secondary: 'border-2 border-brand-purple text-brand-purple bg-white hover:bg-brand-purple hover:text-white hover:shadow-md',
        ghost: 'text-brand-purple hover:bg-brand-purple/10',
        danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md',
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
