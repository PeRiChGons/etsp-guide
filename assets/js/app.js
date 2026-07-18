/* Controla el menú adaptable, sus niveles desplegables y el estado activo. */
(function () {
  'use strict';

  var navigation = document.getElementById('navigation');
  var contextNavigation = document.getElementById('context-navigation');
  var toggle = document.getElementById('menu-toggle');
  var backdrop = document.getElementById('menu-backdrop');

  function translatedTitle(title) {
    return window.I18n && window.I18n.t ? window.I18n.t('menu.' + window.slugify(title), title) : title;
  }

  function itemMarkup(item, trail, depth) {
    var entry = typeof item === 'string' ? { title: item } : item;
    var id = 'grupo-' + window.slugify(trail.concat(entry.title).join('-'));
    var route = entry.route || null;
    var nearestRoute = trail.slice().reverse().find(function (ancestor) { return ancestor.route; });
    var anchorRoute = nearestRoute ? nearestRoute.route : '/inicio';
    var visibleTitle = translatedTitle(entry.title);
    var label = route ? '<a class="nav-link" href="#' + route + '" data-route="' + route + '">' + visibleTitle + '</a>' : '<a class="nav-link" href="#' + anchorRoute + '?apartado=' + window.slugify(entry.title) + '" data-anchor="' + window.slugify(entry.title) + '">' + visibleTitle + '</a>';
    var expand = entry.children ? '<button class="expand-button" type="button" aria-expanded="' + (depth === 0 ? 'true' : 'false') + '" aria-controls="' + id + '" aria-label="' + (window.I18n ? window.I18n.t('ui.openGroup', 'Desplegar') : 'Desplegar') + ' ' + visibleTitle + '"><span aria-hidden="true">›</span></button>' : '';
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
    return '<li><a class="context-link" href="' + href + '">' + translatedTitle(entry.title) + '</a></li>';
  }

  // Actualiza el panel derecho sin duplicar el contenido de la página central.
  function renderContextPanel(route) {
    var page = window.getPage(route);
    var entry = findMenuEntry(window.GUIDE_MENU, route);
    var title = entry ? entry.title : (page ? page.title : 'Sección');
    var parentRoute = entry && entry.route ? entry.route : route;
    var categoryItems = entry && entry.children ? entry.children : [];
    var pageSections = page && page.sections ? page.sections : [];
    var categoryMarkup = categoryItems.length ? '<section class="context-block"><h2>' + (window.I18n ? window.I18n.t('ui.subcategories', 'Subcategorías') : 'Subcategorías') + '</h2><ul class="context-list">' + categoryItems.map(function (item) { return contextualLink(item, parentRoute); }).join('') + '</ul></section>' : '';
    var sectionMarkup = pageSections.length ? '<section class="context-block"><h2>' + (window.I18n ? window.I18n.t('ui.directAccess', 'Acceso directo') : 'Acceso directo') + '</h2><ul class="context-list">' + pageSections.map(function (section) { return contextualLink(section, route); }).join('') + '</ul></section>' : '';
    var quickMarkup = '<section class="context-block"><h2>' + (window.I18n ? window.I18n.t('ui.quickLinks', 'Enlaces rápidos') : 'Enlaces rápidos') + '</h2><ul class="context-list quick-context-list">' + [
      { title: 'Inicio', route: '/inicio' },
      { title: 'Guía general', route: '/guia-general' },
      { title: 'Sistemas del personaje', route: '/sistemas-del-personaje' },
      { title: 'Objetos y obtención', route: '/objetos' },
      { title: 'Actividades y mazmorras', route: '/actividades-y-mazmorras' },
      { title: 'Clases', route: '/clases' },
      { title: 'Proyecto', route: '/proyecto' }
    ].map(function (item) { return contextualLink(item, '/inicio'); }).join('') + '</ul></section>';

    contextNavigation.innerHTML = '<div class="context-heading"><p class="context-kicker">' + (window.I18n ? window.I18n.t('ui.currentSection', 'Sección actual') : 'Sección actual') + '</p><h1>' + translatedTitle(title) + '</h1><p>' + (window.I18n ? window.I18n.t('ui.exploreApartments', 'Explora sus apartados sin perder de vista el contenido central.') : 'Explora sus apartados sin perder de vista el contenido central.') + '</p></div>' + categoryMarkup + sectionMarkup + quickMarkup;
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

  // Abre una ficha ampliada al pulsar un objeto, como en la ventana descriptiva del juego.
  function obtenerModalObjetos() {
    var modal = document.getElementById('object-detail-modal');
    if (modal) { return modal; }
    document.body.insertAdjacentHTML('beforeend', '<div id="object-detail-modal" class="object-detail-modal" hidden aria-hidden="true"><div class="object-detail-backdrop" data-object-modal-close></div><section class="object-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="object-detail-title"><button class="object-detail-close" type="button" aria-label="Cerrar ficha" data-object-modal-close>×</button><div class="object-detail-media" id="object-detail-media"></div><div class="object-detail-copy"><p class="object-card-category" id="object-detail-category"></p><h2 id="object-detail-title"></h2><p class="object-detail-status" id="object-detail-status"></p><p><strong>Descripción:</strong> <span id="object-detail-description"></span></p><p><strong>Obtención:</strong> <span id="object-detail-source"></span></p><p id="object-detail-notes"></p><div id="object-detail-model-controls" class="object-detail-model-controls" hidden><label><input id="object-detail-model-toggle" type="checkbox"> Ver modelo 3D</label><label id="object-detail-gender-control" hidden>Representación <select id="object-detail-gender"><option>Hombre</option><option>Mujer</option></select></label><label id="object-detail-class-control" hidden>Clase <select id="object-detail-class"><option>Dragon Lancer</option><option>Lunarborn</option><option>Spiritfox</option><option>Sword Sage</option></select></label></div><div id="object-detail-model-viewer" class="object-detail-model-viewer" hidden></div><p class="object-card-evidence" id="object-detail-evidence" hidden></p></div></section></div>');
    return document.getElementById('object-detail-modal');
  }

  function cerrarFichaObjeto() {
    var modal = document.getElementById('object-detail-modal');
    if (!modal) { return; }
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('object-detail-open');
  }

  // Crea el visor solo cuando el usuario lo solicita y la ficha tiene un modelo.
  function actualizarVisor3D(card, mostrar) {
    var contenedor = document.getElementById('object-detail-model-viewer');
    if (!contenedor) { return; }
    contenedor.innerHTML = '';
    var archivo = card.getAttribute('data-object-model');
    if (!mostrar || !archivo) {
      contenedor.hidden = true;
      return;
    }
    var visor = document.createElement('model-viewer');
    visor.setAttribute('src', archivo);
    visor.setAttribute('alt', 'Modelo 3D de ' + (card.getAttribute('data-object-name') || 'objeto'));
    visor.setAttribute('camera-controls', '');
    visor.setAttribute('auto-rotate', '');
    visor.setAttribute('rotation-per-second', '24deg');
    visor.setAttribute('shadow-intensity', '0.8');
    visor.setAttribute('exposure', '1.05');
    contenedor.appendChild(visor);
    contenedor.hidden = false;
  }

  function abrirFichaObjeto(card) {
    var modal = obtenerModalObjetos();
    var image = card.getAttribute('data-object-image');
    var detailImage = card.getAttribute('data-object-detail-image');
    var media = document.getElementById('object-detail-media');
    media.innerHTML = '';
    if (detailImage) {
      var detailElement = document.createElement('img');
      detailElement.className = 'object-detail-screenshot';
      detailElement.src = detailImage;
      detailElement.alt = 'Ficha descriptiva de ' + card.getAttribute('data-object-name');
      media.appendChild(detailElement);
      if (image) {
        var iconElement = document.createElement('img');
        iconElement.className = 'object-detail-icon';
        iconElement.src = image;
        iconElement.alt = 'Icono de ' + card.getAttribute('data-object-name');
        media.appendChild(iconElement);
      }
    } else if (image) {
      var imageElement = document.createElement('img');
      imageElement.className = 'object-detail-icon';
      imageElement.src = image;
      imageElement.alt = 'Icono de ' + card.getAttribute('data-object-name');
      media.appendChild(imageElement);
    } else {
      var pending = document.createElement('span');
      pending.className = 'object-detail-pending';
      pending.textContent = '?';
      media.appendChild(pending);
    }
    document.getElementById('object-detail-category').textContent = card.getAttribute('data-object-category') || '';
    document.getElementById('object-detail-title').textContent = card.getAttribute('data-object-name') || '';
    document.getElementById('object-detail-status').textContent = card.getAttribute('data-object-status') || '?';
    document.getElementById('object-detail-status').hidden = false;
    document.getElementById('object-detail-description').textContent = card.getAttribute('data-object-notes') || '?';
    document.getElementById('object-detail-source').textContent = card.getAttribute('data-object-source') || '?';
    document.getElementById('object-detail-notes').textContent = card.getAttribute('data-object-notes') || '?';
    document.getElementById('object-detail-notes').hidden = false;
    var modelFile = card.getAttribute('data-object-model');
    var modelControls = document.getElementById('object-detail-model-controls');
    var modelToggle = document.getElementById('object-detail-model-toggle');
    var genderControl = document.getElementById('object-detail-gender-control');
    var classControl = document.getElementById('object-detail-class-control');
    var genderValues = (card.getAttribute('data-object-model-genders') || '').split('|').filter(Boolean);
    var classValues = (card.getAttribute('data-object-model-classes') || '').split('|').filter(Boolean);
    modelControls.hidden = !modelFile;
    modelToggle.checked = false;
    genderControl.hidden = genderValues.length < 2;
    classControl.hidden = classValues.length < 2;
    if (genderValues.length > 1) {
      document.getElementById('object-detail-gender').innerHTML = genderValues.map(function (value) { return '<option>' + value + '</option>'; }).join('');
    }
    if (classValues.length > 1) {
      document.getElementById('object-detail-class').innerHTML = classValues.map(function (value) { return '<option>' + value + '</option>'; }).join('');
    }
    modelToggle.onchange = function () { actualizarVisor3D(card, modelToggle.checked); };
    actualizarVisor3D(card, false);
    // La ficha muestra la información del objeto, no el nombre técnico del vídeo de investigación.
    document.getElementById('object-detail-evidence').textContent = '';
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('object-detail-open');
    modal.querySelector('.object-detail-close').focus();
  }

  document.addEventListener('click', function (event) {
    var card = event.target.closest ? event.target.closest('[data-object-card]') : null;
    if (card) { abrirFichaObjeto(card); return; }
    if (event.target.closest && event.target.closest('[data-object-modal-close]')) { cerrarFichaObjeto(); }
  });

  document.addEventListener('keydown', function (event) {
    var card = event.target.closest ? event.target.closest('[data-object-card]') : null;
    if (card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      abrirFichaObjeto(card);
      return;
    }
    if (event.key === 'Escape') { cerrarFichaObjeto(); }
  });

  // Si una ruta de imagen no existe en el repositorio, sustituirla por el
  // marcador visible «?» sin dejar un icono roto en el buscador.
  document.addEventListener('error', function (event) {
    var image = event.target;
    if (!image || image.tagName !== 'IMG' || !image.closest('.object-card-media')) { return; }
    var placeholder = document.createElement('span');
    placeholder.className = 'object-card-pending-icon';
    placeholder.textContent = '?';
    image.replaceWith(placeholder);
  }, true);


  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span:last-child').textContent = open ? (window.I18n ? window.I18n.t('ui.closeMenu', 'Cerrar menú') : 'Cerrar menú') : (window.I18n ? window.I18n.t('ui.openMenu', 'Abrir menú') : 'Abrir menú');
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
