import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/agentx?schema=public'),
  BNB_RPC_URL: z.string().url().default('https://bsc-dataseed.binance.org'),
  BNB_TESTNET_RPC_URL: z.string().url().default('https://data-seed-prebsc-1-s1.binance.org:8545'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: z.coerce.number().default(56),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  BNB_RPC_URL: process.env.BNB_RPC_URL,
  BNB_TESTNET_RPC_URL: process.env.BNB_TESTNET_RPC_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEFAULT_CHAIN_ID: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID,
  NODE_ENV: process.env.NODE_ENV,
});
