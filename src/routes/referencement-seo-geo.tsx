import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { services, serviceHead } from "@/lib/services";
export const Route = createFileRoute("/referencement-seo-geo")({
  head: () => serviceHead(services[2]),
  component: () => <ServicePage service={services[2]} />,
});
