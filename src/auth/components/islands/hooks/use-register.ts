import { useState } from "react";
import type { User } from "@/auth/entities";
import type { RegisterUserDto } from "@/auth/dto";
import { AuthService } from "@/auth/services";
import { setUiError } from "@/stores/ui.store";

type Result = {
  ok: boolean;
  data: User | null;
  error?: string;
}
export default function useRegister() {

  const [isLoading, setIsLoading] = useState(false);

  const register = async (registerData: RegisterUserDto): Promise<Result> => {
    setIsLoading(true);
    const { ok, data, error } = await AuthService.register(registerData);
    setIsLoading(false);
    return { ok, data, error };
  };

  return {
    isLoading,
    register
  };

}
