import * as React from 'react';
import { cn } from './utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  badge?: React.ReactNode;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function Tabs({ tabs, activeTab, onChange, className, size = 'md' }: TabsProps) {
  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-xs sm:text-sm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-xl border border-zinc-800/80 bg-[#090b12]/80 backdrop-blur-sm overflow-x-auto max-w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 select-none cursor-pointer whitespace-nowrap',
              sizeStyles[size],
              isActive
                ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 text-[10px] rounded-full font-mono font-medium',
                  isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                )}
              >
                {tab.count}
              </span>
            )}
            {tab.badge}
          </button>
        );
      })}
    </div>
  );
}
