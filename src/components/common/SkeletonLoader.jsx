import { cn } from '../../utils/cn';

export function SkeletonLoader({ className, count = 1, type = 'card' }) {
    const types = {
        card: 'h-48 rounded-card',
        line: 'h-4 rounded',
        circle: 'w-12 h-12 rounded-full',
        avatar: 'w-16 h-16 rounded-full',
    };

    const skeletons = Array.from({ length: count }, (_, i) => (
        <div
            key={i}
            className={cn(
                'bg-neutral-200 animate-pulse',
                types[type],
                className
            )}
        />
    ));

    return count > 1 ? (
        <div className="space-y-4">{skeletons}</div>
    ) : (
        skeletons[0]
    );
}

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-card shadow-soft p-6 space-y-4">
            <div className="flex items-center gap-4">
                <SkeletonLoader type="avatar" />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader type="line" className="w-1/2" />
                    <SkeletonLoader type="line" className="w-1/3" />
                </div>
            </div>
            <div className="space-y-2">
                <SkeletonLoader type="line" />
                <SkeletonLoader type="line" />
                <SkeletonLoader type="line" className="w-4/5" />
            </div>
        </div>
    );
}
