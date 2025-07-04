export const roles = ["admin", "editor", "user"] as const;
export type Role = (typeof roles)[number];

export interface User {
  id: string;
  username: string;
  password?: string;
  role: Role;
  avatar?: string;
}
