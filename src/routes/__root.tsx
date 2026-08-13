import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Home, Search, Calendar, User, Smartphone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useAppStore } from "../lib/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PetVan — Mobile Vet Clinic" },
      {
        name: "description",
        content: "Mobile veterinary care, grooming and pet shop in Jordan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800;900&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
  }),


  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed:', err));
              });
            }
          `
        }} />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const userId = useAppStore((state) => state.userId);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <div className="pb-20 lg:pb-0"> {/* Add padding for mobile bottom nav */}
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation (Only visible on small screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/90 backdrop-blur-md pb-safe lg:hidden">
        <Link to="/" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary [&.active]:text-primary">
          <Home className="size-5" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary [&.active]:text-primary">
          <Search className="size-5" />
          <span className="text-[10px] font-bold">Shop</span>
        </Link>
        <Link to="/adopt" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary [&.active]:text-primary">
          <Calendar className="size-5" />
          <span className="text-[10px] font-bold">Adopt</span>
        </Link>
        <Link to="/install" className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary [&.active]:text-primary">
          <Smartphone className="size-5" />
          <span className="text-[10px] font-bold">App</span>
        </Link>
        <Link to={userId ? "/profile" : "/login"} className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary [&.active]:text-primary">
          <User className="size-5" />
          <span className="text-[10px] font-bold">{userId ? "Profile" : "Login"}</span>
        </Link>
      </nav>
    </QueryClientProvider>
  );
}
