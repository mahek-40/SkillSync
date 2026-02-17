import { cn } from '../../utils/cn';

export function Card({ children, className, hover = true, ...props }) {
    return (
        <div
            className={cn(
                'bg-white rounded-card shadow-soft p-6 transition-shadow duration-200',
                hover && 'hover:shadow-soft-lg',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }) {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className, ...props }) {
    return (
        <h3 className={cn('text-xl font-semibold text-neutral-900', className)} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className, ...props }) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className, ...props }) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-neutral-200', className)} {...props}>
            {children}
        </div>
    );
}
