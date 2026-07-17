/**
 * CargoPlace — counter.js
 * Animates [data-count] numbers when they scroll into view.
 */

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1800; // ms
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.round(easeOutQuart(progress) * target);
    el.textContent = value.toLocaleString('en');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function initCounter() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      observer.unobserve(entry.target); // only animate once
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}