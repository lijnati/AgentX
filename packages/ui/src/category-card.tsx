'use client';

import React from 'react';
import { AgentCategory, CATEGORY_METADATA, getCapabilityDefinition } from '@agentx/domain';
import { cn } from './utils';
import { ArrowRight, RefreshCw, BarChart2, TrendingUp, ShieldAlert } from 'lucide-react';

export interface CategoryCardProps {
  category: AgentCategory;
  agentCount?: number;
  onExplore?: (category: AgentCategory) => void;
  className?: string;
}

export function CategoryCard({ category, agentCount, onExplore, className }: CategoryCardProps) {
  const meta = CATEGORY_METADATA[category];

  const config: Record<
    AgentCategory,
    {
      icon: React.ComponentType<{ className?: string }>;
      accentColor: string;
      accentBg: string;
      accentBorder: string;
      hoverGlow: string;
      badgeStyle: string;
    }
  > = {
    REBALANCING: {
      icon: RefreshCw,
      accentColor: 'text-indigo-400',
      accentBg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
      accentBorder: 'border-indigo-500/25 group-hover:border-indigo-500/50',
      hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]',
      badgeStyle: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    },
    GRID_TRADING: {
      icon: BarChart2,
      accentColor: 'text-amber-400',
      accentBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
      accentBorder: 'border-amber-500/25 group-hover:border-amber-500/50',
      hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(245,158,11,0.12)]',
      badgeStyle: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    },
    YIELD_OPTIMIZATION: {
      icon: TrendingUp,
      accentColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
      accentBorder: 'border-emerald-500/25 group-hover:border-emerald-500/50',
      hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]',
      badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    },
    HEALTH_FACTOR: {
      icon: ShieldAlert,
      accentColor: 'text-purple-400',
      accentBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
      accentBorder: 'border-purple-500/25 group-hover:border-purple-500/50',
      hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]',
      badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    },
  };

  const current = config[category];
  const Icon = current.icon;

  return (
    <div
      onClick={onExplore ? () => onExplore(category) : undefined}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#0d101a]/95 to-[#080a11]/95 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/90 hover:from-[#111624] hover:to-[#0a0d15] shadow-lg shadow-black/40',
        current.hoverGlow,
        onExplore && 'cursor-pointer',
        className
      )}
    >
      {/* Top subtle highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-opacity" />

      <div className="space-y-4">
        {/* Category Header with Icon & Risk Badge */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 shadow-inner group-hover:scale-105',
              current.accentBg,
              current.accentBorder
            )}
          >
            <Icon className={cn('h-5 w-5 transition-transform duration-300', current.accentColor)} />
          </div>

          <span
            className={cn(
              'text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border',
              current.badgeStyle
            )}
          >
            {meta.primaryRiskProfile} Risk
          </span>
        </div>

        {/* Title & One-line outcome tagline */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
            {meta.name}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
            {meta.tagline}
          </p>
        </div>

        {/* What this agent executes */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
            Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {meta.expectedCapabilities.map((cap) => {
              const def = getCapabilityDefinition(cap);
              return (
                <span
                  key={cap}
                  className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-md bg-zinc-900/80 text-zinc-300 border border-zinc-800/80 group-hover:border-zinc-700 transition-colors"
                >
                  {def.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / Explore CTA */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
        <span className="text-zinc-500 font-medium text-[11px]">
          {agentCount !== undefined ? `${agentCount} agents` : 'BNB Chain'}
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
          <span>Explore Agents</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
