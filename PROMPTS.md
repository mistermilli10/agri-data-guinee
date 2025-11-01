# Prompts de Génération - AgriData Guinée

Ce document regroupe les prompts fournis pour générer automatiquement la plateforme **AgriData Guinée** via un modèle de génération de code (Codex, ChatGPT Code Interpreter, Hostinger Horizon, etc.).

> **Note :** Les prompts sont présentés tels que transmis par le client afin de conserver toutes les consignes UI/UX, techniques et fonctionnelles d'origine.

---

## Master Prompt — Générer toute la plateforme

Crée une application web production-ready nommée **AgriData Guinée** conforme aux maquettes jointes (Accueil, Filières, Acteurs, Projets/Innovations, Connexion/Inscription).

**Pile technique :**

* **Next.js 14 (App Router)** + **TypeScript**
* **Tailwind CSS** + **shadcn/ui** (Button, Card, Badge, Input, Select, Tabs, Dialog, Table, Pagination, Sheet, DropdownMenu, Alert, Avatar)
* **Supabase** (auth email+mdp + OAuth Google/Microsoft, Postgres, RLS activé)
* **Prisma** comme ORM (provider `postgresql`) relié à Supabase
* **Zod** pour valider les schémas
* **TanStack Query** (React Query) pour le fetching
* **Map**: `react-leaflet` (carte interactive des régions)
* **Charts**: `recharts` (KPI si besoin)
* **i18n**: français par défaut
* **ESLint + Prettier** + tests **Playwright** (smoke) + **Vitest** (unit)
* **CI** GitHub Actions (build + lint + tests)
* Déploiement **Vercel**; DB **Supabase** (ou Postgres managé).

### Identité visuelle (depuis maquette)

* **Couleurs** (Tailwind config, variables CSS) :
  * `--green`: #15803D (CTA, bandeaux)
  * `--green-600`: #16A34A ; `--green-700`: #15803D
  * `--yellow`: #F59E0B ; `--red`: #EF4444 ; `--blue`: #2563EB
  * gris UI: `#F5F6F8`, `#E5E7EB`, `#111827`, texte #1F2937
* **Rayons**: `rounded-2xl` (cartes/CTA), ombres douces (`shadow-md`/`shadow-lg`)
* **Typo**: Inter, 16px base, titres h1/h2 gras, hauteurs généreuses, `tracking-tight`
* **Spacing**: sections `py-14` à `py-20`, cartes `p-5`/`p-6`
* **Icônes**: `lucide-react` (people, map, leaf, factory, rocket, etc.)

### Rôles & accès

* **Visiteur**: lecture publique des pages Accueil, Filières, Acteurs, Projets.
* **Utilisateur authentifié** (coop/startup/chercheur) : peut soumettre une innovation/projet via formulaire.
* **Admin MAGEL**: CRUD total + import CSV + stats; bouton “Ajouter un nouvel acteur” visible seulement Admin.

### Navigation (header/footer)

* Header avec logo “AgriData Guinée” + nav: **Accueil, Filières, Acteurs, Projets, Connexion** (si connecté : Avatar + “Tableau de bord”).
* Footer conforme aux maquettes (à propos, navigation, ressources, contact, réseaux).

### Pages & sections (fidèles à la maquette)

#### 1) Accueil `/`

* Hero en 2 colonnes : titre “Connecter la Terre, les Acteurs et la Technologie”, boutons **Explorer les Données** (lien `/filieres`) et **Voir la Vidéo** (placeholder).
* 3 KPIs : **12 Filières**, **1 247 Coopératives**, **89 500T Volume total**, **34 Projets d’innovation** (valeurs alimentées par la DB, fallback si vide).
* **Carte interactive** Leaflet des régions (liste des régions à droite avec volumes).
* Section **Filières Phares** (cartes 3 colonnes avec badge statut: Production/Export/Innovation).
* Bloc **À propos** (liste puces : centralisation, transparence, innovation).
* CTA final “Rejoignez la Révolution Agricole Numérique” avec boutons **Créer un compte** et **Télécharger les Données**.

#### 2) Filières `/filieres`

* Bandeau vert titre + sous-titre.
* Barre de filtres : **Toutes les régions | Tous les produits | Tous les types** + champ **Rechercher…** + (Admin seulement) bouton **Exporter**.
* Tableau (DataTable) avec colonnes **Région | Produit | Type | Volume estimé | Acteur principal | Contact | Actions**.
* Pagination en bas **1 2 3 Suivant**.
* Cards KPIs de synthèse sous le tableau : Total Production, Transformation, Acteurs actifs, Régions (icônes).

#### 3) Acteurs `/acteurs`

