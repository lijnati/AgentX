'use client';

import { VerificationStatus } from '@agentx/domain';
import { VerificationBadge } from './badge';
import { cn } from './utils';

export interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    period?: string;
  };
  verificationStatus?: VerificationStatus;
  subtext?: string;
  className?: string;
}

export function Metric({
  label,
  value,
  unit,
  change,
  verificationStatus,
  subtext,
  className,
}: MetricProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#0d101a]/95 to-[#080a11]/95 p-5 backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:from-[#101422] shadow-lg shadow-black/40',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          {label}
        </span>
        {verificationStatus && (
          <VerificationBadge status={verificationStatus} showIcon={false} />
        )}
      </div>

      <div className="flex items-baseline gap-1.5 font-sans">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">{value}</span>
        {unit && <span className="text-xs text-zinc-400 font-medium">{unit}</span>}
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        {change && (
          <span
            className={cn(
              'font-semibold',
              change.value > 0
                ? 'text-emerald-400'
                : change.value < 0
                ? 'text-red-400'
                : 'text-zinc-400'
            )}
          >
            {change.value > 0 ? '+' : ''}
            {change.value}%
            {change.period && <span className="text-zinc-500 ml-1">({change.period})</span>}
          </span>
        )}
        {subtext && <span className="text-zinc-400 text-[11px] truncate font-sans">{subtext}</span>}
      </div>
    </div>
  );
}
