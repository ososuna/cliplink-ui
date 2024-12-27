import type { AstroCookies, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

type ContextRedirect = (path: string, status?: 301 | 302 | 303 | 307 | 308 | 300 | 304 | undefined) => Response;

const SCOPED_PATHS = new Set(['/dashboard', '/', '/my-account', '/privacy-policy', '/terms-of-service']);
const authService = new AuthServiceImpl();
const authViewService = new AuthViewServiceImpl(authService);

export const onRequest = defineMiddleware(async ({ request, cookies, locals, redirect }, next) => {
  const url = new URL(request.url);

  // Exit early for paths not within the scoped paths
  if (!SCOPED_PATHS.has(url.pathname)) {
    return next();
  }

  const token = cookies.get('access_token')?.value;

  if (!token) {
    console.log('Access token cookie is missing ❌');
    return handleRedirect(url.pathname, redirect, next, cookies);
  }

  const user = await validateToken(token);
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

const validateToken = async (token: string) => {
  try {
    return await authViewService.checkToken(token);
  } catch (error) {
    console.error('Token validation failed ❌', error);
    return null;
  }
};

// Handle redirection based on path
const handleRedirect = (pathname: string, redirect: ContextRedirect, next: MiddlewareNext, cookies: AstroCookies) => {
  cookies.delete('access_token');
  if (['/dashboard', '/my-account'].includes(pathname)) {
    return redirect('/auth/login');
  }
  return next();
};