import { useState } from "react";
import { UserService } from "@/auth/services";

type Result = {
  ok: boolean;
  error?: string;
}
export default function useDeleteAccount() {
 
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async (): Promise<Result> => {
    setIsLoading(true);
    const { ok, error } = await UserService.deleteAccount();    
    setIsLoading(false);
    return { ok, error };
  }

  return {
    isLoading,
    deleteAccount
  }
}