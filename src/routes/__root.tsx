import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Home, Search, Calendar, User, Smartphone, ArrowUp } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useAppStore } from "../lib/store";
import { copy } from "../lib/i18n";
import { GuidedTour } from "../components/GuidedTour";
import { CustomCursor } from "../components/CustomCursor";
import { Preloader } from "../components/Preloader";
import { ScrollProgress } from "../components/ScrollProgress";
import { GrainOverlay } from "../components/GrainOverlay";
import { MapPin, ShoppingCart, Instagram, Facebook, Twitter, Mail } from "lucide-react";

function Logo() {
  return (
    <Link
      to="/"
      className="shrink-0 flex items-center font-display text-2xl font-extrabold tracking-tight"
    >
      <span className="text-foreground">Pet</span>
      <span className="text-primary">Van</span>
    </Link>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found | الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home / الرئيسية
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
  const lang = useAppStore((state) => state.lang);

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`dark ${lang === "ar" ? "font-cairo" : "font-poppins"}`}
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed:', err));
              });
            }
          `,
          }}
        />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const userId = useAppStore((state) => state.userId);
  const lang = useAppStore((state) => state.lang);
  const t = copy[lang];

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Micro-interaction: Smart Page Title
  useEffect(() => {
    const originalTitle = document.title || "PetVan";
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = lang === "ar" ? "🐶 اشتقنالك! عد إلينا" : "🐶 We miss you! Come back";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />

      {/* Global Header */}
      <header className={`sticky top-0 z-50 px-5 sm:px-12 transition-all duration-300 ${scrolled ? "glass-panel shadow-md py-3 border-b border-border/50" : "bg-transparent py-5 border-b-0"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden items-center gap-1.5 text-sm sm:flex">
              <span className="font-bold">{t.location}</span>
              <MapPin className="size-4 text-primary animate-pulse" />
              <span className="text-muted-foreground text-xs">{t.city}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {userId && (
              <Link to="/profile" className="profile-tour hidden sm:block">
                <div className="grid size-8 place-items-center rounded-full bg-secondary text-primary font-bold overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                    alt="User"
                  />
                </div>
              </Link>
            )}
            <nav className="nav-tour hidden items-center gap-6 text-[11px] font-bold tracking-widest lg:flex uppercase">
              <a className="transition-colors hover:text-primary" href="/#about">{t.nav.about}</a>
              <a className="transition-colors hover:text-primary" href="/#services">{t.nav.services}</a>
              <a className="transition-colors hover:text-primary" href="/#help">{t.nav.help}</a>
              <Link to="/install" className="install-tour transition-colors hover:text-primary text-primary flex items-center gap-1">
                <Smartphone className="size-3" />{t.installApp}</Link>
            </nav>
            <Link
              to="/shop/cart"
              className="cart-tour relative transition-colors hover:text-primary"
              aria-label="Cart"
            >
              <ShoppingCart className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen animate-fade-in-up">
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <GrainOverlay />
        <Outlet />
        <GuidedTour />
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)] transition-all duration-300 hover:scale-110 hover:glow-primary ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-5" />
      </button>

      {/* Global Footer */}
      <footer id="about" className="bg-background px-5 py-16 mt-20">
        <div className="mx-auto grid max-w-5xl gap-12 text-center sm:grid-cols-3">
          <div>
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">{t.aboutUs}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-[250px] mx-auto">
              The first mobile veterinary clinic in Jordan specialized in caring for domestic pets
              by ordering a caravan fully equipped with the latest tools and working hands from
              experienced doctors.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h2>
            <nav className="flex flex-col gap-3 text-xs text-muted-foreground">
              <a href="/#services" className="hover:text-primary transition-colors">{t.nav.services}</a>
              <Link to="/adopt" className="hover:text-primary transition-colors">{t.adopt}</Link>
              <Link to="/shop" className="hover:text-primary transition-colors">{t.shop}</Link>
              <Link to="/install" className="hover:text-primary transition-colors text-primary flex items-center gap-1 justify-center">
                <Smartphone className="size-3" />{t.installApp}</Link>
            </nav>
          </div>
          <div>
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">{t.contactUs}</h2>
            <p className="text-xs text-muted-foreground mb-2">Ahmad000Haddad@gmail.com</p>
            <p className="text-xs text-muted-foreground" dir="ltr">
              +962799256345
            </p>
          </div>
          <div>
            <h2 className="font-display font-bold text-lg mb-4 text-foreground">{t.socialWithUs}</h2>
            <div className="flex justify-center gap-5 text-muted-foreground">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#top" className="transition-colors hover:text-primary">
                  <Icon className="size-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-16 text-center text-xs text-muted-foreground/40">
          {t.rights}
        </p>
      </footer>
    </QueryClientProvider>
  );
}
