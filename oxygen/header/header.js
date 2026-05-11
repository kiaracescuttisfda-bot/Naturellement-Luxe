/* ============================================
   HEADER JS — Oxygen "Applied to all"
   Gère :
   - Scroll header (.scrolled si > 40px)
   - Ouverture / fermeture du menu mobile (burger + overlay + close)
   - Toggle des sous-menus mobiles via .mobile-link-arrow (aria-controls)
   - IntersectionObserver pour les animations .reveal / .reveal-left / .reveal-right
   ============================================ */

(function () {
  function init() {

    // Header scroll
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Mobile menu open / close
    var burger = document.querySelector('.burger');
    var mobileNav = document.querySelector('.mobile-nav');
    var overlay = document.querySelector('.mobile-overlay');
    var closeBtn = document.querySelector('.mobile-close');

    var open = function () {
      if (mobileNav) mobileNav.classList.add('open');
      if (overlay) overlay.classList.add('visible');
    };
    var close = function () {
      if (mobileNav) mobileNav.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
    };

    if (burger) burger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    document.querySelectorAll('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    // Toggle des sous-menus mobiles (Prestations + Events)
    document.querySelectorAll('.mobile-link-arrow').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = btn.getAttribute('aria-controls');
        var sublist = id ? document.getElementById(id) : null;
        if (!sublist) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        sublist.classList.toggle('open', !expanded);
        if (!expanded) {
          sublist.removeAttribute('hidden');
        } else {
          setTimeout(function () { sublist.setAttribute('hidden', ''); }, 400);
        }
      });
    });

    // Reveal scroll observer
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
