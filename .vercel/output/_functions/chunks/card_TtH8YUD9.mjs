import { c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as createAstro, a as renderComponent, e as renderSlot } from './astro/server_C7pNpUfI.mjs';
import { c as cn, e as envs, $ as $$BaseLayout } from './BaseLayout_Ca3C-4rV.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { ChevronRight, Check, Circle, LogOut, Sun, Moon } from 'lucide-react';
import { A as AuthViewServiceImpl, a as AuthServiceImpl } from './auth.view-service.impl_4eB7NGm5.mjs';
import './ui.store_QvZKQ_iI.mjs';
import { u as useService } from './use-service_D4vFZZO6.mjs';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { B as Button } from './input_nWA1NWkG.mjs';
import 'clsx';
/* empty css                         */

const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const AuthDropdown = ({ name, lastName }) => {
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  const onLogout = async () => {
    await authService?.logout();
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100", children: lastName ? `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : `${name.charAt(0).toUpperCase()}` }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
      lastName ? /* @__PURE__ */ jsx(DropdownMenuLabel, { children: `${name} ${lastName}` }) : /* @__PURE__ */ jsx(DropdownMenuLabel, { children: `${name}` }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => window.location.href = "/dashboard", children: "Dashboard" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => window.location.href = "/my-account", children: "My Account" }),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: onLogout, children: [
        /* @__PURE__ */ jsx(LogOut, {}),
        " Log out"
      ] })
    ] })
  ] });
};

const ModeToggle = () => {
  const [theme, setThemeState] = React.useState("theme-light");
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);
  React.useEffect(() => {
    const isDark = theme === "dark" || theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("theme-light"), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("dark"), children: "Dark" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setThemeState("system"), children: "System" })
    ] })
  ] });
};

const $$Astro$4 = createAstro();
const $$UserIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$UserIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path> </svg>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/icons/UserIcon.astro", void 0);

const $$Astro$3 = createAstro();
const $$ClipLinkIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClipLinkIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} version="1.0" xmlns="http://www.w3.org/2000/svg" width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet" class="cliplink-icon" data-astro-cid-wnte3vx5> <metadata data-astro-cid-wnte3vx5>
ClipLink
</metadata> <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none" data-astro-cid-wnte3vx5> <path d="M2988 4070 c-110 -20 -247 -76 -358 -148 -58 -38 -1343 -1310 -1480
            -1465 -238 -271 -300 -649 -159 -981 89 -209 275 -396 482 -483 143 -60 184
            -68 377 -67 164 0 180 2 260 28 98 33 176 70 258 122 60 40 1341 1307 1481
            1466 158 179 233 381 232 623 0 233 -87 454 -245 622 -115 124 -223 192 -392
            249 -104 36 -116 38 -259 40 -82 2 -171 -1 -197 -6z m356 -210 c145 -37 284
            -128 383 -250 106 -132 156 -277 155 -454 -1 -176 -46 -312 -143 -437 -62 -79
            -1351 -1370 -1437 -1440 -86 -69 -190 -122 -287 -145 -97 -22 -316 -15 -395
            14 -214 76 -376 227 -453 422 -39 99 -49 154 -48 275 0 176 48 319 149 445 53
            66 1292 1309 1397 1401 98 86 210 149 310 173 92 22 276 20 369 -4z" data-astro-cid-wnte3vx5></path> <path d="M2760 3454 c-143 -38 -150 -43 -643 -533 -252 -251 -474 -479 -493
            -507 -83 -120 -116 -311 -79 -454 63 -244 267 -414 512 -428 115 -6 195 9 293
            55 72 34 96 56 533 492 252 251 474 479 493 507 83 120 116 311 79 454 -53
            204 -217 368 -416 415 -80 18 -207 18 -279 -1z m295 -218 c143 -65 222 -197
            213 -358 -7 -142 -4 -138 -506 -640 -520 -520 -497 -503 -667 -503 -90 0 -106
            3 -156 29 -71 35 -139 104 -176 176 -25 49 -28 65 -28 155 0 170 -17 147 503
            666 517 516 511 511 677 506 62 -3 94 -9 140 -31z" data-astro-cid-wnte3vx5></path> </g> </svg> `;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/icons/ClipLinkIcon.astro", void 0);

const $$Astro$2 = createAstro();
const $$ClipLinkLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ClipLinkLogo;
  const { class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="/"> ${renderComponent($$result, "ClipLinkIcon", $$ClipLinkIcon, { "class": `inline mb-1 ${className}` })} ${envs.PUBLIC_APP_NAME} </a>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/shared/ClipLinkLogo.astro", void 0);

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { user } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 w-full transition-all duration-300 ease-in-out bg-background"> <div class="container mx-auto px-4"> <div class="flex h-12 items-center justify-between"> <div class="text-lg font-bold"> ${renderComponent($$result, "ClipLinkLogo", $$ClipLinkLogo, { "class": "w-8 h-8" })} </div> <nav class="flex justify-center items-center gap-x-4"> ${user ? renderTemplate`${renderComponent($$result, "AuthDropdown", AuthDropdown, { "name": user.name, "lastName": user.lastName, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/auth/AuthDropdown", "client:component-export": "default" })}` : renderTemplate`<a href="/auth/login">${renderComponent($$result, "Button", Button, { "variant": "ghost" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "UserIcon", $$UserIcon, {})} Log in` })}</a>`} ${renderComponent($$result, "ModeToggle", ModeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/shared/ModeToggle", "client:component-export": "default" })} </nav> </div> </div> </header>`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/components/shared/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$HomeLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomeLayout;
  const user = Astro2.locals.user;
  const appName = envs.PUBLIC_APP_NAME;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": appName }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "user": user })} ${maybeRenderHead()}<main class="flex items-center justify-center min-h-[calc(100vh-3rem)]"> ${renderSlot($$result2, $$slots["default"])} </main> ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/layouts/HomeLayout.astro", void 0);

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

export { $$ClipLinkLogo as $, Avatar as A, CardHeader as C, CardTitle as a, CardDescription as b, CardContent as c, CardFooter as d, Card as e, $$HomeLayout as f };
