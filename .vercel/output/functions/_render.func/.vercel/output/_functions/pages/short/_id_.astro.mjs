import { c as createComponent, r as renderTemplate, f as renderComponent, e as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_8HGE-3VO.mjs';
import { $ as $$HomeLayout } from '../../chunks/HomeLayout_ZUS0gEa4.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DBj5SoBS.mjs';
import $$ShortUrlCard from '../../chunks/ShortUrlCard_DGmUZiHL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "URL Shortener" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomeLayout", $$HomeLayout, {}, { "default": ($$result3) => renderTemplate`${id ? renderTemplate`${renderComponent($$result3, "ShortUrlCard", $$ShortUrlCard, { "server:defer": true, "id": id, "server:component-directive": "defer", "server:component-path": "@/presentation/components/url/ShortUrlCard.astro", "server:component-export": "default" })}` : renderTemplate`${maybeRenderHead()}<h1>Not found URL</h1>`}` })} ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/short/[id].astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/short/[id].astro";
const $$url = "/short/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
