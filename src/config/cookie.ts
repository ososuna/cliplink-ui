interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
  domain?: string;
  maxAge?: number;
}

export class CookieConfig {
  static authCookieOptions(isProduction: boolean, maxAge?: number): CookieOptions {
    console.log('isProduction', isProduction);
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.cliplink.app' : undefined,
      maxAge: maxAge || 60 * 60 * 1000, // 1 hour in milliseconds
    };
  }
  static authClearCookieOptions(isProduction: boolean): CookieOptions {
    console.log('isProduction', isProduction);
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.cliplink.app' : undefined,
    };
  }
}
