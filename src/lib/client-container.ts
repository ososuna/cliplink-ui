import { HttpClient } from '@/adapters/http-client';
import { ClientAuthRepository } from '@/repositories/client/ClientAuthRepository';
import { ClientUrlRepository } from '@/repositories/client/ClientUrlRepository';
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
import { CreateUrlAsGuestUseCase } from '@/use-cases/url/create-url-as-guest';
import { GetUrlsUseCase } from '@/use-cases/url/get-urls';
import { DeleteUrlUseCase } from '@/use-cases/url/delete-url';
import { RenameUrlUseCase } from '@/use-cases/url/rename-url';
import { CreateUrlUseCase } from '@/use-cases/url/create-url';

// Singleton instances for client-side
const httpClient = new HttpClient('');
const authRepo = new ClientAuthRepository(httpClient);
const urlRepo = new ClientUrlRepository(httpClient);

// Auth Use Cases
export const makeLogin = () => new LoginUseCase(authRepo);
export const makeRegister = () => new RegisterUseCase(authRepo);
export const makeCheckToken = () => new CheckTokenUseCase(authRepo);
export const makeRefreshToken = () => new RefreshTokenUseCase(authRepo);
export const makeLogout = () => new LogoutUseCase(authRepo);
export const makeUpdateUser = () => new UpdateUserUseCase(authRepo);
export const makeDeleteAccount = () => new DeleteAccountUseCase(authRepo);
export const makeForgotPassword = () => new ForgotPasswordUseCase(authRepo);
export const makeCheckPasswordToken = () => new CheckPasswordTokenUseCase(authRepo);
export const makeUpdatePassword = () => new UpdatePasswordUseCase(authRepo);

// URL Use Cases
export const makeCreateUrlAsGuest = () => new CreateUrlAsGuestUseCase(urlRepo);
export const makeCreateUrl = () => new CreateUrlUseCase(urlRepo);
export const makeGetUrls = () => new GetUrlsUseCase(urlRepo);
export const makeDeleteUrl = () => new DeleteUrlUseCase(urlRepo);
export const makeRenameUrl = () => new RenameUrlUseCase(urlRepo);
