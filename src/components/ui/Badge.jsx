import { cn } from '../../utils/cn';

export function Badge({
    children,
    variant = 'default',
    className,
    ...props
}) {
    const variants = {
        default: 'bg-secondary/30 text-primary',
        offered: 'bg-brand text-white',
        wanted: 'border-2 border-brand text-brand bg-white',
        success: 'bg-brand/10 text-brand',
        warning: 'bg-accent/20 text-accent',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-secondary text-primary',
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
