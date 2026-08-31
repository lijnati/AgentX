import { VerificationStatus } from './verification';

/**
 * Agent Performance Domain Model
 *
 * Encapsulates performance metrics with strict tier segregation.
 */
export interface AgentPerformance {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  successRate: number; // 0 to 100 (%)
  avgExecutionTimeMs: number;
  avgCostUsd: number;
  maxDrawdownPercent: number; // 0 to 100 (%)
  verificationStatus: VerificationStatus;
  lastExecutionAt: Date | null;
  historyPoints?: readonly PerformanceHistoryPoint[];
}

export interface PerformanceHistoryPoint {
  timestamp: Date;
  metric: string;
  value: number;
  verificationStatus: VerificationStatus;
  txHash?: string | null;
}

export function calculateSuccessRate(successful: number, total: number): number {
  if (total <= 0) return 0;
  if (successful < 0 || successful > total) {
    throw new Error(`Invalid execution counts: successful (${successful}) cannot exceed total (${total}) or be negative`);
  }
  const rate = (successful / total) * 100;
  return Math.round(rate * 100) / 100; // Round to 2 decimal places
}

export function validatePerformanceInvariants(perf: AgentPerformance): void {
  if (perf.totalExecutions < 0) {
    throw new Error('totalExecutions must be non-negative');
  }
  if (perf.successfulExecutions < 0) {
    throw new Error('successfulExecutions must be non-negative');
  }
  if (perf.failedExecutions < 0) {
    throw new Error('failedExecutions must be non-negative');
  }
  if (perf.successfulExecutions + perf.failedExecutions > perf.totalExecutions) {
    throw new Error(
      `Sum of successful (${perf.successfulExecutions}) and failed (${perf.failedExecutions}) executions cannot exceed total (${perf.totalExecutions})`
    );
  }
  if (perf.successRate < 0 || perf.successRate > 100) {
    throw new Error(`successRate must be between 0 and 100 (got ${perf.successRate})`);
  }
  if (perf.avgExecutionTimeMs < 0) {
    throw new Error('avgExecutionTimeMs must be non-negative');
  }
  if (perf.avgCostUsd < 0) {
    throw new Error('avgCostUsd must be non-negative');
  }
  if (perf.maxDrawdownPercent < 0 || perf.maxDrawdownPercent > 100) {
    throw new Error('maxDrawdownPercent must be between 0 and 100');
  }
}

export function createAgentPerformance(params: {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  avgExecutionTimeMs?: number;
  avgCostUsd?: number;
  maxDrawdownPercent?: number;
  verificationStatus: VerificationStatus;
  lastExecutionAt?: Date | null;
  historyPoints?: readonly PerformanceHistoryPoint[];
}): AgentPerformance {
  const successRate = calculateSuccessRate(params.successfulExecutions, params.totalExecutions);
  const perf: AgentPerformance = {
    totalExecutions: params.totalExecutions,
    successfulExecutions: params.successfulExecutions,
    failedExecutions: params.failedExecutions,
    successRate,
    avgExecutionTimeMs: params.avgExecutionTimeMs ?? 0,
    avgCostUsd: params.avgCostUsd ?? 0,
    maxDrawdownPercent: params.maxDrawdownPercent ?? 0,
    verificationStatus: params.verificationStatus,
    lastExecutionAt: params.lastExecutionAt ?? null,
    historyPoints: params.historyPoints,
  };

  validatePerformanceInvariants(perf);
  return perf;
}
