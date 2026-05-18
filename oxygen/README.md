# Oxygen Builder — Conversion Naturellement Luxe

Ce dossier contient tous les codes HTML / CSS / JS prêts à coller dans des
**Code Blocks** Oxygen Builder (compatible Oxygen 4.x → 6.x).

## Structure

```
oxygen/
├── header/                  ← Template "Applied to all"
│   ├── header.html          ← Onglet HTML du Code Block
│   ├── header.css           ← Onglet CSS
│   └── header.js            ← Onglet JS
├── footer/                  ← Template "Applied to all"
│   ├── footer.html
│   ├── footer.css
│   └── footer.js            (vide pour l'instant)
├── home/                    ← Page d'accueil (/)
│   ├── home.html
│   ├── home.css
│   └── home.js              (vide)
├── prestations/             ← Page /prestations/
│   ├── prestations.html
│   ├── prestations.css
│   └── prestations.js       (vide)
├── tarifs/                  ← Page /tarifs/
│   ├── tarifs.html
│   ├── tarifs.css
│   └── tarifs.js            (vide)
├── cartes-cadeau/           ← Page /cartes-cadeau/
│   ├── cartes-cadeau.html
│   ├── cartes-cadeau.css
│   └── cartes-cadeau.js     (vide)
├── contact/                 ← Page /contact/
│   ├── contact.html
│   ├── contact.css
│   └── contact.js
│
│   ━━━ PAGES DÉTAIL PRESTATIONS ━━━
│   Chaque page est autonome : 3 onglets (HTML + CSS + JS) à coller
│   dans son propre Code Block. Le CSS est dupliqué dans chaque page
│   (identique d'une page à l'autre) — c'est voulu.
├── spa-privatif/            ├── spa-privatif.html / .css / .js
├── massage/                 ├── massage.html / .css / .js
├── cours/                   ├── cours.html / .css / .js
├── love-room/               ├── love-room.html / .css / .js  (contenu "Bain de Minuit")
├── events/                  ├── events.html / .css / .js  (chapeau + 4 cartes)
├── events-evjf/             ├── events-evjf.html / .css / .js
├── events-baby-shower/      ├── events-baby-shower.html / .css / .js
├── events-anniversaire/     ├── events-anniversaire.html / .css / .js
└── events-st-valentin/      └── events-st-valentin.html / .css / .js  (contenu rédigé, à valider)

CONTENUS-SITE.md   ← tout le texte scrapé de naturellementluxe.com
```

## Pages détail prestations — mode d'emploi

Chaque page a son propre Code Block autonome :

1. Crée la page WordPress (slug au choix, ex. `/spa-privatif/` ou
   `/prestations/spa-privatif/`).
2. Ajoute un **Code Block** et colle les **3 onglets** depuis le dossier
   correspondant : `*.html` → HTML, `*.css` → CSS, `*.js` → JS.
3. Recommence pour chacune des 9 pages.

