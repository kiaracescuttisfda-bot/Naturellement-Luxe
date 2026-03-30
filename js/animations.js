document.addEventListener('DOMContentLoaded', () => {

  // Auto-ajout des classes reveal
  document.querySelectorAll('h2').forEach(el => {
    if (!el.closest('.hero') && !el.closest('.section-cta-final') && !el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
  });
  document.querySelectorAll('.equipment-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
  });
  document.querySelectorAll('.chiffre-item').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
  });
  document.querySelectorAll('.temoignage-mini').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-right, .reveal-left').forEach(el => observer.observe(el));

});
