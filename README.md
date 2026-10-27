# Kodbars — site vitrine

Site français de Benjamin Krief (BSKonseil), basé aux Lilas, près de Paris. React, TanStack Start et Tailwind, rendu côté serveur. Domaine canonique : https://kodbars.fr.

## Développement

Node.js 22.12+ (recommandé : 24) et Bun pour conserver le verrouillage des dépendances.

```sh
bun install --frozen-lockfile
cp .env.example .env.local
npm run dev
```

Les variables de .env.local sont chargées par Node pour le serveur et par Vite pour la clé publique antispam. Seules les variables VITE_* sont publiques. Ne jamais préfixer un secret par VITE_.

```sh
npm run test
npm run typecheck
npm run lint
npm run build
npm run preview   # lance Wrangler local avec .env.local (installation à la première utilisation)
```

Le serveur démarre sur le port 8080 ou le prochain port disponible.

## Formulaire : OVH SMTP

Le formulaire fait un POST JSON vers /api/contact. Le serveur valide les champs, limite le corps à 16 Kio et le message à 5 000 caractères, vérifie l’origine et le champ antispam, puis transmet par SMTP. Aucune copie automatique n’est envoyée au visiteur : le destinataire est fixé à contact@kodbars.fr. Le visiteur est uniquement placé en Reply-To.

La commande de prévisualisation transmet explicitement .env.local à Wrangler, avec un chemin absolu. Après modification de la clé publique, relancer le build ; après modification des secrets, relancer l’aperçu.

Variables **serveur**, à définir dans l’hébergement :

- SMTP_HOST : ssl0.ovh.net pour MX Plan ; pour Email Pro ou Exchange, utiliser le serveur de l’espace OVH.
- SMTP_PORT : 465 (TLS implicite) ou 587 (STARTTLS obligatoire).
- SMTP_USER : adresse complète d’une boîte OVH autorisée à envoyer.
- SMTP_PASSWORD : mot de passe de cette boîte, à conserver dans les secrets de l’hébergement.
- TURNSTILE_SECRET_KEY : secret du widget Cloudflare Turnstile.

Variable **publique au build** :

- VITE_TURNSTILE_SITE_KEY : clé publique du même widget Turnstile.

Créer un widget Turnstile autorisant kodbars.fr, et localhost si utilisé en développement. L’action attendue est contact. La validation vérifie aussi le nom d’hôte et refuse les jetons expirés ou réutilisés. Sans secret antispam en production, le serveur refuse l’envoi ; sans clé publique au build, la page propose l’adresse email et désactive le formulaire. Le widget doit être accessible pour envoyer.

En développement uniquement, le contrôle Turnstile est ignoré si le secret n’est pas défini. Aucun contournement SMTP : sans identifiants, réponse 503. Les tests simulent SMTP et Turnstile sans envoyer d’email réel.

Le build cible Cloudflare Workers avec compatibilité Node.js. Les secrets doivent être présents **au runtime**, pas seulement au build. Les appels SMTP nécessitent une sortie TCP/TLS sur 465 ou 587. La connexion conserve le nom d’hôte OVH et la vérification des certificats : pré-résoudre ce nom en IP avant la connexion peut échouer dans workerd. Avec Wrangler, définir les secrets sur le Worker effectivement déployé ; dans Lovable, vérifier que l’environnement de publication expose ces secrets côté serveur. La réception dans la boîte OVH et la compatibilité SMTP du déploiement doivent être testées après configuration.

Réponses : 200 après acceptation SMTP, 400 corps invalide ou antispam rempli, 403 origine refusée, 413 corps trop long, 415 format non JSON, 422 champs ou jeton invalides, 502 échec SMTP, 503 configuration ou vérification indisponible. Un 200 signifie acceptation SMTP ; il ne garantit pas l’arrivée en boîte de réception. Les détails et coordonnées ne sont pas journalisés.

## Contenus et référencement

- src/lib/site-info.ts : domaine, coordonnées, identité et métadonnées partagés.
- src/lib/services.ts : tarifs, livrables et limites des quatre offres.
- /sitemap.xml : généré depuis les prestations et les pages éditoriales.
- public/robots.txt et public/llms.txt : exploration et présentation des contenus.
- public/logo.svg : symbole simplifié pour les petits formats ; le visuel original est conservé dans src/assets/.
- public/social-card.svg : source du visuel de partage ; public/social-card.png : export 1200 × 630.
- public/fonts/ : Manrope hébergée localement, licence OFL jointe.

Les budgets affichés ont été choisis comme propositions commerciales à la demande de Benjamin, dans le bas des fourchettes publiques consultées. Repères consultés le 27 octobre 2026 : https://www.trend-design.fr/post/prix-site-vitrine et https://cynthiathimon.fr/wp-content/uploads/2022/01/Tarifs-prestations-services-cynthia-thimon.pdf. Les tarifs d’application et d’audit sont des forfaits proposés pour les périmètres décrits, pas une moyenne statistique du marché.

Le seul projet présenté comme réalisation est ce site. Aucun client, témoignage ou résultat commercial n’est inventé. Ajouter les références clients uniquement après autorisation de publication.

Avant publication : confirmer les tarifs, les coordonnées et les informations d’hébergement ; renseigner SMTP et Turnstile ; vérifier l’envoi et la réception réels ; connecter Search Console et soumettre le sitemap. Le suivi des demandes dans la messagerie (conservation et suppression) reste à organiser par le responsable de l’activité.
