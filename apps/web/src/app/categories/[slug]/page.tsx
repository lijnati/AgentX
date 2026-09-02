'use client';

import React, { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AgentCategory,
  CAPABILITY_DEFINITIONS,
  getCategoryMetadata,
  CANONICAL_AGENTS,
  Agent,
} from '@agentx/domain';
import {
  CategoryBadge,
  PageHeader,
  SectionHeader,
  FilterBar,
  AgentGrid,
  CapabilityBadge,
} from '@agentx/ui';
import {
  ArrowLeft,
  ShieldCheck,
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<string>('RECOMMENDED');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter canonical agents for this specific category
  const categoryAgents = useMemo(() => {
    return CANONICAL_AGENTS.filter((agent: Agent) => {
      if (agent.category !== categoryKey) {
        return false;
      }
      if (selectedVerification !== 'ALL' && agent.verificationStatus !== selectedVerification) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = agent.name.toLowerCase().includes(q);
        const matchesDesc = agent.description.toLowerCase().includes(q);
        const matchesCap = agent.capabilities.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCap) {
          return false;
        }
      }
      return true;
    });
  }, [categoryKey, searchQuery, selectedVerification]);

  return (
    <div className="space-y-12 font-sans">
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

      {/* 1. Category Header */}
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

      {/* 2. AVAILABLE AGENTS DIRECTORY (FIRST IN PRIORITY) */}
      <section className="space-y-6">
        <SectionHeader
          title={`Available ${meta.name} Agents`}
          description={`Browse and evaluate active autonomous agents specialized in ${meta.name.toLowerCase()} on BNB Chain.`}
        />

        {/* Filter & Search Controls */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          verificationFilter={selectedVerification}
          onVerificationChange={setSelectedVerification}
          riskFilter={selectedRisk}
          onRiskChange={setSelectedRisk}
          protocolFilter={selectedProtocol}
          onProtocolChange={setSelectedProtocol}
          sortOption={sortOption}
          onSortChange={setSortOption}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={categoryAgents.length}
        />

        {/* Agent Cards Grid */}
        <AgentGrid
          agents={categoryAgents}
          emptyTitle={`No matching ${meta.name} agents found`}
          emptyDescription={`Try adjusting your search criteria or trust tier filter.`}
          emptyActionLabel="View All Categories"
          emptyActionHref="/categories"
        />
      </section>

      {/* 3. Category Capabilities & Scope (Secondary Information) */}
      <section className="space-y-6 pt-4 border-t border-zinc-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expected Capabilities (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <SectionHeader
              title="Category Execution Capabilities"
              description={`Key tasks and smart contract actions ${meta.name.toLowerCase()} agents can execute.`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {meta.expectedCapabilities.map((cap) => {
                const def = CAPABILITY_DEFINITIONS[cap];
                return (
                  <div
                    key={cap}
                    className="rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 p-4 space-y-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-100">{def.name}</span>
                      <CapabilityBadge capability={cap} showRisk />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                      {def.shortDescription}
                    </p>
                    <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/60 flex items-center justify-between">
                      <span>Scope:</span>
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

          {/* Standard Telemetry & Verification (1 col) */}
          <div className="space-y-4">
            <SectionHeader
              title="How Performance is Proven"
              description="Metrics indexed from on-chain receipts."
            />

            <div className="rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Standardized Invariants</span>
              </div>

              <ul className="space-y-2.5 text-xs font-sans">
                {meta.standardMetrics.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-center justify-between border-b border-zinc-800/60 pb-2 text-zinc-300"
                  >
                    <span>{metric}</span>
                    <span className="text-emerald-400 font-medium text-[11px]">
                      Verified on Receipt
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 text-[11px] text-zinc-500 leading-relaxed">
                Verified execution history helps you evaluate whether this agent actually works before hiring.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
