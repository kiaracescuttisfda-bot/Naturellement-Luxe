document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL HEADER
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 70);
  }, { passive: true });

  // 2. MENU MOBILE
  const burger      = document.querySelector('.burger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');
  const overlay     = document.querySelector('.mobile-overlay');

  const openMenu  = () => { mobileNav.classList.add('open'); overlay.classList.add('visible'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileNav.classList.remove('open'); overlay.classList.remove('visible'); document.body.style.overflow = ''; };

  if (burger)      burger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);
  if (mobileNav) mobileNav.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));

  // 3. PARALLAXE VERTICAL sur images flottantes
  const parallaxEls = document.querySelectorAll('[data-speed]');
  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.1;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // 4. PARALLAXE sur section pleine largeur
  const parallaxSection = document.querySelector('.parallax-img');
  if (parallaxSection) {
    window.addEventListener('scroll', () => {
      parallaxSection.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  // 5. ACTIVE NAV
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a').forEach(link => {
    if (link.getAttribute('href').split('/').pop() === currentPage) link.classList.add('active');
  });

  // 6. ACCORDION
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('active');
        const c = ai.querySelector('.accordion-content');
        if (c) c.style.maxHeight = null;
      });
      if (!isActive) { item.classList.add('active'); content.style.maxHeight = content.scrollHeight + 'px'; }
    });
  });

  // 7. TABS
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = btn.closest('.tabs'), t = btn.dataset.tab;
      g.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      g.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const p = g.querySelector(`[data-panel="${t}"]`);
      if (p) p.classList.add('active');
    });
  });

  // 8. STEPPER
  document.querySelectorAll('[data-step-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.stepTarget);
      const stepper = document.querySelector('.stepper');
      if (!stepper) return;
      stepper.querySelectorAll('.step').forEach((s, i) => { s.classList.toggle('active', i+1 <= target); s.classList.toggle('current', i+1 === target); });
      document.querySelectorAll('.step-content').forEach(sc => sc.classList.remove('active'));
      const tc = document.querySelector(`[data-step="${target}"]`);
      if (tc) tc.classList.add('active');
    });
  });

});
