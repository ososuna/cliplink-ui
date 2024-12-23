import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, e as renderSlot } from './astro/server_C7pNpUfI.mjs';
import { $ as $$BaseLayout, e as envs } from './BaseLayout_Ca3C-4rV.mjs';

const $$Astro = createAstro();
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { action } = Astro2.props;
  const appName = envs.PUBLIC_APP_NAME;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": appName }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="absolute right-4 top-4 md:right-8 md:top-8 space-y-4"> <div class="flex space-x-4"> <a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="/">Home
</a> ${action === "forgot-password" ? renderTemplate`<a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="/auth/login">Log in
</a>
          <a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" href="/auth/register">Register
</a>` : renderTemplate`<a class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"${addAttribute(`/auth/${action === "register" ? "login" : "register"}`, "href")}>${action === "register" ? "Log in" : "Register"} </a>`} </div> </nav> <main class="flex justify-center items-center flex-col min-h-screen"> ${renderSlot($$result2, $$slots["default"])} </main> ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };
