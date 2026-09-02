'use client';

import React from 'react';
import { cn } from './utils';
import { Search, X } from 'lucide-react';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  showShortcut?: boolean;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  showShortcut = true,
  placeholder = 'Search by agent name or capability...',
  className,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn(
        'relative flex items-center rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 shadow-inner transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-400/10',
        className
      )}
    >
      <Search className="w-4 h-4 text-zinc-500 shrink-0 mr-2 pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-sans"
        {...props}
      />

      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          aria-label="Clear search query"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : showShortcut ? (
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-1.5 text-[10px] text-zinc-500 font-medium select-none pointer-events-none">
          ⌘K
        </kbd>
      ) : null}
    </div>
  );
}
