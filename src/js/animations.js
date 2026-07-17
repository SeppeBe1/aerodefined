/**
 * CargoPlace — animations.js
 * Scroll-triggered reveal for .animate-fade-up and .animate-fade-in elements.
 * Respects prefers-reduced-motion.
 */

export function initAnimations() {
  // Respect user preference
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const targets = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-in, .svc-card, .who-card, .plan'
  );

  if (!targets.length) return;

  // Initially hide elements (only when JS is active)
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('animate-fade-up') ||
                         el.classList.contains('svc-card') ||
                         el.classList.contains('who-card') ||
                         el.classList.contains('plan')
      ? 'translateY(18px)'
      : 'none';
    el.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Get stagger delay from inline style if set
      const delay = entry.target.style.animationDelay || '0ms';
      entry.target.style.transitionDelay = delay;

      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
}