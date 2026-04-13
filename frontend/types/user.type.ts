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
