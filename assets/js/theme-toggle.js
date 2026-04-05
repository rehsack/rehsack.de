// Theme toggle — sun/moon button in the masthead
(function () {
  'use strict';

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon();
  }

  function toggleTheme() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  // SVG icons — sun for light mode (click to go dark), moon for dark mode
  var sunSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var btn;

  function updateIcon() {
    if (!btn) return;
    btn.innerHTML = currentTheme() === 'dark' ? sunSVG : moonSVG;
    btn.setAttribute('aria-label',
      currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function injectButton() {
    var nav = document.querySelector('.greedy-nav');
    if (!nav) return;

    btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.addEventListener('click', toggleTheme);
    updateIcon();

    // Insert after the visible-links, before the hidden-links toggle
    var hiddenToggle = nav.querySelector('.greedy-nav__toggle');
    if (hiddenToggle) {
      nav.insertBefore(btn, hiddenToggle);
    } else {
      nav.appendChild(btn);
    }
  }

  // Listen for OS preference changes (only if no explicit choice saved)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Inject on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButton);
  } else {
    injectButton();
  }
})();
