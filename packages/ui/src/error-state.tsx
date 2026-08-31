import { cn } from './utils';
import { Button } from './button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Data Temporarily Unavailable',
  message = 'We could not load this information from the indexer node right now. Please check your network or try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-xl border border-red-500/20 bg-red-950/10 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 mb-3">
        <AlertCircle className="h-5 w-5" />
      </div>

      <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
      <p className="mt-1 text-xs text-zinc-400 max-w-sm leading-relaxed">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
}
