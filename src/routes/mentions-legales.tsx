import { seo, CONTACT_EMAIL } from "@/lib/site-info";
import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    seo(
      "Mentions légales | Kodbars",
      "Mentions légales du site Kodbars : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
      "/mentions-legales",
    ),
  component: Mentions,
});

function Mentions() {
  return (
    <Layout>
      <PageHeader tag="Légal" title="Mentions légales" />
      <article className="mx-auto max-w-3xl space-y-8 px-5 py-14 leading-relaxed [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-primary [&_h2]:mb-2">
        <section>
          <h2>Éditeur du site</h2>
          <p>
            Benjamin Krief, entrepreneur individuel (micro-entreprise), exerçant sous le nom
            commercial BSKonseil — marque Kodbars.
          </p>
          <p>Siège : 4 rue Francine Fromond, Appartement 305, 93260 Les Lilas, France</p>
          <p>SIREN : 923 824 973 — SIRET : 923 824 973 00021</p>
          <p>Code APE : 62.02A — Conseil en systèmes et logiciels informatiques</p>
          <p>TVA non applicable, art. 293 B du CGI.</p>
          <p>Contact : {CONTACT_EMAIL}</p>
          <p>Directeur de la publication : Benjamin Krief</p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>
            Lovable Labs Incorporated — site hébergé via l'infrastructure Cloudflare, Inc., 101
            Townsend St, San Francisco, CA 94107, États-Unis.
          </p>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, logo, visuels) est la propriété exclusive de
            Benjamin Krief / Kodbars. Toute reproduction sans autorisation écrite est interdite.
          </p>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <p>
            Benjamin Krief est responsable du traitement des informations du formulaire : nom,
            email, type de projet et message. Ces données servent à répondre à votre demande et à
            préparer un éventuel devis, dans le cadre des mesures précontractuelles demandées par
            vos soins. Les champs obligatoires sont nécessaires pour vous répondre.
          </p>
          <p className="mt-3">
            Les demandes sont transmises par la messagerie OVHcloud. L’hébergement et la protection
            antispam Cloudflare Turnstile peuvent traiter des données techniques pour assurer le
            fonctionnement et la sécurité du service. Les informations ne sont pas revendues et ne
            sont pas utilisées pour des campagnes publicitaires.
          </p>
          <p className="mt-3">
            Les échanges sont conservés pendant le traitement de votre demande et son suivi. Vous
            pouvez demander leur suppression et exercer vos droits d’accès, de rectification, de
            limitation et, selon les conditions applicables, d’opposition et de portabilité en
            écrivant à {CONTACT_EMAIL}. Vous pouvez adresser une réclamation à la CNIL.
          </p>
          <p className="mt-3">
            Cloudflare est un prestataire établi aux États-Unis. Pour connaître les traitements liés
            à Turnstile et les garanties applicables, consultez{" "}
            <a className="underline" href="https://www.cloudflare.com/privacypolicy/">
              la politique de confidentialité de Cloudflare
            </a>
            .
          </p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>
            Ce site n’utilise pas de cookies publicitaires ni d’outil de mesure d’audience. La
            police de caractères est hébergée avec le site. Le formulaire utilise Cloudflare
            Turnstile lorsqu’il est configuré pour limiter les envois automatisés.
          </p>
        </section>
      </article>
    </Layout>
  );
}
