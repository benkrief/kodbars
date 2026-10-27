import { Link } from "@tanstack/react-router";
import { Layout, PageHeader, CTA } from "@/components/site";
import { services, pricingNote, type Service } from "@/lib/services";

export function ServicePage({ service }: { service: Service }) {
  return (
    <Layout>
      <PageHeader tag="Nos prestations" title={service.title} intro={service.description} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-extrabold">Pour qui ?</h2>
            <p className="mt-3 text-muted-foreground">{service.audience}</p>
          </section>
          <section>
            <h2 className="text-2xl font-extrabold">Ce que vous recevez</h2>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="text-highlight">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-border bg-secondary p-6">
            <p className="tag">Exemple d’usage</p>
            <p className="mt-3">{service.example}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Un exemple de besoin, à adapter à votre activité.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-extrabold">Un périmètre défini avant de commencer</h2>
            <p className="mt-3 text-muted-foreground">{service.limits}</p>
          </section>
        </div>
        <aside className="h-fit rounded-lg border-2 border-primary bg-card p-7 shadow-[6px_6px_0_var(--accent)]">
          <p className="tag">Votre budget</p>
          <p className="mt-3 text-3xl font-extrabold text-primary">{service.price}</p>
          <p className="mt-3 text-sm text-muted-foreground">{pricingNote}</p>
          <h2 className="mt-6 font-bold">Quel délai ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">{service.timeline}</p>
          <Link to="/contact" className="btn btn-primary mt-6">
            Demander un devis →
          </Link>
        </aside>
      </div>
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <h2 className="text-2xl font-extrabold">Vos questions</h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {service.questions.map((q) => (
            <details key={q.q} className="py-5">
              <summary className="cursor-pointer font-bold">{q.q}</summary>
              <p className="mt-3 max-w-3xl text-muted-foreground">{q.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm">
          À découvrir aussi :{" "}
          {services
            .filter((s) => s.path !== service.path)
            .map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="mr-4 inline-block py-2 font-semibold underline"
              >
                {s.name}
              </Link>
            ))}
        </p>
      </section>
      <CTA />
    </Layout>
  );
}
