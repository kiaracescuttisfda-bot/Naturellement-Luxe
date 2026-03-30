/* ============================================
   NATURELLEMENT LUXE — Scroll Animations
   IntersectionObserver fade-in + translateY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // --- Counter animation for stats ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.textContent = prefix + Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + target + suffix;
            }
          };

          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // --- Parallax effect ---
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const speed = 0.3;
          const yPos = -(rect.top * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
    }, { passive: true });
  }
});
