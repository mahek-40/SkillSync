import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

/**
 * EmptyState Component - Friendly empty state messages
 */
const EmptyState = ({ 
  icon: Icon,
  title, 
  description, 
  action,
  actionLabel 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      {Icon && (
        <div className="mb-4 p-4 bg-purple-50 rounded-full">
          <Icon className="w-12 h-12 text-brand-purple" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-text-secondary max-w-md mb-6">
          {description}
        </p>
      )}
      
      {action && actionLabel && (
        <Button onClick={action}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;