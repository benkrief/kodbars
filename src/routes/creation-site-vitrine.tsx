import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { services, serviceHead } from "@/lib/services";
export const Route = createFileRoute("/creation-site-vitrine")({
  head: () => serviceHead(services[0]),
  component: () => <ServicePage service={services[0]} />,
});
