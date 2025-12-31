import type { AstroCookies, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import type { User } from '@/auth/entities';
import { AuthService, UserService } from '@/auth/services';

type ContextRedirect = (path: string, status?: 301 | 302 | 303 | 307 | 308 | 300 | 304 | undefined) => Response;

const SCOPED_PATHS = new Set(['/dashboard', '/', '/my-account', '/privacy-policy', '/terms-of-service']);

// Token refresh lock to prevent race conditions
let refreshPromise: Promise<User | null> | null = null;

export const onRequest = defineMiddleware(async ({ request, cookies, locals, redirect }, next) => {
  const url = new URL(request.url);

  // Exit early for paths not within the scoped paths
  if (!SCOPED_PATHS.has(url.pathname)) {
    return next();
  }

  const accessToken = cookies.get('access_token')?.value;
  const refreshToken = cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    console.log('Refresh token is missing ❌');
    return handleRedirect(url.pathname, redirect, next, cookies);
  }

  let user: User | null = null;

  if (!accessToken) {
    user = await refreshAccessToken(refreshToken, cookies);
  } else {
    user = await validateToken(refreshToken, cookies, accessToken);
  }

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

const validateToken = async (refreshToken: string, cookies: AstroCookies, accessToken: string): Promise<User | null> => {
  try {
    const result = await UserService.getUser(accessToken);
    if (!result.ok) {
      console.log('Access token validation failed, attempting refresh...');
      return await refreshAccessToken(refreshToken, cookies);
    }
    return result.data;
  } catch (error) {
    console.error('Token validation failed ❌', error);
    return await refreshAccessToken(refreshToken, cookies);
  }
};

const refreshAccessToken = async (refreshToken: string, cookies: AstroCookies): Promise<User | null> => {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    console.log('Token refresh already in progress, waiting...');
    return refreshPromise;
  }

  // Start new refresh and store the promise
  refreshPromise = (async () => {
    try {
      const result = await AuthService.refreshToken(refreshToken);

      if (!result.ok) {
        console.error('Token refresh failed:', result.error);
        return null;
      }

      const { accessToken, refreshToken: newRefreshToken, user } = result.data!;

      cookies.set('access_token', accessToken, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour in seconds
      });

      cookies.set('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      });

      return user;
    } catch (error) {
      console.error('Token refresh failed ❌', error);
      return null;
    } finally {
      // Clear the lock after completion
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const handleRedirect = (pathname: string, redirect: ContextRedirect, next: MiddlewareNext, cookies: AstroCookies) => {
  cookies.delete('access_token');
  cookies.delete('refresh_token');
  if (['/dashboard', '/my-account'].includes(pathname)) {
    return redirect('/auth/login');
  }
  return next();
};
