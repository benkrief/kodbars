import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { services, serviceHead } from "@/lib/services";
export const Route = createFileRoute("/maintenance-web")({
  head: () => serviceHead(services[3]),
  component: () => <ServicePage service={services[3]} />,
});
