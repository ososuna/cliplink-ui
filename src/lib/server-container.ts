import { HttpClient } from '@/adapters/http/HttpClient';
import { ServerAuthRepository } from '@/repositories/server/ServerAuthRepository';
import { ServerUrlRepository } from '@/repositories/server/ServerUrlRepository';
import { LoginUseCase } from '@/use-cases/auth/login';
import { RegisterUseCase } from '@/use-cases/auth/register';
import { CheckTokenUseCase } from '@/use-cases/auth/check-token';
import { RefreshTokenUseCase } from '@/use-cases/auth/refresh-token';
import { LogoutUseCase } from '@/use-cases/auth/logout';
import { UpdateUserUseCase } from '@/use-cases/auth/update-user';
import { DeleteAccountUseCase } from '@/use-cases/auth/delete-account';
import { ForgotPasswordUseCase } from '@/use-cases/auth/forgot-password';
import { CheckPasswordTokenUseCase } from '@/use-cases/auth/check-password-token';
import { UpdatePasswordUseCase } from '@/use-cases/auth/update-password';
import { CreateGuestUrlUseCase } from '@/use-cases/url/create-guest-url';
import { GetUrlsUseCase } from '@/use-cases/url/get-urls';
import { DeleteUrlUseCase } from '@/use-cases/url/delete-url';
import { RenameUrlUseCase } from '@/use-cases/url/rename-url';

const API_BASE = import.meta.env.PUBLIC_API_BASE_URL;

// Factory: Builds the Clean Architecture stack per request
const createHttpClient = (accessToken?: string) => {
  const headers: Record<string, string> = accessToken ? { Cookie: `access_token=${accessToken}` } : {};
  return new HttpClient(API_BASE, headers);
};

const createAuthRepository = (accessToken?: string) => {
  const httpClient = createHttpClient(accessToken);
  return new ServerAuthRepository(httpClient);
};

const createUrlRepository = (accessToken?: string) => {
  const httpClient = createHttpClient(accessToken);
  return new ServerUrlRepository(httpClient);
};

// Auth Use Cases
export const makeLogin = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new LoginUseCase(repo);
};

export const makeRegister = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new RegisterUseCase(repo);
};

export const makeCheckToken = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new CheckTokenUseCase(repo);
};

export const makeRefreshToken = (refreshToken?: string) => {
  const headers: Record<string, string> = refreshToken ? { Cookie: `refresh_token=${refreshToken}` } : {};
  const httpClient = new HttpClient(API_BASE, headers);
  const repo = new ServerAuthRepository(httpClient);
  return new RefreshTokenUseCase(repo);
};

export const makeLogout = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new LogoutUseCase(repo);
};

export const makeUpdateUser = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new UpdateUserUseCase(repo);
};

export const makeDeleteAccount = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new DeleteAccountUseCase(repo);
};

export const makeForgotPassword = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new ForgotPasswordUseCase(repo);
};

export const makeCheckPasswordToken = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new CheckPasswordTokenUseCase(repo);
};

export const makeUpdatePassword = (accessToken?: string) => {
  const repo = createAuthRepository(accessToken);
  return new UpdatePasswordUseCase(repo);
};

// URL Use Cases
export const makeCreateGuestUrl = () => {
  const repo = createUrlRepository();
  return new CreateGuestUrlUseCase(repo);
};

export const makeGetUrls = (accessToken?: string) => {
  const repo = createUrlRepository(accessToken);
  return new GetUrlsUseCase(repo);
};

export const makeDeleteUrl = (accessToken?: string) => {
  const repo = createUrlRepository(accessToken);
  return new DeleteUrlUseCase(repo);
};

export const makeRenameUrl = (accessToken?: string) => {
  const repo = createUrlRepository(accessToken);
  return new RenameUrlUseCase(repo);
};
