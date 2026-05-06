document.addEventListener('DOMContentLoaded', () => {

  // Header scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-close');
  const open = () => { mobileNav.classList.add('open'); overlay.classList.add('visible'); };
  const close = () => { mobileNav.classList.remove('open'); overlay.classList.remove('visible'); };
  burger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', close));

  // Toggle sous-menu mobile (Prestations)
  document.querySelectorAll('.mobile-link-arrow').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('aria-controls');
      const sublist = id ? document.getElementById(id) : null;
      if (!sublist) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      sublist.classList.toggle('open', !expanded);
      if (!expanded) sublist.removeAttribute('hidden');
      else setTimeout(() => sublist.setAttribute('hidden', ''), 400);
    });
  });

  // Reveal scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
});
