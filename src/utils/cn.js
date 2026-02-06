import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 * 
 * @param {...any} inputs - Class names or conditional class objects
 * @returns {string} Merged class string
 * 
 * @example
 * cn('px-2 py-1', someCondition && 'bg-red-500')
 * cn('px-2', 'px-4') // Returns 'px-4' (tailwind-merge handles conflict)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}