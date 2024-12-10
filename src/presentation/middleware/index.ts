import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { AuthServiceImpl } from '@/infrastructure';
import { AuthViewService } from '@/presentation';

export const onRequest = defineMiddleware(async (context, next) => {

  const url = new URL(context.request.url);
  const scopedPaths = ['/dashboard', '/'];

  // Check if path is within scoped paths
  if (!scopedPaths.includes(url.pathname)) {
    return next();
  }

  const token = context.cookies.get('access_token')?.value;

  // Redirect to login if token is missing
  if (!token) {
    return redirectToLogin(url.pathname, next);
  }

  const viewService = new AuthViewService(new AuthServiceImpl);
  const user = await viewService.checkToken(token);
  
  if ( user && !user.hasOwnProperty('id') ) {
    return redirectToLogin(url.pathname, next);
  }
  
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
  if (pathname === '/dashboard') {
    return redirectTo("/auth/login");
  }
  return next();
}
