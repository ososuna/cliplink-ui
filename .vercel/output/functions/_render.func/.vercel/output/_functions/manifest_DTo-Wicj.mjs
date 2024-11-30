import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BZUcPQHb.mjs';
import { g as decodeKey } from './chunks/astro/server_8HGE-3VO.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/nasa_penguin/Documents/projects/url-shortener-ui/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"auth/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/login","isIndex":false,"type":"page","pattern":"^\\/auth\\/login\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/presentation/pages/auth/login.astro","pathname":"/auth/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"auth/register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/register","isIndex":false,"type":"page","pattern":"^\\/auth\\/register\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/presentation/pages/auth/register.astro","pathname":"/auth/register","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"short/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/short","isIndex":true,"type":"page","pattern":"^\\/short\\/?$","segments":[[{"content":"short","dynamic":false,"spread":false}]],"params":[],"component":"src/presentation/pages/short/index.astro","pathname":"/short","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/presentation/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-image]{width:100%;height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);aspect-ratio:var(--w) / var(--h)}[data-astro-image=responsive]{max-width:calc(var(--w) * 1px);max-height:calc(var(--h) * 1px)}[data-astro-image=fixed]{width:calc(var(--w) * 1px);height:calc(var(--h) * 1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.0.0-beta.12_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/auth/login.astro",{"propagation":"none","containsHead":true}],["/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/auth/register.astro",{"propagation":"none","containsHead":true}],["/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/short/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/presentation/pages/auth/login@_@astro":"pages/auth/login.astro.mjs","\u0000@astro-page:src/presentation/pages/auth/register@_@astro":"pages/auth/register.astro.mjs","\u0000@astro-page:src/presentation/pages/short/index@_@astro":"pages/short.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/presentation/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.0.0-beta.12_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/nasa_penguin/Documents/projects/url-shortener-ui/node_modules/.pnpm/astro@5.0.0-beta.12_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/services/noop.js":"chunks/noop_CKrJ_1Cm.mjs","/Users/nasa_penguin/Documents/projects/url-shortener-ui/node_modules/.pnpm/astro@5.0.0-beta.12_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/env/setup.js":"chunks/setup_Cr6XTFvb.mjs","/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/url/ShortUrlCard.astro":"chunks/ShortUrlCard_kyQgaLJ0.mjs","/Users/nasa_penguin/Documents/projects/url-shortener-ui/node_modules/.pnpm/@astrojs+react@4.0.0-beta.2_@types+react-dom@18.3.1_@types+react@18.3.12_jiti@1.21.6_react-do_ajblnrr5d3a3lmydvmypyx63ku/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000@astrojs-manifest":"manifest_DTo-Wicj.mjs","@astrojs/react/client.js":"_astro/client.DWvzgTDt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/login.DUYl7cq7.css","/favicon.svg","/_astro/client.DWvzgTDt.js","/auth/login/index.html","/auth/register/index.html","/short/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[["@/presentation/components/url/ShortUrlCard.astro","ShortUrlCard"]],"key":"MKNIoK/S3M8M9ye57fo/lp/D1Io3KDnZStm4Si1x/A8=","envGetSecretEnabled":true});

export { manifest };
