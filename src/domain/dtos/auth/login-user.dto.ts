import { Messages, Validators } from '@/config';

export class LoginUserDto {

  private constructor(public email: string, public password: string) {}

  static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
    const { email, password } = object;
    
    if ( !email ) return [Messages.MISSING_EMAIL, undefined];
    if ( !Validators.email.test(email) ) return ['email is not valid']
    if ( !password ) return [Messages.PASSWORD_REQUIRED, undefined];
    if ( password.length < 6 ) return [Messages.PASSWORD_TOO_SHORT, undefined];

    return [undefined, new LoginUserDto(email, password)];
  }

}