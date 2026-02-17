import { cn } from '../../utils/cn';

export function Badge({
    children,
    variant = 'default',
    className,
    ...props
}) {
    const variants = {
        default: 'bg-neutral-100 text-neutral-700',
        offered: 'bg-brand-green text-white',
        wanted: 'border-2 border-brand-green text-brand-green bg-white',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
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
}
