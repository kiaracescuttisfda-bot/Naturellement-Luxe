document.addEventListener('DOMContentLoaded', () => {

  // ======= 1. AUTO-ADD REVEAL CLASSES =======
  const autoRevealSelectors = [
    '.section-concept h2',
    '.section-services h2',
    '.section-temoignages h2',
    '.section-galerie h2',
    '.section-chiffres',
    '.temoignage-featured'
  ];

  autoRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.closest('.hero') && !el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
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

  // ======= 2. INTERSECTION OBSERVER =======
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-right, .reveal-left').forEach(el => {
    revealObserver.observe(el);
  });

  // ======= 3. SMOOTH PARALLAX (style Aigue Marine) =======
  const parallaxElements = document.querySelectorAll('[data-speed]');
  const parallaxBg = document.querySelector('.parallax-img');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    // Floating images parallax
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.1;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const offset = (centerY - viewportH / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });

    // Section parallax background
    if (parallaxBg) {
      const section = parallaxBg.closest('.section-parallax');
      if (section) {
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / (rect.height + viewportH);
        parallaxBg.style.transform = `translateY(${progress * 100}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateParallax();
});
