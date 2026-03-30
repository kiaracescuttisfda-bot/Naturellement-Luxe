/* ============================================
   NATURELLEMENT LUXE — Main JS
   Vanilla JS — Aucun framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Header ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Mobile Menu — Slide Panel ---
  const hamburger = document.querySelector('.hamburger');
  const mobilePanel = document.querySelector('.nav-mobile-overlay');
  const mobileBackdrop = document.querySelector('.nav-mobile-backdrop');

  function openMobileMenu() {
    if (!mobilePanel) return;
    hamburger.classList.add('active');
    mobilePanel.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobilePanel) return;
    hamburger.classList.remove('active');
    mobilePanel.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobilePanel && mobilePanel.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close button inside panel
  const closeBtn = document.querySelector('.nav-mobile-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  // Close on link click
  if (mobilePanel) {
    mobilePanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // --- Smooth scroll for anchor links ---
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

  // --- Parallaxe multi-vitesses (vertical) ---
  const parallaxElements = document.querySelectorAll('[data-speed]');
  if (parallaxElements.length) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed);
          el.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
      });
    }, { passive: true });
  }

  // --- Parallaxe horizontal ---
  const horizontalElements = document.querySelectorAll('[data-translateX]');
  if (horizontalElements.length) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        horizontalElements.forEach(el => {
          const speed = parseFloat(el.dataset.translatex || el.dataset.translateX) || 0.5;
          const rect = el.getBoundingClientRect();
          const progress = (window.innerHeight - rect.top) / window.innerHeight;
          el.style.transform = `translateX(${progress * speed * 30}px)`;
        });
      });
    }, { passive: true });
  }

  // --- Accordion ---
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

  // --- Tabs ---
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

  // --- Stepper (reservation page) ---
  document.querySelectorAll('[data-step-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.stepTarget);
      const stepper = document.querySelector('.stepper');
      if (!stepper) return;

      stepper.querySelectorAll('.step').forEach((step, i) => {
        step.classList.toggle('active', i + 1 <= target);
        step.classList.toggle('current', i + 1 === target);
      });

      document.querySelectorAll('.step-content').forEach(sc => {
        sc.classList.remove('active');
      });
      const targetContent = document.querySelector(`[data-step="${target}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

});
