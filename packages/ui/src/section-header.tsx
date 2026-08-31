import * as React from 'react';
import { cn } from './utils';

export interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  action,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2',
        align === 'center' && 'text-center md:text-center md:items-center',
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {badge && <div>{badge}</div>}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export interface PageHeaderProps {
  badge?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ badge, title, description, action, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'relative rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#0e121e]/90 to-[#070911]/90 p-6 sm:p-10 backdrop-blur-md overflow-hidden shadow-2xl',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {badge && <div>{badge}</div>}
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {description}
          </p>
        </div>

        {action && <div className="relative z-10 shrink-0">{action}</div>}
      </div>
    </div>
  );
}
