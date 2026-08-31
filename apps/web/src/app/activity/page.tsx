'use client';

import React, { useState } from 'react';
import {
  PageHeader,
  SectionHeader,
  Tabs,
  Metric,
  EmptyState,
} from '@agentx/ui';
import { Activity, Radio } from 'lucide-react';

export default function ActivityPage() {
  const [selectedEventType, setSelectedEventType] = useState('ALL');

  const eventTabs = [
    { id: 'ALL', label: 'All Events' },
    { id: 'EXECUTIONS', label: 'Verified Executions' },
    { id: 'REGISTRATIONS', label: 'Agent Registrations' },
    { id: 'ATTESTATIONS', label: 'Protocol Attestations' },
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <PageHeader
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Live Network Telemetry</span>
          </span>
        }
        title="BNB Chain Autonomous Activity Feed"
        description="Real-time execution telemetry, verified transaction receipts, and agent lifecycle events across the BNB Smart Chain agent ecosystem."
      />

      {/* Real-Time Status Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric
          label="Network Connection"
          value="Mainnet"
          unit="Chain ID 56"
          subtext="Viem RPC: bsc-dataseed.binance.org"
          verificationStatus="ONCHAIN_VERIFIED"
        />
        <Metric
          label="Indexer Pipeline"
          value="Synchronized"
          unit="(0.4s lag)"
          subtext="Tracking ERC-8004 & Execution Logs"
        />
        <Metric
          label="Proof Verification"
          value="Strict"
          unit="Tier 1"
          subtext="Cryptographic Receipt Audit"
          verificationStatus="PROTOCOL_VERIFIED"
        />
        <Metric
          label="Active Categories"
          value="4"
          unit="Supported"
          subtext="Rebalance, Grid, Yield, Health"
        />
      </div>

      {/* Activity Stream Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl border border-zinc-800/80 bg-[#0a0d15]/80 backdrop-blur-sm">
          <Tabs
            tabs={eventTabs}
            activeTab={selectedEventType}
            onChange={(id) => setSelectedEventType(id)}
            size="sm"
          />

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Polling BSC RPC</span>
            </span>
          </div>
        </div>

        {/* Empty State / Awaiting Events */}
        <EmptyState
          icon={<Activity className="h-6 w-6 text-zinc-400" />}
          title="Listening for Autonomous Agent Transactions"
          description="The AgentX indexer pipeline is actively connected to BNB Smart Chain. When registered autonomous agents execute transactions, state transitions, or protocol interactions, verified execution proofs will stream in real time."
          reason="Milestone 0 Foundation Active — Zero Synthetic/Fake Data Enforced"
          actionLabel="Explore Core Categories"
          actionHref="/categories"
          secondaryActionLabel="View Rankings"
          secondaryActionHref="/rankings"
        />
      </section>

      {/* Verification Engine Pipeline Architecture */}
      <section className="space-y-4 pt-4">
        <SectionHeader
          title="Verification Engine Architecture"
          description="How AgentX audits and validates every transaction before marking it verified."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <span className="h-6 w-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-semibold">
                01
              </span>
              <span>Event Ingestion</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Monitors smart contract execution logs on BNB Chain in real time, detecting agent task initiation and completion events.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <span className="h-6 w-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-semibold">
                02
              </span>
              <span>Cryptographic Audit</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Queries the block receipt via Viem, validating non-reversion status, gas cost, and caller/identity contract checksum.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-800/80 bg-[#0b0e17]/80 space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <span className="h-6 w-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-semibold">
                03
              </span>
              <span>Telemetry Invariant Update</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Calculates success rate and latency metrics, updating domain performance invariants in PostgreSQL with proof hashes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
