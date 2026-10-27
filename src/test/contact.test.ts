// @vitest-environment node
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";
import { connect as connectTls } from "node:tls";
import { connect as connectTcp } from "node:net";
vi.mock("node:tls", () => ({ connect: vi.fn() }));
vi.mock("node:net", () => ({ connect: vi.fn() }));
const smtp = vi.hoisted(() => ({ sendMail: vi.fn(), close: vi.fn(), createTransport: vi.fn() }));
vi.mock("nodemailer", () => ({ default: { createTransport: smtp.createTransport } }));
import { handleContact } from "@/lib/contact.server";

const valid = {
  name: " Alice ",
  email: "alice@example.fr",
  type: "Site vitrine",
  message: "Bonjour, je souhaite présenter mon activité en ligne.",
  website: "",
};
function request(body: unknown, origin = "https://kodbars.fr") {
  return new Request("https://kodbars.fr/api/contact", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("SMTP_USER", "contact@kodbars.fr");
  vi.stubEnv("SMTP_PASSWORD", "test-only");
  vi.stubEnv("SMTP_PORT", "465");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  smtp.createTransport.mockReturnValue({ sendMail: smtp.sendMail, close: smtp.close });
  smtp.sendMail.mockResolvedValue({ accepted: ["contact@kodbars.fr"], rejected: [] });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Contact endpoint", () => {
  it("sends to the fixed recipient, keeps the visitor in reply-to and waits for SMTP acceptance", async () => {
    const response = await handleContact(request(valid));
    expect(response.status).toBe(200);
    expect(smtp.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "contact@kodbars.fr",
        from: expect.objectContaining({ address: "contact@kodbars.fr" }),
        replyTo: { name: "Alice", address: "alice@example.fr" },
      }),
    );
    expect(smtp.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ secure: true, requireTLS: true }),
    );
    expect(smtp.close).toHaveBeenCalled();
  });
  it("rejects cross-origin requests before SMTP", async () => {
    expect((await handleContact(request(valid, "https://example.org"))).status).toBe(403);
    expect(smtp.createTransport).not.toHaveBeenCalled();
  });
  it.each([
    { ...valid, email: "alice@example.fr\r\nBcc: spam@example.fr" },
    { ...valid, name: "Alice\nBcc: spam@example.fr" },
    { ...valid, message: "trop court" },
    { ...valid, type: "Un type non prévu" },
    { ...valid, message: "x".repeat(5001) },
  ])("rejects invalid fields without sending", async (body) => {
    expect((await handleContact(request(body))).status).toBe(422);
    expect(smtp.sendMail).not.toHaveBeenCalled();
  });
  it("caps the body before parsing", async () => {
    expect((await handleContact(request({ ...valid, message: "x".repeat(20_000) }))).status).toBe(
      413,
    );
    expect(smtp.sendMail).not.toHaveBeenCalled();
  });
  it("does not send honeypot submissions", async () => {
    expect(
      (await handleContact(request({ ...valid, website: "https://spam.example" }))).status,
    ).toBe(400);
    expect(smtp.sendMail).not.toHaveBeenCalled();
  });
  it("does not claim success when SMTP fails or rejects the recipient", async () => {
    smtp.sendMail.mockRejectedValueOnce(new Error("Private SMTP details"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await handleContact(request(valid))).status).toBe(502);
    expect(log.mock.calls.flat().join(" ")).not.toContain("Private SMTP details");
    smtp.sendMail.mockResolvedValueOnce({ accepted: [], rejected: ["contact@kodbars.fr"] });
    expect((await handleContact(request(valid))).status).toBe(502);
    log.mockRestore();
  });
  it("returns an honest unavailable response when SMTP is not configured", async () => {
    vi.stubEnv("SMTP_PASSWORD", "");
    expect((await handleContact(request(valid))).status).toBe(503);
    expect(smtp.createTransport).not.toHaveBeenCalled();
  });
  it("requires an antispam secret in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    expect((await handleContact(request(valid))).status).toBe(503);
    expect(smtp.sendMail).not.toHaveBeenCalled();
  });
  it("checks the antispam hostname and action before sending", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    const verify = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ success: true, hostname: "other.example", action: "contact" }),
        ),
      );
    vi.stubGlobal("fetch", verify);
    expect((await handleContact(request({ ...valid, token: "test-token" }))).status).toBe(422);
    expect(smtp.sendMail).not.toHaveBeenCalled();
    verify.mockResolvedValue(
      new Response(JSON.stringify({ success: true, hostname: "kodbars.fr", action: "contact" })),
    );
    expect((await handleContact(request({ ...valid, token: "test-token" }))).status).toBe(200);
  });
});

describe("SMTP socket connection", () => {
  it("keeps the hostname and waits for the TLS handshake before passing the socket to Nodemailer", async () => {
    const socket = Object.assign(new EventEmitter(), { destroy: vi.fn() });
    vi.mocked(connectTls).mockReturnValue(socket as unknown as ReturnType<typeof connectTls>);
    await handleContact(request(valid));
    const options = smtp.createTransport.mock.calls[0]?.[0];
    const callback = vi.fn();
    options.getSocket({}, callback);
    expect(connectTls).toHaveBeenCalledWith({
      host: "ssl0.ovh.net",
      port: 465,
      servername: "ssl0.ovh.net",
    });
    expect(callback).not.toHaveBeenCalled();
    socket.emit("secureConnect");
    expect(callback).toHaveBeenCalledWith(null, { connection: socket, secured: true });
  });
  it("preserves mandatory STARTTLS for port 587", async () => {
    vi.stubEnv("SMTP_PORT", "587");
    const socket = Object.assign(new EventEmitter(), { destroy: vi.fn() });
    vi.mocked(connectTcp).mockReturnValue(socket as unknown as ReturnType<typeof connectTcp>);
    await handleContact(request(valid));
    const options = smtp.createTransport.mock.calls[0]?.[0];
    const callback = vi.fn();
    expect(options.requireTLS).toBe(true);
    options.getSocket({}, callback);
    socket.emit("connect");
    expect(callback).toHaveBeenCalledWith(null, { connection: socket, secured: false });
  });
  it("returns connection failures without marking the socket as secured", async () => {
    const socket = Object.assign(new EventEmitter(), { destroy: vi.fn() });
    vi.mocked(connectTls).mockReturnValue(socket as unknown as ReturnType<typeof connectTls>);
    await handleContact(request(valid));
    const callback = vi.fn();
    smtp.createTransport.mock.calls[0]?.[0].getSocket({}, callback);
    const error = new Error("Connection failed");
    socket.emit("error", error);
    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith(error, {});
  });
});
