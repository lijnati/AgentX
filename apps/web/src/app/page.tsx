'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AgentCategoriesList,
  AgentCategory,
} from '@agentx/domain';
import {
  CategoryCard,
  Tabs,
  Button,
  EmptyState,
  SectionHeader,
  VerificationBadge,
} from '@agentx/ui';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutGrid,
  List,
  CheckCircle2,
  RefreshCw,
  BarChart2,
  TrendingUp,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Interactive Live Simulator state
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<AgentCategory>('REBALANCING');
  const [driftTolerance, setDriftTolerance] = useState<number>(2.5);
  const [gridSteps, setGridSteps] = useState<number>(12);
  const [compoundFrequency, setCompoundFrequency] = useState<string>('6h');
  const [healthFactorTarget, setHealthFactorTarget] = useState<number>(1.45);

  const intentExamples = [
    { label: 'Protect my lending position', category: 'HEALTH_FACTOR', query: 'liquidation' },
    { label: 'Optimize my liquidity', category: 'YIELD_OPTIMIZATION', query: 'liquidity' },
    { label: 'Run a BNB/USDT grid strategy', category: 'GRID_TRADING', query: 'grid' },
    { label: 'Find better yield', category: 'YIELD_OPTIMIZATION', query: 'yield' },
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

  return (
    <div className="space-y-24 font-sans">
      {/* 1. Hero Section */}
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

        {/* Hero Headline */}
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

        {/* Discovery Search Centerpiece */}
        <div className="pt-2 max-w-3xl mx-auto space-y-4">
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
                className="px-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
              >
                Clear
              </button>
            )}

            <Button variant="primary" size="md" className="rounded-xl px-5 ml-1 shrink-0">
              <span>Find Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Interactive Intent Task Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-zinc-400 text-xs mr-1 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Try asking:</span>
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

        {/* 2. Live Agent Simulation & Evaluation Cockpit (Interactive Craft Centerpiece) */}
        <div className="pt-6 max-w-4xl mx-auto text-left">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-[#0e121f]/95 via-[#090b13]/95 to-[#07090f]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
            {/* Top highlight line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Interactive Invariant Sandbox
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Simulate & Verify Agent Execution Outcome
                </h3>
                <p className="text-xs text-zinc-400">
                  Select an autonomous archetype below to inspect live execution parameters and cryptographic proof validation.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
                <span className="text-[11px] font-medium text-zinc-400 px-2 py-1">Chain:</span>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  BNB Smart Chain (56)
                </span>
              </div>
            </div>

            {/* Archetype Switcher Segment */}
            <div className="pt-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'REBALANCING', label: 'Rebalancing', icon: RefreshCw, accent: 'text-indigo-400' },
                  { key: 'GRID_TRADING', label: 'Grid Trading', icon: BarChart2, accent: 'text-amber-400' },
                  { key: 'YIELD_OPTIMIZATION', label: 'Yield Optimizer', icon: TrendingUp, accent: 'text-emerald-400' },
                  { key: 'HEALTH_FACTOR', label: 'Health Sentinel', icon: ShieldAlert, accent: 'text-purple-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeSimulatorTab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSimulatorTab(item.key as AgentCategory)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-[transform,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 text-white border-zinc-600 shadow-md shadow-black/40'
                          : 'bg-zinc-900/40 text-zinc-400 border-zinc-800/70 hover:bg-zinc-800/40 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? item.accent : 'text-zinc-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Archetype Simulation View */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Parameter Controls (1 col) */}
                <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      <span>Execution Parameters</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium">Non-Custodial</span>
                  </div>

                  {activeSimulatorTab === 'REBALANCING' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1.5">
                          <span>Drift Tolerance</span>
                          <span className="text-zinc-100 font-semibold">{driftTolerance}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="10.0"
                          step="0.5"
                          value={driftTolerance}
                          onChange={(e) => setDriftTolerance(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed">
                        Rebalance triggers when LP pool ratio drifts beyond {driftTolerance}%.
                      </div>
                    </div>
                  )}

                  {activeSimulatorTab === 'GRID_TRADING' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1.5">
                          <span>Grid Steps</span>
                          <span className="text-zinc-100 font-semibold">{gridSteps} orders</span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="30"
                          step="2"
                          value={gridSteps}
                          onChange={(e) => setGridSteps(parseInt(e.target.value, 10))}
                          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed">
                        Places {gridSteps} geometric buy/sell limit orders across PancakeSwap V3.
                      </div>
                    </div>
                  )}

                  {activeSimulatorTab === 'YIELD_OPTIMIZATION' && (
                    <div className="space-y-3 text-xs">
                      <div className="text-zinc-400">Compound Frequency:</div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['1h', '6h', '24h'].map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setCompoundFrequency(freq)}
                            className={`py-1.5 px-2 text-xs rounded-lg border font-semibold transition-colors ${
                              compoundFrequency === freq
                                ? 'bg-amber-400 text-zinc-950 border-amber-300'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                            }`}
                          >
                            Every {freq}
                          </button>
                        ))}
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed">
                        Harvests and auto-reinvests protocol rewards into primary collateral pool.
                      </div>
                    </div>
                  )}

                  {activeSimulatorTab === 'HEALTH_FACTOR' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1.5">
                          <span>Defense Trigger</span>
                          <span className="text-emerald-400 font-semibold">{healthFactorTarget}x HF</span>
                        </div>
                        <input
                          type="range"
                          min="1.10"
                          max="2.00"
                          step="0.05"
                          value={healthFactorTarget}
                          onChange={(e) => setHealthFactorTarget(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed">
                        Auto-repays loan when borrow health drops below {healthFactorTarget}x.
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Output Telemetry (2 cols) */}
                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                      Expected Gas Cost
                    </span>
                    <div className="text-xl font-bold text-zinc-100">
                      {activeSimulatorTab === 'REBALANCING' ? '$0.07' : activeSimulatorTab === 'GRID_TRADING' ? '$0.12' : activeSimulatorTab === 'YIELD_OPTIMIZATION' ? '$0.05' : '$0.09'}
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium">BNB Chain Optimized</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                      Response Latency
                    </span>
                    <div className="text-xl font-bold text-zinc-100">
                      {activeSimulatorTab === 'HEALTH_FACTOR' ? '420 ms' : '680 ms'}
                    </div>
                    <span className="text-[11px] text-zinc-400">Next-block inclusion</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                      Target Protocol
                    </span>
                    <div className="text-sm font-semibold text-white truncate">
                      {activeSimulatorTab === 'REBALANCING' ? 'PancakeSwap V3' : activeSimulatorTab === 'GRID_TRADING' ? 'PancakeSwap V3 Grid' : activeSimulatorTab === 'YIELD_OPTIMIZATION' ? 'Venus Protocol' : 'Venus Lending Vault'}
                    </div>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Smart Contract Verified</span>
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
                      Verification Level
                    </span>
                    <div className="pt-0.5">
                      <VerificationBadge status="ONCHAIN_VERIFIED" />
                    </div>
                    <span className="text-[11px] text-zinc-400">Cryptographic receipt</span>
                  </div>
                </div>
              </div>
            </div>
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

      {/* 3. Four First-Class Categories (Equal Visual Weight) */}
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
            return (
              <Link
                key={catKey}
                href={`/categories/${catKey.toLowerCase().replace('_', '-')}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl"
              >
                <CategoryCard category={catKey} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Marketplace Preview: Explore Agents */}
      <section className="space-y-6">
        <SectionHeader
          badge={
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Marketplace Directory
            </span>
          }
          title="Explore Agents"
          description="Compare autonomous agents by capability, trust, performance and cost."
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl border border-zinc-800/80 bg-[#0a0d15]/80 backdrop-blur-md">
          {/* Category Tabs */}
          <Tabs
            tabs={categoryTabs}
            activeTab={selectedCategory}
            onChange={(tabId) => setSelectedCategory(tabId)}
            size="sm"
          />

          {/* Secondary Filters & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Trust:</span>
              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="h-8 px-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 cursor-pointer font-sans"
              >
                <option value="ALL">All Verification Tiers</option>
                <option value="ONCHAIN_VERIFIED">On-Chain Verified</option>
                <option value="PROTOCOL_VERIFIED">Protocol Verified</option>
                <option value="AGENT_REPORTED">Operator Reported</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-zinc-800 p-0.5 bg-zinc-950">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State / Ready For Live Indexing */}
        <EmptyState
          icon={<Search className="h-6 w-6 text-zinc-400" />}
          title="Connecting to BNB Chain Agent Ecosystem"
          description="AgentX is ready to index autonomous agents across Rebalancing, Grid Trading, Yield Optimization, and Health Factor Monitoring. Verified agents will appear here with cryptographic telemetry and capability manifests."
          reason="Milestone 0 Foundation Active — Zero Synthetic/Fake Data Enforced"
          actionLabel="Explore Rebalancing Agents"
          actionHref="/categories/rebalancing"
          secondaryActionLabel="View Rankings Leaderboard"
          secondaryActionHref="/rankings"
        />
      </section>

      {/* 5. Trust & Data Integrity System Section */}
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
              Directly indexed and proved by BNB Smart Chain transaction receipts and smart contract state inspection.
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
              Attested by an audited integrated DeFi protocol or cryptographically signed oracle feed.
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
              Self-reported telemetry provided by the agent operator without cryptographic on-chain proof.
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
              Unsubstantiated metadata or pending initial verification pipeline validation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why BNB Chain Autonomous Economy */}
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
