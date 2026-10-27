import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
vi.mock("@tanstack/react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...original,
    Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});
import { ContactForm } from "@/routes/contact";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function fill() {
  fireEvent.change(screen.getByLabelText("Nom *"), { target: { value: "Alice" } });
  fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "alice@example.fr" } });
  fireEvent.change(screen.getByLabelText("Votre projet *"), {
    target: { value: "Je souhaite présenter mon activité sur un site web." },
  });
}
describe("Contact form", () => {
  it("keeps the message and displays the error when the server rejects the send", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Envoi indisponible, réessayez." }), {
          status: 502,
        }),
      ),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer ma demande →" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Envoi indisponible");
    expect(screen.getByLabelText("Votre projet *")).toHaveValue(
      "Je souhaite présenter mon activité sur un site web.",
    );
  });
  it("shows confirmation and clears fields only after a successful response", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ message: "Votre demande a été transmise." })),
        ),
    );
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer ma demande →" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Votre demande a été transmise.");
    await waitFor(() => expect(screen.getByLabelText("Nom *")).toHaveValue(""));
  });
});
