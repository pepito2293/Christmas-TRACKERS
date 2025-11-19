import React from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = React.forwardRef(function Checkbox(
  { className = '', checked = false, onCheckedChange, ...props },
  ref
) {
  const handleChange = (event) => {
    const { checked } = event.target;
    onCheckedChange?.(checked);
  };

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={!!checked}
      onChange={handleChange}
      className={cn(
        'h-4 w-4 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-1',
        className
      )}
      {...props}
    />
  );
});

export default Checkbox;
