/**
 * CargoPlace — app.js
 * Main entry point. Loads HTML components, then initialises modules.
 */

import { initNavbar }    from './navbar.js';
import { initCounter }   from './counter.js';
import { initAnimations} from './animations.js';
import { initSearch }    from './search.js';

// ── Load HTML components into the page ──────────────────────
async function loadComponent(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res  = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error('[CargoPlace] Component load error:', err);
  }
}

async function loadAllComponents() {
  await Promise.all([
    loadComponent('#navbar-placeholder',   '/src/components/navbar.html'),
    loadComponent('#hero-placeholder',     '/src/components/hero.html'),
    loadComponent('#services-placeholder', '/src/components/services.html'),
    loadComponent('#footer-placeholder',   '/src/components/footer.html'),
  ]);
}

// ── Boot ────────────────────────────────────────────────────
async function init() {
  await loadAllComponents();

  // Set dynamic year in footer
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialise all JS modules after DOM is ready
  initNavbar();
  initCounter();
  initAnimations();
  initSearch();
}

document.addEventListener('DOMContentLoaded', init);