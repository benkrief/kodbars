# Kodbars — site vitrine

Site vitrine de Kodbars (BSKonseil), l'agence de développement web de Benjamin Krief.
Site en français, 5 pages : Accueil, Services, Méthode, Contact, Mentions légales.

## Lancer le site en local

Prérequis : Node.js 20+ (ou Bun).

```sh
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:8080

Autres commandes :

```sh
npm run build     # build de production
npm run preview   # prévisualiser le build
npm run test      # tests
npm run lint      # vérification du code
```

## Structure

- `src/routes/` — une page par fichier (index, services, methode, contact, mentions-legales)
- `src/components/site.tsx` — en-tête, pied de page et blocs réutilisables
- `src/styles.css` — couleurs et styles globaux (Tailwind CSS v4)
- `src/assets/kodbars-logo.png` — logo
- `public/robots.txt`, `public/llms.txt` — robots et assistants IA

## Avant de mettre en ligne

- Remplacer l'email `contact@kodbars.fr` par l'adresse réelle (utilisée dans le pied de page et la page Contact).
- Ajuster les textes des pages Services et Méthode si besoin.
- Le formulaire de contact ouvre la messagerie du visiteur (mailto) : il n'envoie rien tout seul.
