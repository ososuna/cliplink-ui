import { useState } from "react";
import { AuthService } from "@/auth/services";
import type { MessageResponseDto, ResetPasswordRequestDto } from "@/auth/dto";

type Result = {
  ok: boolean;
  data: MessageResponseDto | null;
  error?: string;
}

export default function useResetPassword() {

  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (resetPasswordDto: ResetPasswordRequestDto): Promise<Result> => {
    setIsLoading(true);
    const { ok, data, error } = await AuthService.resetPassword(resetPasswordDto);
    setIsLoading(false);
    return { ok, data, error };
  }

  return {
    isLoading,
    resetPassword
  }

}
