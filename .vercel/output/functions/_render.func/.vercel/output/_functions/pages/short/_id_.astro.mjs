import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_B4UDqp4t.mjs';
import { C as CardHeader, a as CardTitle, $ as $$ClipLinkLogo, b as CardDescription, c as CardContent, d as CardFooter, e as Card, f as $$HomeLayout } from '../../chunks/card_Cy527Hzy.mjs';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { c as cn, e as envs } from '../../chunks/BaseLayout_predzWDd.mjs';
import { I as Input, L as Label, B as Button } from '../../chunks/input_tBQ775lI.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
export { renderers } from '../../renderers.mjs';

function CopyInput({ value, className, ...props }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "text",
        readOnly: true,
        value,
        className: cn(
          "pr-10 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          className
        ),
        onClick: handleCopy,
        ...props
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
        "aria-hidden": "true",
        children: isCopied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 text-gray-500 group-hover:text-gray-700" })
      }
    )
  ] });
}

const $$Astro$1 = createAstro();
const $$ShortUrlCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ShortUrlCard;
  const { id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "w-full max-w-md mx-auto" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "ClipLinkLogo", $$ClipLinkLogo, { "class": "w-6 h-6" })}` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`Shortened version of your long URL` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="grid w-full items-center gap-4"> <div class="flex flex-col space-y-1.5"> ${renderComponent($$result3, "Label", Label, { "className": "mb-2", "htmlFor": "longUrl" }, { "default": ($$result4) => renderTemplate`Short URL` })} ${renderComponent($$result3, "CopyInput", CopyInput, { "client:load": true, "value": `${envs.PUBLIC_API_DOMAIN}/${id}`, "client:component-hydration": "load", "client:component-path": "@/presentation/components/ui/copy-input", "client:component-export": "CopyInput" })} </div> </div> ` })} ${renderComponent($$result2, "CardFooter", CardFooter, {}, { "default": ($$result3) => renderTemplate` <div class="flex space-x-4"> <a${addAttribute(`${envs.PUBLIC_API_DOMAIN}/${id}`, "href")} target="_blank"> ${renderComponent($$result3, "Button", Button, { "type": "button" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ExternalLink", ExternalLink, {})} Open Short URL
` })} </a> <a href="/"> ${renderComponent($$result3, "Button", Button, { "type": "button" }, { "default": ($$result4) => renderTemplate`
Shorten another URL
` })} </a> </div> ` })} ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/url/ShortUrlCard.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$HomeLayout, {}, { "default": ($$result2) => renderTemplate`${id ? renderTemplate`${renderComponent($$result2, "ShortUrlCard", $$ShortUrlCard, { "id": id })}` : renderTemplate`${maybeRenderHead()}<h1>Not found URL</h1>`}` })}`;
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
