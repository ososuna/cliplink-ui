import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_B4UDqp4t.mjs';
import { U as UrlViewServiceImpl, a as UrlServiceImpl } from '../chunks/url.view-service.impl_Dlzel2Y9.mjs';
import '../chunks/ui.store_QvZKQ_iI.mjs';
import { A as Avatar, e as Card, C as CardHeader, a as CardTitle, c as CardContent, f as $$HomeLayout } from '../chunks/card_Cy527Hzy.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { c as cn, u as useToast } from '../chunks/BaseLayout_predzWDd.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { z as z$1 } from 'zod';
import { A as AuthViewServiceImpl, a as AuthServiceImpl } from '../chunks/auth.view-service.impl_4eB7NGm5.mjs';
import { I as Input, B as Button } from '../chunks/input_tBQ775lI.mjs';
import { F as Form, a as FormField, b as FormItem, e as FormLabel, c as FormControl, d as FormMessage } from '../chunks/form_BnZbsZQe.mjs';
import { u as useService } from '../chunks/use-service_D4vFZZO6.mjs';
import { Trash2Icon } from 'lucide-react';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from '../chunks/dialog_CnbSgUCJ.mjs';
export { renderers } from '../renderers.mjs';

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

const GithubIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: `text-zinc-800 dark:text-white ${className}`,
      width: "256",
      height: "250",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 256 250",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
        }
      )
    }
  );
};

const GoogleIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: `text-zinc-800 dark:text-white ${className}`,
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z",
          clipRule: "evenodd"
        }
      )
    }
  );
};

const ProfileView = ({ user, urlsCount }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx(Avatar, { className: "w-20 h-20 text-3xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100", children: user.lastName ? `${user.name.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}` : `${user.name.charAt(0).toUpperCase()}` }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          user.lastName ? /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold", children: [
            user.name,
            " ",
            user.lastName
          ] }) : /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: user.name }),
          user.githubId && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsx(GithubIcon, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsx("span", { children: "GitHub" })
          ] }),
          user.googleId && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsx(GoogleIcon, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsx("span", { children: "Google" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: user.email })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold mr-2", children: urlsCount }),
      "URLs shortened"
    ] }) })
  ] });
};

const formSchema$1 = z.object({
  name: z.string().min(2).max(60),
  lastName: z.string().min(2).max(120),
  email: z.string().email({
    message: "Please enter a valid email address"
  })
});
const MyAccountForm = ({ user: initialUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  const { toast } = useToast();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("updated") === "true") {
      toast({
        title: "Profile updated 🎉",
        description: "Your profile has been successfully updated"
      });
      url.searchParams.delete("updated");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [toast]);
  const defaultValues = {
    name: initialUser.name,
    lastName: initialUser.lastName,
    email: initialUser.email
  };
  const form = useForm({
    resolver: zodResolver(formSchema$1),
    defaultValues
  });
  const onSubmit = async (values) => {
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== initialUser[key]
      )
    );
    if (Object.keys(fieldsToUpdate).length === 0) {
      toast({
        title: "No changes detected",
        description: "Please modify at least one field before updating"
      });
      return;
    }
    setIsLoading(true);
    const user = await authService.update(fieldsToUpdate.name, fieldsToUpdate.lastName, fieldsToUpdate.email);
    setIsLoading(false);
    if (user) {
      const url = new URL(window.location.href);
      url.searchParams.set("updated", "true");
      window.location.href = url.toString();
    }
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Edit Profile" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "lastName",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Last name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "email",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Updating..." : "Update Profile" })
    ] }) }) })
  ] });
};

const confirmPhrase = "Delete my account";
const formSchema = z$1.object({
  confirm: z$1.string().refine((value) => value.toLowerCase() === confirmPhrase.toLowerCase(), {
    message: `Please type "${confirmPhrase}" to confirm`
  })
});
const DeleteAccountButton = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: ""
    }
  });
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  const onSubmit = async () => {
    await authService.deleteAccount();
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "border-red-500 mt-5", variant: "outline", children: [
      /* @__PURE__ */ jsx(Trash2Icon, { className: "mr-2 h-4 w-4 text-red-500" }),
      /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Delete Account" })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Are you absolutely sure?" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "This action cannot be undone. This will permanently delete your account and remove your data from our servers. Type ",
          /* @__PURE__ */ jsxs("strong", { children: [
            '"',
            confirmPhrase,
            '"'
          ] }),
          " to confirm."
        ] })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "confirm",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Type to confirm" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(DialogFooter, { className: "sm:justify-start", children: /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "mt-2", type: "submit", children: "Delete Account" }) })
      ] }) })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const page = await new UrlViewServiceImpl(new UrlServiceImpl()).getUrls(1, 1);
  const urlsCount = page?.total;
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$HomeLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto p-4 self-start"> <h1 class="text-2xl font-bold mb-8">My Account</h1> <div class="grid gap-8 md:grid-cols-2"> ${renderComponent($$result2, "Card", Card, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "CardTitle", CardTitle, {}, { "default": ($$result5) => renderTemplate`Profile Information` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "className": "space-y-4" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "MyAccountView", ProfileView, { "user": user, "urlsCount": urlsCount || 0 })} ${renderComponent($$result4, "DeleteAccountButton", DeleteAccountButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/auth/DeleteAccountButton", "client:component-export": "default" })} ` })} ` })} ${renderComponent($$result2, "MyAccountForm", MyAccountForm, { "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/auth/MyAccountForm", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/my-account/index.astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/my-account/index.astro";
const $$url = "/my-account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
