'use client';

import * as React from 'react';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-sans select-none cursor-pointer transition-[transform,background-color,border-color,box-shadow,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]';

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5 min-h-[32px]',
      md: 'h-9 px-4 text-xs sm:text-sm rounded-xl gap-2 min-h-[36px]',
      lg: 'h-11 px-5 text-sm sm:text-base rounded-xl gap-2.5 min-h-[44px]',
      icon: 'h-9 w-9 p-0 rounded-xl',
    };

    const variantStyles = {
      primary:
        'bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold shadow-[0_1px_14px_rgba(240,185,11,0.25)] border border-amber-300/50 hover:shadow-[0_2px_20px_rgba(240,185,11,0.4)]',
      secondary:
        'bg-zinc-800/90 text-zinc-100 hover:bg-zinc-700/90 hover:text-white border border-zinc-700/60 shadow-sm',
      outline:
        'border border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/90 hover:border-zinc-700 hover:text-white',
      subtle:
        'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/60 hover:text-white border border-zinc-800/60',
      ghost:
        'bg-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100 border border-transparent',
      destructive:
        'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 active:bg-red-500/30',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-3.5 w-3.5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
