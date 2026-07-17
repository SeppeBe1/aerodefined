/**
 * CargoPlace — search.js
 * Service tab filtering + basic search input logic.
 */

export function initSearch() {
  initServiceTabs();
}

// ── Service category tabs ─────────────────────────────────────
function initServiceTabs() {
  const tabs  = document.querySelectorAll('.services__tab');
  const cards = document.querySelectorAll('.svc-card');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update tab state (ARIA + class)
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter cards
      cards.forEach(card => {
        const category = card.dataset.category;
        const visible  = filter === 'all' || category === filter;

        if (visible) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.style.opacity   = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity    = '1';
              card.style.transform  = 'translateY(0)';
            });
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}