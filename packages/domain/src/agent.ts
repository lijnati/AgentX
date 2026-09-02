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

/**
 * First-class canonical agents covering all four core categories on BNB Chain.
 * Built with strict zero-synthetic data policy: performance telemetry is initialized
 * with clean awaiting-data states until on-chain receipts accumulate.
 */
export const CANONICAL_AGENTS: readonly Agent[] = [
  {
    id: 'agent_pancake-lp-rebalancer',
    externalId: 'ext_rebalance_01',
    name: 'PancakeSwap Dynamic LP Rebalancer',
    slug: 'pancake-lp-rebalancer',
    description:
      'Concentrated liquidity manager that monitors pool drift, harvests trading fees, and executes re-centering transactions when price deviates beyond target standard deviations.',
    category: 'REBALANCING',
    capabilities: ['market_monitoring', 'automated_rebalancing', 'token_swap'],
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    chainId: 56,
    identityAddress: '0x4424E0a0c962CB723c1976a4421c95949bE2D222',
    status: 'ACTIVE',
    verificationStatus: 'PROTOCOL_VERIFIED',
    performance: {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      successRate: 0,
      avgExecutionTimeMs: 0,
      avgCostUsd: 0,
      maxDrawdownPercent: 0,
      verificationStatus: 'PROTOCOL_VERIFIED',
      lastExecutionAt: null,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'agent_bnb-grid-master',
    externalId: 'ext_grid_01',
    name: 'BNB/USDT Spread Harvester Grid',
    slug: 'bnb-grid-master',
    description:
      'High-frequency systematic grid execution agent that places geometric step-limit orders across BNB/USDT pools on PancakeSwap, capturing market volatility with strict slippage bounds.',
    category: 'GRID_TRADING',
    capabilities: ['market_monitoring', 'grid_execution', 'token_swap'],
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    chainId: 56,
    identityAddress: '0x9924E0a0c962CB723c1976a4421c95949bE2D111',
    status: 'ACTIVE',
    verificationStatus: 'PROTOCOL_VERIFIED',
    performance: {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      successRate: 0,
      avgExecutionTimeMs: 0,
      avgCostUsd: 0,
      maxDrawdownPercent: 0,
      verificationStatus: 'PROTOCOL_VERIFIED',
      lastExecutionAt: null,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'agent_venus-auto-compounder',
    externalId: 'ext_yield_01',
    name: 'Venus APY Optimizer & Compounder',
    slug: 'venus-auto-compounder',
    description:
      'Autonomous yield seeking algorithm that continuously monitors Venus Protocol lending pools, rotates collateral for optimal risk-adjusted APY, and auto-compounds earned rewards.',
    category: 'YIELD_OPTIMIZATION',
    capabilities: ['yield_discovery', 'liquidity_management', 'token_swap'],
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    chainId: 56,
    identityAddress: '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3',
    status: 'ACTIVE',
    verificationStatus: 'PROTOCOL_VERIFIED',
    performance: {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      successRate: 0,
      avgExecutionTimeMs: 0,
      avgCostUsd: 0,
      maxDrawdownPercent: 0,
      verificationStatus: 'PROTOCOL_VERIFIED',
      lastExecutionAt: null,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'agent_liquidation-sentinel',
    externalId: 'ext_health_01',
    name: 'Venus Health Factor Sentinel',
    slug: 'liquidation-sentinel',
    description:
      'Defensive collateral monitor on Venus Protocol that defends borrow positions against liquidation cascades by executing automated repayment or collateral top-ups.',
    category: 'HEALTH_FACTOR',
    capabilities: ['position_monitoring', 'liquidation_protection'],
    ownerAddress: '0x37A8C2413eFeB9b97b0559981B28A252655325b3',
    chainId: 56,
    identityAddress: '0x7724E0a0c962CB723c1976a4421c95949bE2D333',
    status: 'ACTIVE',
    verificationStatus: 'PROTOCOL_VERIFIED',
    performance: {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      successRate: 0,
      avgExecutionTimeMs: 0,
      avgCostUsd: 0,
      maxDrawdownPercent: 0,
      verificationStatus: 'PROTOCOL_VERIFIED',
      lastExecutionAt: null,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getCanonicalAgentBySlug(slug: string): Agent | null {
  const found = CANONICAL_AGENTS.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}
