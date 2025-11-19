import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

const DialogContext = React.createContext(null);

export function Dialog({ open: controlledOpen, onOpenChange, children }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = typeof controlledOpen === 'boolean';
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (value) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export const DialogTrigger = ({ asChild = false, children }) => {
  const { setOpen } = React.useContext(DialogContext);

  const handleClick = (event) => {
    if (React.isValidElement(children) && typeof children.props.onClick === 'function') {
      children.props.onClick(event);
    }
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export const DialogContent = React.forwardRef(function DialogContent(
  { className = '', children },
  ref
) {
  const { open, setOpen } = React.useContext(DialogContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  if (!open || !mounted) {
    return null;
  }

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div
        ref={ref}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl focus:outline-none',
          className
        )}
      >
        {children}
      </div>
    </div>
  );

  if (typeof document === 'undefined') {
    return content;
  }

  return createPortal(content, document.body);
});

export const DialogHeader = ({ className = '', children }) => (
  <div className={cn('mb-4 space-y-1 text-center sm:text-left', className)}>
    {children}
  </div>
);

export const DialogTitle = ({ className = '', children }) => (
  <h2 className={cn('text-lg font-semibold text-gray-900', className)}>
    {children}
  </h2>
);
