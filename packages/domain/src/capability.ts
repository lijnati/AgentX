/**
 * Agent Capability Taxonomy
 *
 * Capabilities describe the functional permissions and runtime execution abilities
 * of autonomous agents on BNB Smart Chain.
 */

export type AgentCapability =
  | 'market_monitoring'
  | 'position_monitoring'
  | 'liquidity_management'
  | 'yield_discovery'
  | 'automated_rebalancing'
  | 'grid_execution'
  | 'liquidation_protection'
  | 'token_swap';

export const AgentCapabilitiesList: readonly AgentCapability[] = [
  'market_monitoring',
  'position_monitoring',
  'liquidity_management',
  'yield_discovery',
  'automated_rebalancing',
  'grid_execution',
  'liquidation_protection',
  'token_swap',
] as const;

export interface CapabilityDefinition {
  id: AgentCapability;
  name: string;
  shortDescription: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  requiresContractExecution: boolean;
}

export const CAPABILITY_DEFINITIONS: Record<AgentCapability, CapabilityDefinition> = {
  market_monitoring: {
    id: 'market_monitoring',
    name: 'Market Monitoring',
    shortDescription: 'Continuous off-chain and on-chain orderbook & DEX pool telemetry analysis.',
    riskLevel: 'LOW',
    requiresContractExecution: false,
  },
  position_monitoring: {
    id: 'position_monitoring',
    name: 'Position Monitoring',
    shortDescription: 'Real-time collateral ratio, health factor, and debt tracking across lending protocols.',
    riskLevel: 'LOW',
    requiresContractExecution: false,
  },
  liquidity_management: {
    id: 'liquidity_management',
    name: 'Liquidity Management',
    shortDescription: 'Automated range adjustment and fee harvesting for concentrated liquidity pools.',
    riskLevel: 'MEDIUM',
    requiresContractExecution: true,
  },
  yield_discovery: {
    id: 'yield_discovery',
    name: 'Yield Discovery',
    shortDescription: 'Multi-protocol APY scanning and vault routing optimization.',
    riskLevel: 'LOW',
    requiresContractExecution: false,
  },
  automated_rebalancing: {
    id: 'automated_rebalancing',
    name: 'Automated Rebalancing',
    shortDescription: 'Portfolio drift correction and periodic asset weighting adjustments.',
    riskLevel: 'MEDIUM',
    requiresContractExecution: true,
  },
  grid_execution: {
    id: 'grid_execution',
    name: 'Grid Execution',
    shortDescription: 'Automated step-limit buy and sell orders within a configured price range.',
    riskLevel: 'HIGH',
    requiresContractExecution: true,
  },
  liquidation_protection: {
    id: 'liquidation_protection',
    name: 'Liquidation Protection',
    shortDescription: 'Automated emergency debt repayment or collateral top-up when health factor drops.',
    riskLevel: 'HIGH',
    requiresContractExecution: true,
  },
  token_swap: {
    id: 'token_swap',
    name: 'Token Swap Routing',
    shortDescription: 'Optimal DEX route execution via PancakeSwap, Biswap, and major BSC liquidity hubs.',
    riskLevel: 'MEDIUM',
    requiresContractExecution: true,
  },
};

export function isValidCapability(capability: string): capability is AgentCapability {
  return (AgentCapabilitiesList as readonly string[]).includes(capability);
}

export function getCapabilityDefinition(capability: AgentCapability): CapabilityDefinition {
  const def = CAPABILITY_DEFINITIONS[capability];
  if (!def) {
    throw new Error(`Unknown capability: ${capability}`);
  }
  return def;
}
