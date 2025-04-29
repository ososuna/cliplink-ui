import type { AstroCookies, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { CustomError } from '@/domain';
import { CookieConfig } from '@/config';
import { AuthRepositoryImpl, AuthServiceImpl } from '@/infrastructure';

type ContextRedirect = (path: string, status?: 301 | 302 | 303 | 307 | 308 | 300 | 304 | undefined) => Response;

const SCOPED_PATHS = new Set(['/dashboard', '/', '/my-account', '/privacy-policy', '/terms-of-service']);
const authRepository = new AuthRepositoryImpl();
const authService = new AuthServiceImpl(authRepository);

const isProduction = () => import.meta.env.PROD;

export const onRequest = defineMiddleware(async ({ request, cookies, locals, redirect }, next) => {
  const url = new URL(request.url);

  // Exit early for paths not within the scoped paths
  if (!SCOPED_PATHS.has(url.pathname)) {
    return next();
  }

  const accessToken = cookies.get('access_token')?.value;
  const refreshToken = cookies.get('refresh_token')?.value;

  if (!accessToken || !refreshToken) {
    console.log('Tokens are missing ❌');
    return handleRedirect(url.pathname, redirect, next, cookies);
  }

  const user = await validateToken(accessToken, refreshToken, cookies);

  if (!user) {
    console.log('User not found or token invalid ❌');
    return handleRedirect(url.pathname, redirect, next, cookies);
  }

  locals.user = user;

  if (url.pathname === '/') {
    return redirect('/dashboard');
  }

  return next();
});

const validateToken = async (accessToken: string, refreshToken: string, cookies: AstroCookies) => {
  try {
    return await authService.checkToken(accessToken);
  } catch (error) {
    if (!(error instanceof CustomError)) {
      console.error('Token validation failed ❌', error);
      return null;
    }
    if (error.statusCode === 401) {
      return await refreshAccessToken(refreshToken, cookies);
    }
  }
};

const refreshAccessToken = async (token: string, cookies: AstroCookies) => {
  try {
    const userToken = await authService.refreshToken(token);
    if (!userToken) {
      return null;
    }
    cookies.delete('access_token', CookieConfig.authClearCookieOptions(isProduction()));
    cookies.delete('refresh_token', CookieConfig.authClearCookieOptions(isProduction()));
    cookies.set('access_token', userToken.accessToken, CookieConfig.authCookieOptions(isProduction()));
    cookies.set('refresh_token', userToken.refreshToken, CookieConfig.authCookieOptions(isProduction(), 60 * 60 * 24 * 7 * 1000)); // 7 days
    return userToken.user;
  } catch (error) {
    console.error('Token refresh failed ❌', error);
    return null;
  }
};

const handleRedirect = (pathname: string, redirect: ContextRedirect, next: MiddlewareNext, cookies: AstroCookies) => {
  cookies.delete('access_token', CookieConfig.authClearCookieOptions(isProduction()));
  cookies.delete('refresh_token', CookieConfig.authClearCookieOptions(isProduction()));
  if (['/dashboard', '/my-account'].includes(pathname)) {
    return redirect('/auth/login');
  }
  return next();
};