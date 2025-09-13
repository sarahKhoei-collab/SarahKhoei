// Mark that JS is available so CSS can switch to collapsible mode
document.documentElement.classList.add('js');

// --- Mobile nav toggle ---
(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!navToggle || !nav) return;

  function setExpanded(isOpen) {
    navToggle.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  }

  navToggle.addEventListener('click', function () {
    setExpanded(!nav.classList.contains('open'));
  });

  // Close menu when a link is tapped
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setExpanded(false); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setExpanded(false);
  });

  setExpanded(false);
})();
document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }

  toggleBtn.addEventListener("click", function() {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
