import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, CTA, seo } from "@/components/site";

const faq = [
  { q: "Combien coûte un site vitrine ?", a: "Chaque projet est chiffré selon le nombre de pages et les fonctionnalités. Le devis est gratuit et envoyé sous 48 h après un premier échange." },
  { q: "Combien de temps pour créer un site ?", a: "Comptez en général 2 à 4 semaines pour un site vitrine, selon la rapidité des échanges et des contenus fournis." },
  { q: "Mon site sera-t-il bien référencé ?", a: "Oui : chaque site est livré rapide, avec des titres, descriptions et données structurées optimisés pour Google (SEO) et pour les moteurs IA comme ChatGPT ou Claude (GEO)." },
  { q: "Où intervenez-vous ?", a: "Kodbars est basée à Paris et travaille avec des clients en Île-de-France et partout en France à distance." },
];

export const Route = createFileRoute("/")({
  head: () => {
    const base = seo(
      "Kodbars — Agence de création de sites web à Paris",
      "Kodbars crée des sites vitrines et applications web rapides, sur-mesure et optimisés SEO & GEO pour les indépendants et PME. Devis gratuit sous 48 h.",
      "/",
    );
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Kodbars",
            alternateName: "BSKonseil",
            description: "Agence de développement web : sites vitrines, applications web, SEO et GEO.",
            founder: { "@type": "Person", name: "Benjamin Krief" },
            address: { "@type": "PostalAddress", streetAddress: "4 rue Francine Fromond", postalCode: "93260", addressLocality: "Les Lilas", addressCountry: "FR" },
            geo: { "@type": "GeoCoordinates", latitude: 48.8792, longitude: 2.4131 },
            areaServed: ["Paris", "Île-de-France", "France"],
            taxID: "92382497300021",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: Index,
});

const points = [
  { n: "01", t: "Sites vitrines", d: "Un site clair et rapide qui présente votre activité et transforme les visiteurs en clients." },
  { n: "02", t: "Applications web", d: "Outils métiers, espaces clients, réservations : du sur-mesure qui fait gagner du temps." },
  { n: "03", t: "SEO & GEO", d: "Être trouvé sur Google et cité par les assistants IA comme ChatGPT ou Claude." },
];

function Index() {
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="tag">&lt;agence web /&gt;</p>
          <h1 className="mt-3 text-5xl font-extrabold leading-[1.05] text-primary sm:text-6xl">
            Des sites web simples, rapides et <span className="text-highlight">qui rapportent</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Kodbars conçoit et développe des sites vitrines et applications web sur-mesure pour les indépendants et PME, à Paris et partout en France.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">Prendre rendez-vous →</Link>
            <Link to="/services" className="btn btn-outline">Voir les services</Link>
          </div>
        </div>
        <div className="rounded-lg border-2 border-primary bg-card p-6 font-mono text-sm shadow-[8px_8px_0_var(--accent)]">
          <p className="text-muted-foreground">// votre futur site</p>
          <p className="mt-2"><span className="text-highlight">const</span> site = {"{"}</p>
          <p className="pl-4">rapide: <span className="text-primary font-bold">true</span>,</p>
          <p className="pl-4">mobile: <span className="text-primary font-bold">true</span>,</p>
          <p className="pl-4">seo: <span className="text-primary font-bold">"optimisé"</span>,</p>
          <p className="pl-4">geo: <span className="text-primary font-bold">"prêt pour l'IA"</span>,</p>
          <p className="pl-4">devis: <span className="text-primary font-bold">"48h"</span>,</p>
          <p>{"}"};</p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-px bg-border px-0 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.n} className="bg-secondary p-8">
              <p className="tag">{p.n}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-primary">{p.t}</h2>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="tag">Questions fréquentes</p>
        <h2 className="mt-2 text-3xl font-extrabold text-primary">Tout ce qu'il faut savoir</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between font-bold text-primary">
                {f.q}<span className="text-highlight group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
