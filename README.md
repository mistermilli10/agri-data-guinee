# AgriData Guinée

Plateforme Next.js 14 pour centraliser les données agricoles de la République de Guinée. Le projet suit les maquettes officielles (Accueil, Filières, Acteurs, Projets, Authentification et Tableau de bord Admin) et s’appuie sur Supabase, Prisma et React Query.

## Démarrage rapide

```bash
pnpm install
pnpm run db:push
pnpm run db:seed
pnpm run dev
```

L’application sera disponible sur <http://localhost:3000>.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `pnpm run dev` | Lance le serveur Next.js en mode développement |
| `pnpm run build` | Construit l’application pour la production |
| `pnpm run start` | Démarre le serveur en mode production |
| `pnpm run lint` | Exécute ESLint |
| `pnpm run test` | Lance Vitest (tests unitaires) |
| `pnpm run db:push` | Applique le schéma Prisma sur la base de données |
| `pnpm run db:seed` | Injecte les données d’exemple (régions, filières, acteurs, projets) |
| `pnpm run db:policies` | Applique les politiques RLS Supabase définies dans `supabase/policies.sql` |

## Configuration de l’environnement

Copiez `.env.example` en `.env.local` et renseignez les variables :

```bash
cp .env.example .env.local
```

- `DATABASE_URL` : URL Postgres (Supabase ou local)
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Identifiants OAuth Google et Microsoft
- `SEED_ON_DEPLOY` pour exécuter le seed automatiquement lors du déploiement si nécessaire

## Base de données & Prisma

Le schéma complet est disponible dans `prisma/schema.prisma`. Le seed (`prisma/seed.ts`) génère :

- 8 régions avec statistiques 2024
- Filières représentatives (Mangue, Riz, Moringa, etc.)
- Un panel d’acteurs (coopératives, startups, ONG) avec répartitions régionales
- Des projets gouvernementaux, privés, startups et recherche
- Un compte admin (`contact@agridata.gov.gn`) et un utilisateur standard

## Supabase & RLS

1. Créez un projet Supabase et activez l’authentification email/password + OAuth (Google, Microsoft).
2. Ajoutez les tables Prisma via `pnpm run db:push` puis `pnpm run db:seed`.
3. Appliquez les politiques RLS :

   ```bash
   pnpm run db:policies
   ```

   Les scripts s’appuient sur la fonction SQL `exec_sql` (créez-la si nécessaire) pour exécuter le fichier `supabase/policies.sql`.

## Structure principale

```
app/
  layout.tsx, page.tsx
  filieres/, acteurs/, projets/, auth/, admin/
  api/regions, api/filieres, api/actors, api/projects, api/submissions, api/kpis
components/
  layout, hero, cartes, formulaires, filtres, ui (shadcn)
lib/
  db.ts, auth.ts, supabase.ts, utils.ts, validators.ts
prisma/
  schema.prisma, seed.ts
supabase/
  policies.sql
samples/
  *.csv pour import Admin
tests/
  e2e (Playwright), unit (Vitest)
```

## Tests

- Vitest couvre les utilitaires (`pnpm run test`).
- Playwright fournit des tests smoke sur les pages principales (`pnpm exec playwright test`).
- Un workflow GitHub Actions (`.github/workflows/ci.yml`) exécute lint, tests et build à chaque push/PR vers `main`.

## Déploiement

### Vercel

1. Créez un projet Vercel et reliez ce dépôt.
2. Définissez les variables d’environnement (`DATABASE_URL`, `SUPABASE_*`, OAuth, `SEED_ON_DEPLOY`).
3. Le fichier `vercel.json` configure la détection Next.js et utilise PNPM.
4. En post-déploiement, déclenchez `prisma migrate deploy` puis le seed si `SEED_ON_DEPLOY=true`.

### Supabase

- Activez la synchronisation des utilisateurs via webhook ou edge function selon vos besoins.
- Vérifiez que les politiques RLS sont appliquées et que les rôles (`admin`, `user`) sont présents dans le JWT.

## Ressources

- [PROMPTS.md](./PROMPTS.md) : instructions de génération exhaustives
- `/samples/*.csv` : fichiers d’exemple pour import CSV dans l’Admin
- Maquettes : voir les visuels fournis dans la demande initiale

Bon développement et bienvenue dans l’écosystème AgriData Guinée !