* Bandeau vert avec compteurs globaux (Coopératives, Transformateurs, Startups).
* Filtres : **Tous les types** (Coopérative/Transformateur/Startup/ONG/Association), **Toutes les régions**, **Recherche**.
* Grille de cartes acteurs (couleurs de fond par type, badge en haut-gauche).
* Bouton **+ Ajouter un nouvel acteur** (Admin only) → modal/route avec formulaire.

#### 4) Projets & Innovations `/projets`

* Hero vert + 2 boutons: **+ Soumettre un projet** (auth requis) et **Rapport annuel** (download placeholder).
* Compteurs: **Projets actifs**, **Innovations tech**, **Startups**, **Bénéficiaires**.
* **Filtres badges** (Tous, Projets gouvernementaux, Innovations privées, Startups, Recherche) + **recherche**.
* **Section Projets Gouvernementaux** (cartes 2 colonnes) avec statut **En cours / Planifié**, détails (régions, budget, période, progrès %).
* **Startups & Innovations privées** (cartes 3 colonnes : statut **Actif/Pilote/Expansion**).
* **Recherche & Innovation** (liste de fiches).
* Formulaire latéral **Soumettre votre innovation** (Nom du projet, Email, Description) avec validation Zod; crée une entrée `submissions` en statut `pending`.

#### 5) Auth `/auth` (ou `/login` + `/register`)

* Onglets **Connexion | Inscription**.
* Champs: email, mot de passe, **Se souvenir de moi**, **Mot de passe oublié ?**
* OAuth **Google** et **Microsoft**.
* Texte légal RGPD (lien vers politique).

#### 6) Tableau de bord Admin `/admin` (MVP)

* Listes CRUD (Acteurs, Filières, Projets) avec import CSV, édition inline (ou modale), soft-delete, logs d’audit.

### Schéma de données (Prisma)

```prisma
model Region {
  id        String  @id @default(cuid())
  name      String  @unique
  slug      String  @unique
  stats     RegionStat[]
  actors    Actor[]
  filieres  Filiere[]
  projects  Project[] @relation("ProjectRegions")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model RegionStat {
  id        String   @id @default(cuid())
  regionId  String
  year      Int
  productionTons Float
  transformationTons Float
  kpisJson  Json?
  region    Region   @relation(fields: [regionId], references: [id], onDelete: Cascade)
}

enum ActorType { COOPERATIVE TRANSFORMATEUR STARTUP ONG ASSOCIATION INSTITUTION }

model Actor {
  id        String   @id @default(cuid())
  name      String
  type      ActorType
  regionId  String?
  address   String?
  phone     String?
  email     String?
  members   Int?
  foundedAt Int?
  contactName String?
  website   String?
  status    String? // actif, etc.
  region    Region? @relation(fields: [regionId], references: [id])
  filieres  Filiere[] @relation("ActorFilieres", references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum FiliereType { PRODUCTION TRANSFORMATION EXPORT INNOVATION }

model Filiere {
  id        String   @id @default(cuid())
  name      String
  type      FiliereType
  regionId  String?
  product   String
  volumeTons Float?
  mainActorId String?
  contact   String?
  region    Region?  @relation(fields: [regionId], references: [id])
  mainActor Actor?   @relation(fields: [mainActorId], references: [id])
  actors    Actor[]  @relation("ActorFilieres")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ProjectKind { GOVT PRIVATE STARTUP RESEARCH }
enum ProjectStatus { PLANNED ACTIVE COMPLETED }

model Project {
  id        String   @id @default(cuid())
  title     String
  kind      ProjectKind
  status    ProjectStatus
  summary   String?
  startYear Int?
  endYear   Int?
  budgetUSD Float?
  progress  Int? // 0-100
  regions   Region[] @relation("ProjectRegions")
  linksJson Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Submission {
  id        String   @id @default(cuid())
  title     String
  contactEmail String
  description String
  status    String   @default("pending")
  createdBy String?  // user id
  createdAt DateTime @default(now())
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      String   @default("user") // admin|user
  createdAt DateTime @default(now())
}
```

### API (Next.js route handlers, `/app/api/...`)

* `GET /api/regions` → liste
* `GET /api/filieres` → query params: `regionId`, `type`, `q`, `page`, `pageSize`
* `GET /api/actors` → `type`, `regionId`, `q`, `page`
* `POST /api/actors` (admin)
* `GET /api/projects` → `kind`, `status`, `q`, `page`
* `POST /api/submissions` (auth)
* `GET /api/kpis` → agrégations (totaux, compteurs)

Chaque endpoint : validation **Zod**, pagination standard `{items, total, page, pageSize}`.

### Sécurité & RLS (Supabase)

