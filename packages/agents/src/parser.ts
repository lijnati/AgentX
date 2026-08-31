import { AgentCapability, isValidCapability, getCapabilityDefinition } from '@agentx/domain';

export interface ParsedCapabilityManifest {
  validCapabilities: AgentCapability[];
  unknownCapabilities: string[];
  requiresContractExecution: boolean;
  maxRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function parseAgentCapabilities(rawCapabilities: readonly string[]): ParsedCapabilityManifest {
  const validCapabilities: AgentCapability[] = [];
  const unknownCapabilities: string[] = [];
  let requiresContractExecution = false;
  let maxRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

  for (const raw of rawCapabilities) {
    if (isValidCapability(raw)) {
      validCapabilities.push(raw);
      const def = getCapabilityDefinition(raw);
      if (def.requiresContractExecution) {
        requiresContractExecution = true;
      }
      if (def.riskLevel === 'HIGH') {
        maxRiskLevel = 'HIGH';
      } else if (def.riskLevel === 'MEDIUM' && maxRiskLevel !== 'HIGH') {
        maxRiskLevel = 'MEDIUM';
      }
    } else {
      unknownCapabilities.push(raw);
    }
  }

  return {
    validCapabilities,
    unknownCapabilities,
    requiresContractExecution,
    maxRiskLevel,
  };
}
