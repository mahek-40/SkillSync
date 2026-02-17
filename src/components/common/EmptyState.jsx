import { cn } from '../../utils/cn';

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className
}) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
            {Icon && (
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-neutral-400" />
                </div>
            )}

            {title && (
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {title}
                </h3>
            )}

            {description && (
                <p className="text-neutral-600 max-w-md mb-6">
                    {description}
                </p>
            )}

            {action}
        </div>
    );
}
