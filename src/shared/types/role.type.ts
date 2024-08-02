const roleType = {
  USER: 'user',
  ADMIN: 'admin',
  OWNER: 'owner',
};

export type RoleType = (typeof roleType)[keyof typeof roleType];

export const rolesTypes = Object.values(roleType);
