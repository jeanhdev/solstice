import { type User as DrizzleUser } from "@solstice/cosmos/tables/users";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DrizzleUser {}

  interface Session {
    user: Pick<User, "email" | "id">;
  }
}
