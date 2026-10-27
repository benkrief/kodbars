import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, CTA, seo } from "@/components/site";

export const Route = createFileRoute("/methode")({
  head: () => seo(
    "Notre méthode — De l'idée à la mise en ligne | Kodbars",
    "Échange, devis, maquette, développement, mise en ligne : découvrez comment Kodbars mène votre projet web étape par étape.",
    "/methode",
  ),
  component: Methode,
});

const steps = [
  { t: "Premier échange", d: "30 minutes, gratuitement, pour comprendre votre activité et vos objectifs." },
  { t: "Devis sous 48 h", d: "Une proposition claire, avec le prix et le planning. Pas de mauvaise surprise." },
  { t: "Maquette", d: "Vous validez le design avant la moindre ligne de code." },
  { t: "Développement", d: "Le site prend vie, vous suivez l'avancement en direct." },
  { t: "Mise en ligne", d: "Publication, référencement de base et prise en main incluse." },
];

function Methode() {
  return (
    <Layout>
      <PageHeader tag="Méthode" title="Un projet simple, en 5 étapes" intro="Vous savez toujours où en est votre site et ce qui vient ensuite." />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <ol className="border-l-2 border-primary">
          {steps.map((s, i) => (
            <li key={s.t} className="relative pb-10 pl-10 last:pb-0">
              <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-md border-2 border-primary bg-highlight font-mono text-sm font-bold text-highlight-foreground">{i + 1}</span>
              <h2 className="text-2xl font-extrabold text-primary">{s.t}</h2>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
      <CTA />
    </Layout>
  );
}
