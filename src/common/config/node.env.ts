export const NodeEnv = {
  DEV: 'DEV',
  PROD: 'PROD',
} as const;
export type NodeEnv = (typeof NodeEnv)[keyof typeof NodeEnv];
