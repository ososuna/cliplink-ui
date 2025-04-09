import { navigate } from 'astro:transitions/client';
import {
  CheckToken,
  CustomError,
  Login,
  LoginUserDto,
  Logout,
  Register,
  RegisterUserDto,
  UpdateUser,
  UpdateUserDto,
  User,
  type AuthRepository,
  type AuthService,
  DeleteAccount,
  AuthGithub,
  ForgotPassword,
  ResetPasswordToken,
  CheckPasswordToken,
  UpdatePassword,
} from '@/domain';
import { Messages } from '@/config';
import { setUiError } from '@/infrastructure';

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly navigateTo: (url: string) => Promise<unknown> = navigate,
    private readonly notifyUiError: (error: { message: string; type: string; }) => void = setUiError,
  ) {}

  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      this.notifyUiError({ type: "error", message: error.message });
      return;
    }
    this.notifyUiError({
      type: "error",
      message: Messages.INTERNAL_SERVER_ERROR,
    });
  };

  async loginByEmail(email: string, password: string): Promise<void | User> {
    const [error, loginUserDto] = LoginUserDto.create({ email, password });
    if (error) {
      this.notifyUiError({ type: 'error', message: error });
      return;
    }
    return new Login(this.authRepository)
      .execute(loginUserDto!)
      .then(data => data)
      .catch((error) => this.handleError(error));
  }

  async registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void> {
    const [error, registerUserDto] = RegisterUserDto.create({
      name,
      lastName,
      email,
      password,
    });
    if (error) {
      this.notifyUiError({ type: 'error', message: error });
      return;
    }
    return new Register(this.authRepository)
      .execute(registerUserDto!)
      .then(data => data)
      .catch((error) => this.handleError(error));
  }

  async checkToken(token?: string): Promise<User | void> {
    return new CheckToken(this.authRepository)
      .execute(token)
      .then((data) => data)
      .catch((error) => {
        if (!(error instanceof CustomError)) {
          this.notifyUiError({
            type: 'error',
            message:
              'An unexpected error has happened. If the issue persists please talk to the admin.',
          });
        }
      });
  }

  async logout(): Promise<void> {
    return new Logout(this.authRepository)
      .execute()
      .then(async() => {
        await this.navigateTo('/');
      })
      .catch(this.handleError);
  }

  async update(name?: string, lastName?: string, email?: string): Promise<User | void> {
    const [error, updateUserDto] = UpdateUserDto.create({
      name,
      lastName,
      email,
    });
    if (error) {
      this.notifyUiError({ type: 'error', message: error });
      return;
    }
    return new UpdateUser(this.authRepository)
      .execute(updateUserDto!)
      .then((data) => data)
      .catch(this.handleError);
  }

  async authGithub(): Promise<void> {
    new AuthGithub(this.authRepository).execute();
  }

  async deleteAccount(): Promise<void> {
    new DeleteAccount(this.authRepository)
      .execute()
      .then(() => {
        this.navigateTo('/');
      })
      .catch(this.handleError);
  }

  async forgotPassword(email: string): Promise<void> {
    return new ForgotPassword(this.authRepository)
      .execute(email)
      .then(() => {
        this.navigateTo(`/auth/forgot-password/confirm?email=${encodeURIComponent(email)}`);
      })
      .catch(error => {
        if (error.statusCode !== 500) {
          this.navigateTo(`/auth/forgot-password/confirm?email=${encodeURIComponent(email)}`);
          return;
        }
        if (error instanceof CustomError) {
          this.notifyUiError({ type: 'error', message: error.message });
          return;
        }
        this.notifyUiError({
          type: 'error',
          message:
            'Please try again later. If the issue persists talk to the admin.',
        });
      });
  }

  async checkPasswordToken(token: string): Promise<ResetPasswordToken | void> {
    return new CheckPasswordToken(this.authRepository)
      .execute(token)
      .then((data) => data)
      .catch(this.handleError);
  }

  async updatePassword(token: string, password: string): Promise<User | void> {
    return new UpdatePassword(this.authRepository)
      .execute(token, password)
      .then(data => data)
      .catch(this.handleError);
  }
}
