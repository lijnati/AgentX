'use client';

import * as React from 'react';
import { VerificationStatus, AgentCategory, getVerificationLabel, getVerificationDescription } from '@agentx/domain';
import { cn } from './utils';
import { ShieldCheck, ShieldAlert, Cpu, HelpCircle } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'bnb' | 'subtle';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-zinc-800/90 text-zinc-200 border-zinc-700/60',
    secondary: 'bg-zinc-900 text-zinc-400 border-zinc-800',
    outline: 'bg-transparent text-zinc-300 border-zinc-700/80',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    destructive: 'bg-red-500/10 text-red-400 border-red-500/20',
    bnb: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    subtle: 'bg-zinc-800/50 text-zinc-400 border-transparent',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-full transition-colors select-none font-sans',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}

export interface VerificationBadgeProps {
  status: VerificationStatus;
  showIcon?: boolean;
  showDot?: boolean;
  className?: string;
}

export function VerificationBadge({
  status,
  showIcon = false,
  showDot = true,
  className,
}: VerificationBadgeProps) {
  const label = getVerificationLabel(status);
  const description = getVerificationDescription(status);

  switch (status) {
    case 'ONCHAIN_VERIFIED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-sans select-none',
            className
          )}
          title={`${label}: ${description}`}
        >
          {showDot && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          )}
          {showIcon && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
          <span>{label}</span>
        </span>
      );
    case 'PROTOCOL_VERIFIED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide rounded-full border bg-sky-500/10 text-sky-400 border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.12)] font-sans select-none',
            className
          )}
          title={`${label}: ${description}`}
        >
          {showDot && <span className="inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />}
          {showIcon && <ShieldAlert className="w-3 h-3 text-sky-400" />}
          <span>{label}</span>
        </span>
      );
    case 'AGENT_REPORTED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/30 font-sans select-none',
            className
          )}
          title={`${label}: ${description}`}
        >
          {showDot && <span className="inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />}
          {showIcon && <Cpu className="w-3 h-3 text-amber-400" />}
          <span>{label}</span>
        </span>
      );
    case 'UNVERIFIED':
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide rounded-full border bg-zinc-800/40 text-zinc-400 border-zinc-700/50 font-sans select-none',
            className
          )}
          title={`${label}: ${description}`}
        >
          {showDot && <span className="inline-flex rounded-full h-1.5 w-1.5 bg-zinc-500" />}
          {showIcon && <HelpCircle className="w-3 h-3 text-zinc-500" />}
          <span>{label}</span>
        </span>
      );
  }
}

export interface CategoryBadgeProps {
  category: AgentCategory;
  className?: string;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, className, size = 'sm' }: CategoryBadgeProps) {
  const styles: Record<AgentCategory, { label: string; className: string }> = {
    REBALANCING: {
      label: 'Rebalancing',
      className: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/50',
    },
    GRID_TRADING: {
      label: 'Grid Trading',
      className: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:border-amber-500/50',
    },
    YIELD_OPTIMIZATION: {
      label: 'Yield Optimization',
      className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/50',
    },
    HEALTH_FACTOR: {
      label: 'Health Factor',
      className: 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-500/50',
    },
  };

  const current = styles[category] || {
    label: category,
    className: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  };

  const sizeClass = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors select-none font-sans',
        current.className,
        sizeClass,
        className
      )}
    >
      {current.label}
    </span>
  );
}
