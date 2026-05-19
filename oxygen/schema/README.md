# Schema.org — Naturellement Luxe

## 1. Global (site-wide)
`schema-global.php` → **WP Code → PHP Snippet → Run Everywhere**.
Injecte `DaySpa/LocalBusiness` (+ `Organization`/`WebSite` si activés) +
`OfferCatalog` dans le `<head>` de toutes les pages.

- ⚠️ **Yoast** : par défaut `NL_SCHEMA_WITH_ORG_WEBSITE = false` (on laisse
  Yoast faire Organization + WebSite pour éviter le doublon). Mets `true`
  seulement si tu désactives le schema Yoast.
- `NL_SCHEMA_EMAIL` : vide tant que l'email officiel n'est pas confirmé.

## 2. Par page (champ "Custom Schema / JSON-LD")
Un fichier `.json` par page. Copie le contenu et colle-le dans le champ
**Schema & Structured Data → Custom Schema → JSON-LD** de la page
correspondante dans l'éditeur.

| Fichier | Page (slug) |
|---|---|
| `home.json` | `/` |
| `prestations.json` | `/prestations/` |
| `spa-privatif.json` | `/spa-privatif/` |
| `massage.json` | `/massage/` |
| `cours.json` | `/cours/` |
| `love-room.json` | `/love-room/` |
| `events.json` | `/events/` |
| `events-evjf.json` | `/events/evjf/` |
| `events-baby-shower.json` | `/events/baby-shower/` |
| `events-anniversaire.json` | `/events/anniversaire/` |
| `events-st-valentin.json` | `/events/st-valentin/` |
| `tarifs.json` | `/tarifs/` |
| `cartes-cadeau.json` | `/cartes-cadeau/` |
| `contact.json` | `/contact/` |
| `reservation.json` | `/reservation/` |
| `blog.json` | `/blog/` |
| `cgv.json` | `/cgv/` |
| `mentions-legales.json` | `/mentions-legales/` |
| `hygiene-securite.json` | `/hygiene-securite/` |

## ⚠️ Avant publication — FIND/REPLACE obligatoire
Tous les JSON utilisent le domaine **`https://www.naturellementluxe.com`**.
- En **dev** : remplace par `https://www.dev.naturellementluxe.com`.
- Vérifie que les **slugs** correspondent à tes vraies URLs WordPress
  (rappel du souci `-2` / `/index.php/`). Si un slug diffère, corrige
  l'`url`/`@id` dans le JSON concerné.

Chaque JSON par page se relie au global via `@id` absolu
(`…/#dayspa`, `…/#website`) → graphe cohérent pour Google.

Test : https://validator.schema.org/ et le test des résultats enrichis
Google après mise en ligne.
