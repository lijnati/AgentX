import { z } from 'zod';
import {
  VerificationStatusEnum,
  AgentStatusEnum,
  ExecutionStatusEnum,
} from '@agentx/domain';

/**
 * Common EVM / BNB Chain format validators
 */
export const bscAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM/BSC address format (expected 0x + 40 hex chars)');

export const bscTxHashSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash format (expected 0x + 64 hex chars)');

/**
 * Domain Enum Schemas
 */
export const verificationStatusSchema = z.enum([
  VerificationStatusEnum.ONCHAIN_VERIFIED,
  VerificationStatusEnum.PROTOCOL_VERIFIED,
  VerificationStatusEnum.AGENT_REPORTED,
  VerificationStatusEnum.UNVERIFIED,
]);

export const agentCategorySchema = z.enum([
  'REBALANCING',
  'GRID_TRADING',
  'YIELD_OPTIMIZATION',
  'HEALTH_FACTOR',
]);

export const agentCapabilitySchema = z.enum([
  'market_monitoring',
  'position_monitoring',
  'liquidity_management',
  'yield_discovery',
  'automated_rebalancing',
  'grid_execution',
  'liquidation_protection',
  'token_swap',
]);

export const agentStatusSchema = z.enum([
  AgentStatusEnum.ACTIVE,
  AgentStatusEnum.PAUSED,
  AgentStatusEnum.DEPRECATED,
]);

export const executionStatusSchema = z.enum([
  ExecutionStatusEnum.PENDING,
  ExecutionStatusEnum.RUNNING,
  ExecutionStatusEnum.SUCCESS,
  ExecutionStatusEnum.FAILED,
  ExecutionStatusEnum.CANCELLED,
]);

/**
 * Performance Schemas
 */
export const performanceHistoryPointSchema = z.object({
  timestamp: z.coerce.date(),
  metric: z.string().min(1),
  value: z.number(),
  verificationStatus: verificationStatusSchema,
  txHash: bscTxHashSchema.optional().nullable(),
});

export const agentPerformanceSchema = z
  .object({
    totalExecutions: z.number().int().min(0),
    successfulExecutions: z.number().int().min(0),
    failedExecutions: z.number().int().min(0),
    successRate: z.number().min(0).max(100),
    avgExecutionTimeMs: z.number().min(0),
    avgCostUsd: z.number().min(0),
    maxDrawdownPercent: z.number().min(0).max(100),
    verificationStatus: verificationStatusSchema,
    lastExecutionAt: z.coerce.date().nullable(),
    historyPoints: z.array(performanceHistoryPointSchema).optional(),
  })
  .refine(
    (data) => data.successfulExecutions + data.failedExecutions <= data.totalExecutions,
    {
      message: 'Sum of successful and failed executions cannot exceed total executions',
      path: ['successfulExecutions'],
    }
  );

/**
 * Agent Schema
 */
export const agentSchema = z.object({
  id: z.string().min(1),
  externalId: z.string().min(1),
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must consist of lowercase letters, numbers, and hyphens'),
  description: z.string().min(10).max(2000),
  category: agentCategorySchema,
  capabilities: z.array(agentCapabilitySchema).min(1, 'Agent must declare at least one capability'),
  ownerAddress: bscAddressSchema,
  chainId: z.number().int().positive(),
  identityAddress: bscAddressSchema,
  status: agentStatusSchema,
  verificationStatus: verificationStatusSchema,
  performance: agentPerformanceSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Execution Schema
 */
export const agentExecutionSchema = z
  .object({
    id: z.string().min(1),
    agentId: z.string().min(1),
    task: z.string().min(1).max(500),
    status: executionStatusSchema,
    startedAt: z.coerce.date(),
    completedAt: z.coerce.date().nullable(),
    durationMs: z.number().int().min(0).nullable(),
    costUsd: z.number().min(0).nullable(),
    txHash: bscTxHashSchema.nullable(),
    blockNumber: z.union([z.bigint(), z.number().int().positive()]).nullable(),
    resultData: z.record(z.unknown()).nullable(),
    verificationStatus: verificationStatusSchema,
    errorMessage: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.verificationStatus === 'ONCHAIN_VERIFIED' && !data.txHash) {
        return false;
      }
      return true;
    },
    {
      message: 'On-chain verified execution requires a valid txHash',
      path: ['txHash'],
    }
  );

/**
 * Review Schema
 */
export const agentReviewSchema = z
  .object({
    id: z.string().min(1),
    agentId: z.string().min(1),
    reviewerAddress: bscAddressSchema,
    rating: z.number().int().min(1).max(5),
    title: z.string().min(2).max(120),
    comment: z.string().min(10).max(2000),
    proofTxHash: bscTxHashSchema.nullable(),
    verificationStatus: verificationStatusSchema,
    createdAt: z.coerce.date(),
  })
  .refine(
    (data) => {
      if (data.verificationStatus === 'ONCHAIN_VERIFIED' && !data.proofTxHash) {
        return false;
      }
      return true;
    },
    {
      message: 'On-chain verified review requires a proofTxHash',
      path: ['proofTxHash'],
    }
  );

/**
 * Marketplace Query Filters
 */
export const marketplaceQuerySchema = z.object({
  search: z.string().optional(),
  category: agentCategorySchema.optional(),
  verificationStatus: verificationStatusSchema.optional(),
  minSuccessRate: z.coerce.number().min(0).max(100).optional(),
  sortBy: z
    .enum(['successRate', 'totalExecutions', 'createdAt', 'rating', 'name'])
    .optional()
    .default('successRate'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type AgentInput = z.infer<typeof agentSchema>;
export type AgentPerformanceInput = z.infer<typeof agentPerformanceSchema>;
export type AgentExecutionInput = z.infer<typeof agentExecutionSchema>;
export type AgentReviewInput = z.infer<typeof agentReviewSchema>;
export type MarketplaceQueryParams = z.infer<typeof marketplaceQuerySchema>;
