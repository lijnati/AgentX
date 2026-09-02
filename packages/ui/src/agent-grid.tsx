'use client';

import { Agent } from '@agentx/domain';
import { AgentCard } from './agent-card';
import { AgentCardSkeleton } from './loading-state';
import { EmptyState } from './empty-state';
import { cn } from './utils';
import { Search } from 'lucide-react';

export interface AgentGridProps {
  agents: Agent[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
  onSelectAgent?: (agent: Agent) => void;
  className?: string;
}

export function AgentGrid({
  agents,
  isLoading = false,
  skeletonCount = 6,
  emptyTitle = 'No matching agents found',
  emptyDescription = 'Try adjusting your search criteria, trust level filters, or explore all categories.',
  emptyActionLabel = 'Explore All Categories',
  emptyActionHref = '/categories',
  onSelectAgent,
  className,
}: AgentGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans',
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <AgentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-6 w-6 text-zinc-400" />}
        title={emptyTitle}
        description={emptyDescription}
        reason="Cryptographic Provenance Standard Active — Zero Synthetic Data"
        actionLabel={emptyActionLabel}
        actionHref={emptyActionHref}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-sans',
        className
      )}
    >
      {agents.map((agent) => (
        <AgentCard
          key={agent.id || agent.slug}
          agent={agent}
          onSelect={onSelectAgent}
        />
      ))}
    </div>
  );
}
