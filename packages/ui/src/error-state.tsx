'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from './utils';
import { Button } from './button';
import { AlertCircle, RefreshCw, ArrowLeft, Database, WifiOff, FileQuestion } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ErrorState({
  title = 'Data Temporarily Unavailable',
  message = 'We could not load this information from the indexer node right now. Please check your network or try again.',
  onRetry,
  actionHref,
  actionLabel,
  icon,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-red-500/20 bg-red-950/10 backdrop-blur-sm font-sans',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mb-3 shadow-inner">
        {icon || <AlertCircle className="h-6 w-6" />}
      </div>

      <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">{message}</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            <span>Try Again</span>
          </Button>
        )}

        {actionHref && actionLabel && (
          <Link href={actionHref}>
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              <span>{actionLabel}</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function MarketplaceUnavailableError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      icon={<Database className="h-6 w-6" />}
      title="Marketplace Data Temporarily Unavailable"
      message="Unable to communicate with the BNB Smart Chain indexer. Data integrity rules prevent displaying unverified cached state."
      onRetry={onRetry}
      actionHref="/"
      actionLabel="Return to Marketplace"
    />
  );
}

export function AgentUnavailableError({ slug }: { slug?: string }) {
  return (
    <ErrorState
      icon={<FileQuestion className="h-6 w-6" />}
      title="Agent Specification Not Found"
      message={`No registered agent matching "${slug || 'the requested identity'}" exists in the verified database.`}
      actionHref="/categories"
      actionLabel="Explore Categories"
    />
  );
}

export function BlockchainUnavailableError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      icon={<WifiOff className="h-6 w-6" />}
      title="BNB Smart Chain RPC Offline"
      message="Cannot verify smart contract bytecodes or event receipts at this moment. Please check network connection."
      onRetry={onRetry}
    />
  );
}
