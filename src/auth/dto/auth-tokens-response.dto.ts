import type { UserDto } from "@/auth/dto";

export type AuthTokensResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
};
