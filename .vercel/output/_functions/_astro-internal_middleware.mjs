import { d as defineMiddleware, s as sequence } from './chunks/index_ZlGGatEr.mjs';
import { A as AuthViewServiceImpl, a as AuthServiceImpl, H as HttpClient } from './chunks/auth.view-service.impl_4eB7NGm5.mjs';
import './chunks/ui.store_QvZKQ_iI.mjs';
import './chunks/astro-designed-error-pages_kpkiLEb8.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const scopedPaths = ["/dashboard", "/", "/my-account"];
  if (!scopedPaths.includes(url.pathname)) {
    return next();
  }
  const token = context.cookies.get("access_token")?.value;
  if (!token) {
    return redirectToLogin(url.pathname, next);
  }
  const user = await new AuthViewServiceImpl(new AuthServiceImpl()).checkToken(token);
  if (!user) return redirectToLogin(url.pathname, next);
  HttpClient.accessToken = token;
  context.locals.user = user;
  if (url.pathname === "/") {
    return redirectTo("/dashboard");
  }
  return next();
});
function redirectTo(location) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location
    }
  });
}
function redirectToLogin(pathname, next) {
  HttpClient.accessToken = "";
  if (pathname === "/dashboard" || pathname === "/my-account") {
    return redirectTo("/auth/login");
  }
  return next();
}

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
