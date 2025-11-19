import React from 'react';
import { cn } from '@/lib/utils';

const SelectContext = React.createContext(null);

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const containerRef = React.useRef(null);

  const registerItem = React.useCallback((itemValue, label) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.value !== itemValue);
      return [...filtered, { value: itemValue, label }];
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange,
      open,
      setOpen,
      registerItem,
      items,
    }),
    [value, onValueChange, open, registerItem, items]
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const handleClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef(function SelectTrigger({ className = '', children, ...props }, ref) {
  const { open, setOpen } = React.useContext(SelectContext);
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1',
        className
      )}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
});

export const SelectValue = ({ placeholder = 'Sélectionner', className = '' }) => {
  const { value, items } = React.useContext(SelectContext);
  const selected = items.find((item) => item.value === value);
  return (
    <span className={cn('text-sm text-gray-700', className)}>
      {selected?.label || placeholder}
    </span>
  );
};

export const SelectContent = ({ className = '', children }) => {
  const { open } = React.useContext(SelectContext);
  if (!open) {
    return null;
  }
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

function getNodeText(node) {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  if (React.isValidElement(node)) {
    return getNodeText(node.props.children);
  }
  return '';
}

export const SelectItem = ({ value, children, className = '' }) => {
  const { value: selectedValue, onValueChange, setOpen, registerItem } = React.useContext(SelectContext);
  const label = React.useMemo(() => getNodeText(children), [children]);

  React.useEffect(() => {
    registerItem?.(value, label);
  }, [value, label, registerItem]);

  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      role="option"
      aria-selected={isActive}
      onClick={() => {
        onValueChange?.(value);
        setOpen(false);
      }}
      className={cn(
        'flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100',
        isActive && 'bg-gray-100 font-semibold text-gray-900',
        className
      )}
    >
      {children}
    </button>
  );
};
