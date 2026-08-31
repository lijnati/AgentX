import { VerificationStatus } from './verification';

export type ExecutionStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export const ExecutionStatusEnum = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
} as const;

export interface AgentExecution {
  id: string;
  agentId: string;
  task: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
  costUsd: number | null;
  txHash: string | null;
  blockNumber: bigint | number | null;
  resultData: Record<string, unknown> | null;
  verificationStatus: VerificationStatus;
  errorMessage: string | null;
}

export function isTerminalExecutionStatus(status: ExecutionStatus): boolean {
  return status === 'SUCCESS' || status === 'FAILED' || status === 'CANCELLED';
}

export function validateExecutionInvariants(execution: AgentExecution): void {
  if (!execution.id) throw new Error('Execution id is required');
  if (!execution.agentId) throw new Error('Execution agentId is required');
  if (!execution.task) throw new Error('Execution task description is required');

  if (execution.status === 'SUCCESS') {
    if (execution.completedAt && execution.completedAt < execution.startedAt) {
      throw new Error('completedAt cannot be earlier than startedAt');
    }
  }

  if (execution.verificationStatus === 'ONCHAIN_VERIFIED') {
    if (!execution.txHash) {
      throw new Error('On-chain verified execution requires a valid txHash');
    }
  }
}
