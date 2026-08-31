export interface AgentExecutionParams {
  agentId: string;
  task: string;
  userAddress: string;
  chainId: number;
  inputPayload: Record<string, unknown>;
  maxGasPriceGwei?: number;
}

export interface AgentExecutionOutcome {
  executionId: string;
  status: 'SUCCESS' | 'FAILED';
  txHash?: string;
  blockNumber?: bigint | number;
  durationMs: number;
  costUsd?: number;
  resultData?: Record<string, unknown>;
  errorMessage?: string;
}

export interface IAgentExecutionAdapter {
  adapterName: string;
  canHandle(agentId: string): Promise<boolean>;
  simulate(params: AgentExecutionParams): Promise<{
    estimatedGas: bigint;
    estimatedCostUsd: number;
    expectedOutcome: Record<string, unknown>;
    confidenceScore: number;
  }>;
  execute(params: AgentExecutionParams): Promise<AgentExecutionOutcome>;
}
