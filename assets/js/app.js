/* Controla el menú adaptable, sus niveles desplegables y el estado activo. */
(function () {
  'use strict';

  var navigation = document.getElementById('navigation');
  var toggle = document.getElementById('menu-toggle');
  var backdrop = document.getElementById('menu-backdrop');

  function itemMarkup(item, trail, depth) {
    var entry = typeof item === 'string' ? { title: item } : item;
    var id = 'grupo-' + window.slugify(trail.concat(entry.title).join('-'));
    var route = entry.route || null;
    var label = route ? '<a class="nav-link" href="#' + route + '" data-route="' + route + '">' + entry.title + '</a>' : '<a class="nav-link" href="#' + trail[0].route + '?apartado=' + window.slugify(entry.title) + '" data-anchor="' + window.slugify(entry.title) + '">' + entry.title + '</a>';
    var expand = entry.children ? '<button class="expand-button" type="button" aria-expanded="' + (depth === 0 ? 'true' : 'false') + '" aria-controls="' + id + '" aria-label="Desplegar ' + entry.title + '"><span aria-hidden="true">›</span></button>' : '';
    var children = entry.children ? '<ul class="submenu" id="' + id + '"' + (depth === 0 ? '' : ' hidden') + '>' + entry.children.map(function (child) { return itemMarkup(child, trail.concat(entry), depth + 1); }).join('') + '</ul>' : '';
    return '<li class="nav-group"><div class="nav-row">' + label + expand + '</div>' + children + '</li>';
  }

  navigation.innerHTML = '<ul class="nav-list">' + window.GUIDE_MENU.map(function (item) { return itemMarkup(item, [item], 0); }).join('') + '</ul>';

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span:last-child').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    backdrop.tabIndex = open ? 0 : -1;
  }

  navigation.addEventListener('click', function (event) {
    var button = event.target.closest('.expand-button');
    if (button) {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.setAttribute('aria-label', (expanded ? 'Desplegar ' : 'Contraer ') + button.previousElementSibling.textContent);
      document.getElementById(button.getAttribute('aria-controls')).hidden = expanded;
      return;
    }
    if (event.target.closest('a') && window.matchMedia('(max-width: 64rem)').matches) { setMenu(false); }
  });

  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  backdrop.addEventListener('click', function () { setMenu(false); toggle.focus(); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); } });

  document.addEventListener('route:changed', function (event) {
    navigation.querySelectorAll('[data-route]').forEach(function (link) {
      var route = link.getAttribute('data-route');
      var active = route === event.detail.route || (route === '/clases' && event.detail.route.indexOf('/clases/') === 0);
      link.classList.toggle('active', active);
      if (active) { link.setAttribute('aria-current', 'page'); } else { link.removeAttribute('aria-current'); }
    });
  });

  window.GuideRouter.start();
}());
