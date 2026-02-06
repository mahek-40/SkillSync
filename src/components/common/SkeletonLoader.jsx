import { cn } from '@/utils/cn';

/**
 * Skeleton Loader Component
 */
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
        'bg-[length:1000px_100%] rounded-lg',
        className
      )}
      {...props}
    />
  );
};

/**
 * User Card Skeleton
 */
export const UserCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <Skeleton className="h-10 w-full mt-4 rounded-xl" />
    </div>
  );
};

export default Skeleton;