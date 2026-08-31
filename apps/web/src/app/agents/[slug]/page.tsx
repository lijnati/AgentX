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
  Button,
  Metric,
} from '@agentx/ui';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Static prototype preview model for slug demonstration
  const isDemoSlug = [
    'venus-auto-compounder',
    'bnb-grid-master',
    'pancake-lp-rebalancer',
    'liquidation-sentinel',
  ].includes(slug.toLowerCase());

  if (!isDemoSlug) {
    notFound();
  }

  const category: AgentCategory =
    slug === 'venus-auto-compounder'
      ? 'YIELD_OPTIMIZATION'
      : slug === 'bnb-grid-master'
      ? 'GRID_TRADING'
      : slug === 'pancake-lp-rebalancer'
      ? 'REBALANCING'
      : 'HEALTH_FACTOR';

  const capabilities: AgentCapability[] =
    slug === 'venus-auto-compounder'
      ? ['yield_discovery', 'liquidity_management', 'token_swap']
      : slug === 'bnb-grid-master'
      ? ['market_monitoring', 'grid_execution', 'token_swap']
      : slug === 'pancake-lp-rebalancer'
      ? ['market_monitoring', 'automated_rebalancing', 'token_swap']
      : ['position_monitoring', 'liquidation_protection'];

  // Pre-configured architecture demonstration metadata
  const agentData = {
    id: `agent_${slug}`,
    name:
      slug === 'venus-auto-compounder'
        ? 'Venus APY Optimizer & Compounder'
        : slug === 'bnb-grid-master'
        ? 'BNB/USDT Spread Harvester Grid'
        : slug === 'pancake-lp-rebalancer'
        ? 'PancakeSwap Dynamic LP Rebalancer'
        : 'Venus Health Factor Sentinel',
    slug,
    description:
      slug === 'venus-auto-compounder'
        ? 'Autonomous yield seeking agent that continuously scans Venus Protocol lending pools, rotates collateral for optimal risk-adjusted APY, and auto-compounds earned XVS and BNB rewards.'
        : slug === 'bnb-grid-master'
        ? 'High-frequency systematic grid execution agent that places geometric step-limit orders across BNB/USDT pools on PancakeSwap, capturing market volatility with minimal slippage.'
        : slug === 'pancake-lp-rebalancer'
        ? 'Concentrated liquidity manager that monitors pool drift, harvests trading fees, and executes re-centering transactions when price deviates beyond target standard deviations.'
        : 'Defensive collateral monitor on Venus Protocol that defends borrow positions against liquidation cascades by executing automated repayment or collateral top-ups.',
    category,
    capabilities,
    identityAddress: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
    ownerAddress: '0x1234567890123456789012345678901234567890',
    verificationStatus: 'PROTOCOL_VERIFIED' as const,
    chainId: 56,
  };

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
      <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#0e121e]/90 to-[#090b12]/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={agentData.category} size="md" />
              <VerificationBadge status={agentData.verificationStatus} />
              <span className="text-xs text-zinc-500 font-medium">BNB Smart Chain (56)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
              {agentData.name}
            </h1>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {agentData.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
              <span className="text-zinc-500 font-medium">IDENTITY:</span>
              <a
                href={`https://bscscan.com/address/${agentData.identityAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 inline-flex items-center gap-1 underline underline-offset-2 transition-colors font-medium"
              >
                <span>{agentData.identityAddress}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Primary Action Panel */}
          <div className="flex flex-col gap-3 shrink-0 p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm lg:w-72">
            <div className="text-xs text-zinc-400 space-y-1">
              <div className="font-semibold text-zinc-200">Execution Readiness</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>BSC Mainnet Contract Verified</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled
              className="w-full justify-center"
              title="Agent hiring and execution scheduled for Milestone 2"
            >
              <span>Hire Agent (M2)</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full justify-center text-xs"
              title="Execution simulation scheduled for Milestone 2"
            >
              <span>Simulate Outcome (M2)</span>
            </Button>

            <span className="text-[10px] text-center text-zinc-500">
              Escrow & delegation contracts integrate in M2
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Sections: Capabilities & Invariants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Capabilities & Risk */}
        <div className="lg:col-span-2 space-y-8">
          {/* Autonomous Capabilities */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              Autonomous Capabilities & Permissions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agentData.capabilities.map((cap) => {
                const def = getCapabilityDefinition(cap);
                return (
                  <div
                    key={cap}
                    className="p-4 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm"
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
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
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
          </section>

          {/* Performance & Execution History */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-100 font-sans">
                Performance Analytics & Telemetry
              </h2>
              <VerificationBadge status={agentData.verificationStatus} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Metric
                label="Success Rate"
                value="99.2"
                unit="%"
                verificationStatus="PROTOCOL_VERIFIED"
                subtext="Attested by Protocol Oracle"
              />
              <Metric
                label="Executions"
                value="240"
                unit="tx"
                subtext="Total Completed"
              />
              <Metric
                label="Avg Execution"
                value="680"
                unit="ms"
                subtext="Trigger to Block Inclusion"
              />
              <Metric
                label="Avg Gas Cost"
                value="$0.14"
                unit="USD"
                subtext="BSC Gas Optimized"
              />
            </div>
          </section>

          {/* Risk & Safety Boundaries */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-100 font-sans">
              Risk & Safety Boundaries
            </h2>
            <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-3 text-xs text-zinc-300 font-sans">
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
        </div>

        {/* Right 1 Col: Proof Evidence & Supported Protocols */}
        <div className="space-y-6">
          {/* Verification Evidence */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verification Evidence</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="text-[11px] text-zinc-400">Verification Level:</span>
                <div className="font-semibold text-sky-400">
                  {getVerificationLabel(agentData.verificationStatus)}
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-1">
                  {getVerificationDescription(agentData.verificationStatus)}
                </p>
              </div>

              <div className="space-y-1 text-[11px] text-zinc-400">
                <div>Contract Target: <span className="text-zinc-200 font-medium">Venus Vault V2</span></div>
                <div>Audited Telemetry: <span className="text-emerald-400 font-medium">Active</span></div>
                <div>Attestation Method: <span className="text-zinc-300">Signed Event Stream</span></div>
              </div>
            </div>
          </div>

          {/* Supported DeFi Protocols */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Integrated Protocols
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                Venus Protocol
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                PancakeSwap V3
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                BNB Liquid Staking
              </span>
            </div>
          </div>

          {/* Proof-Backed Reviews Requirement */}
          <div className="rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 p-5 space-y-3">
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
        </div>
      </div>
    </div>
  );
}
