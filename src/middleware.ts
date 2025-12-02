import type { AstroCookies, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import type { User } from '@/auth/entities/User';

type ContextRedirect = (path: string, status?: 301 | 302 | 303 | 307 | 308 | 300 | 304 | undefined) => Response;

const SCOPED_PATHS = new Set(['/dashboard', '/', '/my-account', '/privacy-policy', '/terms-of-service']);

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
    user = await validateToken(accessToken, refreshToken, cookies);
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

const validateToken = async (accessToken: string, refreshToken: string, cookies: AstroCookies): Promise<User | null> => {
  try {
    // const checkTokenUseCase = makeCheckToken(accessToken);
    // const result = await checkTokenUseCase.execute(accessToken);
    const result = { ok: true, value: { id: 1, name: 'John Doe', email: 'john.doe@example.com' } };
    if (!result.ok) {
      console.log('Access token validation failed, attempting refresh...');
      return await refreshAccessToken(refreshToken, cookies);
    }

    return result.value;
  } catch (error) {
    console.error('Token validation failed ❌', error);
    return await refreshAccessToken(refreshToken, cookies);
  }
};

const refreshAccessToken = async (token: string, cookies: AstroCookies): Promise<User | null> => {
  try {
    // const refreshTokenUseCase = makeRefreshToken(token);
    // const result = await refreshTokenUseCase.execute(token);
    const result = { ok: true, value: { id: 1, name: 'John Doe', email: 'john.doe@example.com' } };
    if (!result.ok) {
      console.error('Token refresh failed:', result.error.message);
      return null;
    }

    // Get the response headers from the refresh token request
    const response = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/refresh-token`, {
      credentials: 'include',
      headers: {
        Cookie: `refresh_token=${token}`
      }
    });

    const setCookieHeader = response.headers.get('set-cookie');
    if (!setCookieHeader) {
      console.error('No set-cookie header in refresh response');
      return null;
    }

    // Parse and set new tokens
    const [accessTokenCookie, refreshTokenCookie] = setCookieHeader.split('refresh_token=');
    const accessTokenMatch = accessTokenCookie.match(/access_token=([^;]+)/);
    if (accessTokenMatch) {
      cookies.set('access_token', accessTokenMatch[1], {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour in seconds
      });
    }

    const refreshTokenMatch = refreshTokenCookie.match(/^([^;]+)/);
    if (refreshTokenMatch) {
      cookies.set('refresh_token', refreshTokenMatch[1], {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      });
    }

    return result.value;
  } catch (error) {
    console.error('Token refresh failed ❌', error);
    return null;
  }
};

const handleRedirect = (pathname: string, redirect: ContextRedirect, next: MiddlewareNext, cookies: AstroCookies) => {
  cookies.delete('access_token');
  cookies.delete('refresh_token');
  if (['/dashboard', '/my-account'].includes(pathname)) {
    return redirect('/auth/login');
  }
  return next();
};
