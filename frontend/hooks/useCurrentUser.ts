/**
 * useCurrentUser
 *
 * Returns the currently logged-in user.
 * Right now it returns mock data — swap the body of this hook with
 * your real auth logic (NextAuth session, Zustand store, API call, etc.)
 * and the rest of the UI will update automatically.
 */

import { Role, type User } from "@/types/user.type";

const MOCK_USER: User = {
  id: "1",
  name: "Esther Howard",
  email: "esther@example.com",
  roles: [Role.PROPERTY_MANAGER],
};

export function useCurrentUser(): User {
  // TODO: replace with real auth — e.g.:
  //   const { data: session } = useSession();
  //   return session?.user as User;
  return MOCK_USER;
}

/** Returns the first letter(s) of the user's name as an avatar fallback */
export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
