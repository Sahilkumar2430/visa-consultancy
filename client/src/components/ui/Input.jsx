import { forwardRef } from 'react';
import { cn } from '../../utils/helpers.js';

const Input = forwardRef(({ label, error, hint, className, required, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-navy-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 rounded-xl border bg-white text-navy-900 placeholder:text-navy-300',
          'transition-all duration-200 text-sm',
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-navy-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-100',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-navy-400">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;

export const Select = forwardRef(({ label, error, children, className, required, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-navy-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <select
      ref={ref}
      className={cn(
        'w-full px-4 py-2.5 rounded-xl border bg-white text-navy-900 text-sm',
        'transition-all duration-200 appearance-none cursor-pointer',
        error
          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
          : 'border-navy-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-100',
        className
      )}
      {...props}
    >
      {children}
    </select>
    {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
  </div>
));

Select.displayName = 'Select';

export const Textarea = forwardRef(({ label, error, className, required, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-navy-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        'w-full px-4 py-2.5 rounded-xl border bg-white text-navy-900 placeholder:text-navy-300 resize-none',
        'transition-all duration-200 text-sm',
        error
          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
          : 'border-navy-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-100',
        className
      )}
      {...props}
    />
    {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
  </div>
));

Textarea.displayName = 'Textarea';