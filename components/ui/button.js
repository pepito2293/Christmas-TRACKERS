import React from 'react';
import { cn } from '@/lib/utils';

const VARIANTS = {
  default: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
  outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 focus:ring-gray-400',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-400',
};

const SIZES = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

export const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', size = 'default', type = 'button', ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant] || VARIANTS.default,
    SIZES[size] || SIZES.default,
    className
  );

  return <button ref={ref} type={type} className={classes} {...props} />;
});

export default Button;
