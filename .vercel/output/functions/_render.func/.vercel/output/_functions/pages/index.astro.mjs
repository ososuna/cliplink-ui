import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_B4UDqp4t.mjs';
import { c as CardContent, d as CardFooter, C as CardHeader, a as CardTitle, $ as $$ClipLinkLogo, b as CardDescription, e as Card, f as $$HomeLayout } from '../chunks/card_Cy527Hzy.mjs';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { U as UrlViewServiceImpl, a as UrlServiceImpl } from '../chunks/url.view-service.impl_Dlzel2Y9.mjs';
import '../chunks/ui.store_QvZKQ_iI.mjs';
import { u as useService } from '../chunks/use-service_D4vFZZO6.mjs';
import { I as Input, B as Button } from '../chunks/input_tBQ775lI.mjs';
import { F as Form, a as FormField, b as FormItem, e as FormLabel, c as FormControl, d as FormMessage } from '../chunks/form_BnZbsZQe.mjs';
export { renderers } from '../renderers.mjs';

const formSchema = z.object({
  originalUrl: z.string().url()
});
const ShortenForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: ""
    }
  });
  const onSubmit = async (values) => {
    const { originalUrl } = values;
    setIsLoading(true);
    const url = await urlService?.createUrl(originalUrl);
    setIsLoading(false);
    if (url) window.location.href = `/short/${url.shortId}`;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), children: [
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid w-full items-center gap-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "originalUrl",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Long URL" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { autoComplete: "off", placeholder: "https://example/long/url", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ) }) }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
      " Shortening..."
    ] }) : "Shorten URL" }) })
  ] }) }) });
};

const $$ShortenUrlCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Card", Card, { "className": "w-full max-w-md mx-auto" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "ClipLinkLogo", $$ClipLinkLogo, { "class": "w-6 h-6" })}` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`Enter a long URL to get a shortened version.` })} ` })} ${renderComponent($$result2, "ShortenForm", ShortenForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/url/ShortenForm", "client:component-export": "default" })} ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/url/ShortenUrlCard.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$HomeLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ShortenUrlCard", $$ShortenUrlCard, {})} ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/index.astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
