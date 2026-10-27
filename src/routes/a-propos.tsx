import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader, CTA } from "@/components/site";
import { seo, SITE_URL } from "@/lib/site-info";
export const Route = createFileRoute("/a-propos")({
  head: () => ({
    ...seo(
      "Benjamin Krief, développeur web aux Lilas | Kodbars",
      "Derrière Kodbars, Benjamin Krief, entrepreneur individuel sous le nom BSKonseil. Un interlocuteur direct pour votre site ou application, aux Lilas et à Paris.",
      "/a-propos",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/a-propos#benjamin`,
          name: "Benjamin Krief",
          url: `${SITE_URL}/a-propos`,
          worksFor: { "@id": `${SITE_URL}/#agency` },
          jobTitle: "Développeur web",
        }),
      },
    ],
  }),
  component: About,
});
function About() {
  return (
    <Layout>
      <PageHeader
        tag="Derrière Kodbars"
        title="Benjamin Krief, votre interlocuteur de bout en bout"
        intro="Kodbars est la marque de développement web de BSKonseil, mon activité d’entrepreneur individuel basée aux Lilas, près de Paris."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold">Un échange direct, des décisions concrètes</h2>
            <p className="mt-4 text-muted-foreground">
              Je vous accompagne pour présenter votre activité sur le web ou construire un outil
              adapté à votre fonctionnement. Nous commençons par votre besoin : à qui le site
              s’adresse, ce qu’il doit expliquer et ce qu’il doit permettre de faire.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Du site vitrine à l’application métier</h2>
            <p className="mt-4 text-muted-foreground">
              Mon offre couvre la conception des pages, le développement, la mise en ligne et le
              suivi. Les prestations, les livrables et les options sont définis avant de démarrer.
              Vous pouvez consulter les budgets indicatifs et le périmètre de chaque service.
            </p>
            <Link to="/services" className="mt-4 inline-block font-semibold underline">
              Voir les prestations et les budgets →
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Aux Lilas, avec vous à distance</h2>
            <p className="mt-4 text-muted-foreground">
              J’interviens aux Lilas, à Paris et en Île-de-France, ainsi que partout en France à
              distance. Les points d’avancement et les validations sont organisés dès le cadrage
              pour que vous sachiez ce qui est prêt et ce qui reste à faire.
            </p>
          </div>
        </div>
        <aside className="h-fit rounded-lg border-2 border-primary bg-secondary p-7">
          <p className="tag">Votre contact</p>
          <p className="mt-4 text-2xl font-extrabold">Benjamin Krief</p>
          <p className="mt-2">Kodbars · BSKonseil</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Entrepreneur individuel
            <br />
            Les Lilas · Seine-Saint-Denis
          </p>
          <Link to="/contact" className="btn btn-primary mt-6">
            Échanger sur votre besoin →
          </Link>
          <Link to="/mentions-legales" className="mt-4 block text-sm underline">
            Informations sur l’entreprise
          </Link>
        </aside>
      </section>
      <CTA />
    </Layout>
  );
}
