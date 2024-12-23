import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_YN-iaC2b.mjs';
import { manifest } from './manifest_DnKFnSaJ.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/forgot-password/confirm.astro.mjs');
const _page2 = () => import('./pages/auth/forgot-password.astro.mjs');
const _page3 = () => import('./pages/auth/login/email.astro.mjs');
const _page4 = () => import('./pages/auth/login.astro.mjs');
const _page5 = () => import('./pages/auth/register/email.astro.mjs');
const _page6 = () => import('./pages/auth/register.astro.mjs');
const _page7 = () => import('./pages/auth/reset-password/_token_.astro.mjs');
const _page8 = () => import('./pages/dashboard.astro.mjs');
const _page9 = () => import('./pages/my-account.astro.mjs');
const _page10 = () => import('./pages/short/_id_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.1.1_jiti@2.4.2_rollup@4.29.1_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/presentation/pages/auth/forgot-password/confirm.astro", _page1],
    ["src/presentation/pages/auth/forgot-password/index.astro", _page2],
    ["src/presentation/pages/auth/login/email.astro", _page3],
    ["src/presentation/pages/auth/login/index.astro", _page4],
    ["src/presentation/pages/auth/register/email.astro", _page5],
    ["src/presentation/pages/auth/register/index.astro", _page6],
    ["src/presentation/pages/auth/reset-password/[token].astro", _page7],
    ["src/presentation/pages/dashboard/index.astro", _page8],
    ["src/presentation/pages/my-account/index.astro", _page9],
    ["src/presentation/pages/short/[id].astro", _page10],
    ["src/presentation/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "7c8fe28f-3834-451b-9d60-6af561216d09",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
