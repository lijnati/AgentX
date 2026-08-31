import { getAddress, isAddress, formatUnits, parseUnits } from 'viem';
import { getChainConfig, BSC_MAINNET_CHAIN_ID } from './chains';

/**
 * Address formatting & validation
 */
export function isValidBscAddress(address: string): boolean {
  return isAddress(address);
}

export function toChecksumBscAddress(address: string): `0x${string}` {
  return getAddress(address);
}

export function formatShortAddress(address: string, leadingChars = 6, trailingChars = 4): string {
  if (!isValidBscAddress(address)) return address;
  if (address.length <= leadingChars + trailingChars) return address;
  return `${address.slice(0, leadingChars)}...${address.slice(-trailingChars)}`;
}

/**
 * Transaction hash formatting & validation
 */
export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

export function formatShortTxHash(hash: string, leadingChars = 8, trailingChars = 6): string {
  if (!isValidTxHash(hash)) return hash;
  if (hash.length <= leadingChars + trailingChars) return hash;
  return `${hash.slice(0, leadingChars)}...${hash.slice(-trailingChars)}`;
}

/**
 * Explorer URL Builders
 */
export function getBscScanTxUrl(txHash: string, chainId: number = BSC_MAINNET_CHAIN_ID): string {
  const config = getChainConfig(chainId);
  return `${config.blockExplorerUrl}/tx/${txHash}`;
}

export function getBscScanAddressUrl(address: string, chainId: number = BSC_MAINNET_CHAIN_ID): string {
  const config = getChainConfig(chainId);
  return `${config.blockExplorerUrl}/address/${address}`;
}

export function getBscScanBlockUrl(blockNumber: bigint | number, chainId: number = BSC_MAINNET_CHAIN_ID): string {
  const config = getChainConfig(chainId);
  return `${config.blockExplorerUrl}/block/${blockNumber.toString()}`;
}

export function getBscScanTokenUrl(tokenAddress: string, chainId: number = BSC_MAINNET_CHAIN_ID): string {
  const config = getChainConfig(chainId);
  return `${config.blockExplorerUrl}/token/${tokenAddress}`;
}

/**
 * Currency and Token Formatting
 */
export function formatBnb(wei: bigint, precision = 4): string {
  const formatted = formatUnits(wei, 18);
  const num = parseFloat(formatted);
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

export function parseBnb(amount: string): bigint {
  return parseUnits(amount, 18);
}
