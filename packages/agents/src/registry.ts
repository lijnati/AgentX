import { Agent, AgentExecution, AgentReview } from '@agentx/domain';
import { MarketplaceQueryParams } from '@agentx/validation';
import { RawAgentManifest } from './normalizer';

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IAgentRegistry {
  getAgentById(id: string): Promise<Agent | null>;
  getAgentBySlug(slug: string): Promise<Agent | null>;
  listAgents(params?: MarketplaceQueryParams): Promise<PaginatedResult<Agent>>;
  getAgentExecutions(
    agentId: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResult<AgentExecution>>;
  getAgentReviews(
    agentId: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResult<AgentReview>>;
  registerAgent(manifest: RawAgentManifest): Promise<Agent>;
}
