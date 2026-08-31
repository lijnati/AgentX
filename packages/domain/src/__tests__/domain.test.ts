import { describe, it, expect } from 'vitest';
import {
  isProofBacked,
  isHigherOrEqualVerification,
  VERIFICATION_RANKS,
  AgentCategoriesList,
  CATEGORY_METADATA,
  isValidCategory,
  AgentCapabilitiesList,
  CAPABILITY_DEFINITIONS,
  calculateSuccessRate,
  validatePerformanceInvariants,
  createAgentPerformance,
  validateExecutionInvariants,
  validateReviewInvariants,
  validateAgentInvariants,
  Agent,
} from '../index';

describe('Verification System Invariants', () => {
  it('should correctly determine proof-backed verification levels', () => {
    expect(isProofBacked('ONCHAIN_VERIFIED')).toBe(true);
    expect(isProofBacked('PROTOCOL_VERIFIED')).toBe(true);
    expect(isProofBacked('AGENT_REPORTED')).toBe(false);
    expect(isProofBacked('UNVERIFIED')).toBe(false);
  });

  it('should enforce strict hierarchical rank ordering', () => {
    expect(VERIFICATION_RANKS.ONCHAIN_VERIFIED).toBeGreaterThan(VERIFICATION_RANKS.PROTOCOL_VERIFIED);
    expect(VERIFICATION_RANKS.PROTOCOL_VERIFIED).toBeGreaterThan(VERIFICATION_RANKS.AGENT_REPORTED);
    expect(VERIFICATION_RANKS.AGENT_REPORTED).toBeGreaterThan(VERIFICATION_RANKS.UNVERIFIED);

    expect(isHigherOrEqualVerification('ONCHAIN_VERIFIED', 'AGENT_REPORTED')).toBe(true);
    expect(isHigherOrEqualVerification('AGENT_REPORTED', 'ONCHAIN_VERIFIED')).toBe(false);
    expect(isHigherOrEqualVerification('PROTOCOL_VERIFIED', 'PROTOCOL_VERIFIED')).toBe(true);
  });
});

describe('First-Class Agent Categories & Capabilities', () => {
  it('should support the four required first-class agent categories', () => {
    expect(AgentCategoriesList).toContain('REBALANCING');
    expect(AgentCategoriesList).toContain('GRID_TRADING');
    expect(AgentCategoriesList).toContain('YIELD_OPTIMIZATION');
    expect(AgentCategoriesList).toContain('HEALTH_FACTOR');
    expect(AgentCategoriesList.length).toBe(4);
  });

  it('should have complete metadata for each category', () => {
    for (const cat of AgentCategoriesList) {
      expect(isValidCategory(cat)).toBe(true);
      const meta = CATEGORY_METADATA[cat];
      expect(meta).toBeDefined();
      expect(meta.name.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
      expect(meta.expectedCapabilities.length).toBeGreaterThan(0);
      expect(meta.standardMetrics.length).toBeGreaterThan(0);
    }
  });

  it('should correctly define capabilities with risk levels and execution flags', () => {
    expect(AgentCapabilitiesList.length).toBeGreaterThanOrEqual(8);
    for (const cap of AgentCapabilitiesList) {
      const def = CAPABILITY_DEFINITIONS[cap];
      expect(def).toBeDefined();
      expect(['LOW', 'MEDIUM', 'HIGH']).toContain(def.riskLevel);
      expect(typeof def.requiresContractExecution).toBe('boolean');
    }
  });
});

describe('Performance Invariants', () => {
  it('should calculate success rate accurately and round to 2 decimal places', () => {
    expect(calculateSuccessRate(100, 100)).toBe(100);
    expect(calculateSuccessRate(0, 100)).toBe(0);
    expect(calculateSuccessRate(0, 0)).toBe(0);
    expect(calculateSuccessRate(95, 100)).toBe(95);
    expect(calculateSuccessRate(1, 3)).toBe(33.33);
  });

  it('should reject invalid success counts', () => {
    expect(() => calculateSuccessRate(101, 100)).toThrow();
    expect(() => calculateSuccessRate(-1, 100)).toThrow();
  });

  it('should validate performance invariants', () => {
    const validPerf = createAgentPerformance({
      totalExecutions: 100,
      successfulExecutions: 98,
      failedExecutions: 2,
      avgExecutionTimeMs: 450,
      avgCostUsd: 0.12,
      maxDrawdownPercent: 1.5,
      verificationStatus: 'ONCHAIN_VERIFIED',
    });

    expect(validPerf.successRate).toBe(98);
    expect(() => validatePerformanceInvariants(validPerf)).not.toThrow();

    expect(() =>
      validatePerformanceInvariants({
        ...validPerf,
        successfulExecutions: 90,
        failedExecutions: 20, // 90 + 20 > 100
      })
    ).toThrow();
  });
});

describe('Execution & Review Invariants', () => {
  it('should require txHash for on-chain verified executions', () => {
    expect(() =>
      validateExecutionInvariants({
        id: 'exec_1',
        agentId: 'agent_1',
        task: 'Rebalance portfolio',
        status: 'SUCCESS',
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 500,
        costUsd: 0.05,
        txHash: null, // Missing for on-chain verified
        blockNumber: 123456n,
        resultData: null,
        verificationStatus: 'ONCHAIN_VERIFIED',
        errorMessage: null,
      })
    ).toThrow('On-chain verified execution requires a valid txHash');
  });

  it('should require proofTxHash for on-chain verified reviews', () => {
    expect(() =>
      validateReviewInvariants({
        id: 'rev_1',
        agentId: 'agent_1',
        reviewerAddress: '0x1234567890123456789012345678901234567890',
        rating: 5,
        title: 'Excellent rebalancer',
        comment: 'Worked smoothly on PancakeSwap with minimal gas.',
        proofTxHash: null, // missing
        verificationStatus: 'ONCHAIN_VERIFIED',
        createdAt: new Date(),
      })
    ).toThrow('On-chain verified reviews must include a proofTxHash');
  });
});

describe('Agent Invariants', () => {
  it('should validate valid agent structure and reject invalid slugs or addresses', () => {
    const validAgent: Agent = {
      id: 'agent_1',
      externalId: 'ext_1',
      name: 'BNB Grid Master',
      slug: 'bnb-grid-master',
      description: 'High-frequency grid execution agent on BNB Smart Chain DEX pools.',
      category: 'GRID_TRADING',
      capabilities: ['market_monitoring', 'grid_execution', 'token_swap'],
      ownerAddress: '0x1111111111111111111111111111111111111111',
      chainId: 56,
      identityAddress: '0x2222222222222222222222222222222222222222',
      status: 'ACTIVE',
      verificationStatus: 'ONCHAIN_VERIFIED',
      performance: createAgentPerformance({
        totalExecutions: 50,
        successfulExecutions: 49,
        failedExecutions: 1,
        verificationStatus: 'ONCHAIN_VERIFIED',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(() => validateAgentInvariants(validAgent)).not.toThrow();

    expect(() =>
      validateAgentInvariants({
        ...validAgent,
        slug: 'INVALID SLUG WITH SPACES',
      })
    ).toThrow('Invalid agent slug');

    expect(() =>
      validateAgentInvariants({
        ...validAgent,
        identityAddress: 'not-an-evm-address',
      })
    ).toThrow('Invalid identity address');
  });
});
