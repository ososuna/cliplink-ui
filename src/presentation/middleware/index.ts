import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {

  const url = new URL(context.request.url);

  const scopedPaths = ['/dashboard', '/'];
  if (!scopedPaths.includes(url.pathname)) {
    return next();
  }
  
  if (!context.cookies.get('access_token')) {

    if (url.pathname === '/dashboard') {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/auth/login",
        },
      });
    } else {
      return next()
    }
  }
  
  const token = context.cookies.get('access_token')?.value;

  const response = await fetch("http://localhost:3000/api/v1/auth/token", {
    method: "GET",
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  if (response.status !== 200) {
    if (url.pathname === '/dashboard') {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/auth/login",
        },
      });
    } else {
      return next()
    }
  }

  const user = await response.json();
  context.locals.user = user;

  if (url.pathname === '/') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  }

  return next();
});
