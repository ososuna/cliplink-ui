import { c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as createAstro, a as addAttribute, f as renderComponent, d as renderSlot } from './astro/server_8HGE-3VO.mjs';
import { B as Button } from './button_ChP4NZ7V.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$UserIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/icons/UserIcon.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header${addAttribute(`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${"bg-background/70 backdrop-blur-md shadow-sm" }`, "class")}> <div class="container mx-auto px-4"> <div class="flex h-12 items-center justify-between"> <div class="text-lg font-bold">URL Shortener</div> <nav class="flex space-x-4"> <a href="/auth/login"> ${renderComponent($$result, "Button", Button, { "variant": "ghost" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "UserIcon", $$UserIcon, {})} Log in` })} </a> </nav> </div> </div> </header>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/shared/Navbar.astro", void 0);

const $$HomeLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="flex items-center justify-center min-h-[calc(100vh-3rem)]"> ${renderSlot($$result, $$slots["default"])} </main>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/layouts/HomeLayout.astro", void 0);

export { $$HomeLayout as $ };
