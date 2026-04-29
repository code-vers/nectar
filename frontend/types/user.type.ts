export enum Role {
  PROPERTY_MANAGER = "property_manager",
  MAINTENANCE_TECH = "maintenance_tech",
  SUPER_ADMIN = "super_admin",
  VENDOR = "vendor",
  OWNER = "owner",
  USER = "user",
}

export type UserRole =
  | "admin"
  | "transport_manager"
  | "resident"
  | "instructor"
  | "guest";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  transport_manager: "Transport Manager",
  resident: "Resident",
  instructor: "Instructor",
  guest: "Guest",
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
