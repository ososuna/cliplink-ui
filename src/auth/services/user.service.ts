import type { User } from "@/auth/entities";
import type { UserDto } from "@/auth/dto";
import { HttpClient, type HttpResponse } from "@/adapters";
import { UserMapper } from "@/auth/mappers";

export class UserService {

  private static readonly API_URL = '/user';

  static async getUser(): Promise<HttpResponse<User | null>> {
    try {
      const response = await HttpClient.get<HttpResponse<UserDto>>(this.API_URL);
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      const user = UserMapper.userFromObject(response.data!);
      return {
        ok: true,
        data: user,
        status: response.status
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Error processing response'
      };
    }
  }
}