Le CSS de ces 9 pages est volontairement **identique et dupliqué** dans
chaque dossier (tu as choisi un bloc CSS par page plutôt qu'un CSS global).
Si tu modifies le style commun, pense à reporter le changement sur les
9 fichiers `.css` (ils sont strictement identiques au départ).

⚠️ **events-st-valentin** : contenu rédigé par défaut (le site source n'a
pas de page St Valentin) — à faire valider / personnaliser.

## Marche à suivre dans Oxygen

### 1. Préparer les assets dans WordPress

**Fonts** — Upload `Alaska-VF.ttf` et `Baikal-VF.ttf` dans
`/wp-content/uploads/fonts/` (via FTP ou plugin "Allow .ttf upload" si bloqué
par WordPress).

**Images** — Upload dans la médiathèque WordPress :
- `LOGOS-naturellementluxe-11.png` → renomme en `logo-naturellementluxe.png`
- `hero.webp`
- `spa-privatif.jpg`
- `love-room.jpg`
- `carte-cadeau.webp`

Récupère ensuite les URLs depuis la médiathèque et **fais un find/replace**
dans les fichiers HTML pour remplacer `/wp-content/uploads/...` par les
vraies URLs. Si tu uploades dans `/wp-content/uploads/2026/01/` (organisation
WP par date), pense à mettre à jour les chemins.

### 2. Créer les templates Header & Footer

Dans Oxygen → **Templates** → **Add New** :

**Template "Header global"**
- Type : **Singular** ou **Front Page** + cocher **Apply to all**
- Position : **Header**
- Édite avec Oxygen → ajoute un **Code Block**
  - Onglet **PHP+HTML** : colle `oxygen/header/header.html`
  - Onglet **CSS** : colle `oxygen/header/header.css`
  - Onglet **JavaScript** : colle `oxygen/header/header.js`

**Template "Footer global"**
- Même chose, position **Footer**
  - Onglet **PHP+HTML** : `oxygen/footer/footer.html`
  - Onglet **CSS** : `oxygen/footer/footer.css`
  - JS vide

### 3. Créer les pages

Pour chacune des 4 pages (Accueil, Prestations, Tarifs, Cartes Cadeau) :

1. Créer la page WordPress (`Pages → Add New`).
2. **Slug** :
   - Accueil → définie comme page d'accueil dans `Réglages → Lecture`
   - Prestations → `prestations`
   - Tarifs → `tarifs`
   - Cartes Cadeau → `cartes-cadeau`
3. Cliquer sur **Edit with Oxygen**.
4. Ajouter un **Code Block** dans la page.
5. Coller les 3 onglets (HTML / CSS / JS) depuis le dossier correspondant.
6. Publier.

### 4. Vérifications

- Le menu mobile (hamburger) doit s'ouvrir / fermer sans rechargement
- Le sous-menu "Events" doit se déplier au hover (desktop) ou au clic sur la
  flèche (mobile)
- Les FAQ accordéons (`<details>`) sur la home doivent s'ouvrir au clic
- Les chemins d'image doivent renvoyer vers la médiathèque (pas de 404)
- Les fonts Alaska et Baikal doivent se charger (sinon : DevTools → Network
  → vérifier le code 200 sur les .ttf)

## Architecture CSS

Pour éviter de dupliquer 800 lignes de styles globaux sur chaque page, le
**Header CSS** porte tout le système de design partagé :

- Variables (`--accent`, `--primary`, etc.)
- `@font-face` (Alaska, Baikal)
- Reset + base typography
- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-light`
- `.section-center` (utilisée par toutes les pages)
- Animations (`fadeUp`, `fadeIn`, `.reveal`)

Chaque page CSS ne contient **que ses styles propres** (hero, sections
spécifiques). Si un élément est partagé entre 2-3 pages (`.page-hero`,
`.page-intro`), il est dupliqué pour rester self-contained — c'est plus
simple pour l'édition individuelle dans Oxygen.

## Couleurs actuelles (palette doré)

| Variable | Valeur | Usage |
|---|---|---|
| `--primary` | `#1C1412` | Texte principal, fonds sombres, header bas |
| `--secondary` | `#FFFFFF` | Fonds clairs, texte sur sombre |
| `--accent` | `#A88940` | Doré principal (boutons, accents, hover) |
| `--accent-2` | `#8B7030` | Doré assombri pour les hover (~18% plus sombre) |
| `--text` | `#9B7C69` | Texte courant (marron taupe) |
| `--bg` | `#FAF6EE` | Fond crème |
| `--bg-light` | `#FCFAF5` | Fond crème très clair |

Pour changer la teinte d'accent : modifie uniquement `--accent` et
`--accent-2` dans `header.css`. Tout le site se mettra à jour.

## Limites connues / TODO

1. **Liens du footer** : volontairement non-cliquables (`<span class="footer-link">`).
   Les remplacer par `<a href="/page/">` quand les pages cibles existeront.
2. **Page Réservation** : pas encore créée. Tous les liens `#reserver`
   devront être mis à jour vers `/reservation/` ou un système de booking
   externe (Lodgify, etc.).
3. **Page Contact** : pointe vers `/#contact` (ancre sur la home). Idéal :
   créer une vraie page `/contact/` avec formulaire.
4. **Tarifs** : tous marqués "prix à valider" dans le HTML. À remplacer
   quand la grille est validée.
5. **Images Massage / Cours / Events** : réutilisent
   `spa-privatif.jpg` / `love-room.jpg` / `hero.webp`. À remplacer par des
   visuels dédiés.
6. **WhatsApp** : numéro hardcodé `+33142360607`. À adapter si besoin.

## Pour modifier les chemins d'image en lot

Si toutes tes images sont uploadées dans `/wp-content/uploads/2026/01/`,
fais un find/replace global dans tous les `*.html` du dossier `oxygen/` :

```
/wp-content/uploads/    →    /wp-content/uploads/2026/01/
```

Ou utilise du PHP dans le HTML d'Oxygen :

```html
<img src="<?php echo wp_get_attachment_image_url( 42, 'full' ); ?>" alt="">
```

(remplace `42` par l'ID de l'image dans la médiathèque).
