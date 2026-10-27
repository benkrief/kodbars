import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { connect as connectTls } from "node:tls";
import { connect as connectTcp } from "node:net";
import { CONTACT_EMAIL, SITE_URL } from "./site-info";

const MAX_BODY_BYTES = 16_384;
const projects = ["Site vitrine", "Application web", "SEO & GEO", "Maintenance web", "Autre"];
const reply = (status: number, message: string) =>
  Response.json(
    { message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let size = 0,
    body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return body + decoder.decode();
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

export async function handleContact(request: Request): Promise<Response> {
  const expectedOrigin = new URL(request.url).origin;
  if (request.headers.get("origin") !== expectedOrigin) {
    return reply(403, "Cette demande doit être envoyée depuis le formulaire du site.");
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return reply(415, "Format de demande non pris en charge.");
  }
  let data: Record<string, unknown>;
  try {
    const body = await readBody(request);
    if (body === null) return reply(413, "Votre demande est trop longue.");
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply(400, "Demande invalide.");
    data = parsed as Record<string, unknown>;
  } catch {
    return reply(400, "Demande invalide.");
  }

  const text = (key: string) => (typeof data[key] === "string" ? data[key].trim() : "");
  const name = text("name"),
    email = text("email"),
    type = text("type"),
    message = text("message");
  if (text("website")) return reply(400, "La demande n’a pas pu être validée.");
  if (
    !name ||
    name.length > 100 ||
    [...name].some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127) ||
    email.length > 254 ||
    !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email) ||
    !projects.includes(type) ||
    message.length < 20 ||
    message.length > 5_000 ||
    message.includes("\0")
  ) {
    return reply(
      422,
      "Vérifiez vos coordonnées et décrivez votre projet en 20 à 5 000 caractères.",
    );
  }

  const user = process.env["SMTP_USER"],
    pass = process.env["SMTP_PASSWORD"];
  const port = Number(process.env["SMTP_PORT"] || "465");
  const host = process.env["SMTP_HOST"] || "ssl0.ovh.net";
  const secret = process.env["TURNSTILE_SECRET_KEY"];
  if (
    !user ||
    !pass ||
    ![465, 587].includes(port) ||
    (process.env["NODE_ENV"] === "production" && !secret)
  ) {
    return reply(
      503,
      "Le formulaire est momentanément indisponible. Vous pouvez nous écrire à " +
        CONTACT_EMAIL +
        ".",
    );
  }

  if (secret) {
    const token = text("token");
    if (!token || token.length > 2048)
      return reply(422, "Veuillez valider la protection antispam.");
    try {
      const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
        signal: AbortSignal.timeout(10_000),
      });
      const result = (await check.json()) as {
        success?: boolean;
        hostname?: string;
        action?: string;
      };
      if (
        !check.ok ||
        result.success !== true ||
        result.hostname !== new URL(expectedOrigin).hostname ||
        result.action !== "contact"
      ) {
        return reply(422, "La vérification antispam a expiré ou a échoué. Réessayez.");
      }
    } catch {
      return reply(
        503,
        "La vérification antispam est indisponible. Réessayez dans quelques instants.",
      );
    }
  }

  const options: SMTPTransport.Options = {
    // Conserver le nom d’hôte : une IP pré-résolue par Nodemailer échoue dans workerd.
    getSocket: (_options, callback) => {
      try {
        const socket =
          port === 465 ? connectTls({ host, port, servername: host }) : connectTcp({ host, port });
        const timer = setTimeout(
          () => socket.destroy(new Error("SMTP connection timeout")),
          10_000,
        );
        const fail = (error: Error) => {
          clearTimeout(timer);
          callback(error, {});
        };
        socket.once("error", fail);
        socket.once(port === 465 ? "secureConnect" : "connect", () => {
          clearTimeout(timer);
          socket.removeListener("error", fail);
          callback(null, { connection: socket, secured: port === 465 });
        });
      } catch (error) {
        callback(error instanceof Error ? error : new Error("SMTP connection failed"), {});
      }
    },
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user, pass },
    name: new URL(SITE_URL).hostname,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
  const transport = nodemailer.createTransport(options);
  try {
    const info = await transport.sendMail({
      from: { name: "Kodbars — Formulaire de contact", address: user },
      to: CONTACT_EMAIL,
      replyTo: { name, address: email },
      subject: `Demande de devis Kodbars — ${type}`,
      text: `Nom : ${name}\nEmail : ${email}\nProjet : ${type}\n\n${message}`,
    });
    if (!info.accepted?.length || info.rejected?.length) throw new Error("SMTP_RECIPIENT_REJECTED");
    return reply(200, "Votre demande a été transmise. Benjamin vous répondra sous 48 h ouvrées.");
  } catch (error) {
    // Ne pas journaliser le message, les coordonnées ou la réponse brute du serveur SMTP.
    console.error(
      "Échec du formulaire de contact",
      error instanceof Error && "code" in error ? String(error.code) : "SMTP_ERROR",
    );
    return reply(
      502,
      "Votre demande n’a pas pu être transmise. Réessayez ou écrivez-nous à " + CONTACT_EMAIL + ".",
    );
  } finally {
    transport.close();
  }
}
