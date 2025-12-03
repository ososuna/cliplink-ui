import { useState } from "react";
import type { User } from "@/auth/entities";
import { AuthService } from "@/auth/services";
import { setUiError } from "@/stores/ui.store";

export default function useLogin() {

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    const response = await AuthService.login(email, password);
    if (!response.ok) {
      setUiError({ message: response.error || 'Failed to login', type: 'error' });
    }
    setIsLoading(false);
    return response.data;
  };

  return {
    isLoading,
    login
  };

}