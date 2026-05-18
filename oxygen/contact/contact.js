/* ============================================
   CONTACT JS — Page /contact/
   Validation légère côté client + feedback visuel.
   Si tu remplaces le <form> par un plugin (WPForms/Forminator/CF7),
   ce JS devient inutile : le plugin gère validation + envoi.
   ============================================ */

(function () {
  function init() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      var email = form.querySelector('#cf-email');
      var consent = form.querySelector('input[name="consentement"]');

      // Validation email basique
      if (email && email.value) {
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if (!ok) {
          e.preventDefault();
          email.focus();
          email.style.borderColor = '#c0392b';
          return;
        }
      }

      // Consentement obligatoire
      if (consent && !consent.checked) {
        e.preventDefault();
        consent.focus();
        return;
      }

      // Feedback bouton (le navigateur enchaîne avec l'action mailto / plugin)
      var btn = form.querySelector('.contact-submit');
      if (btn) {
        btn.textContent = 'Envoi en cours…';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });

    // Reset bordure d'erreur quand l'utilisateur corrige
    var email = form.querySelector('#cf-email');
    if (email) {
      email.addEventListener('input', function () {
        email.style.borderColor = '';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
