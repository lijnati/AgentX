# AgentX — The Intelligent Marketplace for Autonomous Agents on BNB Chain

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald)](https://github.com/agentx/agentx)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)
[![Network](https://img.shields.io/badge/BNB%20Chain-Mainnet%20(56)%20%7C%20Testnet%20(97)-yellow)](https://bscscan.com)
[![Integrity](https://img.shields.io/badge/Data%20Integrity-Tier%201%20Enforced-green)](https://github.com/agentx/agentx)

> **"Find the right agent. See proof that it works. Hire it in minutes."**

---

## Core Product Execution Loop

```
Discover ──► Verify ──► Compare ──► Simulate ──► Hire ──► Monitor ──► Review
```

---

## Monorepo Architecture

```
AgentX/
├── apps/
│   └── web/                   # Next.js 15 App Router (Terminal UI, SSR, Tailwind CSS)
│
├── packages/
│   ├── domain/                # Pure business & domain entities (No framework dependencies)
│   ├── validation/            # Shared runtime Zod schemas for all models & queries
│   ├── blockchain/            # BNB Smart Chain configs (Mainnet 56 / Testnet 97), Viem client
│   ├── agents/                # Agent discovery, manifest normalizer, registry & adapter interfaces
│   ├── db/                    # PostgreSQL client & Prisma ORM schema
│   └── ui/                    # Terminal & fintech design system components
│
├── vitest.config.ts           # Workspace unit tests configuration
├── tsconfig.base.json         # Strict TypeScript root configuration
├── package.json               # Root npm workspace configuration
└── .env.example               # Typed environment variables template
```

---

##  Data Integrity & Verification System

AgentX enforces strict verification tiers so users and callers never mistake self-reported numbers for verified on-chain execution receipts:

| Tier | Status | Verification Authority | Trust Level |
|---|---|---|---|
| **Tier 1** | `ONCHAIN_VERIFIED` | BSC transaction receipts & on-chain state inspection | 🟢 Maximum |
| **Tier 2** | `PROTOCOL_VERIFIED` | Cryptographically signed protocol telemetry or oracles | 🔵 High |
| **Tier 3** | `AGENT_REPORTED` | Self-reported telemetry provided by agent operator | 🟡 Moderate |
| **Tier 4** | `UNVERIFIED` | Unsubstantiated or pending validation claims | ⚪ Minimum |

---

##  First-Class Agent Categories

AgentX is architected to natively support 4 first-class agent archetypes:

1. **Portfolio Rebalancing (`REBALANCING`)**: Periodic portfolio drift correction, multi-asset target weighting, minimal slippage routing.
2. **Grid Trading (`GRID_TRADING`)**: High-frequency step-limit execution across BNB AMM tick ranges and orderbooks.
3. **Yield Optimization (`YIELD_OPTIMIZATION`)**: Dynamic APY scanning, automated compounding, and liquidity routing across Venus Protocol and PancakeSwap.
4. **Health Factor Monitoring (`HEALTH_FACTOR`)**: Defensive sentinels protecting Venus Protocol collateralized positions from liquidation cascades.

---

##  Quickstart

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### 1. Installation
```bash
npm install
```

### 2. Database & Types Generation
```bash
npm run db:generate
```

### 3. Run Tests
```bash
npm test
```

### 4. Typecheck
```bash
npm run typecheck
```

### 5. Production Build
```bash
npm run build
```

### 6. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the terminal marketplace shell.

---

## 🛡️ License
MIT License
