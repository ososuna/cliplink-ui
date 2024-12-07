import { Login, LoginUserDto, type AuthService, CustomError, CheckToken, User, Logout } from '@/domain';
import { setUiError } from '@/infrastructure';

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
  }

  async loginByEmail(email: string, password: string): Promise<void> {
    this.setIsLoading(true);
    const [ error, loginUserDto ] = LoginUserDto.create({ email, password });
    if (error) {
      setUiError({ type: 'error', message: error });
      return;
    }
    return new Login(this.authService)
      .execute(loginUserDto!)
      .then(() => { window.location.href = '/dashboard' })
      .catch(error => this.handleError(error))
      .finally(() => this.setIsLoading(false));
  }

  async checkToken(): Promise<User | void> {
    return new CheckToken(this.authService)
      .execute()
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