* Table `users` synchronisée via webhook/auth.
* **RLS** :
  * Sélect public en lecture sur `regions`, `filieres`, `actors`, `projects` (read-only).
  * `submissions`: `INSERT` autorisé à l’utilisateur connecté; `SELECT` limité à `createdBy = auth.uid()`; `admin` a tout.
  * Mutations CRUD sur `actors`, `filieres`, `projects` réservées au rôle `admin` (via JWT claim `role`).

### Accessibilité & qualité

* Composants shadcn accessibles (labels, `aria-*`, focus states).
* Contrastes AA, navigation clavier, `skip-to-content`.
* Images avec `alt`.
* Chargement progressif (Skeleton) et gestion d’erreurs (ErrorBoundary).

### Contenus (textes depuis maquette)

Utilise ces libellés FR tels quels :

* Héros Accueil : “Connecter la Terre, les Acteurs et la Technologie”
* Boutons : “Explorer les Données”, “Voir la Vidéo”, “Voir les détails”, “Créer un compte”, “Télécharger les Données”
* Filtres : “Toutes les régions”, “Tous les produits”, “Tous les types”, “Rechercher…”
* Sections : “Vue d’Ensemble du Secteur Agricole”, “Carte Interactive des Régions”, “Filières Phares”, “À Propos d’AgriData Guinée”
* Acteurs : “Acteurs du Secteur Agricole”, “Voir les détails”, “+ Ajouter un nouvel acteur”
* Projets : “Innovations & Projets Agricoles”, “Soumettre un projet”, “Rapport annuel”, “Projets Gouvernementaux”, “Startups & Innovations Privées”, “Recherche & Innovation”
* Auth : “Bon retour !”, “Mot de passe oublié ?”, “Se souvenir de moi”, “Se connecter”, “Inscription”

### Fichiers attendus (structure)

```
app/
  layout.tsx, globals.css
  page.tsx                          // Accueil
  filieres/page.tsx
  acteurs/page.tsx
  projets/page.tsx
  auth/(login)/page.tsx
  auth/(register)/page.tsx
  admin/(dashboard)/page.tsx
  api/* route handlers
components/
  header.tsx, footer.tsx, hero.tsx, kpi-cards.tsx
  data-table/* (table générique + pagination)
  filters/* (RegionFilter, TypeFilter, SearchInput)
  cards/* (FiliereCard, ActorCard, ProjectCard)
  forms/* (ActorForm, SubmissionForm)
  map/regions-map.tsx
lib/
  db.ts (Prisma), supabase.ts, utils.ts, validators.ts
styles/
  tailwind.config.js, globals.css (variables couleurs)
prisma/
  schema.prisma, seed.ts
tests/
  e2e/* (Playwright), unit/* (Vitest)
```

**Génère l’intégralité du code** en respectant strictement ces consignes d’UI/UX et de contenu. Fourni aussi :

