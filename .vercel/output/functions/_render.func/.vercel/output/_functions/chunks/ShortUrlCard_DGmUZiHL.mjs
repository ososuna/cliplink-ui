import { c as createComponent, r as renderTemplate, f as renderComponent, e as createAstro, m as maybeRenderHead } from './astro/server_8HGE-3VO.mjs';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { C as CardHeader, a as CardTitle, b as CardDescription, c as CardContent, L as Label, d as CardFooter, e as Card } from './label_CcPiKGru.mjs';
import { I as Input, c as cn, B as Button } from './button_ChP4NZ7V.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';

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

const $$Astro = createAstro();
const $$ShortUrlCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ShortUrlCard;
  const { id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "w-full max-w-md mx-auto" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`URL Shortener` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`Shortened version of your long URL.` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="grid w-full items-center gap-4"> <div class="flex flex-col space-y-1.5"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "longUrl" }, { "default": ($$result4) => renderTemplate`Short URL` })} ${renderComponent($$result3, "CopyInput", CopyInput, { "value": `https://short.com/${id}` })} </div> </div> ` })} ${renderComponent($$result2, "CardFooter", CardFooter, {}, { "default": ($$result3) => renderTemplate` <div class="flex space-x-4"> ${renderComponent($$result3, "Button", Button, { "type": "button" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ExternalLink", ExternalLink, {})} Open Short URL
` })} <a href="/"> ${renderComponent($$result3, "Button", Button, { "type": "button" }, { "default": ($$result4) => renderTemplate`
Shorten another URL
` })} </a> </div> ` })} ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/url/ShortUrlCard.astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/url/ShortUrlCard.astro";
const $$url = undefined;

export { $$ShortUrlCard as default, $$file as file, $$url as url };
