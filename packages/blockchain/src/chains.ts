import { bsc, bscTestnet } from 'viem/chains';
import type { Chain } from 'viem';

export interface BscNetworkConfig {
  chainId: number;
  name: string;
  shortName: string;
  isTestnet: boolean;
  viemChain: Chain;
  defaultRpcUrl: string;
  fallbackRpcUrls: readonly string[];
  blockExplorerUrl: string;
  blockExplorerApiUrl?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const BSC_MAINNET_CHAIN_ID = 56;
export const BSC_TESTNET_CHAIN_ID = 97;

export const BSC_MAINNET_CONFIG: BscNetworkConfig = {
  chainId: BSC_MAINNET_CHAIN_ID,
  name: 'BNB Smart Chain Mainnet',
  shortName: 'BSC Mainnet',
  isTestnet: false,
  viemChain: bsc,
  defaultRpcUrl: 'https://bsc-dataseed.binance.org',
  fallbackRpcUrls: [
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://binance.llamarpc.com',
  ],
  blockExplorerUrl: 'https://bscscan.com',
  blockExplorerApiUrl: 'https://api.bscscan.com/api',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
};

export const BSC_TESTNET_CONFIG: BscNetworkConfig = {
  chainId: BSC_TESTNET_CHAIN_ID,
  name: 'BNB Smart Chain Testnet',
  shortName: 'BSC Testnet',
  isTestnet: true,
  viemChain: bscTestnet,
  defaultRpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  fallbackRpcUrls: [
    'https://data-seed-prebsc-2-s1.binance.org:8545',
    'https://bsc-testnet.publicnode.com',
  ],
  blockExplorerUrl: 'https://testnet.bscscan.com',
  blockExplorerApiUrl: 'https://api-testnet.bscscan.com/api',
  nativeCurrency: {
    name: 'Testnet BNB',
    symbol: 'tBNB',
    decimals: 18,
  },
};

export const SUPPORTED_NETWORKS: Record<number, BscNetworkConfig> = {
  [BSC_MAINNET_CHAIN_ID]: BSC_MAINNET_CONFIG,
  [BSC_TESTNET_CHAIN_ID]: BSC_TESTNET_CONFIG,
};

export function isSupportedChainId(chainId: number): boolean {
  return chainId in SUPPORTED_NETWORKS;
}

export function getChainConfig(chainId: number): BscNetworkConfig {
  const config = SUPPORTED_NETWORKS[chainId];
  if (!config) {
    throw new Error(
      `Unsupported BNB Chain ID: ${chainId}. Supported chain IDs are: ${Object.keys(SUPPORTED_NETWORKS).join(', ')}`
    );
  }
  return config;
}
