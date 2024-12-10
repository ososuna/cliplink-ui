import { Login, LoginUserDto, type AuthService, CustomError, CheckToken, User, Logout, RegisterUserDto, Register } from '@/domain';
import { AuthServiceImpl, setUiError } from '@/infrastructure';

export class AuthViewService {
    
  constructor(
    private readonly authService: AuthService,
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null,
  ) {}


  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      setUiError({ type: 'error', message: error.message });
      return;
    }
    setUiError({ type: 'error', message: 'Please try again later. If the issue persists talk to the admin.' });
    this.setIsLoading(false);
  }

  async loginByEmail(email: string, password: string): Promise<void> {
    this.setIsLoading(true);
    const [ error, loginUserDto ] = LoginUserDto.create({ email, password });
    if (error) {
      setUiError({ type: 'error', message: error });
      this.setIsLoading(false);
      return;
    }
    return new Login(this.authService)
      .execute(loginUserDto!)
      .then(() => { window.location.href = '/dashboard' })
      .catch(error => this.handleError(error))
      .finally(() => this.setIsLoading(false));
  }

  async registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void> {
    this.setIsLoading(true);
    const [ error, registerUserDto ] = RegisterUserDto.create({
      name, lastName, email, password
    });
    if (error) {
      setUiError({ type: 'error', message: error });
      this.setIsLoading(false);
      return;
    }
    new Register(new AuthServiceImpl())
      .execute(registerUserDto!)
      .then(() => { window.location.href = '/dashboard' })
      .catch(error => this.handleError(error))
      .finally(() => this.setIsLoading(false));
  }

  async checkToken(token?: string): Promise<User | void> {
    return new CheckToken(this.authService)
      .execute(token)
      .then(data => data)
      .catch(error => {
        if (!(error instanceof CustomError)) {
          setUiError({ type: 'error', message: 'An unexpected error has happened. If the issue persists please talk to the admin.' });
        }
      });
  }

  async logout(): Promise<void> {
    return new Logout(this.authService)
      .execute()
      .then(() => { window.location.href = '/' })
      .catch(this.handleError)
  }

}