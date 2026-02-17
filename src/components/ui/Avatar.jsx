import { cn } from '../../utils/cn';

export function Avatar({
    src,
    alt = '',
    size = 'md',
    fallback,
    className
}) {
    const sizes = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-24 h-24 text-2xl',
    };

    const initials = fallback || alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div
            className={cn(
                'rounded-full flex items-center justify-center font-semibold overflow-hidden',
                sizes[size],
                !src && 'bg-brand-green text-white',
                className
            )}
        >
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}
