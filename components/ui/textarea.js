import React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});

export default Textarea;
