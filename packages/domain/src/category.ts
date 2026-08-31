import { AgentCapability } from './capability';

/**
 * First-Class Agent Categories on AgentX
 */
export type AgentCategory =
  | 'REBALANCING'
  | 'GRID_TRADING'
  | 'YIELD_OPTIMIZATION'
  | 'HEALTH_FACTOR';

export const AgentCategoriesList: readonly AgentCategory[] = [
  'REBALANCING',
  'GRID_TRADING',
  'YIELD_OPTIMIZATION',
  'HEALTH_FACTOR',
] as const;

export interface CategoryMetadata {
  id: AgentCategory;
  name: string;
  tagline: string;
  description: string;
  primaryRiskProfile: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  standardMetrics: readonly string[];
  expectedCapabilities: readonly AgentCapability[];
}

export const CATEGORY_METADATA: Record<AgentCategory, CategoryMetadata> = {
  REBALANCING: {
    id: 'REBALANCING',
    name: 'Portfolio Rebalancing',
    tagline: 'Maintain target asset allocation with minimal slippage and gas overhead',
    description:
      'Autonomous portfolio managers that monitor target weights (e.g. 50/50 BNB/USDT or index baskets), calculate drift thresholds, and execute atomic rebalancing transactions via decentralized liquidity pools on BNB Chain.',
    primaryRiskProfile: 'MODERATE',
    standardMetrics: ['Drift Tolerance', 'Tracking Error', 'Avg Gas / Rebalance', 'Max Slippage'],
    expectedCapabilities: ['market_monitoring', 'automated_rebalancing', 'token_swap'],
  },
  GRID_TRADING: {
    id: 'GRID_TRADING',
    name: 'Grid Trading',
    tagline: 'Systematic limit order execution across volatile market channels',
    description:
      'High-frequency execution agents that place geometric or arithmetic grids across BNB Chain orderbooks and AMM liquidity ticks, capturing spreads and market volatility automatically.',
    primaryRiskProfile: 'AGGRESSIVE',
    standardMetrics: ['Grid APR', 'Grid Density', 'Filled Orders / Day', 'Max Float Loss'],
    expectedCapabilities: ['market_monitoring', 'grid_execution', 'token_swap'],
  },
  YIELD_OPTIMIZATION: {
    id: 'YIELD_OPTIMIZATION',
    name: 'Yield Optimization',
    tagline: 'Compound and route liquidity across Venus, PancakeSwap, and BNB vaults',
    description:
      'Active yield-seeking algorithms that continuously monitor supply APYs, borrowing rewards, and DEX farm incentive pools, rotating capital into optimal risk-adjusted yield streams while auto-compounding rewards.',
    primaryRiskProfile: 'MODERATE',
    standardMetrics: ['Net APY', 'Auto-Compound Frequency', 'Protocol Exposure Count', 'TVL Capacity'],
    expectedCapabilities: ['yield_discovery', 'liquidity_management', 'token_swap'],
  },
  HEALTH_FACTOR: {
    id: 'HEALTH_FACTOR',
    name: 'Health Factor Monitoring',
    tagline: 'Defend collateralized lending positions against liquidation cascades',
    description:
      'Defensive sentinel agents monitoring borrower health metrics on Venus Protocol and other BSC money markets. When collateral ratios reach warning thresholds, agents execute emergency re-collateralization or partial deleveraging.',
    primaryRiskProfile: 'CONSERVATIVE',
    standardMetrics: ['Protected TVL', 'Response Latency (ms)', 'Liquidation Prevention Rate', 'Min Safety Buffer'],
    expectedCapabilities: ['position_monitoring', 'liquidation_protection'],
  },
};

export function isValidCategory(category: string): category is AgentCategory {
  return (AgentCategoriesList as readonly string[]).includes(category as AgentCategory);
}

export function getCategoryMetadata(category: AgentCategory): CategoryMetadata {
  const meta = CATEGORY_METADATA[category];
  if (!meta) {
    throw new Error(`Unknown category: ${category}`);
  }
  return meta;
}
