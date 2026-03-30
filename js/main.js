document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL HEADER
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 70);
    }, { passive: true });
  }

  // 2. MENU MOBILE
  const burger      = document.querySelector('.burger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');
  const overlay     = document.querySelector('.mobile-overlay');

  const openMenu = () => {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  if (burger)      burger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 3. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 4. PARALLAXE VERTICAL
  const parallaxEls = document.querySelectorAll('[data-speed]');
  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.15;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  // 5. ACTIVE NAV
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) link.classList.add('active');
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

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 7. TABS
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs');
      const target = btn.dataset.tab;
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = tabGroup.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // 8. STEPPER
  document.querySelectorAll('[data-step-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.stepTarget);
      const stepper = document.querySelector('.stepper');
      if (!stepper) return;
      stepper.querySelectorAll('.step').forEach((step, i) => {
        step.classList.toggle('active', i + 1 <= target);
        step.classList.toggle('current', i + 1 === target);
      });
      document.querySelectorAll('.step-content').forEach(sc => sc.classList.remove('active'));
      const tc = document.querySelector(`[data-step="${target}"]`);
      if (tc) tc.classList.add('active');
    });
  });

});
