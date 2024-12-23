import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C7pNpUfI.mjs';
import { U as UrlViewServiceImpl, a as UrlServiceImpl } from '../chunks/url.view-service.impl_Dlzel2Y9.mjs';
import '../chunks/ui.store_QvZKQ_iI.mjs';
import { e as Card, C as CardHeader, a as CardTitle, b as CardDescription, d as CardFooter, f as $$HomeLayout } from '../chunks/card_TtH8YUD9.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Check, Clipboard, ExternalLink, Trash } from 'lucide-react';
import { c as cn, e as envs, u as useToast } from '../chunks/BaseLayout_Ca3C-4rV.mjs';
import { b as buttonVariants, B as Button, I as Input } from '../chunks/input_nWA1NWkG.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { u as useService } from '../chunks/use-service_D4vFZZO6.mjs';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from '../chunks/dialog_BL1vqJUa.mjs';
import { F as Form, a as FormField, b as FormItem, e as FormLabel, c as FormControl, d as FormMessage } from '../chunks/form_BP5E-N4U.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
export { renderers } from '../renderers.mjs';

const Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("", className), ...props }));
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}) => /* @__PURE__ */ jsx(
  "a",
  {
    "aria-current": isActive ? "page" : void 0,
    className: cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size
      }),
      disabled && "pointer-events-none opacity-50",
      className
    ),
    ...props
  }
);
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({
  className,
  disabled,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", disabled && "pointer-events-none opacity-50", className),
    disabled,
    ...props,
    children: [
      /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({
  className,
  disabled,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", disabled && "pointer-events-none opacity-50", className),
    disabled,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { children: "Next" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";

const CardsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
    /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
      PaginationPrevious,
      {
        onClick: (e) => {
          e.preventDefault();
          handlePrevious();
        },
        disabled: currentPage === 1
      }
    ) }),
    Array.from({ length: totalPages }, (_, index) => /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
      PaginationLink,
      {
        onClick: (e) => {
          e.preventDefault();
          onPageChange(index + 1);
        },
        isActive: index + 1 === currentPage,
        children: index + 1
      }
    ) }, index)),
    /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
      PaginationNext,
      {
        onClick: (e) => {
          e.preventDefault();
          handleNext();
        },
        disabled: currentPage === totalPages
      }
    ) })
  ] }) });
};

const formSchema = z.object({
  name: z.string().max(80).optional(),
  longUrl: z.string().url()
});
const CreateShortUrlDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);
  const onShortenUrl = async (values) => {
    const { name, longUrl } = values;
    setIsLoading(true);
    await urlService?.createUrl(longUrl, name);
    setIsLoading(false);
    window.location.href = "/dashboard";
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      longUrl: ""
    }
  });
  return /* @__PURE__ */ jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { className: "whitespace-nowrap", children: "Shorten URL" }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Shorten URL" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Enter a long URL to get a shortened version." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onShortenUrl), className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Name (Optional)" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", autoComplete: "off", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "longUrl",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Long URL" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", autoComplete: "off", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { className: "w-full mt-2", type: "submit", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
          " Loading..."
        ] }) : "Shorten URL" }) })
      ] }) })
    ] })
  ] });
};

const ConfirmationDialog = ({ button, action, callback, isLoading }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onConfirm = () => {
    callback();
    setIsDialogOpen(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Are you absolutely sure?" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { className: "sm:justify-start", children: /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "mt-2", type: "button", onClick: onConfirm, children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
        " Loading..."
      ] }) : action }) })
    ] })
  ] });
};

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const MyShortUrlCard = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);
  const onCopy = () => {
    navigator.clipboard.writeText(`${envs.PUBLIC_API_DOMAIN}/${url.shortId}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3e3);
  };
  const onDelete = async () => {
    setIsLoading(true);
    await urlService?.deleteUrl(url.id);
    setIsLoading(false);
    window.location.href = "/dashboard";
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        url.name && url.name.length > 30 ? /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg truncate flex-1", children: url.name }) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: url.name }) })
        ] }) }) : /* @__PURE__ */ jsx(CardTitle, { className: "text-lg truncate flex-1", children: url.name || url.shortId }),
        url.name && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: url.shortId })
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { className: "truncate", children: url.originalUrl })
    ] }) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: onCopy, children: isCopied ? /* @__PURE__ */ jsx(Check, { className: "text-green-500" }) : /* @__PURE__ */ jsx(Clipboard, {}) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => window.open(url.originalUrl, "_blank"), children: /* @__PURE__ */ jsx(ExternalLink, {}) })
      ] }),
      /* @__PURE__ */ jsx(
        ConfirmationDialog,
        {
          action: "Delete URL",
          button: /* @__PURE__ */ jsx(Button, { className: "border-red-500", variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Trash, { className: "text-red-500" }) }),
          callback: onDelete,
          isLoading
        }
      )
    ] })
  ] }, url.id);
};

const UrlSearchBar = ({ searchTerm, handleSearchChange }) => {
  return /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsx(
    Input,
    {
      type: "text",
      placeholder: "Search URLs...",
      value: searchTerm,
      onChange: handleSearchChange,
      className: "w-full"
    }
  ) });
};

const Dashboard = ({ page: initialPage }) => {
  const [urls, setUrls] = useState(initialPage.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage.page);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);
  const { toast } = useToast();
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("updated-password") === "true") {
      toast({
        title: "Password updated 🎉",
        description: "Your password has been successfully updated"
      });
      url.searchParams.delete("updated-password");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [toast]);
  const itemsPerPage = 9;
  const fetchUrls = async (page, term) => {
    const data = await urlService.getUrls(page, itemsPerPage, term);
    if (data) {
      setUrls(data.items);
      setTotalPages(data.totalPages);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    if (initialPage.total > 0) {
      fetchUrls(1, event.target.value);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUrls(page, searchTerm);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6 gap-4", children: [
      /* @__PURE__ */ jsx(UrlSearchBar, { searchTerm, handleSearchChange }),
      /* @__PURE__ */ jsx(CreateShortUrlDialog, {})
    ] }),
    urls.length === 0 ? searchTerm && initialPage.total > 0 ? /* @__PURE__ */ jsxs("p", { className: "px-8 text-center text-sm text-muted-foreground", children: [
      'No URLs found matching "',
      /* @__PURE__ */ jsx("strong", { children: searchTerm }),
      '". Please try a different search term'
    ] }) : /* @__PURE__ */ jsxs("p", { className: "px-8 text-center text-sm text-muted-foreground", children: [
      "You haven't shortened any URLs yet. Click the ",
      /* @__PURE__ */ jsx("strong", { children: '"Shorten URL"' }),
      " button to shorten your first URL"
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: urls.map((url) => /* @__PURE__ */ jsx(MyShortUrlCard, { url }, url.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
        CardsPagination,
        {
          currentPage,
          totalPages,
          onPageChange: handlePageChange
        }
      ) })
    ] })
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const page = await new UrlViewServiceImpl(new UrlServiceImpl()).getUrls(1, 9);
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$HomeLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto p-4 self-start"> <h1 class="text-2xl font-bold mb-8">Dashboard</h1> ${page && renderTemplate`${renderComponent($$result2, "Dashboard", Dashboard, { "page": page, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/presentation/components/url/Dashboard", "client:component-export": "default" })}`} </div> ` })}`;
}, "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/dashboard/index.astro", void 0);

const $$file = "/Users/nasa_penguin/Documents/projects/url-shortener-ui/src/presentation/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
