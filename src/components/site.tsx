import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/site-info";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/methode", label: "Méthode" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    menu.current?.removeAttribute("open");
  }, [pathname]);

  function closeMenu() {
    menu.current?.removeAttribute("open");
    menu.current?.querySelector("summary")?.focus();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <header className="relative z-10 border-b-2 border-primary bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <Link to="/" aria-label="Kodbars, accueil" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" width={44} height={44} />
            <span className="font-display text-xl font-extrabold text-primary">KODBARS</span>
          </Link>
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-6 text-sm font-semibold md:flex"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="hover:text-highlight"
                activeProps={{ className: "text-highlight", "aria-current": "page" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <details
            ref={menu}
            className="mobile-menu md:hidden"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeMenu();
            }}
          >
            <summary className="cursor-pointer rounded-md border-2 border-primary px-3 py-2 text-sm font-bold">
              Menu
            </summary>
            <nav
              aria-label="Navigation mobile"
              className="absolute inset-x-0 top-full border-b-2 border-primary bg-card px-5 py-4 shadow-lg"
            >
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => menu.current?.removeAttribute("open")}
                  className="block rounded px-3 py-3 font-semibold hover:bg-secondary"
                  activeProps={{ "aria-current": "page", className: "text-highlight" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main id="contenu" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <footer className="border-t-2 border-primary bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold">KODBARS</p>
            <p className="mt-2">Le développement web, avec Benjamin Krief.</p>
            <p className="mt-2 opacity-80">
              BSKonseil · Les Lilas, près de Paris
              <br />
              Île-de-France et France à distance
            </p>
          </div>
          <nav aria-label="Navigation de pied de page" className="flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:underline">
              {CONTACT_EMAIL}
            </a>
            <Link to="/mentions-legales" className="hover:underline">
              Mentions légales et confidentialité
            </Link>
            <p className="opacity-80">© {new Date().getFullYear()} Kodbars</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ tag, title, intro }: { tag: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="tag">{tag}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold text-primary sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="border-y-2 border-primary bg-accent">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-12 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-accent-foreground">
            On parle de votre projet ?
          </h2>
          <p className="mt-2 text-accent-foreground">
            Un premier échange gratuit. Un devis clair sous 48 h après cadrage.
          </p>
        </div>
        <Link to="/contact" className="btn btn-primary shrink-0">
          Parlons de votre projet →
        </Link>
      </div>
    </section>
  );
}
