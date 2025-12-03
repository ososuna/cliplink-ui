import type { User } from "@/auth/entities";

export class AuthTokens {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public user: User
  ) {}
}
