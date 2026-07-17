/**
 * CargoPlace — navbar.js
 * Handles: scroll state, burger menu, dropdown, active link highlighting.
 */

export function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const burger     = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdown   = document.querySelector('.navbar__link--dropdown');
  const dropPanel  = document.querySelector('.navbar__dropdown');

  if (!navbar) return;

  // ── Scroll: add .scrolled class ──────────────────────────
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init

  // ── Burger: toggle mobile menu ────────────────────────────
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ── Dropdown: hover + keyboard ────────────────────────────
  if (dropdown && dropPanel) {
    const open  = () => dropdown.setAttribute('aria-expanded', 'true');
    const close = () => dropdown.setAttribute('aria-expanded', 'false');

    dropdown.parentElement.addEventListener('mouseenter', open);
    dropdown.parentElement.addEventListener('mouseleave', close);

    // Keyboard: Enter/Space to toggle, Escape to close
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = dropdown.getAttribute('aria-expanded') === 'true';
        dropdown.setAttribute('aria-expanded', String(!isOpen));
      }
      if (e.key === 'Escape') close();
    });
  }

  // ── Active link: highlight based on scroll position ───────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}