import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader, CTA } from "@/components/site";
import { services, pricingNote } from "@/lib/services";
import { seo } from "@/lib/site-info";
export const Route = createFileRoute("/services")({
  head: () =>
    seo(
      "Sites vitrines, applications web et SEO : prestations et tarifs | Kodbars",
      "Découvrez les prestations Kodbars aux Lilas, près de Paris : site vitrine de 900 à 1 800 €, application web, SEO et maintenance. Budgets et périmètres détaillés.",
      "/services",
    ),
  component: Services,
});
function Services() {
  return (
    <Layout>
      <PageHeader
        tag="Services & budgets"
        title="Un site ou un outil qui répond à votre besoin"
        intro="Un périmètre clair, un budget annoncé et Benjamin comme interlocuteur du premier échange à la livraison."
      />
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.path}
              className="flex flex-col rounded-lg border-2 border-primary bg-card p-7"
            >
              <p className="tag">0{i + 1}</p>
              <h2 className="mt-3 text-2xl font-extrabold">{s.name}</h2>
              <p className="mt-3 flex-1 text-muted-foreground">{s.description}</p>
              <p className="mt-5 text-xl font-bold">{s.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.timeline}</p>
              <Link
                to={s.path}
                className="mt-6 self-start font-bold text-highlight underline underline-offset-4"
              >
                Découvrir la prestation →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-7 max-w-3xl text-sm text-muted-foreground">{pricingNote}</p>
      </section>
      <CTA />
    </Layout>
  );
}
