import { AgentCategory, isValidCategory } from './category';
import { AgentCapability, isValidCapability } from './capability';
import { VerificationStatus } from './verification';
import { AgentPerformance, validatePerformanceInvariants } from './performance';

export type AgentStatus = 'ACTIVE' | 'PAUSED' | 'DEPRECATED';

export const AgentStatusEnum = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DEPRECATED: 'DEPRECATED',
} as const;

export interface Agent {
  id: string;
  externalId: string;
  name: string;
  slug: string;
  description: string;
  category: AgentCategory;
  capabilities: AgentCapability[];
  ownerAddress: string;
  chainId: number;
  identityAddress: string;
  status: AgentStatus;
  verificationStatus: VerificationStatus;
  performance: AgentPerformance;
  createdAt: Date;
  updatedAt: Date;
}

export function validateAgentInvariants(agent: Agent): void {
  if (!agent.id || agent.id.trim().length === 0) {
    throw new Error('Agent id cannot be empty');
  }
  if (!agent.name || agent.name.trim().length === 0) {
    throw new Error('Agent name cannot be empty');
  }
  if (!agent.slug || !/^[a-z0-9-]+$/.test(agent.slug)) {
    throw new Error(`Invalid agent slug: "${agent.slug}". Slug must be lowercase alphanumeric with hyphens.`);
  }
  if (!isValidCategory(agent.category)) {
    throw new Error(`Invalid agent category: ${agent.category}`);
  }
  if (!Array.isArray(agent.capabilities) || agent.capabilities.length === 0) {
    throw new Error('Agent must declare at least one capability');
  }
  for (const cap of agent.capabilities) {
    if (!isValidCapability(cap)) {
      throw new Error(`Invalid capability: ${cap}`);
    }
  }
  if (!agent.identityAddress || !/^0x[a-fA-F0-9]{40}$/.test(agent.identityAddress)) {
    throw new Error(`Invalid identity address: "${agent.identityAddress}". Must be a valid 20-byte hex address.`);
  }
  if (!agent.ownerAddress || !/^0x[a-fA-F0-9]{40}$/.test(agent.ownerAddress)) {
    throw new Error(`Invalid owner address: "${agent.ownerAddress}". Must be a valid 20-byte hex address.`);
  }

  // Validate performance invariants
  validatePerformanceInvariants(agent.performance);
}
