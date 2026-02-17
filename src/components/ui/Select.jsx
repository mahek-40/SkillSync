import { cn } from '../../utils/cn';

export function Select({
    label,
    error,
    options = [],
    className,
    id,
    ...props
}) {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-neutral-900 mb-1.5"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={cn(
                    'w-full px-4 py-2.5 border rounded-lg transition-all duration-200 bg-white',
                    'focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
                    error ? 'border-red-500' : 'border-neutral-300',
                    className
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
