interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
  domain?: string;
  maxAge?: number;
}

export class CookieConfig {
  
  private static readonly isProduction = import.meta.env.PROD;

  static authCookieOptions(maxAge?: number): CookieOptions { 
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'none' : 'lax',
      domain: this.isProduction ? '.cliplink.app' : undefined,
      maxAge: maxAge || 60 * 60 * 1000, // 1 hour in milliseconds
    };
  }
  static authClearCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'none' : 'lax',
      domain: this.isProduction ? '.cliplink.app' : undefined,
    };
  }
}
