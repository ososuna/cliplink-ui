import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { HttpClient } from '@/config';
import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

export const onRequest = defineMiddleware(async (context, next) => {

  const url = new URL(context.request.url);
  const scopedPaths = ['/dashboard', '/', '/my-account'];

  // Check if path is within scoped paths
  if (!scopedPaths.includes(url.pathname)) {
    return next();
  }

  const token = context.cookies.get('access_token')?.value;

  // Redirect to login if token is missing
  if (!token) {
    return redirectToLogin(url.pathname, next);
  }

  const user = await new AuthViewServiceImpl(new AuthServiceImpl()).checkToken(token);
  
  if ( !user ) return redirectToLogin(url.pathname, next);
  
  HttpClient.accessToken = token;
  context.locals.user = user;
  
  // Redirect '/' to '/dashboard'
  if (url.pathname === '/') {
    return redirectTo('/dashboard');
  }

  return next();
});

function redirectTo(location: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
    },
  });
}

function redirectToLogin(pathname: string, next: MiddlewareNext) {
  HttpClient.accessToken = '';
  if (pathname === '/dashboard') {
    return redirectTo("/auth/login");
  }
  return next();
}
