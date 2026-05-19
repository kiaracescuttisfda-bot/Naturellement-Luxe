# Performance — Naturellement Luxe

## Fait côté code (déjà dans le repo, à recoller dans Oxygen)
- `fetchpriority="high"` + `decoding="async"` sur **toutes les images hero**
  (`.hero-bg` / `.page-hero-bg` / `.post-hero-bg`) → améliore le LCP.
- `loading="lazy"` + `decoding="async"` sur **toutes les images de contenu**
  (vignettes, blocs, sous-cartes events, blog, logos footer/mobile).
- `width` / `height` sur les logos header/footer/mobile → stabilise le CLS.
- `perf-snippet.php` : dequeue CSS Gutenberg inutile + preload polices & hero.
- `htaccess-cache.txt` : cache navigateur long sur assets.

## À faire côté toi (étapes)

### 1. Recoller les Code Blocks modifiés dans Oxygen
Header, Footer (Applied to all) + toutes les pages éditées, puis
**LiteSpeed → Purge All**.

### 2. Activer le snippet perf
WP Code → New → **PHP Snippet** → coller `perf-snippet.php` →
Run Everywhere → Activer.

### 3. Cache navigateur
- **Simple (recommandé)** : LiteSpeed Cache → Page Optimization →
  **Browser Cache = ON**. (Rien d'autre à faire.)
- **OU** manuel : coller `htaccess-cache.txt` dans le `.htaccess`
  racine, avant `# BEGIN WordPress`.

### 4. Alléger les polices (LE plus gros gain — ~700 Kio) ⚠️ priorité
Les `Alaska-VF.woff2` (457 Kio) / `Baikal-VF.woff2` (378 Kio) sont des
variable fonts complètes.
1. Va sur https://transfonter.org/
2. Upload le `.ttf` d'origine (ou le woff2), coche **woff2** uniquement,
   subset **Latin**, et ne garde que les graisses utilisées
   (Alaska : 300/500/700 ; Baikal : 200/300/400/600/700).
3. Ré-uploade les nouveaux `.woff2` (mêmes noms) dans
   `/wp-content/uploads/2026/05/` → tu passes à ~30-60 Kio par police.

### 5. Compresser / redimensionner les images ⚠️
PageSpeed signale ~617 Kio à gagner. Avec https://squoosh.app/ ou
TinyPNG, ré-exporte en WebP qualité ~72 et **aux bonnes dimensions** :
| Image | Actuel | Cible |
|---|---|---|
| `LOGOS-naturellementluxe-11.webp` | 1353×1617 | ~300×358 (logo affiché ~125 px) |
| `spa-privatif-img.webp` | 1465×1280, 408 Kio | ~1200 px large, < 150 Kio |
| `love-room-img.webp` | 336 Kio | ~1200 px large, < 150 Kio |
| `hero.webp` | 189 Kio | < 130 Kio (qualité 70) |
| `carte-cadeau.webp` | 98 Kio | < 80 Kio |
Ré-uploade avec les **mêmes noms** (aucun code à changer).

### 6. LiteSpeed — optimisation CSS/JS
Page Optimization :
- CSS : Minify ON, Combine ON, **Generate Critical CSS** ON.
- JS : Minify ON, Defer ON.
- Purge All après.

### 7. Mise en production (SEO)
Le `<meta name="robots" content="noindex,nofollow">` est **normal en
dev**. Le jour du passage en prod : Réglages → Lecture → **décocher**
« Visibilité moteurs de recherche » + vérifier Yoast.

## Gains attendus (mobile)
- Polices subsettées + cache → LCP de ~10 s vers ~3-4 s
- Images compressées → -600 Kio, FCP/Speed Index nettement meilleurs
- Dequeue Gutenberg + LiteSpeed critical CSS → moins de render-blocking
