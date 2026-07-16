/* Controla el menú adaptable, sus niveles desplegables y el estado activo. */
(function () {
  'use strict';

  var navigation = document.getElementById('navigation');
  var contextNavigation = document.getElementById('context-navigation');
  var toggle = document.getElementById('menu-toggle');
  var backdrop = document.getElementById('menu-backdrop');

  function itemMarkup(item, trail, depth) {
    var entry = typeof item === 'string' ? { title: item } : item;
    var id = 'grupo-' + window.slugify(trail.concat(entry.title).join('-'));
    var route = entry.route || null;
    var nearestRoute = trail.slice().reverse().find(function (ancestor) { return ancestor.route; });
    var anchorRoute = nearestRoute ? nearestRoute.route : '/inicio';
    var label = route ? '<a class="nav-link" href="#' + route + '" data-route="' + route + '">' + entry.title + '</a>' : '<a class="nav-link" href="#' + anchorRoute + '?apartado=' + window.slugify(entry.title) + '" data-anchor="' + window.slugify(entry.title) + '">' + entry.title + '</a>';
    var expand = entry.children ? '<button class="expand-button" type="button" aria-expanded="' + (depth === 0 ? 'true' : 'false') + '" aria-controls="' + id + '" aria-label="Desplegar ' + entry.title + '"><span aria-hidden="true">›</span></button>' : '';
    var children = entry.children ? '<ul class="submenu" id="' + id + '"' + (depth === 0 ? '' : ' hidden') + '>' + entry.children.map(function (child) { return itemMarkup(child, trail.concat(entry), depth + 1); }).join('') + '</ul>' : '';
    return '<li class="nav-group"><div class="nav-row">' + label + expand + '</div>' + children + '</li>';
  }

  navigation.innerHTML = '<ul class="nav-list">' + window.GUIDE_MENU.map(function (item) { return itemMarkup(item, [item], 0); }).join('') + '</ul>';

  // Busca la entrada del menú que corresponde a la ruta activa.
  function findMenuEntry(items, route) {
    for (var i = 0; i < items.length; i += 1) {
      var entry = typeof items[i] === 'string' ? { title: items[i] } : items[i];
      if (entry.route === route) { return entry; }
      if (entry.children) {
        var nested = findMenuEntry(entry.children, route);
        if (nested) { return nested; }
      }
    }
    return null;
  }

  // Genera un enlace de subcategoría o de apartado interno.
  function contextualLink(item, parentRoute) {
    var entry = typeof item === 'string' ? { title: item } : item;
    var href = entry.route ? '#' + entry.route : '#' + parentRoute + '?apartado=' + window.slugify(entry.title);
    return '<li><a class="context-link" href="' + href + '">' + entry.title + '</a></li>';
  }

  // Actualiza el panel derecho sin duplicar el contenido de la página central.
  function renderContextPanel(route) {
    var page = window.getPage(route);
    var entry = findMenuEntry(window.GUIDE_MENU, route);
    var title = entry ? entry.title : (page ? page.title : 'Sección');
    var parentRoute = entry && entry.route ? entry.route : route;
    var categoryItems = entry && entry.children ? entry.children : [];
    var pageSections = page && page.sections ? page.sections : [];
    var categoryMarkup = categoryItems.length ? '<section class="context-block"><h2>Subcategorías</h2><ul class="context-list">' + categoryItems.map(function (item) { return contextualLink(item, parentRoute); }).join('') + '</ul></section>' : '';
    var sectionMarkup = pageSections.length ? '<section class="context-block"><h2>Acceso directo</h2><ul class="context-list">' + pageSections.map(function (section) { return contextualLink(section, route); }).join('') + '</ul></section>' : '';
    var quickMarkup = '<section class="context-block"><h2>Enlaces rápidos</h2><ul class="context-list quick-context-list">' + [
      { title: 'Inicio', route: '/inicio' },
      { title: 'Guía general', route: '/guia-general' },
      { title: 'Sistemas del personaje', route: '/sistemas-del-personaje' },
      { title: 'Objetos y obtención', route: '/objetos' },
      { title: 'Actividades y mazmorras', route: '/actividades-y-mazmorras' },
      { title: 'Clases', route: '/clases' },
      { title: 'Proyecto', route: '/proyecto' }
    ].map(function (item) { return contextualLink(item, '/inicio'); }).join('') + '</ul></section>';

    contextNavigation.innerHTML = '<div class="context-heading"><p class="context-kicker">Sección actual</p><h1>' + title + '</h1><p>Explora sus apartados sin perder de vista el contenido central.</p></div>' + categoryMarkup + sectionMarkup + quickMarkup;
  }

  // Filtra en tiempo real el catálogo de objetos sin recargar la página.
  function actualizarCatalogoObjetos() {
    var search = document.getElementById('object-search');
    var category = document.getElementById('object-category');
    var cards = document.querySelectorAll('[data-object-card]');
    var count = document.getElementById('object-search-count');
    var empty = document.getElementById('object-search-empty');
    if (!search || !category || !cards.length) { return; }

    var query = search.value.trim().toLowerCase();
    var selectedCategory = category.value;
    var visible = 0;
    cards.forEach(function (card) {
      var matchesText = !query || card.getAttribute('data-search').indexOf(query) !== -1;
      var matchesCategory = selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory;
      var show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) { visible += 1; }
    });
    count.textContent = visible + (visible === 1 ? ' objeto encontrado' : ' objetos encontrados');
    empty.hidden = visible !== 0;
  }

  document.addEventListener('input', function (event) {
    if (event.target && event.target.id === 'object-search') { actualizarCatalogoObjetos(); }
  });
  document.addEventListener('change', function (event) {
    if (event.target && event.target.id === 'object-category') { actualizarCatalogoObjetos(); }
  });

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
    // Cambia los acentos visuales para que cada clase y sistema tenga identidad propia.
    document.body.classList.remove('theme-dragon-lancer', 'theme-lunarborn', 'theme-spiritfox', 'theme-swordsage', 'theme-spirit', 'theme-wisp', 'theme-activities', 'theme-system');
    var route = event.detail.route;
    var theme = 'theme-system';
    if (route.indexOf('/clases/dragon-lancer') === 0) { theme = 'theme-dragon-lancer'; }
    if (route.indexOf('/clases/lunarborn') === 0) { theme = 'theme-lunarborn'; }
    if (route.indexOf('/clases/spiritfox') === 0) { theme = 'theme-spiritfox'; }
    if (route.indexOf('/clases/swordsage') === 0) { theme = 'theme-swordsage'; }
    if (route.indexOf('/sistemas-del-personaje/spirit') === 0) { theme = 'theme-spirit'; }
    if (route.indexOf('/sistemas-del-personaje/wisp') === 0) { theme = 'theme-wisp'; }
    if (route.indexOf('/actividades-y-mazmorras') === 0) { theme = 'theme-activities'; }
    document.body.classList.add(theme);

    navigation.querySelectorAll('[data-route]').forEach(function (link) {
      var route = link.getAttribute('data-route');
      var active = route === event.detail.route ||
        (route === '/clases' && event.detail.route.indexOf('/clases/') === 0) ||
        (route === '/sistemas-del-personaje' && event.detail.route.indexOf('/sistemas-del-personaje/') === 0);
      link.classList.toggle('active', active);
      if (active) { link.setAttribute('aria-current', 'page'); } else { link.removeAttribute('aria-current'); }
    });
    renderContextPanel(event.detail.route);
    actualizarCatalogoObjetos();
  });

  window.GuideRouter.start();
}());
