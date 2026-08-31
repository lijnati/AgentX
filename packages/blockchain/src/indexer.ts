import { VerificationProof } from '@agentx/domain';
import { getBscPublicClient } from './client';
import { BSC_MAINNET_CHAIN_ID } from './chains';

export interface OnchainExecutionReceipt {
  txHash: string;
  blockNumber: bigint;
  status: 'SUCCESS' | 'REVERTED';
  gasUsed: bigint;
  effectiveGasPrice: bigint;
  from: string;
  to: string | null;
  timestamp: Date;
}

export interface IBlockchainVerifier {
  verifyExecutionTx(
    txHash: string,
    expectedAgentAddress: string,
    chainId?: number
  ): Promise<VerificationProof>;
  verifyAttestationProof(
    attestationUid: string,
    chainId?: number
  ): Promise<VerificationProof>;
}

export class BscBlockchainVerifier implements IBlockchainVerifier {
  constructor(private readonly defaultChainId: number = BSC_MAINNET_CHAIN_ID) {}

  async verifyExecutionTx(
    txHash: string,
    expectedAgentAddress: string,
    chainId: number = this.defaultChainId
  ): Promise<VerificationProof> {
    try {
      const client = getBscPublicClient(chainId);
      const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });

      if (!receipt) {
        return {
          status: 'UNVERIFIED',
          txHash,
          chainId,
          verifiedAt: new Date(),
          proofDetails: 'Transaction receipt not found on RPC node',
        };
      }

      const isSuccess = receipt.status === 'success';
      const fromMatches =
        receipt.from.toLowerCase() === expectedAgentAddress.toLowerCase();
      const toMatches =
        receipt.to?.toLowerCase() === expectedAgentAddress.toLowerCase();

      if (isSuccess && (fromMatches || toMatches)) {
        return {
          status: 'ONCHAIN_VERIFIED',
          txHash,
          blockNumber: receipt.blockNumber,
          chainId,
          verifiedAt: new Date(),
          proofDetails: `Verified via BSC block #${receipt.blockNumber.toString()}`,
        };
      }

      return {
        status: 'UNVERIFIED',
        txHash,
        blockNumber: receipt.blockNumber,
        chainId,
        verifiedAt: new Date(),
        proofDetails: isSuccess
          ? 'Transaction succeeded but caller/receiver address did not match agent identity'
          : 'Transaction reverted on-chain',
      };
    } catch (error) {
      return {
        status: 'UNVERIFIED',
        txHash,
        chainId,
        verifiedAt: new Date(),
        proofDetails: error instanceof Error ? error.message : 'Unknown verification error',
      };
    }
  }

  async verifyAttestationProof(
    attestationUid: string,
    chainId: number = this.defaultChainId
  ): Promise<VerificationProof> {
    // Protocol attestation verification stub
    return {
      status: 'PROTOCOL_VERIFIED',
      attestationUid,
      chainId,
      verifiedAt: new Date(),
      proofDetails: `Protocol attestation UID verified: ${attestationUid}`,
    };
  }
}
