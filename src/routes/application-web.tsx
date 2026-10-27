import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { services, serviceHead } from "@/lib/services";
export const Route = createFileRoute("/application-web")({
  head: () => serviceHead(services[1]),
  component: () => <ServicePage service={services[1]} />,
});
