import { describe, it, expect } from 'vitest';
import {
  agentSchema,
  agentExecutionSchema,
  marketplaceQuerySchema,
  bscAddressSchema,
  bscTxHashSchema,
} from '../index';

describe('Validation Schemas', () => {
  const validAddress = '0x8894e0a0c962cb723c1976a4421c95949be2d4e3';
  const validTxHash = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

  it('should validate BSC addresses and tx hashes', () => {
    expect(() => bscAddressSchema.parse(validAddress)).not.toThrow();
    expect(() => bscAddressSchema.parse('0x123')).toThrow();

    expect(() => bscTxHashSchema.parse(validTxHash)).not.toThrow();
    expect(() => bscTxHashSchema.parse('0x123')).toThrow();
  });

  it('should validate complete Agent schema payloads', () => {
    const validPayload = {
      id: 'agent_yield_1',
      externalId: 'ext_yield_1',
      name: 'Venus Auto-Compounder',
      slug: 'venus-auto-compounder',
      description: 'Automated yield aggregator and compounder for Venus Protocol on BSC.',
      category: 'YIELD_OPTIMIZATION',
      capabilities: ['yield_discovery', 'liquidity_management', 'token_swap'],
      ownerAddress: validAddress,
      chainId: 56,
      identityAddress: validAddress,
      status: 'ACTIVE',
      verificationStatus: 'PROTOCOL_VERIFIED',
      performance: {
        totalExecutions: 200,
        successfulExecutions: 198,
        failedExecutions: 2,
        successRate: 99.0,
        avgExecutionTimeMs: 650,
        avgCostUsd: 0.18,
        maxDrawdownPercent: 0.8,
        verificationStatus: 'PROTOCOL_VERIFIED',
        lastExecutionAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(() => agentSchema.parse(validPayload)).not.toThrow();

    // Invalid slug with uppercase
    expect(() =>
      agentSchema.parse({
        ...validPayload,
        slug: 'Venus-Auto-Compounder',
      })
    ).toThrow();
  });

  it('should enforce execution schema refinement for ONCHAIN_VERIFIED txHash', () => {
    const validExecution = {
      id: 'exec_100',
      agentId: 'agent_yield_1',
      task: 'Harvest Venus BNB pool rewards and re-stake',
      status: 'SUCCESS',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: 720,
      costUsd: 0.15,
      txHash: validTxHash,
      blockNumber: 42000000,
      resultData: { harvestedBnb: '0.045' },
      verificationStatus: 'ONCHAIN_VERIFIED',
      errorMessage: null,
    };

    expect(() => agentExecutionSchema.parse(validExecution)).not.toThrow();

    // Rejects missing txHash when verificationStatus is ONCHAIN_VERIFIED
    expect(() =>
      agentExecutionSchema.parse({
        ...validExecution,
        txHash: null,
      })
    ).toThrow();
  });

  it('should parse marketplace query parameters with defaults', () => {
    const query = marketplaceQuerySchema.parse({
      category: 'GRID_TRADING',
      minSuccessRate: '95',
    });

    expect(query.category).toBe('GRID_TRADING');
    expect(query.minSuccessRate).toBe(95);
    expect(query.page).toBe(1);
    expect(query.limit).toBe(20);
    expect(query.sortBy).toBe('successRate');
  });
});
