'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AgentCategoriesList,
  CANONICAL_AGENTS,
  Agent,
} from '@agentx/domain';
import {
  CategoryCard,
  Tabs,
  Button,
  SectionHeader,
  VerificationBadge,
  FilterBar,
  AgentGrid,
} from '@agentx/ui';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('ALL');
  const [sortOption, setSortOption] = useState<string>('RECOMMENDED');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const intentExamples = [
    { label: 'Protect my lending position from liquidation', category: 'HEALTH_FACTOR', query: 'liquidation' },
    { label: 'Optimize my liquidity position', category: 'YIELD_OPTIMIZATION', query: 'liquidity' },
    { label: 'Run a BNB/USDT grid strategy', category: 'GRID_TRADING', query: 'grid' },
    { label: 'Find the best available yield', category: 'YIELD_OPTIMIZATION', query: 'yield' },
  ];

  const handleIntentClick = (intent: { label: string; category?: string; query: string }) => {
    setSearchQuery(intent.query);
    if (intent.category) {
      setSelectedCategory(intent.category);
    }
  };

  const categoryTabs = useMemo(
    () => [
      { id: 'ALL', label: 'All Categories' },
      { id: 'REBALANCING', label: 'Rebalancing' },
      { id: 'GRID_TRADING', label: 'Grid Trading' },
      { id: 'YIELD_OPTIMIZATION', label: 'Yield Optimization' },
      { id: 'HEALTH_FACTOR', label: 'Health Factor' },
    ],
    []
  );

  // Deterministic filtering across canonical agents
  const filteredAgents = useMemo(() => {
    return CANONICAL_AGENTS.filter((agent: Agent) => {
      // Category filter
      if (selectedCategory !== 'ALL' && agent.category !== selectedCategory) {
        return false;
      }
      // Verification filter
      if (selectedVerification !== 'ALL' && agent.verificationStatus !== selectedVerification) {
        return false;
      }
      // Search query filter (matches name, description, capabilities, or category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = agent.name.toLowerCase().includes(q);
        const matchesDesc = agent.description.toLowerCase().includes(q);
        const matchesCategory = agent.category.toLowerCase().includes(q);
        const matchesCap = agent.capabilities.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesCap) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedVerification]);

  return (
    <div className="space-y-20 font-sans">
      {/* 1. Hero Discovery Section */}
      <section className="relative text-center pt-8 sm:pt-14 pb-4 max-w-5xl mx-auto space-y-8">
        {/* Subtle Ambient Background Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Hero Top Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 text-amber-300 text-xs font-medium backdrop-blur-md shadow-[0_0_24px_rgba(240,185,11,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span>The intelligent marketplace for autonomous agents on BNB Chain</span>
        </div>

        {/* Primary Headline & Supporting Copy */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-sans leading-[1.08]">
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Find the right agent for the job.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed font-normal">
            Discover autonomous agents on BNB Chain, compare their capabilities and verified performance, and put them to work.
          </p>
        </div>

        {/* Prominent Marketplace Discovery Search Input */}
        <div className="pt-2 max-w-3xl mx-auto space-y-3">
          <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#0c0f18]/90 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl focus-within:border-amber-400/80 focus-within:ring-4 focus-within:ring-amber-400/10 transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <div className="pl-3 pr-2 text-zinc-400 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-400" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want an agent to do?"
              className="flex-1 bg-transparent px-2 py-2.5 text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-sans"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans cursor-pointer"
              >
                Clear
              </button>
            )}

            <Button variant="primary" size="md" className="rounded-xl px-5 ml-1 shrink-0">
              <span>Find Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-[11px] text-zinc-500">
            Describe the job, not the agent. Click any example to start:
          </div>

          {/* Prompt Task Intent Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-zinc-400 text-xs mr-1 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Examples:</span>
            </span>
            {intentExamples.map((intent) => (
              <button
                key={intent.label}
                type="button"
                onClick={() => handleIntentClick(intent)}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white hover:bg-zinc-800 transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none cursor-pointer active:scale-95 font-sans"
              >
                &ldquo;{intent.label}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Micro-Metrics Trust Ribbon */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto border-t border-zinc-800/60 text-left">
          <div className="p-3.5 rounded-xl border border-zinc-800/60 bg-[#0a0d15]/60 backdrop-blur-sm space-y-1">
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Archetypes</div>
            <div className="text-sm font-bold text-zinc-100 font-sans">4 Core Categories</div>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-800/60 bg-[#0a0d15]/60 backdrop-blur-sm space-y-1">
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Network</div>
            <div className="text-sm font-bold text-zinc-100 font-sans">BNB Chain (ID 56)</div>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-800/60 bg-[#0a0d15]/60 backdrop-blur-sm space-y-1">
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Data Standard</div>
            <div className="text-sm font-bold text-emerald-400 font-sans">Cryptographic Proof</div>
          </div>
          <div className="p-3.5 rounded-xl border border-zinc-800/60 bg-[#0a0d15]/60 backdrop-blur-sm space-y-1">
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Integrity Rule</div>
            <div className="text-sm font-bold text-amber-300 font-sans">Zero Synthetic Metrics</div>
          </div>
        </div>
      </section>

      {/* 2. Four First-Class Categories (Strictly Equal Visual Depth) */}
      <section className="space-y-6">
        <SectionHeader
          badge={
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Autonomous Archetypes
            </span>
          }
          title="First-Class Agent Categories"
          description="Explore specialized agent categories architected for distinct financial and operational tasks on BNB Chain."
          action={
            <Link href="/categories">
              <Button variant="outline" size="sm" className="gap-1.5">
                <span>All Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AgentCategoriesList.map((catKey) => {
            const routeSlug =
              catKey === 'YIELD_OPTIMIZATION'
                ? 'yield'
                : catKey.toLowerCase().replace('_', '-');

            return (
              <Link
                key={catKey}
                href={`/categories/${routeSlug}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl block group"
              >
                <CategoryCard category={catKey} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Marketplace Listing Interface (Prominent Direct Discovery) */}
      <section className="space-y-6">
        <SectionHeader
          badge={
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Marketplace Directory
            </span>
          }
          title="Explore Agents"
          description="Compare autonomous agents by capability, trust tier, risk profile, and performance on BNB Chain."
        />

        {/* Category Filter Tabs */}
        <div className="overflow-x-auto pb-1">
          <Tabs
            tabs={categoryTabs}
            activeTab={selectedCategory}
            onChange={(tabId) => setSelectedCategory(tabId)}
            size="sm"
          />
        </div>

        {/* Standardized Reusable Filter Bar */}
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
          resultCount={filteredAgents.length}
        />

        {/* Agent Grid Listing */}
        <AgentGrid
          agents={filteredAgents}
          emptyTitle="No matching agents found"
          emptyDescription="Try clearing your search query or adjusting your trust filter."
          emptyActionLabel="Clear Search Filter"
          emptyActionHref="/"
        />
      </section>

      {/* 4. Trust & Data Integrity System */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#0c0f1a] to-[#070910] p-8 sm:p-12 space-y-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Integrity Principle</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Never confuse claims with cryptographic proof.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            AgentX enforces a rigid 4-tier verification standard so you always know the exact origin and authenticity of performance telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="relative overflow-hidden p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-3 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
            <div className="flex items-center justify-between">
              <VerificationBadge status="ONCHAIN_VERIFIED" />
              <span className="text-[10px] font-semibold text-emerald-400 font-sans">TIER 1</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">On-Chain Verified</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Performance and identity are independently verified by on-chain transaction records on BNB Smart Chain.
            </p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-2xl border border-sky-500/30 bg-sky-950/10 space-y-3 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
            <div className="flex items-center justify-between">
              <VerificationBadge status="PROTOCOL_VERIFIED" />
              <span className="text-[10px] font-semibold text-sky-400 font-sans">TIER 2</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">Protocol Verified</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Performance is attested by integrated audited DeFi protocols and signed cryptographic oracle feeds.
            </p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-3 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            <div className="flex items-center justify-between">
              <VerificationBadge status="AGENT_REPORTED" />
              <span className="text-[10px] font-semibold text-amber-400 font-sans">TIER 3</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">Operator Reported</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Performance is reported directly by the agent operator and has not been independently verified on-chain.
            </p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-2xl border border-zinc-700/40 bg-zinc-900/30 space-y-3 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center justify-between">
              <VerificationBadge status="UNVERIFIED" />
              <span className="text-[10px] font-semibold text-zinc-400 font-sans">TIER 4</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">Unverified Claim</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Metadata is unverified or pending initial verification pipeline audit.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Why BNB Chain Autonomous Economy */}
      <section className="rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#0b0e18] to-[#07090e] p-8 sm:p-12 space-y-8">
        <SectionHeader
          badge={
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Infrastructural Superiority
            </span>
          }
          title="Engineered for High-Frequency DeFi Execution"
          description="Why BNB Smart Chain is the optimal execution environment for autonomous agents."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              3s
            </div>
            <h3 className="text-base font-semibold text-white">Sub-Second Finality</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              3-second block times ensure high-frequency grid strategies and liquidation defense agents execute before arbitrageurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              $0.05
            </div>
            <h3 className="text-base font-semibold text-white">Micro-Fee Efficiency</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Negligible gas cost enables continuous auto-compounding and micro-rebalancing without eroding capital yield.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-2.5">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              EVM
            </div>
            <h3 className="text-base font-semibold text-white">Deep Liquidity Routing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Direct interoperability with billions in PancakeSwap, Venus Protocol, and liquid staking liquidity pools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
