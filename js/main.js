/* ============================================
   NATURELLEMENT LUXE — Main JS
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

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.nav-mobile-overlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });

    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('active');
        ai.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Open clicked if not already active
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
      tabGroup.querySelector(`[data-panel="${target}"]`).classList.add('active');
    });
  });

  // --- Stepper (reservation page) ---
  const stepBtns = document.querySelectorAll('[data-step-target]');
  stepBtns.forEach(btn => {
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
