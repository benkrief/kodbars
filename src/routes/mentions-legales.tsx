import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, seo, CONTACT_EMAIL } from "@/components/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => seo("Mentions légales | Kodbars", "Mentions légales du site Kodbars : éditeur, hébergeur, propriété intellectuelle et données personnelles.", "/mentions-legales"),
  component: Mentions,
});

function Mentions() {
  return (
    <Layout>
      <PageHeader tag="Légal" title="Mentions légales" />
      <article className="mx-auto max-w-3xl space-y-8 px-5 py-14 leading-relaxed [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-primary [&_h2]:mb-2">
        <section>
          <h2>Éditeur du site</h2>
          <p>Benjamin Krief, entrepreneur individuel (micro-entreprise), exerçant sous le nom commercial BSKonseil — marque Kodbars.</p>
          <p>Siège : 4 rue Francine Fromond, Appartement 305, 93260 Les Lilas, France</p>
          <p>SIREN : 923 824 973 — SIRET : 923 824 973 00021</p>
          <p>Code APE : 62.02A — Conseil en systèmes et logiciels informatiques</p>
          <p>TVA non applicable, art. 293 B du CGI.</p>
          <p>Contact : {CONTACT_EMAIL}</p>
          <p>Directeur de la publication : Benjamin Krief</p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>Lovable Labs Incorporated — site hébergé via l'infrastructure Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis.</p>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des contenus de ce site (textes, logo, visuels) est la propriété exclusive de Benjamin Krief / Kodbars. Toute reproduction sans autorisation écrite est interdite.</p>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <p>Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont jamais cédées à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à {CONTACT_EMAIL}.</p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>Ce site n'utilise pas de cookies publicitaires ni de traceurs tiers.</p>
        </section>
      </article>
    </Layout>
  );
}
