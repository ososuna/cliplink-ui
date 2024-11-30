import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_svSeqLzj.mjs';
import { manifest } from './manifest_B0Kg5StJ.mjs';

const serverIslandMap = new Map([
	['ShortUrlCard', () => import('./chunks/ShortUrlCard_DGmUZiHL.mjs')],
]);;

const _page0 = () => import('./pages/auth/login.astro.mjs');
const _page1 = () => import('./pages/auth/register.astro.mjs');
const _page2 = () => import('./pages/short/_id_.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const _page4 = () => import('./pages/_image.astro.mjs');
const pageMap = new Map([
    ["src/presentation/pages/auth/login.astro", _page0],
    ["src/presentation/pages/auth/register.astro", _page1],
    ["src/presentation/pages/short/[id].astro", _page2],
    ["src/presentation/pages/index.astro", _page3],
    ["node_modules/.pnpm/astro@5.0.0-beta.12_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b5533b93-efe2-430a-b2ad-fa454d1d507c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
