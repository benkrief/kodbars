import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, CTA } from "@/components/site";
import { seo } from "@/lib/site-info";
import { services, pricingNote } from "@/lib/services";

const faq = [
  {
    q: "Combien coûte un site vitrine ?",
    a: "Le budget indicatif est de 900 à 1 800 € pour un site vitrine de 3 à 5 pages, avec vos textes et photos. Le montant dépend du périmètre validé au devis. Domaine, hébergement, rédaction et fonctionnalités particulières sont facturés séparément. TVA non applicable, art. 293 B du CGI.",
  },
  {
    q: "Combien de temps faut-il pour créer un site ?",
    a: "Comptez 2 à 4 semaines pour un site vitrine après validation du périmètre et réception des contenus. Le planning est défini au devis et dépend aussi de vos retours sur les maquettes.",
  },
  {
    q: "Pouvez-vous garantir une place sur Google ou une citation par une IA ?",
    a: "Non. Kodbars travaille les bases techniques, la clarté des contenus et les informations structurées. Les positions sur Google et les citations par les assistants IA dépendent de leurs systèmes et ne peuvent pas être garanties.",
  },
  {
    q: "Où intervenez-vous ?",
    a: "Kodbars est basée aux Lilas, en Seine-Saint-Denis, près de Paris. Benjamin accompagne les clients à Paris et en Île-de-France, ainsi que partout en France à distance.",
  },
  {
    q: "Qui s’occupe de mon projet ?",
    a: "Benjamin Krief, entrepreneur individuel sous le nom BSKonseil et la marque Kodbars, est votre interlocuteur pour le cadrage, le développement et la livraison.",
  },
];
export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "Kodbars — Création de sites web aux Lilas et à Paris",
      "Benjamin Krief crée votre site vitrine dès 900 € ou votre application web. Un interlocuteur direct aux Lilas, près de Paris. Devis gratuit après cadrage.",
      "/",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});
function Index() {
  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <p className="tag">Développement web · Les Lilas & Paris</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.12] text-primary sm:text-6xl">
            Votre métier.
            <br />
            Un site <span className="text-highlight">à sa hauteur.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Je suis Benjamin, développeur web derrière Kodbars. Je crée des sites vitrines et des
            applications sur mesure pour les indépendants et les petites entreprises.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              Parlons de votre projet →
            </Link>
            <Link to="/services" className="btn btn-outline">
              Prestations & tarifs
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Un interlocuteur direct · Premier échange gratuit
          </p>
        </div>
        <aside className="overflow-hidden rounded-lg border-2 border-primary bg-card shadow-[8px_8px_0_var(--accent)]">
          <div
            className="flex items-center gap-2 border-b border-border bg-secondary px-5 py-3"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-highlight" />
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="ml-2 font-mono text-xs">kodbars.fr</span>
          </div>
          <div className="p-7">
            <img src="/logo.svg" alt="" width={56} height={56} />
            <p className="tag mt-6">Un exemple concret</p>
            <h2 className="mt-3 text-2xl font-extrabold">Ce site est une réalisation Kodbars.</h2>
            <p className="mt-4 text-muted-foreground">
              Présentation de l’offre, budgets détaillés, navigation mobile et demande de devis : un
              site conçu pour expliquer et faciliter le premier contact.
            </p>
            <a
              href="#exemple"
              className="mt-5 inline-block font-bold text-highlight underline underline-offset-4"
            >
              Voir les choix du projet →
            </a>
          </div>
        </aside>
      </section>
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="tag">Une offre à votre échelle</p>
          <h2 className="mt-3 text-3xl font-extrabold">Le bon point de départ pour votre projet</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <article
                key={s.path}
                className="flex flex-col rounded-md border border-border bg-card p-5"
              >
                <p className="tag">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-extrabold">{s.name}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-5 font-bold">{s.price}</p>
                <Link
                  to={s.path}
                  className="mt-4 inline-block font-semibold text-highlight underline underline-offset-4"
                >
                  Périmètre & détails →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{pricingNote}</p>
        </div>
      </section>
      <section
        id="exemple"
        className="mx-auto grid max-w-6xl scroll-mt-6 gap-10 px-5 py-16 md:grid-cols-2"
      >
        <div>
          <p className="tag">Un projet à regarder de près</p>
          <h2 className="mt-3 text-3xl font-extrabold">
            Kodbars : une vitrine pour une activité de développement web
          </h2>
          <p className="mt-5 text-muted-foreground">
            Le besoin : expliquer les prestations, donner des repères de budget et permettre de
            prendre contact avec une personne identifiée. Le site que vous visitez en est le
            résultat.
          </p>
          <p className="mt-4 text-muted-foreground">
            La conception, le développement et les contenus sont regroupés autour de ce parcours.
            Vous pouvez examiner les pages et la navigation sur votre propre écran.
          </p>
        </div>
        <dl className="space-y-5 rounded-lg border border-border bg-secondary p-7">
          <div>
            <dt className="font-bold">Une offre lisible</dt>
            <dd className="mt-2 text-muted-foreground">
              Chaque prestation dispose de son périmètre, de ses livrables et d’un budget indicatif.
            </dd>
          </div>
          <div>
            <dt className="font-bold">Un accès sur tous les écrans</dt>
            <dd className="mt-2 text-muted-foreground">
              Une mise en page adaptée au mobile et une navigation utilisable au clavier.
            </dd>
          </div>
          <div>
            <dt className="font-bold">Des contenus accessibles aux moteurs</dt>
            <dd className="mt-2 text-muted-foreground">
              Les pages sont rendues côté serveur, avec titres, URL canoniques et informations
              structurées.
            </dd>
          </div>
        </dl>
      </section>
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 px-5 py-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="tag">Un projet, une personne</p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Vous échangez avec celui qui développe.
            </h2>
            <p className="mt-4 text-muted-foreground">
              De l’idée à la mise en ligne, je vous accompagne depuis Les Lilas, près de Paris. Nous
              définissons les priorités, les validations et le budget avant de commencer.
            </p>
          </div>
          <Link to="/a-propos" className="btn btn-outline shrink-0 self-start">
            Découvrir Benjamin →
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="tag">Questions fréquentes</p>
        <h2 className="mt-3 text-3xl font-extrabold">Avant de vous lancer</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faq.map((f) => (
            <details key={f.q} className="py-5">
              <summary className="cursor-pointer font-bold text-primary">{f.q}</summary>
              <p className="mt-3 max-w-3xl text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
