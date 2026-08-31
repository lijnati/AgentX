import { createPublicClient, http, PublicClient, fallback } from 'viem';
import { getChainConfig, BSC_MAINNET_CHAIN_ID } from './chains';

export interface BscClientOptions {
  customRpcUrl?: string;
  enableFallback?: boolean;
}

const clientCache = new Map<number, PublicClient>();

/**
 * Creates or retrieves a cached Viem PublicClient for a given BNB Chain ID
 */
export function getBscPublicClient(
  chainId: number = BSC_MAINNET_CHAIN_ID,
  options?: BscClientOptions
): PublicClient {
  const cacheKey = chainId;

  if (!options?.customRpcUrl && clientCache.has(cacheKey)) {
    return clientCache.get(cacheKey)!;
  }

  const config = getChainConfig(chainId);

  const rpcUrl = options?.customRpcUrl || config.defaultRpcUrl;
  const transports = [http(rpcUrl)];

  if (options?.enableFallback && config.fallbackRpcUrls.length > 0) {
    for (const fallbackUrl of config.fallbackRpcUrls) {
      transports.push(http(fallbackUrl));
    }
  }

  const client = createPublicClient({
    chain: config.viemChain,
    transport: transports.length > 1 ? fallback(transports) : transports[0]!,
  });

  if (!options?.customRpcUrl) {
    clientCache.set(cacheKey, client as PublicClient);
  }

  return client as PublicClient;
}

/**
 * Clear cached public clients (useful for test teardown)
 */
export function resetBscPublicClientCache(): void {
  clientCache.clear();
}
