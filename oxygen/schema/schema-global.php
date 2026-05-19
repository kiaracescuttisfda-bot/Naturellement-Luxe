<?php
/**
 * Naturellement Luxe — Schema.org GLOBAL (site-wide)
 * À coller dans WP Code → PHP Snippet → "Run Everywhere".
 *
 * Injecte dans <head> sur TOUTES les pages :
 *   - DaySpa / LocalBusiness  (@id …/#dayspa)
 *   - Organization            (@id …/#organization)   [voir NOTE Yoast]
 *   - WebSite                 (@id …/#website)         [voir NOTE Yoast]
 *   - OfferCatalog des services (lié au DaySpa)
 *
 * Les JSON-LD par page (champ "Custom Schema" de chaque page) référencent
 * ces @id via l'URL absolue (ex. https://…/#dayspa) pour relier le graphe.
 *
 * ─────────────────────────────────────────────────────────────────────
 * NOTE YOAST : Yoast génère déjà Organization + WebSite. Pour éviter le
 * doublon, mets NL_SCHEMA_WITH_ORG_WEBSITE à false (recommandé si Yoast
 * schema est actif) → seul le DaySpa + OfferCatalog sera injecté.
 * Si tu désactives le schema Yoast, laisse true.
 * ─────────────────────────────────────────────────────────────────────
 */

if ( ! defined( 'NL_SCHEMA_WITH_ORG_WEBSITE' ) ) {
    define( 'NL_SCHEMA_WITH_ORG_WEBSITE', false ); // false = laisse Yoast gérer Org/WebSite
}
if ( ! defined( 'NL_SCHEMA_EMAIL' ) ) {
    define( 'NL_SCHEMA_EMAIL', '' ); // ⚠️ mets l'email officiel quand confirmé, sinon vide = non publié
}

add_action( 'wp_head', 'nl_schema_global', 99 );

function nl_schema_global() {

    // Ne pas injecter dans l'admin, les flux, les 404, ni l'éditeur Oxygen
    if ( is_admin() || is_feed() || is_404() ) { return; }
    if ( ! empty( $_GET['oxygen'] ) || ! empty( $_GET['ct_builder'] ) ) { return; }

    $base = untrailingslashit( home_url() ); // s'adapte dev/prod automatiquement

    $dayspa = [
        '@type'       => [ 'DaySpa', 'HealthAndBeautyBusiness', 'LocalBusiness' ],
        '@id'         => $base . '/#dayspa',
        'name'        => 'Naturellement Luxe',
        'legalName'   => 'Naturellement Luxe',
        'description' => "Spa privatif de luxe à Paris — réservation de jour et de nuit (Bain de Minuit / Love Room), massages, cours en duo et événements privés.",
        'url'         => $base . '/',
        'logo'        => $base . '/wp-content/uploads/2026/05/LOGOS-naturellementluxe-11.webp',
        'image'       => [
            $base . '/wp-content/uploads/2026/05/hero.webp',
            $base . '/wp-content/uploads/2026/05/spa-privatif-img.webp',
        ],
        'telephone'          => '+33142360607',
        'priceRange'         => '€€€',
        'currenciesAccepted' => 'EUR',
        'paymentAccepted'    => 'Cash, Credit Card',
        'address' => [
            '@type'           => 'PostalAddress',
            'streetAddress'   => '15 rue du Croissant',
            'postalCode'      => '75002',
            'addressLocality' => 'Paris',
            'addressRegion'   => 'Île-de-France',
            'addressCountry'  => 'FR',
        ],
        'geo' => [
            '@type'     => 'GeoCoordinates',
            'latitude'  => 48.868456,
            'longitude' => 2.343215,
        ],
        'openingHoursSpecification' => [ [
            '@type'     => 'OpeningHoursSpecification',
            'dayOfWeek' => [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ],
            'opens'     => '10:00',
            'closes'    => '21:00',
        ] ],
        'areaServed' => [ '@type' => 'City', 'name' => 'Paris' ],
        'sameAs'     => [
            'https://www.instagram.com/spaprivatif/',
            'https://www.facebook.com/naturellementluxe',
        ],
        'hasMap' => 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode( '15 rue du Croissant, 75002 Paris' ),
        'potentialAction' => [
            '@type'  => 'ReserveAction',
            'target' => $base . '/reservation/',
            'name'   => 'Réserver',
        ],
        'hasOfferCatalog' => [
            '@type' => 'OfferCatalog',
            'name'  => 'Prestations Naturellement Luxe',
            'itemListElement' => [
                [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Spa privatif',     'url' => $base . '/spa-privatif/' ] ],
                [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Love Room',         'url' => $base . '/love-room/' ] ],
                [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Massage',           'url' => $base . '/massage/' ] ],
                [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Cours en duo',      'url' => $base . '/cours/' ] ],
                [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Événements privés', 'url' => $base . '/events/' ] ],
            ],
        ],
    ];

    if ( NL_SCHEMA_EMAIL ) {
        $dayspa['email'] = NL_SCHEMA_EMAIL;
    }

    $graph = [ $dayspa ];

    if ( NL_SCHEMA_WITH_ORG_WEBSITE ) {

        $org = [
            '@type'     => 'Organization',
            '@id'       => $base . '/#organization',
            'name'      => 'Naturellement Luxe',
            'legalName' => 'Naturellement Luxe',
            'url'       => $base . '/',
            'logo'      => [
                '@type' => 'ImageObject',
                'url'   => $base . '/wp-content/uploads/2026/05/LOGOS-naturellementluxe-11.webp',
            ],
            'contactPoint' => [
                '@type'             => 'ContactPoint',
                'telephone'         => '+33142360607',
                'contactType'       => 'customer service',
                'availableLanguage' => [ 'French' ],
                'areaServed'        => 'FR',
            ],
            'sameAs' => [
                'https://www.instagram.com/spaprivatif/',
                'https://www.facebook.com/naturellementluxe',
            ],
        ];
        if ( NL_SCHEMA_EMAIL ) {
            $org['contactPoint']['email'] = NL_SCHEMA_EMAIL;
        }

        $website = [
            '@type'       => 'WebSite',
            '@id'         => $base . '/#website',
            'url'         => $base . '/',
            'name'        => 'Naturellement Luxe',
            'description' => "Spa privatif de luxe à Paris — réservation de jour et de nuit, massages, Love Room, événements privés.",
            'inLanguage'  => 'fr-FR',
            'publisher'   => [ '@id' => $base . '/#organization' ],
            'potentialAction' => [
                '@type'       => 'SearchAction',
                'target'      => [
                    '@type'       => 'EntryPoint',
                    'urlTemplate' => $base . '/?s={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];

        $graph[] = $org;
        $graph[] = $website;
    }

    $payload = [
        '@context' => 'https://schema.org',
        '@graph'   => $graph,
    ];

    echo "\n<!-- Schema.org global Naturellement Luxe -->\n";
    echo '<script type="application/ld+json">'
        . wp_json_encode( $payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
        . '</script>' . "\n";
}
