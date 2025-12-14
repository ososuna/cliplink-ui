import type { ForgotPasswordDto, ForgotPasswordResponseDto } from "@/auth/dto";
import { AuthService } from "@/auth/services";
import { useState } from "react";

export default function useForgotPassword() {

  const [ isLoading, setIsLoading ] = useState(false);

  const sendForgotPasswordEmail = async (forgotPasswordDto: ForgotPasswordDto): Promise<ForgotPasswordResponseDto | null> => {
    setIsLoading(true);
    const response = await AuthService.forgotPassword(forgotPasswordDto);
    setIsLoading(false);
    return response.data;
  }

  return {
    isLoading,
    sendForgotPasswordEmail
  }

}