interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
  domain?: string;
  maxAge?: number;
}

export class CookieConfig {
  static authCookieOptions(maxAge?: number): CookieOptions {
    return {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: import.meta.env.PROD ? 'none' : 'lax',
      domain: import.meta.env.PROD ? '.cliplink.app' : undefined,
      maxAge: maxAge || 60 * 60 * 1000, // 1 hour in milliseconds
    };
  }
  static authClearCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: import.meta.env.PROD ? 'none' : 'lax',
      domain: import.meta.env.PROD ? '.cliplink.app' : undefined,
    };
  }
}
