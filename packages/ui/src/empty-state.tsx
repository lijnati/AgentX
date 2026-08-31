'use client';

import * as React from 'react';
import { cn } from './utils';
import { Button } from './button';
import { Inbox, ShieldCheck } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  reason?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  reason,
  actionLabel,
  actionHref,
  onAction,
  secondaryActionLabel,
  secondaryActionHref,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-zinc-800/80 bg-[#0c0e17]/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 mb-4 shadow-inner">
        {icon ?? <Inbox className="h-6 w-6 text-zinc-400" />}
      </div>

      <h3 className="text-base font-semibold text-zinc-100 max-w-md">{title}</h3>
      <p className="mt-1.5 text-xs text-zinc-400 max-w-md leading-relaxed font-sans">
        {description}
      </p>

      {reason && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
          <span>{reason}</span>
        </div>
      )}

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionLabel && (
            actionHref ? (
              <a href={actionHref}>
                <Button variant="primary" size="sm">
                  {actionLabel}
                </Button>
              </a>
            ) : onAction ? (
              <Button variant="primary" size="sm" onClick={onAction}>
                {actionLabel}
              </Button>
            ) : null
          )}
          {secondaryActionLabel && (
            secondaryActionHref ? (
              <a href={secondaryActionHref}>
                <Button variant="outline" size="sm">
                  {secondaryActionLabel}
                </Button>
              </a>
            ) : onSecondaryAction ? (
              <Button variant="outline" size="sm" onClick={onSecondaryAction}>
                {secondaryActionLabel}
              </Button>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
