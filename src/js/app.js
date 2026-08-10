/* ─────────────────────────────────────────
   AeroDefined — Main app JS
───────────────────────────────────────── */

// ── Preloader ─────────────────────────────
(function () {
  const bar    = document.getElementById('preBar');
  const loader = document.getElementById('preloader');
  const page   = document.getElementById('main-page');

  // No preloader on this page — just show content immediately
  if (!loader || !page) {
    if (page) page.style.opacity = '1';
    return;
  }

  // Safety net: if anything goes wrong, show page after 4s max
  const fallback = setTimeout(() => {
    if (loader) loader.classList.add('done');
    page.style.opacity = '1';
  }, 4000);

  const dur = 2600, start = performance.now();
  page.style.opacity = '0';

  function tick(now) {
    try {
      const pct = Math.min(100, Math.round(
        100 * (1 - Math.pow(1 - Math.min((now - start) / dur, 1), 2.4))
      ));
      if (bar) bar.style.width = pct + '%';
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        clearTimeout(fallback);
        setTimeout(() => {
          loader.classList.add('done');
          page.style.animation = 'none';
          void page.offsetHeight;
          page.style.transition = 'opacity .8s ease';
          page.style.opacity = '1';
        }, 380);
      }
    } catch(e) {
      // If anything throws, show the page
      clearTimeout(fallback);
      if (loader) loader.classList.add('done');
      page.style.opacity = '1';
    }
  }

  requestAnimationFrame(tick);
})();

// ── Footer year ───────────────────────────
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// ── Slideshow ─────────────────────────────
let currentSlide = 0;
const totalSlides = 5;
let slideTimer;

function goSlide(n) {
  const prev = document.getElementById('slide-' + currentSlide);
  const dots  = document.querySelectorAll('.slide-dot');
  if (prev) prev.classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = (n + totalSlides) % totalSlides;

  const next = document.getElementById('slide-' + currentSlide);
  if (next) next.classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');

  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(currentSlide + 1), 5000);
}

function moveSlide(dir) { goSlide(currentSlide + dir); }

slideTimer = setInterval(() => goSlide(currentSlide + 1), 5000);

// ── Input sanitizer ───────────────────────
function sanitize(s) {
  return String(s).replace(/[<>"'`;\\]/g, '').trim().slice(0, 100);
}

// ── Hero search ───────────────────────────
function doHeroSearch() {
  const q   = sanitize(document.getElementById('heroSearch')?.value || '');
  const cat = document.getElementById('heroCategory')?.value || '';
  if (!q && !cat) return;
  const p = new URLSearchParams();
  if (q)   p.set('q',   encodeURIComponent(q));
  if (cat) p.set('cat', cat);
  window.location.href = '/marketplace.html?' + p.toString();
}

const heroInput = document.getElementById('heroSearch');
if (heroInput) {
  heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') doHeroSearch(); });
}

// ── Category filter pills ─────────────────
function filterCat(el, cat) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const labels = {
    '':              'All listings',
    'aircraft-sale': 'Aircraft for sale',
    'aircraft-lease':'Aircraft leasing',
    'charter':       'Charter flights',
    'mro':           'MRO services',
    'parts':         'Aircraft parts',
    'engines':       'Engines',
    'cargo':         'Cargo capacity',
    'uld':           'ULD leasing',
    'rfs':           'Road feeder / RFS',
    'compliance':    'Customs & compliance',
    'landing-gear':  'Landing gear',
  };
  const heading = document.getElementById('listingHeading');
  if (heading) heading.textContent = labels[cat] || 'All listings';
  if (cat) window.location.href = '/marketplace.html?cat=' + cat;
}

// ── Scroll reveal ─────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));