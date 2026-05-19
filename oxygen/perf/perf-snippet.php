<?php
/**
 * Naturellement Luxe — Optimisations performance
 * À coller dans WP Code → PHP Snippet → "Run Everywhere".
 *
 * 1) Désenfile le CSS Gutenberg/block-library inutile (site sous Oxygen,
 *    pas d'éditeur de blocs) → supprime ~15 Kio de CSS bloquant + inutilisé.
 * 2) Précharge les 2 polices woff2 + l'image hero (LCP) dans le <head>.
 *
 * ⚠️ Adapte le nom du fichier hero si la home n'utilise pas hero.webp.
 */

/* 1. Dequeue CSS WordPress inutile (Gutenberg / classic / global styles) */
add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'classic-theme-styles' );
    wp_dequeue_style( 'global-styles' );          // styles inline blocs
    // Décommente si tu n'utilises pas les emojis :
    // remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    // remove_action( 'wp_print_styles', 'print_emoji_styles' );
}, 100 );

/* 2. Preload polices + image hero (LCP) */
add_action( 'wp_head', function () {

    if ( is_admin() || is_feed() || is_404() ) { return; }
    if ( ! empty( $_GET['oxygen'] ) || ! empty( $_GET['ct_builder'] ) ) { return; }

    $up = '/wp-content/uploads/2026/05';

    // Polices : preload uniquement les 2 woff2 réellement utilisées
    echo '<link rel="preload" as="font" type="font/woff2" crossorigin href="' . esc_url( $up . '/Alaska-VF.woff2' ) . '">' . "\n";
    echo '<link rel="preload" as="font" type="font/woff2" crossorigin href="' . esc_url( $up . '/Baikal-VF.woff2' ) . '">' . "\n";

    // Image hero (LCP) : préchargée uniquement sur l'accueil
    if ( is_front_page() || is_home() ) {
        echo '<link rel="preload" as="image" fetchpriority="high" href="' . esc_url( $up . '/hero.webp' ) . '">' . "\n";
    }
}, 1 );
