import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@/shared/types/role.type';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
