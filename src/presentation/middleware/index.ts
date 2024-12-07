import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {

  const url = new URL(context.request.url);

  const scopedPaths = ['/dashboard'];
  if (!scopedPaths.includes(url.pathname)) {
    return next();
  }


  if (!context.cookies.get('access_token')) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth/login",
      },
    });
  }
  
  const token = context.cookies.get('access_token')?.value;

  const response = await fetch("http://localhost:3000/api/v1/auth/token", {
    method: "GET",
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  if (response.status !== 200) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth/login",
      },
    });
  }

  const user = await response.json();
  context.locals.user = user;

  return next();
});
