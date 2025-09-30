import { z } from 'zod';
import { NodeEnv } from './constants/node.env';
import { environmentVariables } from './env';

export const configurationSchema = z.object({
  PORT: z.coerce.number().int().positive().min(1).max(65535).default(3000),

  NODE_ENV: z.enum([NodeEnv.DEV, NodeEnv.PROD, NodeEnv.TEST, NodeEnv.STAGING]).default(NodeEnv.DEV),

  DATABASE_URL: z.url({ message: 'DATABASE_URL must be a valid URL' }).min(1),

  JWT_SECRET_KEY: z
    .string()
    .min(32, 'JWT_SECRET_KEY must be at least 32 characters long')
    .regex(/^[A-Za-z0-9+/=]+$/, 'Invalid JWT_SECRET_KEY'),

  OPTIMIZE_API_KEY: z.string().optional(),

  FRONTEND_URL: z
    .url({ message: 'FRONTEND_URL must be a valid URL' })
    .optional()
    .default('http://localhost:3000'),
} satisfies { [K in keyof typeof environmentVariables]: z.ZodType });
