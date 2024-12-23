import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_C7pNpUfI.mjs';
import { A as AuthViewServiceImpl, a as AuthServiceImpl } from '../../../chunks/auth.view-service.impl_4eB7NGm5.mjs';
import '../../../chunks/ui.store_QvZKQ_iI.mjs';
import { $ as $$AuthLayout } from '../../../chunks/AuthLayout_BKq0us2R.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { I as Input, B as Button } from '../../../chunks/input_nWA1NWkG.mjs';
import { F as Form, a as FormField, b as FormItem, e as FormLabel, c as FormControl, d as FormMessage } from '../../../chunks/form_BP5E-N4U.mjs';
import { u as useService } from '../../../chunks/use-service_D4vFZZO6.mjs';
export { renderers } from '../../../renderers.mjs';

const formSchema = z.object({
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128)
}).refine(
  (values) => values.password === values.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }
);
const ResetPasswordForm = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const onSubmit = async (values) => {
    const { password } = values;
    setIsLoading(true);
    const user = await authService.updatePassword(token, password);
    setIsLoading(false);
    if (user) {
      const url = new URL(`${window.location.protocol}//${window.location.host}/dashboard`);
      url.searchParams.set("updated-password", "true");
      window.location.href = url.toString();
    }
  };
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-2", children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "password",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", autoComplete: "off", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "confirmPassword",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Confirm your password" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", autoComplete: "off", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
      " Loading..."
    ] }) : "Reset password" })
  ] }) });
};

const $$Astro = createAstro();
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$token;
  const { token } = Astro2.params;
  let isValidToken = false;
  if (token) {
    const result = await new AuthViewServiceImpl(new AuthServiceImpl()).checkPasswordToken(token);
    if (result) isValidToken = true;
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "action": "forgot-password" }, { "default": ($$result2) => renderTemplate`${token && isValidToken ? renderTemplate`${maybeRenderHead()}<div class="w-full max-w-md mx-auto"> <div class="flex flex-col items-center space-y-2"> <h1 class="text-2xl font-semibold tracking-tight text-center">
Reset password
</h1> <p class="px-8 text-center text-sm text-muted-foreground">
Enter your new password below
</p> <div class="w-full max-w-xs space-y-6"> ${renderComponent($$result2, "ResetPasswordForm", ResetPasswordForm, { "token": token, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/auth/ResetPasswordForm", "client:component-export": "default" })} </div> </div> </div>` : renderTemplate`<div class="w-full max-w-md mx-auto"> <div class="flex flex-col items-center space-y-2"> <h1 class="text-2xl font-semibold tracking-tight text-center">
Invalid password reset link
</h1> <p class="px-8 text-center text-sm text-muted-foreground">
The link you are trying to use is invalid or has expired. Please request a new password reset link.
</p> </div> </div>`}` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/auth/reset-password/[token].astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/auth/reset-password/[token].astro";
const $$url = "/auth/reset-password/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
