import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Layout, PageHeader, seo, CONTACT_EMAIL } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => seo(
    "Contact — Demander un devis gratuit | Kodbars",
    "Parlez-nous de votre projet de site web. Premier échange gratuit et devis sous 48 h. Kodbars, agence web à Paris.",
    "/contact",
  ),
  component: Contact,
});

const field = "mt-1 w-full rounded-md border-2 border-input bg-card px-3 py-2 outline-none focus:border-accent";

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Nom : ${f.get("name")}\nEmail : ${f.get("email")}\nProjet : ${f.get("type")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de devis — " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return (
    <Layout>
      <PageHeader tag="Contact" title="Parlons de votre projet" intro="Remplissez ce formulaire, réponse sous 48 h." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={submit} className="space-y-5">
          <label className="block font-semibold">Nom<input name="name" required className={field} /></label>
          <label className="block font-semibold">Email<input name="email" type="email" required className={field} /></label>
          <label className="block font-semibold">Type de projet
            <select name="type" className={field}>
              <option>Site vitrine</option><option>Application web</option><option>SEO & GEO</option><option>Autre</option>
            </select>
          </label>
          <label className="block font-semibold">Message<textarea name="message" rows={5} required className={field} /></label>
          <button type="submit" className="btn btn-primary">Envoyer ma demande →</button>
          {sent && <p className="text-muted-foreground">Votre logiciel de messagerie s'est ouvert pour envoyer la demande.</p>}
        </form>
        <aside className="h-fit rounded-lg border-2 border-primary bg-secondary p-6">
          <p className="tag">Coordonnées</p>
          <p className="mt-3 font-bold text-primary">Kodbars — BSKonseil</p>
          <p className="mt-1 text-muted-foreground">Paris & Île-de-France</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 block font-semibold text-primary underline">{CONTACT_EMAIL}</a>
        </aside>
      </section>
    </Layout>
  );
}
