import { VerificationStatus } from './verification';

export interface AgentReview {
  id: string;
  agentId: string;
  reviewerAddress: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  proofTxHash: string | null;
  verificationStatus: VerificationStatus;
  createdAt: Date;
}

export function validateReviewInvariants(review: AgentReview): void {
  if (!review.id) throw new Error('Review id is required');
  if (!review.agentId) throw new Error('Review agentId is required');
  if (!review.reviewerAddress) throw new Error('Reviewer address is required');
  if (review.rating < 1 || review.rating > 5 || !Number.isInteger(review.rating)) {
    throw new Error('Rating must be an integer between 1 and 5');
  }
  if (!review.title || review.title.trim().length === 0) {
    throw new Error('Review title cannot be empty');
  }
  if (review.verificationStatus === 'ONCHAIN_VERIFIED' && !review.proofTxHash) {
    throw new Error('On-chain verified reviews must include a proofTxHash');
  }
}
