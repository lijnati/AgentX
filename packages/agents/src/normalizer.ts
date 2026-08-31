import {
  Agent,
  AgentCategory,
  AgentCapability,
  AgentStatus,
  VerificationStatus,
  createAgentPerformance,
  validateAgentInvariants,
} from '@agentx/domain';
import { toChecksumBscAddress } from '@agentx/blockchain';
import { agentSchema } from '@agentx/validation';

export interface RawAgentManifest {
  id?: string;
  externalId: string;
  name: string;
  slug?: string;
  description: string;
  category: string;
  capabilities: string[];
  ownerAddress: string;
  chainId?: number;
  identityAddress: string;
  status?: string;
  verificationStatus?: string;
  initialPerformance?: {
    totalExecutions?: number;
    successfulExecutions?: number;
    failedExecutions?: number;
    avgExecutionTimeMs?: number;
    avgCostUsd?: number;
    maxDrawdownPercent?: number;
    verificationStatus?: string;
  };
}

export function generateAgentSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function normalizeAgentManifest(manifest: RawAgentManifest): Agent {
  const checksumIdentity = toChecksumBscAddress(manifest.identityAddress);
  const checksumOwner = toChecksumBscAddress(manifest.ownerAddress);
  const slug = manifest.slug || generateAgentSlug(manifest.name);
  const chainId = manifest.chainId ?? 56;
  const status: AgentStatus = (manifest.status as AgentStatus) ?? 'ACTIVE';
  const verificationStatus: VerificationStatus =
    (manifest.verificationStatus as VerificationStatus) ?? 'UNVERIFIED';

  const perfInput = manifest.initialPerformance ?? {};
  const perfVerificationStatus: VerificationStatus =
    (perfInput.verificationStatus as VerificationStatus) ?? 'UNVERIFIED';

  const performance = createAgentPerformance({
    totalExecutions: perfInput.totalExecutions ?? 0,
    successfulExecutions: perfInput.successfulExecutions ?? 0,
    failedExecutions: perfInput.failedExecutions ?? 0,
    avgExecutionTimeMs: perfInput.avgExecutionTimeMs ?? 0,
    avgCostUsd: perfInput.avgCostUsd ?? 0,
    maxDrawdownPercent: perfInput.maxDrawdownPercent ?? 0,
    verificationStatus: perfVerificationStatus,
  });

  const rawAgent: Agent = {
    id: manifest.id || `agent_${manifest.externalId}`,
    externalId: manifest.externalId,
    name: manifest.name.trim(),
    slug,
    description: manifest.description.trim(),
    category: manifest.category as AgentCategory,
    capabilities: manifest.capabilities as AgentCapability[],
    ownerAddress: checksumOwner,
    chainId,
    identityAddress: checksumIdentity,
    status,
    verificationStatus,
    performance,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Validate using Zod and domain invariant checks
  agentSchema.parse(rawAgent);
  validateAgentInvariants(rawAgent);

  return rawAgent;
}
