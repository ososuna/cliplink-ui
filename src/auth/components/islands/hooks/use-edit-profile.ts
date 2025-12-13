import { useState } from "react";
import type { User } from "@/auth/entities";
import { UserService } from "@/auth/services";
import type { UpdateUserDto } from "@/auth/dto";

export default function useEditProfile() {
 
  const [isLoading, setIsLoading] = useState(false);

  const editProfile = async (updateUserDto: UpdateUserDto): Promise<User | null> => {
    setIsLoading(true);
    const response = await UserService.updateUser(updateUserDto);
    setIsLoading(false);
    return response.data;
  }

  return {
    isLoading,
    editProfile,
  }
}