* scripts npm : `dev`, `build`, `start`, `lint`, `test`, `db:push`, `db:seed`
* README.md (setup + env examples)
* `.env.example` avec `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, OAuth IDs.
* Import CSV exemples (`/samples/actors.csv`, `filieres.csv`, `regions.csv`).
* Tests smoke Playwright: chargement pages clés + filtres de base.

---

## Prompts modulaires (par fichier/feature)

### 0) Init projet

> Crée un nouveau projet Next.js 14 TypeScript + Tailwind + shadcn/ui + Prisma + Supabase + React Query + Zod, selon la structure et dépendances suivantes : [repète la section “Pile technique”, “Structure”, “Scripts npm”, “README” et “.env.example” du Master Prompt].

### 1) Layout & thème

> Crée `app/layout.tsx` et `app/globals.css` avec le header/footer conformes aux maquettes, couleurs, rayons, et inter. Ajoute meta tags (title, description), `<SkipToContent />`, et states actifs sur la nav. Footer avec colonnes (Navigation/Resources/Contact).

### 2) Accueil

> Implémente `app/page.tsx` : hero 2 colonnes, KPI cards dynamiques (fallbacks), carte Leaflet avec liste de régions à droite, section “Filières Phares” (3 cartes), bloc “À propos”, CTA final. Utilise composants `Hero`, `KpiCards`, `RegionsMap`, `FeaturedFilieres`, `About`, `FinalCta`.

### 3) Filières (table filtrable)

> Implémente `app/filieres/page.tsx` + `components/data-table/*` + API `/api/filieres`. Filtres région/produit/type + recherche; pagination; colonnes et badges exactement comme la maquette. Bouton Exporter visible seulement `role=admin`.

### 4) Acteurs (grille)

> Implémente `app/acteurs/page.tsx` + `components/cards/ActorCard.tsx` + `components/forms/ActorForm.tsx` + API `/api/actors`. Filtres multi, recherche, carte colorée par type, bouton “+ Ajouter un nouvel acteur” (admin) → Dialog formulaire (Zod) avec création DB.

### 5) Projets & Innovations

> Implémente `app/projets/page.tsx` + API `/api/projects` + `components/cards/ProjectCard.tsx` + `components/forms/SubmissionForm.tsx`. Sections et compteurs comme la maquette; formulaire “Soumettre votre innovation” validé (Zod) créant une `Submission`.

### 6) Auth

> Implémente `app/auth/(login)/page.tsx` et `app/auth/(register)/page.tsx` avec onglets Connexion/Inscription, email+mdp, OAuth Google/Microsoft, “Se souvenir de moi”, “Mot de passe oublié ?”. Après login, rediriger vers `/`.

### 7) Admin

> Implémente `/admin` : onglets Acteurs/Filières/Projets, DataTable CRUD, import CSV, rôles via middleware. Pages protégées (redirect si non-admin). Logs d’audit basiques.

### 8) Prisma & Seed

> Écris `prisma/schema.prisma` (modèle fourni) et `prisma/seed.ts` générant :
>
>* 8 régions (Kindia, Kankan, Faranah, N’Zérékoré, Labé, Mamou, Boké, Conakry) avec stats.
>* 12 filières (Mangue, Riz local, Moringa, Cacao, Ananas, Fonio, etc.) avec volumes/types variés.
>* 30+ acteurs répartis par type/region.
>* 10 projets (gouvernement, privés, startups, recherche) avec statut & progrès.
>* Compteurs agrégés pour la page Accueil.

### 9) RLS Supabase

> Ajoute politiques : lecture publique sur `regions/filieres/actors/projects`; `submissions` restreint à `createdBy`; mutations CRUD réservées `role=admin`. Mets les SQL de policies dans `/supabase/policies.sql` et un script `npm run db:policies`.

### 10) Tests

> Ajoute Playwright (routes `/`, `/filieres`, `/acteurs`, `/projets`) : chaque test vérifie rendu du bandeau, présence des filtres, et qu’un filtrage retourne ≥1 ligne. Ajoute Vitest pour utils (formatters, filters).

---

## Critères d’acceptation (checklist)

* [ ] Les 5 pages respectent hiérarchie, espacements, badges, libellés FR **exactement** comme la maquette.
* [ ] Les filtres fonctionnent (URLSearchParams synchronisés).
* [ ] Pagination Ok, perfs Ok (loading skeletons).
* [ ] Auth email/OAuth opérationnelle; redirection post-login.
* [ ] Rôles : bouton “Ajouter un nouvel acteur” et “Exporter” visibles seulement Admin.
* [ ] Formulaire “Soumettre votre innovation” crée une `Submission` avec toast succès/erreur.
* [ ] RLS empêche la modification par non-admin (testée).
* [ ] Accessibilité AA, navigation clavier, focus visible.
* [ ] CI passe (`build`, `lint`, `test`).
* [ ] Déploiement Vercel + Supabase, variables d’environnement renseignées.

---

## Variables d’environnement à prévoir

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
MICROSOFT_CLIENT_ID=...
MICROSOFT_CLIENT_SECRET=...
```

---

## Script de seed (rappel)

> Écris `prisma/seed.ts` qui insère :
>
>* Régions: {name, slug} pour Kindia, Kankan, Faranah, N’Zérékoré, Labé, Mamou, Boké, Conakry.
>* Stats par région (year = 2024) avec `productionTons` et `transformationTons`.
>* Filières d’exemple (Mangue/Production/12 000T – Kindia; Riz local/Transformation/3 500T – Kankan; Moringa/Production/850T – Faranah; etc.)
>* Acteurs d’exemple (coop, transformateur, startup, ONG) avec valeurs proches de la maquette.
>* Projets (PDRI, PRODAF, etc.) avec `status` (ACTIVE/PLANNED), `budgetUSD`, `progress`.
>* Un user admin `contact@agridata.gov.gn` (mdp hash) et un user lambda.
>* Commandes npm : `db:push` puis `db:seed`.

---

## Plan de déploiement

> Prépare le déploiement :
>
>* Ajoute GitHub Actions (`.github/workflows/ci.yml`) exécutant `pnpm i`, `pnpm lint`, `pnpm test`, `pnpm build`.
>* `vercel.json` minimal; build Next 14 avec app router.
>* Script `postdeploy` pour `prisma migrate deploy` + `db:seed` (si `SEED_ON_DEPLOY=true`).
>* Documentation `README.md` : setup Supabase (projet, URL/keys, policies), OAuth Google/Microsoft, lancement local, commandes.

