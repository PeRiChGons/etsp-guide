/* Renderiza las páginas que ya contienen información contrastada del proyecto. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  // Modelos 3D extraídos del cliente. Se muestran únicamente cuando una
  // ficha de objeto está vinculada a un archivo real.
  var MODEL_CATALOG = [
    { key: 'shenlong', names: ['Shenlong'], type: 'Montura', file: 'assets/models/3d/mounts/mount-302131-shenlong.glb' },
    { key: 'fugu', names: ['Fugu'], type: 'Montura', file: 'assets/models/3d/mounts/mount-302220-fugu.glb' },
    { key: 'feijian', names: ['Feijian'], type: 'Montura', file: 'assets/models/3d/mounts/mount-302168-feijian.glb' },
    { key: 'bawanglong', names: ['Bawanglong'], type: 'Montura', file: 'assets/models/3d/mounts/mount-302171-bawanglong.glb' },
    { key: 'shengshi-zijia', names: ['Shengshi Zijia'], type: 'Armadura', file: 'assets/models/3d/armor/waist-210001-shengshizijia.glb' },
    { key: 'shengdun', names: ['Shengdun'], type: 'Armadura', file: 'assets/models/3d/armor/waist-210005-shengdun.glb' },
    { key: 'weapon-1221033', names: ['Weapon 1221033'], type: 'Arma', file: 'assets/models/3d/weapons/weapon-1221033.glb' },
    { key: 'weapon-123149', names: ['Weapon 123149'], type: 'Arma', file: 'assets/models/3d/weapons/weapon-123149.glb', genders: ['Mujer'] },
    { key: 'weapon-124140', names: ['Weapon 124140'], type: 'Arma', file: 'assets/models/3d/weapons/weapon-124140.glb' },
    { key: 'weapon-161101', names: ['Weapon 161101'], type: 'Arma', file: 'assets/models/3d/weapons/weapon-161101.glb' }
  ];

  function modelForItem(item) {
    var names = [item.name, item.id, item.modelKey].filter(Boolean).map(function (value) { return String(value).toLowerCase(); });
    return MODEL_CATALOG.find(function (model) {
      return model.names.some(function (name) { return names.indexOf(name.toLowerCase()) !== -1; });
    }) || null;
  }

  function breadcrumbs(page) {
    var result = '<div class="breadcrumbs" aria-label="Migas de pan"><a href="#/inicio">Inicio</a>';
    if (page.parent) {
      result += '<span aria-hidden="true">/</span><a href="#' + page.parentRoute + '">' + escapeHtml(page.parent) + '</a>';
    }
    if (page.title !== 'Inicio') {
      result += '<span aria-hidden="true">/</span><span aria-current="page">' + escapeHtml(page.title) + '</span>';
    }
    return result + '</div>';
  }

  function anchorNavigation(page) {
    var links = page.sections.map(function (title) {
      return '<li><a href="#' + page.route + '?apartado=' + window.slugify(title) + '">' + escapeHtml(title) + '</a></li>';
    }).join('');
    return '<nav class="anchor-nav" aria-label="Apartados de esta página"><strong>En esta página</strong><ul>' + links + '</ul></nav>';
  }

  function pageHeader(page, kicker, lead, status) {
    return breadcrumbs(page) + '<p class="page-kicker">' + kicker + '</p><h1>' + escapeHtml(page.title) + '</h1>' +
      '<p class="lead">' + lead + '</p>' +
      (status ? '<aside class="verification-note" aria-label="Estado de verificación"><strong>Estado actual:</strong> ' + status + '</aside>' : '') +
      anchorNavigation(page);
  }

  function badge(text, pending) {
    return '<span class="' + (pending ? 'pending' : 'confirmed') + '">' + escapeHtml(text) + '</span>';
  }

  function tags(items, pending) {
    return '<ul class="tag-list">' + items.map(function (item) {
      return '<li class="tag' + (pending ? ' tag-pending' : '') + '">' + escapeHtml(item) + '</li>';
    }).join('') + '</ul>';
  }

  function facts(items) {
    return '<ul class="data-list">' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul>';
  }

  function futureZone() {
    return '<section class="future-zone" aria-labelledby="participacion"><h2 id="participacion">Participación de la comunidad</h2>' +
      badge('Contenido pendiente', true) + '<p>Espacio reservado para comentarios o Discord. Todavía no está conectado a ningún servicio.</p></section>';
  }

  function externalLink(url, label) {
    return '<a class="external-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + '<span class="sr-only"> (se abre en una pestaña nueva)</span></a>';
  }

  function statsRows(items) {
    return items.map(function (name) {
      return '<tr><th scope="row">' + escapeHtml(name) + '</th><td>' + badge('Nombre confirmado', false) + '</td><td>Nombre publicado desde la categoría correspondiente. Descripción, fórmula y efecto exacto pendientes.</td></tr>';
    }).join('');
  }

  function renderStats(page) {
    return pageHeader(
      page,
      'Estadísticas del personaje',
      'Esta página publica los nombres de las estadísticas observados en Basic Stats y Special Stats y separa esos datos de las descripciones que todavía necesitan verificación.',
      'Nombres y categorías publicados. Efectos, valores y fórmulas pendientes de completar.'
    ) +
      '<section class="system-section" id="basic-stats"><h2>Basic Stats</h2><p>Nombres mostrados dentro de la categoría <span lang="en">Basic Stats</span> del juego.</p>' +
      '<div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th scope="col">Nombre</th><th scope="col">Verificación</th><th scope="col">Descripción</th></tr></thead><tbody>' + statsRows(window.STATS_CONTENT.basic) + '</tbody></table></div></section>' +
      '<section class="system-section" id="special-stats"><h2>Special Stats</h2><p>Nombres mostrados dentro de la categoría <span lang="en">Special Stats</span> del juego.</p>' +
      '<div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th scope="col">Nombre</th><th scope="col">Verificación</th><th scope="col">Descripción</th></tr></thead><tbody>' + statsRows(window.STATS_CONTENT.special) + '</tbody></table></div></section>' +
      '<section class="system-section verification-method" id="criterio-de-verificacion"><h2>Criterio de verificación</h2><p>Antes de completar cada estadística se comprobarán estos datos:</p>' +
      facts(['Nombre exacto mostrado por el juego.', 'Descripción accesible desde el icono de información.', 'Valores o fórmulas visibles, sin extrapolaciones.', 'Versión o fecha de la fuente utilizada.']) + '</section>' + futureZone();
  }

  function renderSpiritRoot(page) {
    var data = window.REFERENCE_DATA.spiritRoot;
    var coreCards = data.coreRoots.map(function (root) {
      return '<article class="fact-card"><h3>' + escapeHtml(root.name) + '</h3>' + badge('Elemento confirmado', false) +
        '<p>' + escapeHtml(root.observed) + '</p><strong>Obtención mostrada</strong>' + tags(root.sources, false) + '</article>';
    }).join('');

    return pageHeader(
      page,
      'Sistema Spirit Root',
      'Spirit Root organiza raíces elementales, mejoras, resonancias, sacrificios y núcleos. Los nombres de la interfaz se conservan en inglés para que coincidan con el juego.',
      'Estructura, nombres y acciones visibles publicados. Costes, probabilidades y recomendaciones siguen pendientes.'
    ) +
      '<section class="system-section" id="tipos-de-spirit-root"><h2>Tipos de Spirit Root</h2><p>Tipos documentados dentro del sistema. La lista completa todavía debe revisarse dentro del juego.</p>' + tags(data.observedTypes, false) + '</section>' +
      '<section class="system-section" id="mejoras"><h2>Mejoras</h2><div class="fact-grid"><article class="fact-card"><h3>Acciones principales</h3>' + tags(data.actions, false) + '</article>' +
      '<article class="fact-card"><h3>Comparación de piezas</h3>' + facts(data.comparisonFields) + '<p>Las flechas verdes y rojas indican diferencias al comparar una pieza equipada con otra de la bolsa.</p></article></div></section>' +
      '<section class="system-section split-section" id="fuse"><div><h2>Fuse</h2>' + badge('Función confirmada', false) + '<p>El botón aparece en <span lang="en">Spirit Root Bag</span>. Requisitos, costes y resultado exacto pendientes de documentar.</p></div></section>' +
      '<section class="system-section split-section" id="decompose"><div><h2>Decompose</h2>' + badge('Función confirmada', false) + '<p>La opción aparece en la bolsa. Materiales recuperados y reglas de selección pendientes de verificar.</p></div></section>' +
      '<section class="system-section" id="resonance"><h2>Resonance</h2><div class="fact-grid"><article class="fact-card"><h3>Categorías</h3>' + tags(data.resonanceCategories, false) + '</article>' +
      '<article class="fact-card"><h3>Niveles</h3>' + tags(data.resonanceLevels, false) + '<p>El sistema distingue entre <span lang="en">Activated</span> y <span lang="en">Not Activated</span>.</p></article>' +
      '<article class="fact-card"><h3>Stats mostradas</h3>' + tags(data.resonanceStats, false) + '</article></div></section>' +
      '<section class="system-section" id="sacrifice"><h2>Sacrifice</h2><div class="fact-grid"><article class="fact-card"><h3>Distribución del sistema</h3>' + facts(['Ocho posiciones exteriores.', 'Dos huecos centrales pendientes de documentar.', 'Nivel individual por posición.']) + '</article>' +
      '<article class="fact-card"><h3>Efecto mostrado</h3><p>El primer desbloqueo indica un aumento del <strong>10 %</strong> de las estadísticas del Spirit Root equipado en esa posición.</p><p>La aportación exacta de cada rareza y estrella sigue pendiente de tabla.</p></article></div></section>' +
      '<section class="system-section" id="core-spirit-root"><h2>Core Spirit Root</h2><div class="fact-grid">' + coreCards + '</div></section>' +
      '<section class="system-section" id="obtencion-y-materiales"><h2>Obtención y materiales</h2><div class="fact-grid"><article class="fact-card"><h3>Fragmentos documentados</h3>' + tags(data.fragments, false) + '</article>' +
      '<article class="fact-card"><h3>Actividad relacionada</h3><p><span lang="en">Ancient Ruins</span> aparece como método de obtención para Spirit Root.</p>' + badge('Recompensas exactas pendientes', true) + '</article></div></section>' + futureZone();
  }

  function techniqueDetailCards(items) {
    return items.map(function (item) {
      return '<article class="fact-card"><h3>' + escapeHtml(item.name) + '</h3><p class="item-tier">' + escapeHtml(item.tier) + '</p>' + facts(item.stats) + '</article>';
    }).join('');
  }

  function renderTechnique(page) {
    var data = window.REFERENCE_DATA.technique;
    var specialCards = data.special.map(function (item) {
      return '<article class="fact-card"><h3>' + escapeHtml(item.name) + '</h3>' + badge(item.status, item.status.indexOf('pendiente') !== -1) + facts(item.facts) + '</article>';
    }).join('');

    return pageHeader(
      page,
      'Sistema Technique',
      'Technique organiza libros por plantas y rangos. Cada libro puede aportar estadísticas o desbloquear habilidades especiales, según la ficha correspondiente.',
      'Plantas, nombres, rangos y seis fichas de estadísticas publicados. Costes y obtención completa pendientes.'
    ) +
      '<section class="system-section" id="funcionamiento-general"><h2>Funcionamiento general</h2><div class="fact-grid"><article class="fact-card"><h3>Estructura del sistema</h3>' + facts(['Cinco plantas documentadas: 1F–5F.', 'Cuatro Techniques por planta.', 'Mejora individual mediante Advance.', 'Rangos documentados: T7, T10 y T13.']) + '</article>' +
      '<article class="fact-card"><h3>Bonificación de finalización</h3><p>Al completar algunos rangos se concede <strong>Technique Stats +50 %</strong>.</p><p>No se generaliza este valor a todas las Techniques hasta revisar cada ficha.</p></article></div></section>' +
      '<section class="system-section" id="plantas"><h2>Plantas</h2><p>Plantas visibles en la interfaz:</p>' + tags(data.floors, false) + '</section>' +
      '<section class="system-section" id="techniques-normales"><h2>Techniques normales</h2><p>Fichas con estadísticas completas transcritas:</p><div class="fact-grid">' + techniqueDetailCards(data.detailed) + '</div>' +
      '<details class="name-catalog"><summary>Ver los 20 nombres documentados</summary>' + tags(data.names, false) + '</details></section>' +
      '<section class="system-section" id="techniques-especiales"><h2>Techniques especiales</h2><p>Los libros rojos pueden desbloquear o mejorar habilidades. Solo se marca como P2W aquello confirmado expresamente.</p><div class="fact-grid">' + specialCards + '</div></section>' +
      '<section class="system-section" id="materiales-de-mejora"><h2>Materiales de mejora</h2><div class="fact-grid"><article class="fact-card"><h3>' + escapeHtml(data.material) + '</h3>' + badge('Material confirmado', false) + '<p>Se utiliza en la acción <span lang="en">Advance</span>.</p></article>' +
      '<article class="fact-card"><h3>Obtención documentada</h3><p><span lang="en">' + escapeHtml(data.observedSource) + '</span> es la actividad relacionada con la obtención del material.</p>' + badge('Recompensas exactas pendientes', true) + '</article></div></section>' + futureZone();
  }

  function renderWisp(page) {
    var data = window.REFERENCE_DATA.wisp;

    return pageHeader(
      page,
      'Sistema Wisp',
      'Wisp organiza un Array de criaturas o entidades invocables mediante las opciones Sprite y Sacrifice. La primera pantalla y sus acciones visibles ya están documentadas.',
      'Primera pantalla, valores visibles y acciones publicadas. Funcionamiento completo, costes, probabilidades y efectos detallados pendientes.'
    ) +
      '<section class="system-section" id="vista-general"><h2>Vista general</h2><div class="fact-grid"><article class="fact-card"><h3>Datos visibles</h3>' + facts([
        'Wisp Array Level: ' + data.arrayLevel + '.',
        'Power mostrado: ' + data.power + '.',
        'Progreso de nivel: ' + data.experience + '.',
        data.occupiedSlots + ' posiciones ocupadas y ' + data.emptySlots + ' posiciones vacías en el estado documentado.'
      ]) + '</article><article class="fact-card"><h3>Secciones del sistema</h3>' + tags(data.tabs, false) + '<p>La pestaña <span lang="en">Sprite</span> es la vista inicial documentada.</p></article></div></section>' +
      '<section class="system-section" id="wisp-array"><h2>Wisp Array</h2><p>Cada posición del Array tiene un valor de <span lang="en">Aptitude</span>. Los valores documentados son:</p>' + tags(data.aptitudeValues.map(String), false) + '<aside class="verification-note"><strong>Contenido pendiente:</strong> todavía no se conoce cómo se calcula Aptitude, qué estadísticas aporta cada Wisp ni si todas las posiciones tienen el mismo efecto.</aside></section>' +
      '<section class="system-section" id="sprite-y-summon"><h2>Sprite y Summon</h2><div class="fact-grid"><article class="fact-card"><h3>Acciones disponibles</h3>' + tags(data.actions, false) + '<p>La pantalla de invocación utiliza objetos con cantidad <strong>0/1</strong> en el estado documentado.</p></article><article class="fact-card"><h3>Efecto de apertura</h3><p lang="en">' + escapeHtml(data.summonText) + '</p><p>Abrir el objeto añade un punto de EXP al nivel del Wisp Array. Recompensas y probabilidades siguen pendientes.</p></article></div></section>' +
      '<section class="system-section" id="sacrifice"><h2>Sacrifice</h2>' + badge('Pestaña confirmada', false) + '<p>La pestaña existe, pero su funcionamiento todavía está pendiente de documentar.</p>' + badge('Funcionamiento pendiente', true) + '</section>' +
      '<section class="system-section" id="accesos-relacionados"><h2>Accesos relacionados</h2><p>El sistema enlaza con:</p>' + tags(data.relatedAccess, false) + '<p><span lang="en">Northern Abyss Order</span> mantiene el contador <strong>' + escapeHtml(data.observedCountdown) + '</strong> en el estado documentado. Su finalidad sigue pendiente de confirmar.</p></section>' +
      '<section class="system-section verification-method" id="datos-pendientes"><h2>Datos pendientes</h2><p>Para explicar el sistema con precisión todavía hacen falta estas pantallas:</p>' + tags(data.pendingScreens, true) + '<p>También quedan pendientes los materiales, las formas de obtención, las mejoras, los efectos de cada posición y cualquier parte gratuita o de pago.</p></section>' + futureZone();
  }

  function renderSpirit(page) {
    var data = window.REFERENCE_DATA.spirit;
    var cleanseVideo = data.cleanseVideo;
    var bond = data.bond;
    var treasure = data.treasure;
    var spiritHero = '<section class="spirit-hero" aria-labelledby="spirit-hero-title"><div class="spirit-hero-copy"><p class="page-kicker">Recurso visual del proyecto</p><h2 id="spirit-hero-title">Spirit: Zhuyuan</h2><p>Ilustracion conceptual basada en una captura de referencia. Los nombres, rarezas, estadisticas y efectos confirmados se mantienen como texto editable en esta pagina.</p><span class="pending">Render visual no oficial</span></div><img class="spirit-hero-image" src="assets/images/spirits/zhuyuan-hero-render.png" alt="Render conceptual de Zhuyuan, Spirit de pelo blanco con un gran arma envuelta en fuego"></section>';
    var rarityCards = data.rarities.map(function (group) {
      return '<article class="fact-card"><h3>' + escapeHtml(group.label) + '</h3>' + tags(group.names, false) + '</article>';
    }).join('');
    var bondExamples = bond.examples.map(function (example) {
      return '<article class="fact-card"><h3>' + escapeHtml(example.spirit) + '</h3>' + badge('Bond: ' + example.bond, false) + facts(example.details) + '</article>';
    }).join('');

    return spiritHero + pageHeader(
      page,
      'Sistema Spirit',
      'La interfaz del juego denomina Spirit a este sistema de personajes coleccionables. No es Wisp: ambos conservan páginas y mecánicas separadas.',
      'Quince Spirits, sus pantallas principales y cinco áreas de progresión documentadas. Bond y varias reglas detalladas siguen pendientes por dato, no por página completa.'
    ) +
      '<section class="system-section" id="vista-general"><h2>Vista general</h2><div class="fact-grid"><article class="fact-card"><h3>Áreas del sistema</h3>' + tags(data.tabs, false) + '</article>' +
      '<article class="fact-card"><h3>Estados del Array</h3>' + tags(data.arrayStates, false) + '<p><span lang="en">Battle</span> y <span lang="en">Aid</span> aparecen asociados a las posiciones de despliegue del Array. No se presentan como rarezas ni como categorías del Spirit; su efecto exacto sigue pendiente de confirmación.</p></article>' +
      '<article class="fact-card"><h3>Estadísticas visibles</h3>' + tags(data.visibleStats, false) + '<p>La combinación mostrada cambia entre Spirits.</p></article></div></section>' +
      '<section class="system-section" id="spirits-documentados"><h2>Spirits documentados</h2><p>La clasificación de los Spirits combina rareza o grade (<span lang="en">SR</span>, <span lang="en">SSR</span>, <span lang="en">UR</span>), color y estrellas. La lista no se considera completa hasta revisar todas las variantes disponibles.</p><div class="fact-grid">' + rarityCards + '</div></section>' +
      '<section class="system-section" id="basic-y-upgrade"><h2>Basic y Upgrade</h2><div class="fact-grid"><article class="fact-card"><h3>Basic</h3>' + facts(['Spirit Rating y estadísticas del Spirit.', 'Bonificaciones porcentuales asociadas a sus estadísticas.', 'Spirit Basic Attack y Spirit Skill o Awakening Skill.', 'Role, School, alcance y Evolution Effect visibles al abrir una habilidad.']) + '</article>' +
      '<article class="fact-card"><h3>Upgrade</h3>' + tags(data.upgradeActions, false) + '<p>La pantalla compara los valores actuales con los posteriores a la mejora y avisa de que el progreso se conserva al cambiar el Spirit desplegado.</p></article></div></section>' +
      '<section class="system-section" id="array-y-arraycore"><h2>Array y Arraycore</h2><div class="fact-grid"><article class="fact-card"><h3>Estructura del sistema</h3>' + facts(data.arrayFacts) + '</article>' +
      '<article class="fact-card"><h3>Acciones disponibles</h3>' + tags(data.arrayActions, false) + '<p>La pestaña <span lang="en">Arraycore</span> gestiona piezas con tier y estadísticas, pero todavía falta documentar sus reglas completas.</p></article></div></section>' +
      '<section class="system-section" id="kismet-spirit-treasure"><h2>Kismet / Spirit Treasure</h2><div class="fact-grid"><article class="fact-card"><h3>Pantallas y acciones visibles</h3>' + tags(treasure.tabs, false) + tags(treasure.drawActions, false) + '<p>La pantalla muestra un contador de suerte y registros de premios. No se presenta como un sistema permanente hasta verificar su duración.</p></article>' +
      '<article class="fact-card"><h3>Garantías del sistema</h3>' + tags(treasure.guarantees, false) + '<p>Estas garantías deben comprobarse en la ayuda del juego antes de publicarse como regla general.</p></article>' +
      '<article class="fact-card"><h3>Wisp Voucher</h3>' + badge('Texto visible; relación pendiente', true) + '<p><span lang="en">' + escapeHtml(treasure.voucher) + '</span> aparece en una ventana que pregunta si se quieren gastar 110 para completar el <span lang="en">Treasure Hunt</span>.</p></article></div>' +
      '<h3>Arraycore y evolución</h3>' + tags(treasure.arraycore, false) + facts(treasure.arrayFacts) + '<aside class="verification-note"><strong>Contenido pendiente:</strong> costes, monedas, recompensas completas y relación exacta entre Kismet, Spirit Treasure y Wisp Voucher.</aside></section>' +
      '<section class="system-section" id="evolution"><h2>Evolution</h2>' + facts(data.evolutionFacts) + '<aside class="verification-note"><strong>Límite de la evidencia:</strong> los requisitos cambian según rareza, estrellas y estado del Spirit; no se publica todavía una tabla de costes.</aside></section>' +
      '<section class="system-section" id="bond"><h2>Bond</h2>' + badge('Sistema de afinidad documentado', false) + '<p>Bond es el sistema de afinidad de cada Spirit. Incluye las pestañas <span lang="en">Present</span> y <span lang="en">Biography</span>, rangos de relación y capítulos de historia.</p>' +
      '<div class="fact-grid"><article class="fact-card"><h3>Present</h3>' + tags(bond.actions, false) + tags(bond.intimacyObserved, false) + '<p>La pantalla también muestra estadísticas de referencia y los botones <span lang="en">Quick Upgrade</span> y <span lang="en">Upgrade</span>. Las cifras dependen del Spirit y de la cuenta utilizada.</p></article>' +
      '<article class="fact-card"><h3>Biography</h3>' + tags(bond.biographyFields, false) + tags(bond.chapters, false) + '<p>Los capítulos se despliegan uno a uno y pueden incluir requisitos de <span lang="en">Affinity</span>. No se traduce el texto narrativo ni se presenta como una bonificación jugable.</p></article>' +
      '<article class="fact-card"><h3>Rangos documentados</h3>' + tags(bond.ranks, false) + '<p>Estos rangos forman parte de la progresión de afinidad documentada. No se afirma que sean todos los rangos disponibles.</p></article></div>' +
      '<h3>Ejemplos transcritos</h3><div class="fact-grid">' + bondExamples + '</div>' +
      '<h3>Datos confirmados</h3>' + facts(bond.confirmed) + '<aside class="verification-note"><strong>Contenido pendiente:</strong> faltan los costes, los umbrales completos, los efectos exactos y la forma de conseguir afinidad.</aside></section>' +
      '<section class="system-section" id="cleanse-y-tier-up"><h2>Cleanse y Tier Up</h2><div class="fact-grid"><article class="fact-card"><h3>Aptitudes</h3>' + tags(data.cleanseStats, false) + '</article>' +
      '<article class="fact-card"><h3>Acciones y materiales</h3>' + tags(data.cleanseActions, false) + tags(data.cleanseMaterials, false) + '<p>Cleanse aplica un límite relacionado con estrellas, categoría y tier; la regla completa todavía debe verificarse.</p></article>' +
      '<article class="fact-card"><h3>Ejemplo de funcionamiento</h3>' + badge('Flujo documentado', false) + facts([
        cleanseVideo.spirit + ' · ' + cleanseVideo.rarity + ' · ' + cleanseVideo.tier + '.',
        'Límite utilizado en el ejemplo: ' + cleanseVideo.displayedCap + '.',
        'Spirit Aptitude del ejemplo: ' + cleanseVideo.startingTotal + ' → ' + cleanseVideo.observedTotal + '.',
        'Power del ejemplo: ' + cleanseVideo.startingPower + ' → ' + cleanseVideo.observedPower + '.'
      ]) + '</article></div>' +
      '<h3>Cleanse manual</h3><p>Valores iniciales del ejemplo:</p>' + tags(cleanseVideo.startingAptitudes, false) + facts(cleanseVideo.manualFlow) +
      '<p>En el estado inicial estable, la suma de las cinco aptitudes coincide con <strong>Spirit Aptitude ' + cleanseVideo.startingTotal + '</strong>. El material seleccionado pasa de <strong>' + escapeHtml(cleanseVideo.basicPillCounter) + '</strong> en el ejemplo documentado.</p>' +
      '<h3>Auto Refine y Smart Refinement</h3>' + facts(cleanseVideo.automaticFlow) + '<aside class="verification-note"><strong>Pendiente:</strong> todavía no se explica cómo aumenta el máximo de cada aptitud ni qué condición exacta utiliza Smart Refinement.</aside></section>' +
      '<section class="system-section" id="demoncore-y-pill-array"><h2>Demoncore y Pill Array</h2><div class="fact-grid"><article class="fact-card"><h3>Grupos del sistema</h3>' + tags(data.pillArrayGroups, false) + '<p>Un Pill Array se activa al equipar la cantidad, color y estrellas de Demoncores indicados. Al activarse muestra estadísticas de conjunto.</p></article>' +
      '<article class="fact-card"><h3>Pill Arrays documentados</h3>' + tags(data.pillArrays, false) + '</article>' +
      '<article class="fact-card"><h3>Gestión de Demoncores</h3>' + tags(data.demoncoreActions, false) + '<p>Las piezas abiertas figuran como <span lang="en">Universal</span> y muestran estrellas, estadísticas y Power.</p></article></div></section>' +
      '<section class="system-section verification-method" id="datos-pendientes"><h2>Datos pendientes</h2><p>El material disponible permite documentar la estructura, pero no demuestra todavía estos detalles:</p>' + tags(data.pending.concat(bond.pending), true) + '</section>' + futureZone();
  }

  function renderCatalog(page, data, description) {
    var cards = data.names.map(function (name) {
      return '<article class="catalog-card" id="' + window.slugify(name) + '"><h2>' + escapeHtml(name) + '</h2>' + badge('Nombre publicado', false) + '<p>Nombre documentado en el material del proyecto. La ficha de efectos, mejoras y materiales sigue pendiente.</p></article>';
    }).join('');
    return pageHeader(page, 'Catálogo documentado', description, 'Nombres publicados desde el material disponible. Funcionamiento, mejoras y recomendaciones pendientes de información verificable.') +
      '<section class="system-section verification-method" id="funcionamiento-general"><h2>Funcionamiento general</h2><p>La estructura y el catálogo inicial ya están publicados. La explicación detallada se añadirá cuando se transcriban las pantallas del sistema y se comprueben sus materiales, mejoras y efectos.</p></section>' +
      '<section class="catalog-grid" aria-label="Elementos documentados">' + cards + '</section>' + futureZone();
  }

  function renderActivities(page) {
    var data = window.REFERENCE_DATA.activities;
    var confirmed = data.confirmed.map(function (activity) {
      var media = activity.image
        ? '<img src="' + escapeHtml(activity.image) + '" alt="" loading="lazy">'
        : '<span aria-hidden="true">✦</span>';
      return '<article class="activity-card"><div class="activity-card-media">' + media + '</div><div class="activity-card-body"><h3>' + escapeHtml(activity.name) + '</h3>' + facts(activity.facts) + '</div></article>';
    }).join('');

    return pageHeader(page, 'Actividades del juego', 'Mazmorras, jefes y actividades documentadas a partir de las grabaciones disponibles.', 'Se publica únicamente lo que aparece en una pantalla identificable. Costes, reinicios y tablas completas quedan separados como pendientes.') +
      '<section class="system-section activity-overview" id="vista-general"><h2>Vista general</h2><p>Estas actividades se incorporan al plano porque aparecen en los vídeos de juego. Cada una tendrá después su ficha de recompensas, requisitos y rutas.</p><div class="fact-grid"><article class="fact-card"><h3>Actividades observadas</h3>' + tags(data.observed, false) + '</article><article class="fact-card"><h3>Revisión pendiente</h3>' + tags(data.pending, true) + '</article></div></section>' +
      '<section class="system-section" id="actividades-confirmadas"><h2>Fichas con evidencia visual</h2><div class="activity-grid">' + confirmed + '</div></section>' +
      '<section class="system-section verification-method" id="time-realm-notas"><h2>Cómo se documentará cada actividad</h2>' + facts(['Qué es y qué objetivo tiene.', 'Dónde se entra desde el menú del juego.', 'Qué requisitos, límites y reinicios muestra.', 'Qué recompensas se observan y qué parte sigue pendiente.', 'Qué objetos del catálogo se obtienen en esa actividad.']) + '</section>' + futureZone();
  }

  function renderObjects(page) {
    var data = window.REFERENCE_DATA.objectCatalog;
    var cards = data.entries.map(function (item) {
      var model = modelForItem(item);
      var clientDescription = window.CLIENT_ITEM_TEXT && window.CLIENT_ITEM_TEXT[item.name] ? window.CLIENT_ITEM_TEXT[item.name] : '';
      var description = item.description || clientDescription || item.notes || '';
      var searchable = [item.name, item.aliases || [], item.category, item.source, description].join(' ').toLowerCase();
      var media = item.image
        ? '<img src="' + escapeHtml(item.image) + '" alt="Icono de ' + escapeHtml(item.name) + '" loading="lazy">'
        : '<span class="object-card-pending-icon"><span aria-hidden="true">✦</span><small>Icono pendiente</small></span>';
      return '<article class="object-card" data-object-card tabindex="0" role="button" aria-label="Ver ficha de ' + escapeHtml(item.name) + '" data-object-name="' + escapeHtml(item.name) + '" data-object-image="' + escapeHtml(item.image || '') + '" data-object-detail-image="' + escapeHtml(item.detailImage || '') + '" data-object-category="' + escapeHtml(item.category) + '" data-object-source="' + escapeHtml(item.source || '') + '" data-object-notes="' + escapeHtml(description) + '" data-object-status="' + escapeHtml(item.status || '') + '" data-object-model="' + escapeHtml(model ? model.file : '') + '" data-object-model-type="' + escapeHtml(model ? model.type : '') + '" data-object-model-genders="' + escapeHtml(model && model.genders ? model.genders.join('|') : '') + '" data-object-model-classes="' + escapeHtml(model && model.classes ? model.classes.join('|') : '') + '" data-category="' + escapeHtml(item.category) + '" data-search="' + escapeHtml(searchable) + '">' +
        '<div class="object-card-media"' + (item.image ? '' : ' aria-hidden="true"') + '>' + media + '</div>' +
        '<div class="object-card-body"><h2>' + escapeHtml(item.name) + '</h2></div></article>';
    }).join('');

    return pageHeader(page, 'Buscador de objetos', 'Busca objetos, materiales, equipo, prendas, armas y monturas por nombre, descripción o palabras relacionadas. La ficha muestra la descripción y dónde se obtiene; el visor 3D solo aparece cuando existe un modelo asociado.', null) +
      '<section class="system-section object-search-section" id="buscador-de-objetos"><div class="object-search-controls"><label for="object-search">Buscar por nombre, categoría u obtención</label><input id="object-search" class="object-search-input" type="search" placeholder="Ej.: Talisman, Ancient Ruins, Title…" autocomplete="off"><label for="object-category">Filtrar categoría</label><select id="object-category" class="object-category-select"><option value="all">Todas</option>' + data.categories.map(function (category) { return '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + '</option>'; }).join('') + '</select></div><p id="object-search-count" class="object-search-count"></p><div id="object-catalog-grid" class="object-catalog-grid">' + cards + '</div><p id="object-search-empty" class="verification-note" hidden>No hay objetos que coincidan. Prueba otro nombre o categoría.</p></section>' +
      '<section class="system-section verification-method" id="criterio-del-catalogo"><h2>Criterio del catálogo</h2>' + facts(['Se incluye el nombre solo cuando aparece en una pantalla, captura o vídeo identificado.', 'La obtención se separa entre confirmada, observada o pendiente.', 'Titles y Outfits tendrán fichas propias cuando se graben sus menús y se extraigan sus imágenes.', 'El catálogo crecerá sin duplicar la explicación maestra del sistema al que pertenece cada objeto.']) + '</section>' + futureZone();
  }

  // Muestras 3D exportadas desde los meshes del cliente del juego.
  // El visor tiene un enlace de descarga para navegadores sin WebGL o sin CDN.
  function renderModels3D(page) {
    var modelos = [
      {
        nombre: 'Shenlong',
        tipo: 'Montura',
        archivo: 'assets/models/3d/mounts/mount-302131-shenlong.glb',
        descripcion: 'Mesh exportado del bundle de monturas del cliente.'
      },
      {
        nombre: 'Fugu',
        tipo: 'Montura',
        archivo: 'assets/models/3d/mounts/mount-302220-fugu.glb',
        descripcion: 'Montura detectada en el bundle mod_201127.'
      },
      {
        nombre: 'Feijian',
        tipo: 'Montura',
        archivo: 'assets/models/3d/mounts/mount-302168-feijian.glb',
        descripcion: 'Montura compuesta por dos meshes del bundle mod_302168.'
      },
      {
        nombre: 'Bawanglong',
        tipo: 'Montura',
        archivo: 'assets/models/3d/mounts/mount-302171-bawanglong.glb',
        descripcion: 'Montura compuesta por cuatro meshes del bundle mod_302171.'
      },
      {
        nombre: 'Shengshi Zijia',
        tipo: 'Armadura',
        archivo: 'assets/models/3d/armor/waist-210001-shengshizijia.glb',
        descripcion: 'Pieza de armadura exportada del cliente.'
      },
      {
        nombre: 'Shengdun',
        tipo: 'Armadura',
        archivo: 'assets/models/3d/armor/waist-210005-shengdun.glb',
        descripcion: 'Pieza de cintura detectada en el bundle mod_210005.'
      },
      {
        nombre: 'Weapon 1221033',
        tipo: 'Arma',
        archivo: 'assets/models/3d/weapons/weapon-1221033.glb',
        descripcion: 'Mesh de arma exportado del cliente.'
      },
      {
        nombre: 'Weapon 123149',
        tipo: 'Arma',
        archivo: 'assets/models/3d/weapons/weapon-123149.glb',
        descripcion: 'Mesh de arma exportado del bundle mod_123149.'
      },
      {
        nombre: 'Weapon 124140',
        tipo: 'Arma',
        archivo: 'assets/models/3d/weapons/weapon-124140.glb',
        descripcion: 'Mesh de arma exportado del bundle mod_121228.'
      },
      {
        nombre: 'Weapon 161101',
        tipo: 'Arma',
        archivo: 'assets/models/3d/weapons/weapon-161101.glb',
        descripcion: 'Mesh de arma exportado del bundle mod_121000.'
      }
    ];

    var tarjetas = modelos.map(function (modelo) {
      return '<article class="model-card"><div class="model-card-viewer"><model-viewer src="' + escapeHtml(modelo.archivo) + '" alt="Modelo 3D de ' + escapeHtml(modelo.nombre) + '" camera-controls auto-rotate rotation-per-second="24deg" shadow-intensity="0.8" exposure="1.05" loading="lazy"><p class="model-viewer-fallback">El visor 3D no está disponible en este navegador.</p></model-viewer></div><div class="model-card-body"><p class="page-kicker">' + escapeHtml(modelo.tipo) + '</p><h2>' + escapeHtml(modelo.nombre) + '</h2><p>' + escapeHtml(modelo.descripcion) + '</p><a class="external-link" href="' + escapeHtml(modelo.archivo) + '" target="_blank" rel="noopener noreferrer">Abrir o descargar GLB</a></div></article>';
    }).join('');

    return pageHeader(page, 'Modelos del cliente', 'Muestras 3D preparadas para consultar objetos del juego desde la guía.', null) +
      '<section class="system-section" id="muestras-exportadas"><h2>Muestras exportadas</h2><p>Gira, amplía y desplaza cada modelo. Estas muestras conservan la geometría extraída; la vinculación completa de materiales, texturas y animaciones se añadirá cuando terminemos de mapear los recursos Unity.</p><div class="models-3d-grid">' + tarjetas + '</div></section>' +
      '<section class="system-section" id="como-usar-el-visor"><h2>Cómo usar el visor</h2>' + facts(['Arrastra con el ratón o el dedo para girar.', 'Usa la rueda o el gesto de pellizco para ampliar.', 'Mantén el dispositivo en horizontal si quieres ver más detalle.', 'Si el visor no carga, abre el enlace GLB de la tarjeta.']) + '</section>' +
      '<section class="system-section" id="catalogo-de-meshes"><h2>Catálogo de meshes</h2><p>El índice completo contiene 1.398 meshes detectados en 585 bundles del cliente. El archivo técnico se puede consultar aquí:</p><p><a class="external-link" href="assets/data/model-mesh-index.csv" target="_blank" rel="noopener noreferrer">Abrir índice model-mesh-index.csv</a></p><p>Los originales y las texturas completas se conservan fuera de GitHub para no hacer pesada la web.</p></section>' + futureZone();
  }

  function renderHome(page) {
    var classGallery = '<a class="class-gallery" href="#/clases" aria-label="Abrir la comparativa de clases"><span class="class-gallery-copy"><span class="page-kicker">Recurso visual provisional</span><h2>Clases y estilos de juego</h2><p>Una presentación visual para reconocer cada clase. Las recomendaciones y estadísticas se mantienen en las fichas verificadas.</p></span></a>';
    var links = [
      ['/clases', 'Clases y estilos de juego', 'Comparativa visual provisional'],
      ['/sistemas-del-personaje/stats', 'Stats', '38 nombres clasificados'],
      ['/sistemas-del-personaje/spirit-root', 'Spirit Root', 'Estructura y elementos observados'],
      ['/sistemas-del-personaje/technique', 'Technique', 'Plantas, fichas y materiales'],
      ['/sistemas-del-personaje/swordflight', 'SwordFlight', 'Catálogo preparado'],
      ['/sistemas-del-personaje/zodiac', 'Zodiac Transformations', 'Transformaciones documentadas'],
      ['/sistemas-del-personaje/spirit', 'Spirit', '15 Spirits y sistemas asociados'],
      ['/sistemas-del-personaje/wisp', 'Wisp', 'Primera pantalla documentada'],
      ['/objetos', 'Objetos y obtención', 'Buscador de objetos, materiales y recompensas'],
      ['/actividades-y-mazmorras', 'Actividades y mazmorras', 'Time Realm, Rage Boss y más']
    ].map(function (item) {
      return '<a class="quick-link" href="#' + item[0] + '"><strong>' + item[1] + '</strong><span>' + item[2] + '</span></a>';
    }).join('');

    return breadcrumbs(page) + '<section class="home-hero"><p class="page-kicker">Guía comunitaria no oficial</p><h1>Eternal Sword Pact Guía</h1>' +
      '<p class="lead">Una base organizada para explicar sistemas, clases y progresión usando datos del juego, pruebas directas y fuentes identificables.</p></section>' +
      '<section class="system-section" id="estado-de-la-guia"><h2>Estado de la guía</h2><div class="fact-grid"><article class="fact-card"><h3>Estructura</h3>' + badge('Disponible', false) + '<p>Navegación responsive, rutas directas y páginas maestras.</p></article>' +
      '<article class="fact-card"><h3>Contenido</h3>' + badge('Publicado por evidencia', false) + '<p>Los datos observables ya están disponibles. Las reglas, costes, fórmulas y recomendaciones sin pruebas suficientes quedan señaladas como pendientes.</p></article></div></section>' +
      '<section class="system-section" id="accesos-rapidos"><h2>Accesos rápidos</h2><div class="quick-grid">' + links + '</div></section>' +
      '<section class="system-section verification-method" id="metodo-de-trabajo"><h2>Método de trabajo</h2>' + facts(['Registrar el nombre exacto mostrado en el juego.', 'Transcribir la descripción y los valores visibles.', 'Separar experiencia directa, fuente externa y deducción.', 'Marcar claramente la información todavía pendiente.']) + '</section>' + futureZone();
  }

  function renderProject(page) {
    return pageHeader(page, 'Información del proyecto', 'Cómo se crea, revisa y mantiene Eternal Sword Pact Guía.', null) +
      '<section class="system-section project-block" id="sobre-la-guia"><h2>Sobre la guía</h2><p>Proyecto comunitario para organizar información sobre Eternal Sword Pact en una web accesible desde ordenador, tableta y móvil.</p></section>' +
      '<section class="system-section project-block" id="objetivo"><h2>Objetivo</h2><p>Explicar los sistemas del juego de forma clara, enlazar los temas relacionados y mantener separadas las explicaciones generales de las recomendaciones específicas de cada clase.</p></section>' +
      '<section class="system-section project-block" id="autores"><h2>Autores</h2><p><strong>PeRiChGons</strong>: autor, editor, responsable de las pruebas y aprobación final del contenido.</p><p><strong>ChatGPT de OpenAI</strong>: asistencia en organización, redacción, diseño y programación.</p></section>' +
      '<section class="system-section project-block" id="verificacion-de-la-informacion"><h2>Verificación de la información</h2>' + facts(['Capturas y datos obtenidos dentro del juego.', 'Experiencia directa y pruebas realizadas por el autor.', 'Comparación con fuentes públicas cuando estén disponibles.', 'Información dudosa señalada como pendiente, sin presentarla como un hecho.']) + '</section>' +
      '<section class="system-section project-block" id="fuentes"><h2>Fuentes</h2><p>Las páginas indicarán la procedencia concreta de la información cuando se utilice una fuente externa. “La web” no se considera una referencia suficiente sin identificar la página o publicación.</p></section>' +
      '<section class="system-section project-block" id="investigacion-web"><h2>Investigación web</h2><p><strong>Última revisión:</strong> 14 de julio de 2026.</p><div class="fact-grid"><article class="fact-card"><h3>Fuentes oficiales</h3><p>' + externalLink('https://play.google.com/store/apps/details?id=com.mten.tgp', 'Eternal Sword Pact en Google Play') + '</p><p>' + externalLink('https://apps.apple.com/ph/app/eternal-sword-pact/id6754371626', 'Eternal Sword Pact en App Store') + '</p><p>Confirman el desarrollador, la temática general, las plataformas y las notas públicas de la aplicación. Las notas disponibles no detallan Wisp ni los sistemas internos.</p></article>' +
      '<article class="fact-card"><h3>Fuentes secundarias</h3><p>' + externalLink('https://www.bluestacks.com/blog/game-guides/eternal-sword-pact/esp-beginners-guide-en.html', 'Guía para principiantes de BlueStacks') + '</p><p>' + externalLink('https://www.bluestacks.com/blog/game-guides/eternal-sword-pact/esp-classes-guide-en.html', 'Guía de clases de BlueStacks') + '</p><p>' + externalLink('https://www.bluestacks.com/blog/game-guides/eternal-sword-pact/esp-combat-strategy-guide.html', 'Guía de combate de BlueStacks') + '</p><p>Se utilizan solo para localizar temas que después deben contrastarse dentro del juego.</p></article></div>' +
      '<aside class="verification-note"><strong>Resultado del contraste:</strong> las guías secundarias se contradicen en el tipo de daño y el papel de algunas clases. Por ello, la web no publicará esas afirmaciones como hechos hasta disponer de pruebas directas.</aside><p>Consulta el <a href="docs/INVESTIGACION-WEB.md">registro detallado de búsquedas y decisiones</a>.</p></section>' +
      '<section class="system-section project-block" id="lista-de-pendientes"><h2>Lista de pendientes</h2><p>La guía ya publica nombres, pantallas, acciones y valores observables. Costes, fórmulas, recompensas, reinicios, probabilidades y recomendaciones se mantienen pendientes cuando no hay pruebas suficientes.</p>' + facts(['Estadísticas: descripciones y fórmulas.', 'Spirit Root y Technique: costes, requisitos y recompensas completas.', 'SwordFlight y Zodiac: fichas, mejoras y recomendaciones por clase.', 'Spirit y Wisp: reglas completas de Bond, Cleanse, Tier Up, Arraycore, Sacrifice y pantallas restantes.', 'Clases: habilidades iniciales, escalado y configuraciones PvE/PvP.', 'Equipamiento, Craft, actividades y economía: recetas, costes, recompensas y reinicios.']) + '<p><a href="docs/LISTA-DE-PENDIENTES.md">Abrir la lista completa de pendientes y niveles de evidencia</a>.</p></section>' +
      '<section class="system-section project-block" id="aviso-sobre-contenido-no-oficial"><h2>Aviso sobre contenido no oficial</h2><p>Esta es una guía creada por aficionados y no está afiliada con los desarrolladores o distribuidores de Eternal Sword Pact. Los nombres, marcas e imágenes del juego pertenecen a sus respectivos titulares. El contenido puede requerir cambios después de actualizaciones del juego.</p></section>' + futureZone();
  }

  window.renderGuidePage = function (page) {
    if (page.type === 'home') { return renderHome(page); }
    if (page.type === 'stats') { return renderStats(page); }
    if (page.type === 'spirit-root') { return renderSpiritRoot(page); }
    if (page.type === 'technique') { return renderTechnique(page); }
    if (page.type === 'swordflight') { return renderCatalog(page, window.REFERENCE_DATA.swordFlight, 'Página maestra preparada para documentar el funcionamiento y cada SwordFlight sin duplicar información entre clases.'); }
    if (page.type === 'zodiac') { return renderCatalog(page, window.REFERENCE_DATA.zodiac, 'Página maestra para las Zodiac Transformations documentadas hasta ahora.'); }
    if (page.type === 'spirit') { return renderSpirit(page); }
    if (page.type === 'wisp') { return renderWisp(page); }
    if (page.type === 'objects') { return renderObjects(page); }
    if (page.type === 'activities') { return renderActivities(page); }
    if (page.type === 'project') { return renderProject(page); }
    return null;
  };
}());
