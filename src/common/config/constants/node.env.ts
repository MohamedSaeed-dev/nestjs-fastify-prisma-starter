export const NodeEnv = {
  DEV: 'DEV',
  TEST: 'TEST',
  STAGING: 'STAGING',
  PROD: 'PROD',
} as const;

export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];
