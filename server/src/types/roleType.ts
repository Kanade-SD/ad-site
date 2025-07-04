export const ROLES = ["admin", "editor", "user"] as const;
export type RoleType = (typeof ROLES)[number];
