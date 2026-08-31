'use client';

import React from 'react';
import { Agent, getCapabilityDefinition } from '@agentx/domain';
import { VerificationBadge, CategoryBadge } from './badge';
import { cn } from './utils';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export interface AgentCardProps {
  agent: Agent;
  onSelect?: (agent: Agent) => void;
  className?: string;
}

export function AgentCard({ agent, onSelect, className }: AgentCardProps) {
  const hasVerifiedExecutions =
    agent.performance.totalExecutions > 0 &&
    (agent.performance.verificationStatus === 'ONCHAIN_VERIFIED' ||
      agent.performance.verificationStatus === 'PROTOCOL_VERIFIED');

  return (
    <div
      onClick={onSelect ? () => onSelect(agent) : undefined}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#0d101a]/95 to-[#080a11]/95 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/90 hover:from-[#111624] hover:to-[#0a0d15] shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-black/60',
        onSelect && 'cursor-pointer',
        className
      )}
    >
      {/* Top subtle highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-opacity" />

      {/* Top Header: Category & Verification */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CategoryBadge category={agent.category} />
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
              BNB Chain
            </span>
          </div>
          <VerificationBadge status={agent.verificationStatus} />
        </div>

        {/* Agent Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
            {agent.description}
          </p>
        </div>

        {/* Capabilities Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {agent.capabilities.slice(0, 3).map((cap) => {
            const def = getCapabilityDefinition(cap);
            return (
              <span
                key={cap}
                className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-md bg-zinc-900/80 text-zinc-300 border border-zinc-800/80 group-hover:border-zinc-700 transition-colors"
                title={def.shortDescription}
              >
                {def.name}
              </span>
            );
          })}
          {agent.capabilities.length > 3 && (
            <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] rounded-md bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 font-medium">
              +{agent.capabilities.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Middle/Bottom: Performance Telemetry or Honest Awaiting State */}
      <div className="mt-6 space-y-3.5 pt-3.5 border-t border-zinc-800/60">
        {hasVerifiedExecutions ? (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-medium uppercase">Success Rate</span>
              <div className="font-semibold text-emerald-400 text-sm">
                {agent.performance.successRate.toFixed(1)}%
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-medium uppercase">Executions</span>
              <div className="font-semibold text-zinc-200 text-sm">
                {agent.performance.totalExecutions}
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-medium uppercase">Avg Cost</span>
              <div className="font-semibold text-zinc-200 text-sm">
                ${agent.performance.avgCostUsd.toFixed(2)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-zinc-400">
            <div className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Awaiting verified executions</span>
            </div>
            <span className="text-[10px] font-medium text-zinc-400">M0 INDEX</span>
          </div>
        )}

        {/* Card Footer: Short Address & CTA */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[11px] text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
            {agent.identityAddress.slice(0, 6)}...{agent.identityAddress.slice(-4)}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
            <span>View agent</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
