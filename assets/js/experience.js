/*
 * Experiencia visual y páginas finales del rediseño.
 * Mantiene las fuentes en letra pequeña y reserva «?» para datos desconocidos.
 */
(function () {
  'use strict';

  var renderBase = window.renderGuidePage;

  function esc(value) {
    return String(value === undefined || value === null || value === '' ? '?' : value)
      .replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
  }

  function t(key, fallback) {
    return window.I18n && window.I18n.t ? window.I18n.t(key, fallback) : fallback;
  }

  function header(title, kicker, lead) {
    return '<div class="breadcrumbs"><a href="#/inicio">' + esc(t('ui.home', 'Inicio')) +
      '</a><span>/</span><span aria-current="page">' + esc(title) + '</span></div>' +
      '<section class="game-page-heading"><p class="page-kicker">' + esc(kicker) + '</p>' +
      '<h1>' + esc(title) + '</h1><p class="lead">' + esc(lead) + '</p></section>';
  }

  function sources(items) {
    return '<details class="source-footnotes"><summary>' +
      esc(t('ui.sourcesNotes', 'Fuentes y notas')) +
      '</summary><p>' + items.map(esc).join(' · ') + '</p></details>';
  }

  function unknownField(label) {
    return '<div class="system-value"><span>' + esc(label) + '</span><strong>?</strong></div>';
  }

  function routeCard(route, icon, title, description) {
    return '<a class="game-menu-card" href="#' + route + '"><span class="game-menu-icon" aria-hidden="true">' +
      icon + '</span><span><strong>' + esc(title) + '</strong><small>' + esc(description) +
      '</small></span><span class="game-menu-arrow" aria-hidden="true">›</span></a>';
  }

  function renderEquipmentHub() {
    return header(
      t('pages.equipment.title', 'Equipamiento y mejoras'),
      t('pages.equipment.kicker', 'Forja del personaje'),
      t('pages.equipment.lead', 'Gear, Gem y Soul se presentan como sistemas relacionados, pero conservan sus propias funciones y materiales.')
    ) +
      '<section class="game-menu-grid equipment-menu">' +
      routeCard('/equipamiento-y-mejoras/gear', '⚔', 'Gear', 'Piezas, rarezas, Tiers, estrellas, Craft y mejora.') +
      routeCard('/equipamiento-y-mejoras/gem', '◆', 'Gem', 'Gemas, engaste, mejora y estadísticas asociadas.') +
      routeCard('/equipamiento-y-mejoras/soul', '◉', 'Soul', 'Gear Soul, materiales de Melting y resultados disponibles.') +
      routeCard('/objetos?apartado=buscador-de-objetos', '⌕', t('ui.searchObjects', 'Buscar objetos'), 'Busca únicamente objetos, equipo, bienes y materiales.') +
      '</section>' +
      '<section class="ornate-panel"><h2>' + esc(t('pages.equipment.buildTitle', 'Cómo usar esta sección')) +
      '</h2><div class="system-value-grid">' +
      unknownField('Prioridad universal') + unknownField('Mejor pieza universal') +
      unknownField('Coste total') + unknownField('Condición de desbloqueo') +
      '</div><p>' + esc(t('pages.equipment.buildCopy', 'Las decisiones dependen de la clase, la pieza y el modo de juego. La guía no inventa una configuración universal cuando los datos no la demuestran.')) +
      '</p></section>' +
      sources(['Configuraciones de equipo, objetos y relaciones extraídas del cliente Google Play/LDPlayer.', 'LDStore se conserva como versión separada.']);
  }

  function renderGear() {
    return header('Gear', 'Equipamiento', 'Consulta las piezas y sus sistemas de rareza, Tier, estrellas, Craft y mejora.') +
      '<section class="equipment-workbench">' +
      '<nav class="equipment-tabs" aria-label="Secciones de Gear">' +
      '<a class="active" href="#/equipamiento-y-mejoras/gear">Gear</a>' +
      '<a href="#/equipamiento-y-mejoras/gem">Gem</a>' +
      '<a href="#/equipamiento-y-mejoras/soul">Soul</a></nav>' +
      '<div class="gear-slots" aria-label="Ranuras de equipo">' +
      ['Weapon', 'Helmet', 'Armor', 'Bracers', 'Belt', 'Boots', 'Necklace', 'Ring', 'Talisman', 'Accessory'].map(function (name) {
        return '<button class="gear-slot" type="button"><span>?</span><strong>' + esc(name) + '</strong></button>';
      }).join('') + '</div>' +
      '<div class="ornate-panel"><h2>Construcción de Gear</h2><p>Selecciona una pieza para consultar sus datos disponibles. Cuando una estadística, procedencia o coste no está demostrado, se muestra como <strong>?</strong>.</p>' +
      '<div class="system-value-grid">' + unknownField('Mejor Tier') + unknownField('Estrellas recomendadas') +
      unknownField('Craft recomendado') + unknownField('Prioridad por clase') + '</div></div></section>' +
      sources(['Catálogo de objetos y equipo del cliente.', 'Las recomendaciones por clase sólo se publicarán cuando exista evidencia suficiente.']);
  }

  function renderGem() {
    return header('Gem', 'Equipamiento', 'Las gemas pueden engastarse en Gear para aportar las estadísticas correspondientes.') +
      '<section class="equipment-workbench"><nav class="equipment-tabs" aria-label="Secciones de Gear">' +
      '<a href="#/equipamiento-y-mejoras/gear">Gear</a><a class="active" href="#/equipamiento-y-mejoras/gem">Gem</a>' +
      '<a href="#/equipamiento-y-mejoras/soul">Soul</a></nav>' +
      '<div class="gem-board"><div class="gem-core">◆</div><div class="gem-ring">' +
      ['ATK', 'HP', 'DEF', 'CRIT', 'TEN', 'PEN'].map(function (name) {
        return '<button type="button" class="gem-node"><span>?</span><strong>' + name + '</strong></button>';
      }).join('') + '</div></div>' +
      '<div class="ornate-panel"><h2>Uso</h2><p>El cliente define una gema genérica como un objeto imbuido con aura sagrada que puede engastarse en el equipo para obtener estadísticas.</p>' +
      '<div class="system-value-grid">' + unknownField('Combinación óptima') + unknownField('Coste de mejora') +
      unknownField('Nivel máximo') + unknownField('Desbloqueo') + '</div></div></section>' +
      sources(['Objeto 38050000 “Gem” del catálogo inglés del cliente.', 'Los valores que dependen de la pieza o del servidor permanecen como ?.']);
  }

  function renderSoul() {
    return header('Soul', 'Equipamiento', 'Gear Soul reúne las funciones y materiales relacionados con las almas de equipo.') +
      '<section class="equipment-workbench"><nav class="equipment-tabs" aria-label="Secciones de Gear">' +
      '<a href="#/equipamiento-y-mejoras/gear">Gear</a><a href="#/equipamiento-y-mejoras/gem">Gem</a>' +
      '<a class="active" href="#/equipamiento-y-mejoras/soul">Soul</a></nav>' +
      '<div class="soul-altar"><div class="soul-orbit soul-orbit-one"></div><div class="soul-orbit soul-orbit-two"></div><span>魂</span></div>' +
      '<div class="ornate-panel"><h2>Gear Soul</h2><p>El catálogo contiene configuraciones específicas de Gear Soul y un material llamado <strong>Melting Gemstone</strong>, descrito para fundir Gear Souls.</p>' +
      '<div class="system-value-grid">' + unknownField('Resultado exacto de Melting') + unknownField('Cantidad necesaria') +
      unknownField('Bonificación obtenida') + unknownField('Desbloqueo') + '</div></div>' +
      '<aside class="rumor-note"><strong>Rumor:</strong> se ha observado que esta función aparece junto a equipo Tier 18, alrededor del nivel 900 o tras una actualización del servidor. La condición exacta es <strong>?</strong>.</aside>' +
      '</section>' +
      sources(['data_equip_soul__soul.', 'Objeto 107030001 “Melting Gemstone”.', 'La condición exacta de apertura no está demostrada.']);
  }

  var outfits = [
    {
      name: 'Wing 304230 · pieza S009',
      model: 'assets/models/3d/catalog/outfits/mod_304230-Wing_304230_zhanjia_plane_S009-9036317337488993697.glb'
    },
    {
      name: 'Wing 304230 · pieza S001',
      model: 'assets/models/3d/catalog/outfits/mod_304230-Wing_304230_zhanjia_plane_S001-910791925822239619.glb'
    },
    {
      name: 'Wing 304226 · pieza S002',
      model: 'assets/models/3d/catalog/outfits/mod_304226-Wing_304226_gongting_plane_S002--526549554286043087.glb'
    },
    {
      name: 'Wing 304131 · pieza S004',
      model: 'assets/models/3d/catalog/outfits/mod_304131-Wing_304131_shousong_01_plane_S004-6118990226874074986.glb'
    },
    {
      name: 'Waist 210005 · pieza',
      model: 'assets/models/3d/catalog/outfits/mod_210005-Waist_210005_shengdun-8838500452914660415.glb'
    },
    {
      name: 'Waist 210001 · pieza',
      model: 'assets/models/3d/catalog/outfits/model_208001-Waist_210001_shengshizijia-6910284487743702333.glb'
    }
  ];

  function renderOutfits() {
    var first = outfits[0];
    return header('Outfits', 'Vestidor 3D', 'Gira, acerca y examina las piezas cuya relación visual está disponible. Una pieza no se presenta como conjunto completo.') +
      '<section class="outfit-studio" id="visor-3d"><div class="outfit-stage">' +
      '<div class="outfit-stage-halo"></div><model-viewer id="outfit-viewer" src="' + esc(first.model) +
      '" alt="' + esc(first.name) + '" camera-controls auto-rotate rotation-per-second="18deg" shadow-intensity="1" exposure="1.15">' +
      '<div class="model-loading" slot="poster">Cargando modelo 3D…</div></model-viewer>' +
      '<div class="outfit-stage-caption"><span>Pieza seleccionada</span><strong id="outfit-name">' + esc(first.name) +
      '</strong></div></div><aside class="outfit-catalog"><h2>Piezas disponibles</h2><div class="outfit-list">' +
      outfits.map(function (item, index) {
        return '<button type="button" class="outfit-option' + (index === 0 ? ' active' : '') +
          '" data-outfit-model="' + esc(item.model) + '" data-outfit-name="' + esc(item.name) +
          '"><span class="outfit-option-preview">3D</span><span><strong>' + esc(item.name) +
          '</strong><small>Clase: ? · Variante: ? · Obtención: ?</small></span></button>';
      }).join('') + '</div></aside></section>' +
      '<section class="ornate-panel"><h2>Sobre la reconstrucción</h2><p>El visor utiliza la geometría recuperada. Los shaders, partículas, animaciones, cabello y transparencias pueden diferir del juego. Sólo se unen piezas cuando la relación está demostrada.</p></section>' +
      sources(['Modelos GLB derivados de los recursos extraídos.', 'Relaciones Surface → carrera → resource_id y pertenencia al bundle.', 'Las piezas sin relación completa no se muestran como Outfit completo.']);
  }

  function renderCommunity() {
    return header(
      t('pages.community.title', 'Comunidad'),
      t('pages.community.kicker', 'Jugadores de Eternal Sword Pact'),
      t('pages.community.lead', 'Registra tus personajes y conversa en el chat propio de la guía.')
    ) +
      '<section class="game-menu-grid">' +
      routeCard('/comunidad', '♙', t('pages.community.profile', 'Perfil de jugador'), t('pages.community.profileCopy', 'Nombre del personaje, clase, Reino, servidor e idioma.')) +
      routeCard('/clases', '⚔', t('menu.clases', 'Clases'), t('pages.community.classesCopy', 'Consulta habilidades y construcciones disponibles.')) +
      routeCard('/objetos', '◇', t('menu.objetos-y-obtencion', 'Objetos y obtención'), t('ui.searchObjects', 'Buscar objetos')) +
      '</section>' +
      '<section class="ornate-panel"><h2>' + esc(t('pages.community.accessTitle', 'Acceso y privacidad')) +
      '</h2><p>' + esc(t('pages.community.accessCopy', 'La guía y las conversaciones pueden leerse sin cuenta. Para guardar personajes o escribir se utiliza un enlace seguro enviado por correo. La web no administra contraseñas.')) +
      '</p></section>';
  }

  function decorate(html, page) {
    if (!html) { return html; }
    if (html.indexOf('source-footnotes') !== -1 || (page && page.route === '/proyecto')) { return html; }
    return html + sources([
      'Cliente Google Play/LDPlayer y catálogos semánticos de la guía.',
      'LDStore se mantiene como versión separada.',
      'Los campos desconocidos se muestran como ?.'
    ]);
  }

  window.renderGuidePage = function (page) {
    var route = page && page.route ? page.route : (window.location.hash.replace(/^#/, '').split('?')[0] || '/inicio');
    if (route === '/equipamiento-y-mejoras') { return renderEquipmentHub(); }
    if (route === '/equipamiento-y-mejoras/gear') { return renderGear(); }
    if (route === '/equipamiento-y-mejoras/gem') { return renderGem(); }
    if (route === '/equipamiento-y-mejoras/soul') { return renderSoul(); }
    if (route === '/objetos/outfits') { return renderOutfits(); }
    if (route === '/comunidad') { return renderCommunity(); }
    return decorate(renderBase ? renderBase(page) : '', page);
  };

  document.addEventListener('click', function (event) {
    var option = event.target.closest ? event.target.closest('[data-outfit-model]') : null;
    if (!option) { return; }
    var viewer = document.getElementById('outfit-viewer');
    var name = document.getElementById('outfit-name');
    if (!viewer || !name) { return; }
    viewer.src = option.getAttribute('data-outfit-model');
    viewer.alt = option.getAttribute('data-outfit-name');
    name.textContent = option.getAttribute('data-outfit-name');
    document.querySelectorAll('[data-outfit-model]').forEach(function (button) {
      button.classList.toggle('active', button === option);
    });
  });
}());
