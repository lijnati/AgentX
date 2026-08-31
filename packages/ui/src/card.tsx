import * as React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-zinc-800/80 bg-[#0c0e16]/80 text-zinc-100 shadow-sm backdrop-blur-sm transition-all duration-200',
        hoverEffect && 'hover:border-zinc-700 hover:bg-[#0f121d] hover:shadow-md hover:shadow-black/30',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-5 border-b border-zinc-800/60', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base font-semibold tracking-tight text-zinc-100 font-sans', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-xs text-zinc-400 font-sans leading-relaxed', className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center p-5 border-t border-zinc-800/60 bg-zinc-950/20 text-xs text-zinc-400',
        className
      )}
      {...props}
    />
  );
}
