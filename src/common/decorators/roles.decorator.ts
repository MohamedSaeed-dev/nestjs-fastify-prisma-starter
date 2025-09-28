import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/generated/enums';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
