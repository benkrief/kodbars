import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  it.each([
    "/",
    "/services",
    "/creation-site-vitrine",
    "/application-web",
    "/referencement-seo-geo",
    "/maintenance-web",
    "/methode",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/sitemap.xml",
    "/api/contact",
  ])("matches %s", (path) => {
    const router = createRouter({ routeTree });
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
