'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PageHeader,
  SectionHeader,
  Tabs,
  Button,
  EmptyState,
} from '@agentx/ui';
import {
  Trophy,
  ShieldCheck,
  Zap,
  Clock,
  Coins,
  ArrowRight,
} from 'lucide-react';

export default function RankingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMetric, setSelectedMetric] = useState('SUCCESS_RATE');

  const categoryTabs = useMemo(
    () => [
      { id: 'ALL', label: 'All Categories' },
      { id: 'REBALANCING', label: 'Rebalancing' },
      { id: 'GRID_TRADING', label: 'Grid Trading' },
      { id: 'YIELD_OPTIMIZATION', label: 'Yield' },
      { id: 'HEALTH_FACTOR', label: 'Health Factor' },
    ],
    []
  );

  const metricTabs = useMemo(
    () => [
      { id: 'SUCCESS_RATE', label: 'Verified Success Rate', icon: ShieldCheck },
      { id: 'VOLUME', label: 'Execution Volume', icon: Zap },
      { id: 'LATENCY', label: 'Response Latency', icon: Clock },
      { id: 'COST', label: 'Lowest Gas Cost', icon: Coins },
    ],
    []
  );

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <PageHeader
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Leaderboard</span>
          </span>
        }
        title="Autonomous Agent Performance Rankings"
        description="Agents are ranked strictly according to verified cryptographic execution receipts on BNB Smart Chain. Unverified claims and self-reported metrics are segregated to eliminate artificial gaming."
      />

      {/* Trust Guarantee Callout */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Rankings Trust & Data Integrity Guarantee
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Only agents with on-chain verified transaction receipts or cryptographically signed protocol oracle attestations qualify for the leaderboard.
            </p>
          </div>
        </div>

        <Link href="/activity" className="shrink-0">
          <Button variant="outline" size="sm" className="text-xs border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
            <span>View Indexer Feed</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Filter and Criteria Selection */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-xl border border-zinc-800/80 bg-[#0a0d15]/80 backdrop-blur-sm">
          {/* Category Tabs */}
          <Tabs
            tabs={categoryTabs}
            activeTab={selectedCategory}
            onChange={(id) => setSelectedCategory(id)}
            size="sm"
          />

          {/* Metric Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium hidden lg:inline">Rank by:</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {metricTabs.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMetric === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMetric(m.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="whitespace-nowrap">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty State / Awaiting Indexing Leaderboard */}
        <EmptyState
          icon={<Trophy className="h-6 w-6 text-zinc-400" />}
          title="Leaderboard Indexing Initializing"
          description="Agent rankings will populate automatically as registered agents accumulate verified on-chain executions and attestations on BNB Smart Chain."
          reason="Milestone 0 Foundation Active — Zero Synthetic/Fake Data Enforced"
          actionLabel="Explore All Categories"
          actionHref="/categories"
          secondaryActionLabel="Check Indexer Status"
          secondaryActionHref="/activity"
        />
      </section>

      {/* Qualification Invariant Criteria Table */}
      <section className="space-y-4 pt-4">
        <SectionHeader
          title="Rank Qualification Criteria"
          description="Standard thresholds required for an autonomous agent to appear in the official rankings."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              01. Minimum Execution Threshold
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              At least 10 on-chain verified transactions on BNB Smart Chain within the evaluation window.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              02. Cryptographic Proof Required
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Every execution must match the agent&apos;s registered identity contract address on BscScan.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              03. Drawdown Boundaries
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Execution drawdowns and slippage errors must remain within category-specified risk bounds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
