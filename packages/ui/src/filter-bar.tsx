'use client';

import { useState } from 'react';
import { cn } from './utils';
import { SearchInput } from './search-input';
import { SlidersHorizontal, LayoutGrid, List, X, Filter } from 'lucide-react';

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  verificationFilter: string;
  onVerificationChange: (filter: string) => void;
  riskFilter?: string;
  onRiskChange?: (risk: string) => void;
  protocolFilter?: string;
  onProtocolChange?: (protocol: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
  resultCount?: number;
  className?: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  verificationFilter,
  onVerificationChange,
  riskFilter = 'ALL',
  onRiskChange,
  protocolFilter = 'ALL',
  onProtocolChange,
  sortOption,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  resultCount,
  className,
}: FilterBarProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeFilterCount =
    (verificationFilter !== 'ALL' ? 1 : 0) +
    (riskFilter !== 'ALL' ? 1 : 0) +
    (protocolFilter !== 'ALL' ? 1 : 0);

  return (
    <div className={cn('space-y-3 font-sans', className)}>
      {/* Desktop & Main Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-2xl border border-zinc-800/80 bg-[#0a0d15]/80 backdrop-blur-md">
        {/* Search Input (Left) */}
        <div className="flex-1 min-w-[240px]">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search agents by name or capability..."
            className="w-full bg-zinc-950/80 border-zinc-800/80"
          />
        </div>

        {/* Filter Controls (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 flex-wrap">
          {typeof resultCount === 'number' && (
            <span className="text-[11px] text-zinc-500 font-medium mr-1">
              {resultCount} {resultCount === 1 ? 'agent' : 'agents'}
            </span>
          )}

          {/* Verification Filter */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Trust:</span>
            <select
              value={verificationFilter}
              onChange={(e) => onVerificationChange(e.target.value)}
              className="h-9 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 focus:outline-none focus:border-amber-400/80 cursor-pointer transition-colors"
            >
              <option value="ALL">All Trust Tiers</option>
              <option value="ONCHAIN_VERIFIED">On-Chain Verified</option>
              <option value="PROTOCOL_VERIFIED">Protocol Verified</option>
              <option value="AGENT_REPORTED">Operator Reported</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          {onRiskChange && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span>Risk:</span>
              <select
                value={riskFilter}
                onChange={(e) => onRiskChange(e.target.value)}
                className="h-9 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 focus:outline-none focus:border-amber-400/80 cursor-pointer transition-colors"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="CONSERVATIVE">Conservative</option>
                <option value="MODERATE">Moderate</option>
                <option value="AGGRESSIVE">Aggressive</option>
              </select>
            </div>
          )}

          {/* Supported Protocol Filter */}
          {onProtocolChange && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span>Protocol:</span>
              <select
                value={protocolFilter}
                onChange={(e) => onProtocolChange(e.target.value)}
                className="h-9 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 focus:outline-none focus:border-amber-400/80 cursor-pointer transition-colors"
              >
                <option value="ALL">All Protocols</option>
                <option value="PANCAKESWAP">PancakeSwap</option>
                <option value="VENUS">Venus Protocol</option>
                <option value="BISWAP">Biswap</option>
              </select>
            </div>
          )}

          {/* Sorting Option */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-9 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 focus:outline-none focus:border-amber-400/80 cursor-pointer transition-colors"
            >
              <option value="RECOMMENDED">Recommended</option>
              <option value="MOST_TRUSTED">Most Trusted</option>
              <option value="BEST_PERFORMANCE" disabled>
                Best Performance (Upcoming)
              </option>
              <option value="LOWEST_COST" disabled>
                Lowest Cost (Upcoming)
              </option>
              <option value="MOST_ACTIVE" disabled>
                Most Active (Upcoming)
              </option>
              <option value="NEWEST">Newest Registration</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          {onViewModeChange && (
            <div className="flex items-center rounded-xl border border-zinc-800 p-0.5 bg-zinc-950 ml-1">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  'p-2 rounded-lg text-xs transition-colors cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('table')}
                className={cn(
                  'p-2 rounded-lg text-xs transition-colors cursor-pointer',
                  viewMode === 'table'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
                title="Table view"
                aria-label="Table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="flex lg:hidden items-center justify-between gap-2 pt-1 border-t border-zinc-800/60 lg:border-none lg:pt-0">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filters & Sorting</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-zinc-950 text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {onViewModeChange && (
            <div className="flex items-center rounded-xl border border-zinc-800 p-0.5 bg-zinc-950">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  'p-2 rounded-lg text-xs transition-colors',
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('table')}
                className={cn(
                  'p-2 rounded-lg text-xs transition-colors',
                  viewMode === 'table'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                )}
                title="Table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#0c0f18] p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">Filter & Sort Agents</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Verification Tier */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Trust Tier</label>
                <select
                  value={verificationFilter}
                  onChange={(e) => onVerificationChange(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs font-medium"
                >
                  <option value="ALL">All Trust Tiers</option>
                  <option value="ONCHAIN_VERIFIED">On-Chain Verified</option>
                  <option value="PROTOCOL_VERIFIED">Protocol Verified</option>
                  <option value="AGENT_REPORTED">Operator Reported</option>
                </select>
              </div>

              {/* Risk Level */}
              {onRiskChange && (
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-medium">Risk Profile</label>
                  <select
                    value={riskFilter}
                    onChange={(e) => onRiskChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs font-medium"
                  >
                    <option value="ALL">All Risk Levels</option>
                    <option value="CONSERVATIVE">Conservative</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="AGGRESSIVE">Aggressive</option>
                  </select>
                </div>
              )}

              {/* Sorting */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">Sort By</label>
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs font-medium"
                >
                  <option value="RECOMMENDED">Recommended</option>
                  <option value="MOST_TRUSTED">Most Trusted</option>
                  <option value="BEST_PERFORMANCE" disabled>
                    Best Performance (Upcoming)
                  </option>
                  <option value="LOWEST_COST" disabled>
                    Lowest Cost (Upcoming)
                  </option>
                  <option value="NEWEST">Newest Registration</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onVerificationChange('ALL');
                  onRiskChange?.('ALL');
                  onProtocolChange?.('ALL');
                  onSortChange('RECOMMENDED');
                }}
                className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 text-zinc-950 font-semibold text-xs hover:bg-amber-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
