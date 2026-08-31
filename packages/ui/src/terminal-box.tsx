import * as React from 'react';
import { cn } from './utils';
import { VerificationStatus } from '@agentx/domain';
import { VerificationBadge } from './badge';
import { Copy, Check, ExternalLink } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    period?: string;
    isPositiveGood?: boolean;
  };
  verificationStatus?: VerificationStatus;
  className?: string;
  subtext?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  change,
  verificationStatus,
  className,
  subtext,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded border border-zinc-800 bg-zinc-950/70 p-4 transition-all hover:border-zinc-700',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
          {label}
        </span>
        {verificationStatus && (
          <VerificationBadge status={verificationStatus} showIcon={false} />
        )}
      </div>

      <div className="flex items-baseline gap-1.5 font-mono">
        <span className="text-xl font-bold tracking-tight text-zinc-100">{value}</span>
        {unit && <span className="text-xs text-zinc-400 font-medium">{unit}</span>}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
        {change && (
          <span
            className={cn(
              'inline-flex items-center font-medium',
              change.value > 0 ? 'text-emerald-400' : change.value < 0 ? 'text-red-400' : 'text-zinc-400'
            )}
          >
            {change.value > 0 ? '+' : ''}
            {change.value}%
            {change.period && <span className="text-zinc-500 ml-1">({change.period})</span>}
          </span>
        )}
        {subtext && <span className="text-zinc-400 text-[11px] truncate">{subtext}</span>}
      </div>
    </div>
  );
}

export interface TerminalBoxProps {
  title?: string;
  statusLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalBox({
  title = 'AGENT TELEMETRY',
  statusLabel = 'LIVE',
  children,
  className,
}: TerminalBoxProps) {
  return (
    <div className={cn('rounded border border-zinc-800 bg-zinc-950 font-mono text-xs shadow-md', className)}>
      <div className="flex items-center justify-between border-b border-zinc-800/90 px-3 py-2 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-zinc-300 font-semibold tracking-wider uppercase ml-1">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">{statusLabel}</span>
        </div>
      </div>
      <div className="p-3 overflow-x-auto text-zinc-300 space-y-1">{children}</div>
    </div>
  );
}

export interface CodeHashProps {
  hash: string;
  href?: string;
  leadingChars?: number;
  trailingChars?: number;
  className?: string;
}

export function CodeHash({
  hash,
  href,
  leadingChars = 6,
  trailingChars = 4,
  className,
}: CodeHashProps) {
  const [copied, setCopied] = React.useState(false);

  const short =
    hash.length > leadingChars + trailingChars
      ? `${hash.slice(0, leadingChars)}...${hash.slice(-trailingChars)}`
      : hash;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <span className={cn('inline-flex items-center gap-1 font-mono text-xs text-zinc-300', className)}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
        >
          <span>{short}</span>
          <ExternalLink className="w-3 h-3 text-zinc-500" />
        </a>
      ) : (
        <span>{short}</span>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className="p-1 hover:text-zinc-100 text-zinc-500 transition-colors rounded hover:bg-zinc-800"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      </button>
    </span>
  );
}
