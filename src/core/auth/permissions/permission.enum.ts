export const Permission = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
