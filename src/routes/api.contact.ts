import { createFileRoute } from "@tanstack/react-router";
import { handleContact } from "@/lib/contact.server";
export const Route = createFileRoute("/api/contact")({
  server: { handlers: { POST: ({ request }) => handleContact(request) } },
});
