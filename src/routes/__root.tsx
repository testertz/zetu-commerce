import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { ProductProvider } from "@/lib/productStore";
import { AdminAuthProvider } from "@/lib/adminAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWA } from "@/components/FloatingWA";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold">404</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Page not found.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-full bg-[var(--green)] text-[var(--primary-foreground)] px-5 py-2.5 text-sm font-semibold">
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TechZetu — Premium Tech, Ordered by WhatsApp · Dar es Salaam" },
      { name: "description", content: "Tanzania's WhatsApp-first electronics store. Authentic phones, laptops, and audio gear delivered same-day in Dar es Salaam." },
      { name: "theme-color", content: "#0a0a08" },
      { property: "og:title", content: "TechZetu — Premium Tech via WhatsApp" },
      { property: "og:description", content: "Order electronics in Tanzania over WhatsApp. Same-day delivery in Dar es Salaam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <ProductProvider>
        <AdminAuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <FloatingWA />
          </div>
        </AdminAuthProvider>
      </ProductProvider>
    </I18nProvider>
  );
}
