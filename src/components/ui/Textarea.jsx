import { cn } from '../../utils/cn';

export function Textarea({
    label,
    error,
    className,
    id,
    rows = 4,
    ...props
}) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-neutral-900 mb-1.5"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={cn(
                    'w-full px-4 py-2.5 border rounded-lg transition-all duration-200 resize-vertical',
                    'focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
                    error ? 'border-red-500' : 'border-neutral-300',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
