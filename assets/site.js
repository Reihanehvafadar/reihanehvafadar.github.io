
/* Navigation and publication filters. The content remains readable without JavaScript. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click(); toggle.focus();
      }
    });
  }
  document.querySelectorAll('[data-publications]').forEach(container => {
    const buttons = container.querySelectorAll('[data-filter]');
    const groups = container.querySelectorAll('[data-kind]');
    const status = container.querySelector('[data-filter-status]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const chosen = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      groups.forEach(group => {
        group.hidden = chosen !== 'all' && group.dataset.kind !== chosen;
        if (!group.hidden) count += group.querySelectorAll('.pub-entry').length;
      });
      if (status) status.textContent = `${count} ${count === 1 ? 'item' : 'items'} shown. Published articles, preprints, and working manuscripts are listed separately.`;
    }));
  });
})();
