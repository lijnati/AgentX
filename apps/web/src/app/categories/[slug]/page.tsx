'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AgentCategory,
  CAPABILITY_DEFINITIONS,
  getCategoryMetadata,
} from '@agentx/domain';
import {
  CategoryBadge,
  PageHeader,
  SectionHeader,
  EmptyState,
} from '@agentx/ui';
import {
  ArrowLeft,
  Activity,
  Layers,
} from 'lucide-react';

interface CategorySlugMap {
  [key: string]: AgentCategory;
}

const SLUG_TO_CATEGORY: CategorySlugMap = {
  rebalancing: 'REBALANCING',
  'grid-trading': 'GRID_TRADING',
  'yield-optimization': 'YIELD_OPTIMIZATION',
  yield: 'YIELD_OPTIMIZATION',
  'health-factor': 'HEALTH_FACTOR',
};

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const categoryKey = SLUG_TO_CATEGORY[slug.toLowerCase()];

  if (!categoryKey) {
    notFound();
  }

  const meta = getCategoryMetadata(categoryKey);

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Categories</span>
        </Link>
      </div>

      {/* Page Header */}
      <PageHeader
        badge={<CategoryBadge category={categoryKey} size="md" />}
        title={meta.name}
        description={meta.description}
        action={
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                meta.primaryRiskProfile === 'CONSERVATIVE'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : meta.primaryRiskProfile === 'MODERATE'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {meta.primaryRiskProfile} Risk Profile
            </span>
          </div>
        }
      />

      {/* Required Capabilities & Telemetry Invariants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expected Capabilities (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader
            title="Expected Autonomous Capabilities"
            description="Agents registered under this category must declare and implement these core functional competencies."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {meta.expectedCapabilities.map((cap) => {
              const def = CAPABILITY_DEFINITIONS[cap];
              return (
                <div
                  key={cap}
                  className="rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 p-4 space-y-2 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-100">{def.name}</span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        def.riskLevel === 'HIGH'
                          ? 'text-red-400 border-red-500/30 bg-red-500/10'
                          : def.riskLevel === 'MEDIUM'
                          ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                          : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                      }`}
                    >
                      {def.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {def.shortDescription}
                  </p>
                  <div className="pt-1 text-[11px] text-zinc-500">
                    Scope:{' '}
                    {def.requiresContractExecution ? (
                      <span className="text-emerald-400 font-medium">Smart Contract State</span>
                    ) : (
                      <span className="text-zinc-400">Read-Only Telemetry</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Telemetry Invariants (1 col) */}
        <div className="space-y-4">
          <SectionHeader
            title="Standard Telemetry"
            description="Metrics indexed from on-chain receipts."
          />

          <div className="rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Standard Invariants</span>
            </div>

            <ul className="space-y-2.5 text-xs font-sans">
              {meta.standardMetrics.map((metric) => (
                <li
                  key={metric}
                  className="flex items-center justify-between border-b border-zinc-800/60 pb-2 text-zinc-300"
                >
                  <span>{metric}</span>
                  <span className="text-emerald-400 font-medium text-[11px]">
                    Standardized
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-[11px] text-zinc-500 leading-relaxed">
              * Invariants are computed across block receipts and protocol oracles without human alteration.
            </div>
          </div>
        </div>
      </div>

      {/* Category Agent Marketplace Grid */}
      <section className="space-y-6">
        <SectionHeader
          title={`${meta.name} Directory`}
          description={`Browse active autonomous agents specialized in ${meta.name.toLowerCase()} on BNB Chain.`}
        />

        {/* Empty state ready for indexing */}
        <EmptyState
          icon={<Layers className="h-6 w-6 text-zinc-400" />}
          title={`Awaiting Indexed ${meta.name} Agents`}
          description={`No ${meta.name.toLowerCase()} agents are currently registered in the database. When operators register agents via ERC-8004 identity or on-chain manifests, they will be verified and displayed here.`}
          reason="Milestone 0 Foundation Active — Zero Synthetic/Fake Data Enforced"
          actionLabel="View All Categories"
          actionHref="/categories"
          secondaryActionLabel="Explore Marketplace"
          secondaryActionHref="/"
        />
      </section>
    </div>
  );
}
