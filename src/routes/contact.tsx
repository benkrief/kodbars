import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Layout, PageHeader } from "@/components/site";
import { Antispam } from "@/components/antispam";
import { seo, CONTACT_EMAIL } from "@/lib/site-info";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact — Un devis pour votre projet web | Kodbars",
      "Décrivez votre projet à Benjamin Krief. Premier échange gratuit, devis après cadrage. Sites web et applications aux Lilas, à Paris et à distance.",
      "/contact",
    ),
  component: Contact,
});
const field =
  "mt-2 w-full rounded-md border-2 border-input bg-card px-3 py-3 font-normal focus:border-highlight";
const siteKey = import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined;

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [attempt, setAttempt] = useState(0);
  const unavailable = import.meta.env.PROD && !siteKey;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || unavailable) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          type: f.get("type"),
          message: f.get("message"),
          website: f.get("website"),
          token: f.get("cf-turnstile-response") || "",
        }),
        signal: AbortSignal.timeout(45_000),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok)
        throw new Error(result.message || "Votre demande n’a pas pu être transmise.");
      setState("success");
      setFeedback(result.message || "Votre demande a été transmise.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(
        error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError"
          ? error.message
          : "La connexion a été interrompue. Votre envoi n’a pas été confirmé. Réessayez ou écrivez-nous directement.",
      );
    } finally {
      setAttempt((value) => value + 1);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={state === "sending"}>
      {unavailable && (
        <p role="status" className="rounded-md border border-border bg-secondary p-4">
          Le formulaire est momentanément indisponible. Écrivez-nous à{" "}
          <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
      <fieldset
        disabled={state === "sending" || unavailable}
        className="space-y-5 disabled:opacity-70"
      >
        <legend className="sr-only">Votre demande de devis</legend>
        <p className="text-sm text-muted-foreground">
          Les champs marqués d’un astérisque sont obligatoires.
        </p>
        <label className="block font-semibold">
          Nom *<input name="name" autoComplete="name" required maxLength={100} className={field} />
        </label>
        <label className="block font-semibold">
          Email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={field}
          />
        </label>
        <label className="block font-semibold">
          Type de projet
          <select name="type" className={field}>
            <option>Site vitrine</option>
            <option>Application web</option>
            <option>SEO & GEO</option>
            <option>Maintenance web</option>
            <option>Autre</option>
          </select>
        </label>
        <label className="block font-semibold">
          Votre projet *
          <textarea
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={5000}
            aria-describedby="message-help"
            className={field}
          />
        </label>
        <p id="message-help" className="text-sm text-muted-foreground">
          Votre activité, votre objectif, les fonctionnalités attendues et votre délai. Entre 20 et
          5 000 caractères.
        </p>
        <div className="hidden" aria-hidden="true">
          <label>
            Site web
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {siteKey && <Antispam siteKey={siteKey} attempt={attempt} />}
        <p className="text-sm text-muted-foreground">
          Vos informations servent à répondre à votre demande.{" "}
          <Link to="/mentions-legales" className="underline">
            Confidentialité et droits sur vos données
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-primary">
          {state === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
        </button>
      </fieldset>
      {feedback && (
        <p
          role={state === "error" ? "alert" : "status"}
          className={
            state === "error"
              ? "rounded-md border border-destructive p-4 text-destructive"
              : "rounded-md border border-border bg-secondary p-4"
          }
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
function Contact() {
  return (
    <Layout>
      <PageHeader
        tag="Premier échange gratuit"
        title="Parlons de votre projet"
        intro="Décrivez votre besoin. Benjamin vous répond sous 48 h ouvrées pour organiser un premier échange et préciser le périmètre du devis."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr]">
        <ContactForm />
        <aside className="h-fit rounded-lg border-2 border-primary bg-secondary p-7">
          <p className="tag">Votre interlocuteur</p>
          <h2 className="mt-4 text-2xl font-extrabold">Benjamin Krief</h2>
          <p className="mt-2 font-semibold">Kodbars · BSKonseil</p>
          <p className="mt-3 text-muted-foreground">
            Basé aux Lilas, près de Paris.
            <br />
            Île-de-France et France à distance.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 block break-all font-semibold underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-5 text-sm text-muted-foreground">
            Vous préférez écrire directement ? Utilisez cette adresse. Le premier échange est
            gratuit et sans engagement.
          </p>
        </aside>
      </section>
    </Layout>
  );
}
