import { SITE_URL, seo } from "./site-info";

export const services = [
  {
    path: "/creation-site-vitrine",
    name: "Site vitrine",
    price: "900 à 1 800 €",
    title: "Création de site vitrine aux Lilas et à Paris",
    description:
      "Un site de 3 à 5 pages pour présenter votre activité, expliquer votre offre et faciliter les demandes de contact.",
    audience:
      "Indépendants, artisans et petites entreprises qui veulent un premier site professionnel ou remplacer un site vieillissant.",
    timeline: "2 à 4 semaines après validation du périmètre et réception des contenus.",
    deliverables: [
      "3 à 5 pages : accueil, prestations, présentation et contact, selon votre besoin",
      "Une proposition graphique adaptée à votre identité, avec deux séries de retours",
      "Affichage mobile, tablette et ordinateur, navigation clavier et formulaire de contact",
      "Titres, descriptions, sitemap et données structurées correspondant au contenu",
      "Mise en ligne et explication du fonctionnement du site",
    ],
    limits:
      "Textes et photos fournis par vos soins. Rédaction, traductions, espace d’administration, réservation et paiement font l’objet d’un chiffrage séparé. Domaine, hébergement et messagerie sont à votre charge.",
    example:
      "Pour un artisan : présenter ses prestations, sa zone d’intervention et ses coordonnées, avec un formulaire qui transmet les demandes.",
    questions: [
      {
        q: "Pourrai-je modifier les contenus ?",
        a: "Un espace d’administration peut être prévu au devis si vous souhaitez modifier vous-même vos textes et images. Sinon, les modifications peuvent être confiées à Kodbars.",
      },
      {
        q: "Le référencement est-il inclus ?",
        a: "Les bases techniques et les métadonnées des pages livrées sont incluses. La production régulière de contenus et le suivi des positions nécessitent un accompagnement distinct.",
      },
    ],
  },
  {
    path: "/application-web",
    name: "Application web",
    price: "3 000 à 6 000 €",
    title: "Une application web pour simplifier votre métier",
    description:
      "Un premier outil métier sur mesure, concentré sur un usage précis : suivre des dossiers, partager des informations ou centraliser une activité.",
    audience:
      "Petites équipes et PME qui atteignent les limites des tableurs et des échanges par email.",
    timeline: "4 à 8 semaines pour une première version ciblée, à confirmer après cadrage.",
    deliverables: [
      "Cadrage d’un parcours principal et définition des critères de validation",
      "Maquettes des écrans clés avant développement",
      "Un espace sécurisé avec comptes utilisateurs et droits définis au devis",
      "Gestion d’un type de données métier : création, consultation et mise à jour",
      "Tests du parcours principal, mise en ligne et prise en main",
    ],
    limits:
      "Cette fourchette concerne une première version de périmètre limité. Paiement, synchronisation avec un logiciel tiers, migration de données, application mobile native et workflows complexes sont chiffrés séparément. Hébergement et abonnements tiers non inclus.",
    example:
      "Pour une petite équipe : centraliser le suivi de dossiers avec un statut et un responsable, au lieu de multiplier les fichiers.",
    questions: [
      {
        q: "Faut-il tout développer dès le départ ?",
        a: "Le cadrage sert à retenir le besoin prioritaire. Une première version utilisable permet de tester le fonctionnement avant de financer des évolutions.",
      },
      {
        q: "Peut-on connecter un logiciel existant ?",
        a: "Oui, après étude de son API et de ses contraintes. Le coût et la maintenance de cette connexion sont détaillés dans le devis.",
      },
    ],
  },
  {
    path: "/referencement-seo-geo",
    name: "SEO & GEO",
    price: "350 à 700 €",
    title: "SEO et GEO : des bases solides pour être découvert",
    description:
      "Un audit et des corrections ciblées pour rendre votre site plus compréhensible par les visiteurs, Google et les moteurs de réponse IA.",
    audience:
      "Indépendants et PME disposant déjà d’un site vitrine et souhaitant identifier les freins à sa visibilité.",
    timeline:
      "1 à 2 semaines pour l’audit et les premières corrections. L’évolution de la visibilité s’apprécie ensuite dans la durée.",
    deliverables: [
      "Audit technique et éditorial d’un site vitrine de 5 pages maximum",
      "Contrôle de l’exploration, des titres, des descriptions et du maillage interne",
      "Analyse des questions de vos clients et des recherches liées à votre activité",
      "Corrections prioritaires réalisables dans le périmètre convenu",
      "Plan d’action et configuration ou revue de Google Search Console avec vos accès",
    ],
    limits:
      "Aucune position sur Google ni citation par ChatGPT, Claude ou Gemini n’est garantie. Rédaction d’articles, acquisition de liens, suivi mensuel et refonte complète sont hors forfait. Un site plus important nécessite un devis spécifique.",
    example:
      "Pour une activité locale : clarifier les prestations et la zone desservie, rendre les coordonnées cohérentes et répondre précisément aux questions avant un devis.",
    questions: [
      {
        q: "Quelle différence entre SEO et GEO ?",
        a: "Le SEO travaille la visibilité dans les moteurs de recherche. Le GEO cherche à rendre une expertise compréhensible et exploitable par les moteurs de réponse IA. Les deux reposent notamment sur un site accessible, un contenu utile et des informations vérifiables.",
      },
      {
        q: "Un fichier llms.txt suffit-il ?",
        a: "Non. Ce fichier peut présenter les contenus, mais ne garantit ni exploration ni citation. Le travail porte d’abord sur les pages, leur qualité, leur accessibilité et la cohérence des informations publiques.",
      },
    ],
  },
  {
    path: "/maintenance-web",
    name: "Maintenance web",
    price: "49 à 99 € / mois",
    title: "Maintenance de site web pour les petites entreprises",
    description:
      "Un suivi régulier pour entretenir votre site, vérifier les sauvegardes et traiter les petites modifications prévues dans votre forfait.",
    audience:
      "Entrepreneurs qui souhaitent confier le suivi d’un site vitrine existant à un interlocuteur identifié.",
    timeline:
      "Prise en charge après un état des lieux. Fréquence des contrôles et délais d’intervention précisés au devis.",
    deliverables: [
      "État des lieux du site et des accès avant prise en charge",
      "Contrôle mensuel du fonctionnement des pages et du formulaire",
      "Vérification des sauvegardes selon l’hébergement retenu",
      "Mises à jour compatibles avec la technologie et le forfait convenus",
      "30 à 60 minutes de petites modifications par mois selon la formule",
    ],
    limits:
      "Hébergement, domaine, licences et abonnements tiers non inclus. Refonte, nouvelle fonctionnalité, dépannage d’un site déjà compromis et astreinte 24 h/24 hors forfait. Les interventions supplémentaires sont chiffrées avant réalisation.",
    example:
      "Pour un site vitrine : mettre à jour une prestation ou des horaires et vérifier régulièrement que les demandes de contact fonctionnent.",
    questions: [
      {
        q: "Pouvez-vous reprendre un site existant ?",
        a: "Oui, sous réserve d’un état des lieux technique et des accès disponibles. Les éventuelles remises à niveau sont identifiées avant le début du contrat.",
      },
      {
        q: "Les petites modifications sont-elles illimitées ?",
        a: "Non. Le forfait prévoit un temps mensuel défini au devis. Une demande dépassant ce temps fait l’objet d’un accord préalable.",
      },
    ],
  },
] as const;

export type Service = (typeof services)[number];
export const pricingNote =
  "Budgets indicatifs selon le périmètre. Devis personnalisé avant engagement. TVA non applicable, art. 293 B du CGI. Domaine, hébergement et abonnements tiers non inclus.";

export function serviceHead(service: Service) {
  return {
    ...seo(
      `${service.title} | Kodbars`,
      `${service.description} Budget indicatif : ${service.price}.`,
      service.path,
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}${service.path}#service`,
          name: service.name,
          description: service.description,
          url: `${SITE_URL}${service.path}`,
          provider: { "@id": `${SITE_URL}/#agency` },
          areaServed: ["Les Lilas", "Paris", "Île-de-France", "France"],
        }),
      },
    ],
  };
}
