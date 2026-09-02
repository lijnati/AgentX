'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AgentCategory,
  AgentCapability,
  getCapabilityDefinition,
  getVerificationLabel,
  getVerificationDescription,
} from '@agentx/domain';
import {
  VerificationBadge,
  CategoryBadge,
  CapabilityBadge,
  AgentIdentity,
  Button,
  EmptyState,
} from '@agentx/ui';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CategorySlugMap {
  [key: string]: {
    name: string;
    description: string;
    category: AgentCategory;
    capabilities: AgentCapability[];
    identityAddress: string;
    ownerAddress: string;
    protocols: string[];
    contractTarget: string;
    estimatedCost: string;
  };
}

const PREVIEW_AGENTS: CategorySlugMap = {
  'venus-auto-compounder': {
    name: 'Venus APY Optimizer & Compounder',
    description:
      'Autonomous yield seeking algorithm that continuously monitors Venus Protocol lending pools, rotates collateral for optimal risk-adjusted APY, and auto-compounds earned rewards.',
    category: 'YIELD_OPTIMIZATION',
    capabilities: ['yield_discovery', 'liquidity_management', 'token_swap'],
    identityAddress: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    protocols: ['Venus Protocol', 'PancakeSwap V3', 'BNB Liquid Staking'],
    contractTarget: 'Venus Vault V2 (0x7e...2a)',
    estimatedCost: '$0.05 / compound tx',
  },
  'bnb-grid-master': {
    name: 'BNB/USDT Spread Harvester Grid',
    description:
      'High-frequency systematic grid execution agent that places geometric step-limit orders across BNB/USDT pools on PancakeSwap, capturing market volatility with strict slippage bounds.',
    category: 'GRID_TRADING',
    capabilities: ['market_monitoring', 'grid_execution', 'token_swap'],
    identityAddress: '0x9924E0a0c962CB723c1976a4421c95949bE2D111',
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    protocols: ['PancakeSwap V3', 'Biswap DEX'],
    contractTarget: 'Grid Router V1 (0x1f...9b)',
    estimatedCost: '$0.12 / grid step',
  },
  'pancake-lp-rebalancer': {
    name: 'PancakeSwap Dynamic LP Rebalancer',
    description:
      'Concentrated liquidity manager that monitors pool drift, harvests trading fees, and executes re-centering transactions when price deviates beyond target standard deviations.',
    category: 'REBALANCING',
    capabilities: ['market_monitoring', 'automated_rebalancing', 'token_swap'],
    identityAddress: '0x4424E0a0c962CB723c1976a4421c95949bE2D222',
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    protocols: ['PancakeSwap V3', 'Venus Protocol'],
    contractTarget: 'LP Manager V2 (0x8b...4c)',
    estimatedCost: '$0.07 / rebalance',
  },
  'liquidation-sentinel': {
    name: 'Venus Health Factor Sentinel',
    description:
      'Defensive collateral monitor on Venus Protocol that defends borrow positions against liquidation cascades by executing automated repayment or collateral top-ups.',
    category: 'HEALTH_FACTOR',
    capabilities: ['position_monitoring', 'liquidation_protection'],
    identityAddress: '0x7724E0a0c962CB723c1976a4421c95949bE2D333',
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    protocols: ['Venus Protocol', 'BNB Vault'],
    contractTarget: 'Health Guard V1 (0x3d...7e)',
    estimatedCost: '$0.09 / defense tx',
  },
};

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const agentSpec = PREVIEW_AGENTS[slug.toLowerCase()];

  if (!agentSpec) {
    notFound();
  }

  const verificationStatus = 'PROTOCOL_VERIFIED' as const;

  return (
    <div className="space-y-10 font-sans max-w-6xl mx-auto">
      {/* Back Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#0e121e]/90 to-[#090b12]/90 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl shadow-black/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={agentSpec.category} size="md" />
              <VerificationBadge status={verificationStatus} />
              <span className="text-xs text-zinc-500 font-medium">BNB Smart Chain (56)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
              {agentSpec.name}
            </h1>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {agentSpec.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <AgentIdentity address={agentSpec.identityAddress} label="Agent Identity" />
              <AgentIdentity address={agentSpec.ownerAddress} label="Owner" />
            </div>
          </div>

          {/* Primary Action Panel (Hiring & Simulation Activation Area) */}
          <div className="flex flex-col gap-3 shrink-0 p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm lg:w-80 shadow-lg">
            <div className="text-xs text-zinc-400 space-y-1">
              <div className="font-semibold text-zinc-200">Execution Readiness</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>BSC Mainnet Verified</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled
              className="w-full justify-center opacity-60 cursor-not-allowed"
              title="Hiring becomes available when this agent's execution interface is connected."
            >
              <Lock className="w-4 h-4 mr-1.5 text-zinc-900" />
              <span>Hire Agent</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full justify-center text-xs opacity-60 cursor-not-allowed"
              title="Outcome simulation connects with the execution runtime."
            >
              <span>Simulate Outcome</span>
            </Button>

            <p className="text-[11px] text-center text-zinc-500 leading-tight pt-1">
              Hiring becomes available when this agent&apos;s execution interface is connected.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Evaluation Sections: Should I hire this agent? */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: What it does, Capabilities, Risk, Performance */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. What this agent does */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              What This Agent Does
            </h2>
            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 text-sm text-zinc-300 leading-relaxed space-y-2">
              <p>{agentSpec.description}</p>
              <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-800/60">
                <span>Estimated Cost: <strong className="text-white">{agentSpec.estimatedCost}</strong></span>
                <span>•</span>
                <span>Custody: <strong className="text-emerald-400">Non-Custodial</strong></span>
              </div>
            </div>
          </section>

          {/* 2. Autonomous Capabilities & Permissions */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              Autonomous Capabilities & Permissions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agentSpec.capabilities.map((cap) => {
                const def = getCapabilityDefinition(cap);
                return (
                  <div
                    key={cap}
                    className="p-5 rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-100">{def.name}</span>
                      <CapabilityBadge capability={cap} showRisk />
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                      {def.shortDescription}
                    </p>
                    <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/60 flex items-center justify-between">
                      <span>Execution Scope:</span>
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
          </section>

          {/* 3. Performance & Provenance Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-100 font-sans">
                Performance Analytics & Provenance
              </h2>
              <VerificationBadge status={verificationStatus} />
            </div>

            <div className="p-6 rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>On-Chain Telemetry Indexing</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Performance metrics for this agent are awaiting verified execution receipt accumulation from BNB Smart Chain. AgentX enforces a strict zero-synthetic performance metrics policy.
              </p>
              <div className="pt-2 text-[11px] text-zinc-500 font-medium">
                Provenance Standard: Cryptographically Attested Event Stream (BSC Mainnet)
              </div>
            </div>
          </section>

          {/* 4. Risk & Safety Boundaries */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              Risk & Safety Boundaries
            </h2>
            <div className="p-5 rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-3 text-xs text-zinc-300 font-sans">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Non-Custodial Architecture:</strong> The agent never holds private keys to user funds. Capital remains inside user-controlled smart contracts or approved DeFi vault escrows.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Maximum Slippage Cap:</strong> Hardcoded execution constraint rejects transactions exceeding 0.50% slippage.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Emergency Stop Trigger:</strong> Instant pause capability accessible by contract owner or delegated emergency authority.
                </span>
              </div>
            </div>
          </section>

          {/* 5. Execution History Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              Execution History
            </h2>
            <EmptyState
              icon={<Clock className="h-5 w-5 text-zinc-400" />}
              title="Awaiting Execution Receipts"
              description="No on-chain transactions have been submitted for this agent specification yet. When execution begins, block hashes, gas costs, and state changes will appear in this verified ledger."
              reason="Data Integrity Policy — Live On-Chain Receipts Only"
            />
          </section>
        </div>

        {/* Right 1 Col: Why Trust It?, Supported Protocols & Reviews */}
        <div className="space-y-6">
          {/* Why Trust It? / Verification Evidence */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Why Trust It?</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-[11px] text-zinc-400">Verification Tier:</span>
                <div className="font-semibold text-sky-400">
                  {getVerificationLabel(verificationStatus)}
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-1">
                  {getVerificationDescription(verificationStatus)}
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400">
                <div className="flex justify-between">
                  <span>Target Contract:</span>
                  <span className="text-zinc-200 font-medium">{agentSpec.contractTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Audited Telemetry:</span>
                  <span className="text-emerald-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Attestation Method:</span>
                  <span className="text-zinc-300">Signed Event Stream</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supported DeFi Protocols */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Integrated Protocols
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {agentSpec.protocols.map((proto) => (
                <span
                  key={proto}
                  className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>

          {/* Proof-Backed Reviews Requirement */}
          <div className="rounded-2xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Verified Reviews
            </h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              AgentX reviews require proof of execution on BNB Chain. Reviews without valid transaction hashes cannot be submitted.
            </p>
            <div className="pt-1">
              <span className="text-[11px] text-zinc-500 font-medium">
                0 verified reviews for this instance
              </span>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ready to put this agent to work?</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Execution authorization and automated delegation will connect seamlessly upon execution runtime integration.
            </p>
            <Button
              variant="primary"
              size="md"
              disabled
              className="w-full justify-center opacity-60 cursor-not-allowed"
            >
              <span>Hire Agent</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
