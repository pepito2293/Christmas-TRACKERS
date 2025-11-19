import React from 'react';
import { cn } from '@/lib/utils';

export const Label = React.forwardRef(function Label({ className = '', ...props }, ref) {
  return (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-gray-700', className)}
      {...props}
    />
  );
});

export default Label;
