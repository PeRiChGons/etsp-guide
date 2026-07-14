/* Enrutador hash: mantiene la URL de GitHub Pages y reemplaza solo el contenido central. */
(function () {
  'use strict';

  function currentRoute() {
    var raw = window.location.hash.replace(/^#/, '').split('?')[0];
    return raw && raw.charAt(0) === '/' ? raw.replace(/\/$/, '') || '/inicio' : '/inicio';
  }

  function renderPendingPage(page) {
    var links = page.sections.map(function (title) {
      return '<li><a href="#' + currentRoute() + '?apartado=' + window.slugify(title) + '" data-anchor="' + window.slugify(title) + '">' + title + '</a></li>';
    }).join('');
    var cards = page.sections.map(function (title) {
      var id = window.slugify(title);
      return '<section class="content-card" id="' + id + '"><h2>' + title + '</h2><span class="pending">Contenido pendiente</span></section>';
    }).join('');
    var crumbs = '<a href="#/inicio">Inicio</a>';
    if (page.parent) { crumbs += '<span aria-hidden="true">/</span><a href="#' + (page.parentRoute || '/clases') + '">' + page.parent + '</a>'; }
    crumbs += '<span aria-hidden="true">/</span><span aria-current="page">' + page.title + '</span>';

    return '<div class="breadcrumbs" aria-label="Migas de pan">' + crumbs + '</div>' +
      '<p class="page-kicker">Guía comunitaria en desarrollo</p><h1>' + page.title + '</h1>' +
      '<p class="lead">Esta sección está preparada para incorporar información verificada sin alterar la navegación general de la web.</p>' +
      '<nav class="anchor-nav" aria-label="Apartados de esta página"><strong>En esta página</strong><ul>' + links + '</ul></nav>' +
      '<div class="content-grid">' + cards + '</div>' +
      '<section class="future-zone" aria-labelledby="participacion"><h2 id="participacion">Participación de la comunidad</h2><span class="pending">Contenido pendiente</span><p>Espacio reservado para una futura integración de comentarios o Discord. Todavía no está conectado a ningún servicio.</p></section>';
  }

  function statsRows(items) {
    return items.map(function (name) {
      return '<tr><th scope="row">' + name + '</th><td><span class="confirmed">Nombre confirmado</span></td><td>Descripción detallada pendiente de verificación.</td></tr>';
    }).join('');
  }

  function renderStatsPage(page) {
    var links = page.sections.map(function (title) {
      var id = window.slugify(title);
      return '<li><a href="#/sistemas-del-personaje/stats?apartado=' + id + '">' + title + '</a></li>';
    }).join('');

    return '<div class="breadcrumbs" aria-label="Migas de pan">' +
      '<a href="#/inicio">Inicio</a><span aria-hidden="true">/</span>' +
      '<a href="#/sistemas-del-personaje">Sistemas del personaje</a><span aria-hidden="true">/</span>' +
      '<span aria-current="page">Stats</span></div>' +
      '<p class="page-kicker">Información transcrita del juego</p><h1>Stats</h1>' +
      '<p class="lead">Esta página reúne los nombres observados en las pantallas de estadísticas. No se atribuye ningún efecto que todavía no haya sido contrastado.</p>' +
      '<aside class="verification-note" aria-label="Estado de verificación"><strong>Estado actual:</strong> clasificación y nombres confirmados mediante capturas. Las descripciones y fórmulas se incorporarán después de verificarlas.</aside>' +
      '<nav class="anchor-nav" aria-label="Apartados de esta página"><strong>En esta página</strong><ul>' + links + '</ul></nav>' +
      '<section class="stats-section" id="basic-stats"><h2>Basic Stats</h2><p>Nombres mostrados dentro de la categoría <span lang="en">Basic Stats</span> del juego.</p>' +
      '<div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th scope="col">Nombre</th><th scope="col">Verificación</th><th scope="col">Descripción</th></tr></thead><tbody>' + statsRows(window.STATS_CONTENT.basic) + '</tbody></table></div></section>' +
      '<section class="stats-section" id="special-stats"><h2>Special Stats</h2><p>Nombres mostrados dentro de la categoría <span lang="en">Special Stats</span> del juego.</p>' +
      '<div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th scope="col">Nombre</th><th scope="col">Verificación</th><th scope="col">Descripción</th></tr></thead><tbody>' + statsRows(window.STATS_CONTENT.special) + '</tbody></table></div></section>' +
      '<section class="stats-section verification-method" id="criterio-de-verificacion"><h2>Criterio de verificación</h2><p>Antes de completar cada estadística se comprobarán estos datos:</p><ul><li>Nombre exacto mostrado por el juego.</li><li>Descripción accesible desde el icono de información.</li><li>Valores o fórmulas visibles, sin extrapolaciones.</li><li>Versión o fecha de la captura utilizada.</li></ul></section>' +
      '<section class="future-zone" aria-labelledby="participacion"><h2 id="participacion">Participación de la comunidad</h2><span class="pending">Contenido pendiente</span><p>Espacio reservado para comentarios o Discord. Todavía no está conectado a ningún servicio.</p></section>';
  }

  function renderNotFound() {
    return '<section class="not-found"><p class="page-kicker">Error 404</p><h1>Sección no encontrada</h1><p>La ruta solicitada no existe todavía.</p><a href="#/inicio">Volver al inicio</a></section>';
  }

  function render() {
    var page = window.getPage(currentRoute());
    var main = document.getElementById('contenido');
    main.innerHTML = page ? (page.type === 'stats' ? renderStatsPage(page) : renderPendingPage(page)) : renderNotFound();
    document.title = (page ? page.title + ' · ' : 'Página no encontrada · ') + 'Eternal Sword Pact Guía';
    document.dispatchEvent(new CustomEvent('route:changed', { detail: { route: currentRoute() } }));

    var query = window.location.hash.split('?')[1];
    var params = new URLSearchParams(query || '');
    var anchor = params.get('apartado');
    if (anchor) {
      window.requestAnimationFrame(function () {
        var target = document.getElementById(anchor);
        if (target) { target.scrollIntoView(); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
      });
    } else {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  }

  window.GuideRouter = { start: function () {
    if (!window.location.hash) { window.location.replace('#/inicio'); return; }
    window.addEventListener('hashchange', render);
    render();
  } };
}());
