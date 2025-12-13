import { useState } from "react";
import { AuthService } from "@/auth/services";

type Result = {
  ok: boolean;
  error?: string;
}

export default function useLogout() {

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    const { ok, error } = await AuthService.logout();
    setIsLoading(false);
    return { ok, error };
  }

  return {
    logout,
    isLoading
  }
}