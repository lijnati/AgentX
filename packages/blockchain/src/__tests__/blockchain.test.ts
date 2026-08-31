import { describe, it, expect } from 'vitest';
import {
  BSC_MAINNET_CHAIN_ID,
  BSC_TESTNET_CHAIN_ID,
  getChainConfig,
  isSupportedChainId,
  isValidBscAddress,
  toChecksumBscAddress,
  formatShortAddress,
  isValidTxHash,
  formatShortTxHash,
  getBscScanTxUrl,
  getBscScanAddressUrl,
  formatBnb,
  parseBnb,
} from '../index';

describe('BNB Smart Chain Configuration', () => {
  it('should support BSC Mainnet (56) and Testnet (97)', () => {
    expect(isSupportedChainId(BSC_MAINNET_CHAIN_ID)).toBe(true);
    expect(isSupportedChainId(BSC_TESTNET_CHAIN_ID)).toBe(true);
    expect(isSupportedChainId(1)).toBe(false); // Ethereum not directly in BSC config

    const mainnet = getChainConfig(BSC_MAINNET_CHAIN_ID);
    expect(mainnet.chainId).toBe(56);
    expect(mainnet.isTestnet).toBe(false);
    expect(mainnet.blockExplorerUrl).toBe('https://bscscan.com');
    expect(mainnet.defaultRpcUrl).toContain('binance.org');

    const testnet = getChainConfig(BSC_TESTNET_CHAIN_ID);
    expect(testnet.chainId).toBe(97);
    expect(testnet.isTestnet).toBe(true);
    expect(testnet.blockExplorerUrl).toBe('https://testnet.bscscan.com');
  });
});

describe('Address & TxHash Utilities', () => {
  const sampleAddress = '0x8894e0a0c962cb723c1976a4421c95949be2d4e3';
  const sampleTxHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

  it('should validate and checksum EVM/BSC addresses', () => {
    expect(isValidBscAddress(sampleAddress)).toBe(true);
    expect(isValidBscAddress('0xinvalid')).toBe(false);

    const checksummed = toChecksumBscAddress(sampleAddress);
    expect(checksummed).toBe('0x8894E0a0c962CB723c1976a4421c95949bE2D4E3');
  });

  it('should format short addresses and tx hashes with ellipsis', () => {
    expect(formatShortAddress(sampleAddress, 6, 4)).toBe('0x8894...d4e3');
    expect(formatShortTxHash(sampleTxHash, 10, 6)).toBe('0x12345678...abcdef');
  });

  it('should validate tx hashes', () => {
    expect(isValidTxHash(sampleTxHash)).toBe(true);
    expect(isValidTxHash('0xshort')).toBe(false);
  });

  it('should generate correct BscScan URLs', () => {
    expect(getBscScanTxUrl(sampleTxHash, BSC_MAINNET_CHAIN_ID)).toBe(
      `https://bscscan.com/tx/${sampleTxHash}`
    );
    expect(getBscScanTxUrl(sampleTxHash, BSC_TESTNET_CHAIN_ID)).toBe(
      `https://testnet.bscscan.com/tx/${sampleTxHash}`
    );
    expect(getBscScanAddressUrl(sampleAddress, BSC_MAINNET_CHAIN_ID)).toBe(
      `https://bscscan.com/address/${sampleAddress}`
    );
  });

  it('should format and parse BNB amounts accurately', () => {
    const oneBnbInWei = parseBnb('1.5');
    expect(oneBnbInWei).toBe(1500000000000000000n);
    expect(formatBnb(oneBnbInWei, 2)).toBe('1.5');
  });
});
