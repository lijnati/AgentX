'use client';

import { AgentCapability, getCapabilityDefinition } from '@agentx/domain';
import { cn } from './utils';

export interface CapabilityBadgeProps {
  capability: AgentCapability;
  showRisk?: boolean;
  showExecutionScope?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function CapabilityBadge({
  capability,
  showRisk = false,
  showExecutionScope = false,
  size = 'sm',
  className,
}: CapabilityBadgeProps) {
  const def = getCapabilityDefinition(capability);

  const riskColors = {
    LOW: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    MEDIUM: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    HIGH: 'text-red-400 border-red-500/30 bg-red-500/10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-zinc-800/90 bg-zinc-900/80 font-sans text-zinc-300 transition-[border-color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-zinc-700 hover:text-white select-none',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className
      )}
      title={`${def.name}: ${def.shortDescription} (Risk: ${def.riskLevel}${
        def.requiresContractExecution ? ', Requires Smart Contract Execution' : ', Read-Only Telemetry'
      })`}
    >
      <span className="font-medium">{def.name}</span>

      {showRisk && (
        <span
          className={cn(
            'px-1.5 py-0.2 rounded text-[9px] font-semibold border uppercase',
            riskColors[def.riskLevel]
          )}
        >
          {def.riskLevel}
        </span>
      )}

      {showExecutionScope && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            def.requiresContractExecution ? 'bg-emerald-400' : 'bg-zinc-500'
          )}
          title={def.requiresContractExecution ? 'Executes On-Chain Transaction' : 'Read-Only'}
        />
      )}
    </span>
  );
}
