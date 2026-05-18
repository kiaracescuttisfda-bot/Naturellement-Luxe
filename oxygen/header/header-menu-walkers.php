<?php
/**
 * ============================================================
 * NATURELLEMENT LUXE — Walkers de menu (Header)
 * ============================================================
 * À COLLER dans le plugin "Code Snippets" :
 *   - Type : PHP Snippet
 *   - Insertion : Run Everywhere (Auto Insert)
 *   - NE PAS mettre les balises <?php ?> si le champ du plugin
 *     les ajoute déjà (Code Snippets : on garde le code SANS la
 *     première ligne <?php). Au besoin, retire la ligne 1.
 *
 * Rôle : faire en sorte que wp_nav_menu() génère EXACTEMENT le
 * markup attendu par le CSS/JS du header (mêmes classes que la
 * version statique : .nav-item.has-submenu, .submenu,
 * .submenu-item.has-subsubmenu, .subsubmenu, .mobile-link,
 * .mobile-link-parent, .mobile-link-arrow, .mobile-sublist,
 * .mobile-subsublist, .mobile-sub-group, .mobile-sub-row).
 *
 * Le menu WordPress utilisé est celui nommé "Header"
 * (Apparence → Menus). Profondeur gérée : 3 niveaux.
 * ============================================================
 */

if ( ! class_exists( 'NL_Walker_Desktop' ) ) {

	/* ---------- NAV DESKTOP ---------- */
	class NL_Walker_Desktop extends Walker_Nav_Menu {

		public function start_lvl( &$output, $depth = 0, $args = null ) {
			$output .= ( $depth === 0 ) ? '<div class="submenu">' : '<div class="subsubmenu">';
		}

		public function end_lvl( &$output, $depth = 0, $args = null ) {
			$output .= '</div>';
		}

		public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
			$classes      = (array) $item->classes;
			$has_children = in_array( 'menu-item-has-children', $classes, true );
			$is_current   = in_array( 'current-menu-item', $classes, true )
				|| in_array( 'current-menu-ancestor', $classes, true );
			$url    = esc_url( $item->url );
			$title  = esc_html( $item->title );
			$aria   = $is_current ? ' aria-current="page"' : '';

			if ( $depth === 0 ) {
				if ( $has_children ) {
					$output .= '<div class="nav-item has-submenu"><a href="' . $url . '"' . $aria . '>' . $title . '</a>';
				} else {
					$output .= '<a href="' . $url . '"' . $aria . '>' . $title . '</a>';
				}
			} elseif ( $depth === 1 ) {
				if ( $has_children ) {
					$output .= '<div class="submenu-item has-subsubmenu"><a href="' . $url . '"' . $aria . '>'
						. '<span>' . $title . '</span>'
						. '<span class="submenu-arrow" aria-hidden="true">›</span></a>';
				} else {
					$output .= '<a href="' . $url . '"' . $aria . '>' . $title . '</a>';
				}
			} else {
				$output .= '<a href="' . $url . '"' . $aria . '>' . $title . '</a>';
			}
		}

		public function end_el( &$output, $item, $depth = 0, $args = null ) {
			$has_children = in_array( 'menu-item-has-children', (array) $item->classes, true );
			if ( $has_children && $depth <= 1 ) {
				$output .= '</div>';
			}
		}
	}

	/* ---------- NAV MOBILE ---------- */
	class NL_Walker_Mobile extends Walker_Nav_Menu {

		private $last_id = '';

		public function start_lvl( &$output, $depth = 0, $args = null ) {
			if ( $depth === 0 ) {
				$output .= '<div class="mobile-sublist" id="' . esc_attr( $this->last_id ) . '" hidden>';
			} else {
				$output .= '<div class="mobile-sublist mobile-subsublist" id="' . esc_attr( $this->last_id ) . '" hidden>';
			}
		}

		public function end_lvl( &$output, $depth = 0, $args = null ) {
			$output .= '</div>';
		}

		public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
			$has_children = in_array( 'menu-item-has-children', (array) $item->classes, true );
			$url   = esc_url( $item->url );
			$title = esc_html( $item->title );

			if ( $depth === 0 ) {
				if ( $has_children ) {
					$cid           = 'm-sub-' . (int) $item->ID;
					$this->last_id = $cid;
					$output .= '<div class="mobile-group"><div class="mobile-link mobile-link-parent">'
						. '<a href="' . $url . '">' . $title . '</a>'
						. '<button type="button" class="mobile-link-arrow" aria-expanded="false" aria-controls="' . $cid . '" aria-label="Afficher le sous-menu"><span aria-hidden="true">›</span></button>'
						. '</div>';
				} else {
					$output .= '<a href="' . $url . '" class="mobile-link">' . $title . '</a>';
				}
			} elseif ( $depth === 1 ) {
				if ( $has_children ) {
					$cid           = 'm-subsub-' . (int) $item->ID;
					$this->last_id = $cid;
					$output .= '<div class="mobile-sub-group"><div class="mobile-sub-row">'
						. '<a href="' . $url . '">' . $title . '</a>'
						. '<button type="button" class="mobile-link-arrow mobile-link-arrow-sm" aria-expanded="false" aria-controls="' . $cid . '" aria-label="Afficher le sous-menu"><span aria-hidden="true">›</span></button>'
						. '</div>';
				} else {
					$output .= '<a href="' . $url . '">' . $title . '</a>';
				}
			} else {
				$output .= '<a href="' . $url . '">' . $title . '</a>';
			}
		}

		public function end_el( &$output, $item, $depth = 0, $args = null ) {
			$has_children = in_array( 'menu-item-has-children', (array) $item->classes, true );
			if ( $has_children && $depth <= 1 ) {
				$output .= '</div>';
			}
		}
	}
}
