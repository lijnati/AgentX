import * as React from 'react';
import { cn } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-zinc-500 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-yellow-500/80 focus-visible:ring-1 focus-visible:ring-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            icon && 'pl-9',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-9 rounded border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-mono text-zinc-100 focus-visible:outline-none focus-visible:border-yellow-500/80 focus-visible:ring-1 focus-visible:ring-yellow-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
