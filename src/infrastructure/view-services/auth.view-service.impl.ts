import { CheckToken, CustomError, Login, LoginUserDto, Logout, Register, RegisterUserDto, UpdateUser, UpdateUserDto, User, type AuthService, type AuthViewService, AuthGithub } from '@/domain';
import { DeleteAccount } from '@/domain/use-cases/auth/delete-account.use-case';
import { setUiError } from '@/infrastructure';

export class AuthViewServiceImpl implements AuthViewService {
    
  constructor(
    private readonly authService: AuthService,
    private readonly notifyUiError: (error: {message: string, type: string}) => void = setUiError
  ) {}

  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      this.notifyUiError({ type: 'error', message: error.message });
      return;
    }
    this.notifyUiError({ type: 'error', message: 'Please try again later. If the issue persists talk to the admin.' });
  }

  async loginByEmail(email: string, password: string): Promise<void> {
    const [ error, loginUserDto ] = LoginUserDto.create({ email, password });
    if (error) {
      // this.uiErrorHandler({ type: 'error', message: error });
      return;
    }
    return new Login(this.authService)
      .execute(loginUserDto!)
      .then(() => { window.location.href = '/dashboard' })
      .catch(error => this.handleError(error));
  }

  async registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void> {
    const [ error, registerUserDto ] = RegisterUserDto.create({
      name, lastName, email, password
    });
    if (error) {
      // this.uiErrorHandler({ type: 'error', message: error });
      return;
    }
    new Register(this.authService)
      .execute(registerUserDto!)
      .then(() => { window.location.href = '/dashboard' })
      .catch(error => this.handleError(error))
  }

  async checkToken(token?: string): Promise<User | void> {
    return new CheckToken(this.authService)
      .execute(token)
      .then(data => data)
      .catch(error => {
        if (!(error instanceof CustomError)) {
          this.notifyUiError({ type: 'error', message: 'An unexpected error has happened. If the issue persists please talk to the admin.' });
        }
      });
  }

  async logout(): Promise<void> {
    return new Logout(this.authService)
      .execute()
      .then(() => { window.location.href = '/' })
      .catch(this.handleError)
  }

  async update(name?: string, lastName?: string, email?: string): Promise<User | void> {
    const [error, updateUserDto] = UpdateUserDto.create({name, lastName, email});
    if (error) {
      // this.uiErrorHandler({ type: 'error', message: error });
      return;
    }
    return new UpdateUser(this.authService)
    .execute(updateUserDto!)
      .then(data => data)
      .catch(this.handleError)
  }

  async authGithub(): Promise<void> {
    new AuthGithub(this.authService)
      .execute();
  }

  async deleteAccount(): Promise<void> {
    new DeleteAccount(this.authService)
      .execute()
      .then(() => { window.location.href = '/' })
      .catch(this.handleError)
  }

}