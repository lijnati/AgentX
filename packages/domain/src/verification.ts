/**
 * Data Integrity & Verification System
 *
 * AgentX enforces rigid data integrity tiers across agents, executions,
 * reviews, and performance metrics.
 */

export type VerificationStatus =
  | 'ONCHAIN_VERIFIED'
  | 'PROTOCOL_VERIFIED'
  | 'AGENT_REPORTED'
  | 'UNVERIFIED';

export const VerificationStatusEnum = {
  ONCHAIN_VERIFIED: 'ONCHAIN_VERIFIED',
  PROTOCOL_VERIFIED: 'PROTOCOL_VERIFIED',
  AGENT_REPORTED: 'AGENT_REPORTED',
  UNVERIFIED: 'UNVERIFIED',
} as const;

/**
 * Numeric hierarchy for verification trust levels:
 * Higher rank = stronger cryptographically verifiable proof.
 */
export const VERIFICATION_RANKS: Record<VerificationStatus, number> = {
  UNVERIFIED: 0,
  AGENT_REPORTED: 1,
  PROTOCOL_VERIFIED: 2,
  ONCHAIN_VERIFIED: 3,
};

export interface VerificationProof {
  status: VerificationStatus;
  txHash?: string | null;
  blockNumber?: bigint | number | null;
  chainId?: number | null;
  protocolSignature?: string | null;
  attestationUid?: string | null;
  verifiedAt: Date;
  verifierIdentity?: string | null;
  proofDetails?: string | null;
}

export function isProofBacked(status: VerificationStatus): boolean {
  return status === 'ONCHAIN_VERIFIED' || status === 'PROTOCOL_VERIFIED';
}

export function isHigherOrEqualVerification(
  current: VerificationStatus,
  target: VerificationStatus
): boolean {
  return VERIFICATION_RANKS[current] >= VERIFICATION_RANKS[target];
}

export function getVerificationLabel(status: VerificationStatus): string {
  switch (status) {
    case 'ONCHAIN_VERIFIED':
      return 'On-Chain Verified';
    case 'PROTOCOL_VERIFIED':
      return 'Protocol Verified';
    case 'AGENT_REPORTED':
      return 'Operator Reported';
    case 'UNVERIFIED':
      return 'Unverified Claim';
  }
}

export function getVerificationDescription(status: VerificationStatus): string {
  switch (status) {
    case 'ONCHAIN_VERIFIED':
      return 'Directly indexed and proved by BNB Smart Chain transaction receipts and smart contract state.';
    case 'PROTOCOL_VERIFIED':
      return 'Attested by an audited integrated DeFi protocol or cryptographically signed oracle feed.';
    case 'AGENT_REPORTED':
      return 'Self-reported telemetry provided by the agent operator without cryptographic on-chain proof.';
    case 'UNVERIFIED':
      return 'Unsubstantiated metadata or pending initial verification pipeline check.';
  }
}
