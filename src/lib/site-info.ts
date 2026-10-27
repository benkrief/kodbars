export const SITE_URL = "https://kodbars.fr";
export const CONTACT_EMAIL = "contact@kodbars.fr";

export const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#agency`,
  name: "Kodbars",
  alternateName: "BSKonseil",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/social-card.png`,
  email: CONTACT_EMAIL,
  description:
    "Création de sites vitrines, applications web et accompagnement SEO et GEO aux Lilas, près de Paris.",
  founder: { "@type": "Person", "@id": `${SITE_URL}/a-propos#benjamin`, name: "Benjamin Krief" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 rue Francine Fromond",
    postalCode: "93260",
    addressLocality: "Les Lilas",
    addressCountry: "FR",
  },
  areaServed: ["Les Lilas", "Paris", "Île-de-France", "France"],
  identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: "92382497300021" },
};

export function seo(title: string, description: string, path: string) {
  const url = new URL(path, SITE_URL).href;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE_URL}/social-card.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Kodbars — Sites web et applications sur mesure, aux Lilas et à Paris",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE_URL}/social-card.png` },
      { name: "twitter:image:alt", content: "Kodbars, agence de développement web" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
