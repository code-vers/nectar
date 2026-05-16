export enum Role {
  PROPERTY_MANAGER = "PROPERTY_MANAGER",
  MAINTENANCE_TECH = "MAINTENANCE_TECH",
  SUPER_ADMIN = "SUPER_ADMIN",
  VENDOR = "VENDOR",
  OWNER = "OWNER",
  USER = "USER",
}

export type UserRole = Role;

export const USER_ROLE_LABELS: Record<Role, string> = {
  [Role.PROPERTY_MANAGER]: "Property Manager",
  [Role.MAINTENANCE_TECH]: "Maintenance Technician",
  [Role.SUPER_ADMIN]: "Super Admin",
  [Role.VENDOR]: "Vendor",
  [Role.OWNER]: "Owner",
  [Role.USER]: "User",
};

export type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  /** Optional URL — falls back to initials avatar */
  avatarUrl?: string;
};

export interface RegisterTYpe {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role | "";
}
