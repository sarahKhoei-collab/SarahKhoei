\
// Mark that JS is available (used by CSS to switch behavior)
document.documentElement.classList.add('js');

// Minimal JS: mobile nav, theme toggle, abstract toggles, copy email, footer year.
(function() {
  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = siteNav.getAttribute('data-expanded') === 'true';
      siteNav.setAttribute('data-expanded', String(!expanded));
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Theme
  const THEME_KEY = 'site-theme';
  const themeBtn = document.getElementById('theme-toggle');
  const apply = (mode) => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode === 'dark' ? 'dark' : 'light';
    themeBtn.textContent = mode === 'dark' ? '🌙' : '☀️';
    themeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) apply(stored); else apply(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next); apply(next);
  });

  // Abstract toggles
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.abstract-toggle');
    if (!btn) return;
    const id = btn.getAttribute('aria-controls');
    const panel = document.getElementById(id);
    if (!panel) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });

  // Copy email
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const text = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(text);
      const fb = btn.parentElement.querySelector('.copy-feedback');
      if (fb) { fb.textContent = 'Copied!'; setTimeout(() => fb.textContent = '', 1200); }
    } catch {}
  });

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})(); 
// --- Mobile nav toggle ---
(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!navToggle || !nav) return;

  function setExpanded(isOpen) {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      nav.classList.add('open');
      document.body.classList.add('nav-open');
    } else {
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  }

  navToggle.addEventListener('click', function () {
    var isOpen = !nav.classList.contains('open');
    setExpanded(isOpen);
  });

  // Close menu when a link is tapped
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setExpanded(false); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setExpanded(false);
  });

  // Ensure aria-expanded is correct on load
  setExpanded(false);
})();

