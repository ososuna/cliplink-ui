import { Login, LoginUserDto, type AuthService, CustomError } from '@/domain';
import { setUiError } from '@/infrastructure';

export class AuthViewService {
    
  constructor(
    private readonly authService: AuthService,
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
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
    new Login(this.authService)
      .execute(loginUserDto!)
      .then(data => {
        console.log('login successful !!');
        console.log(data);
      })
      .catch(error => {
        this.handleError(error);
      })
      .finally(() => this.setIsLoading(false));
  }

}