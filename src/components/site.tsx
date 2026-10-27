import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/kodbars-logo.png";

export const CONTACT_EMAIL = "contact@kodbars.fr";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/methode", label: "Méthode" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b-2 border-primary bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo Kodbars" width={64} height={51} className="h-11 w-auto" />
            <span className="font-display text-xl font-extrabold text-primary">KODBARS</span>
          </Link>
          <nav className="flex gap-5 text-sm font-semibold">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="hidden text-foreground hover:text-highlight sm:inline"
                activeProps={{ className: "text-highlight" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary !py-2 sm:hidden">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t-2 border-primary bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold">KODBARS</p>
            <p className="mt-1 opacity-80">Agence de développement web — by BSKonseil</p>
            <p className="mt-1 opacity-80">Paris & Île-de-France</p>
          </div>
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-accent">{n.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent">{CONTACT_EMAIL}</a>
            <Link to="/mentions-legales" className="hover:text-accent">Mentions légales</Link>
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
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold text-primary sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="border-y-2 border-primary bg-accent">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-12 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-accent-foreground">Un projet en tête ?</h2>
          <p className="mt-1 text-accent-foreground">Premier échange gratuit, devis sous 48 h.</p>
        </div>
        <Link to="/contact" className="btn btn-primary">Prendre rendez-vous →</Link>
      </div>
    </section>
  );
}

export function seo(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
