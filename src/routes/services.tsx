import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, CTA, seo } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => seo(
    "Services — Création de site vitrine, app web, SEO | Kodbars",
    "Création de sites vitrines, développement d'applications web sur-mesure, référencement SEO et GEO, maintenance. Découvrez les services de Kodbars.",
    "/services",
  ),
  component: Services,
});

const services = [
  { t: "Site vitrine", d: "Présentez votre activité avec un site moderne, adapté au mobile et facile à mettre à jour.", items: ["Design sur-mesure", "Adapté mobile et tablette", "Formulaire de contact", "Mise en ligne et nom de domaine"] },
  { t: "Application web", d: "Un outil pensé pour votre métier : espace client, prise de rendez-vous, tableau de bord.", items: ["Analyse du besoin", "Comptes utilisateurs", "Paiement en ligne", "Évolutions continues"] },
  { t: "SEO & GEO", d: "Soyez visible sur Google et recommandé par les assistants IA (ChatGPT, Claude, Gemini).", items: ["Audit et mots-clés", "Contenus structurés", "Fiche Google Business", "Suivi des positions"] },
  { t: "Maintenance", d: "Votre site reste rapide, sécurisé et à jour, sans que vous ayez à vous en occuper.", items: ["Mises à jour", "Sauvegardes", "Petites modifications", "Support réactif"] },
];

function Services() {
  return (
    <Layout>
      <PageHeader tag="Services" title="Ce que Kodbars fait pour vous" intro="Du premier site à l'application métier, un seul interlocuteur du début à la fin." />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-2">
        {services.map((s, i) => (
          <article key={s.t} className="rounded-lg border-2 border-primary bg-card p-8">
            <p className="tag">0{i + 1}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-primary">{s.t}</h2>
            <p className="mt-3 text-muted-foreground">{s.d}</p>
            <ul className="mt-5 space-y-2">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3"><span className="font-mono text-accent-foreground bg-accent px-1">✓</span>{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <CTA />
    </Layout>
  );
}
