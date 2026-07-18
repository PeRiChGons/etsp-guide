/*
 * Capa de implementación de la guía.
 *
 * Usa los catálogos extraídos como fuente de las fichas visibles. Los valores
 * que no existen en los archivos se representan con «?»; no se crean nombres,
 * recompensas ni relaciones nuevas desde el código de la interfaz.
 */
(function () {
  'use strict';

  var renderAnterior = window.renderGuidePage;
  var datos = {
    objetos: [],
    bienes: [],
    mazmorras: [],
    monstruos: [],
    habilidades: [],
    iconosHabilidad: [],
    estadisticas: [],
    zodiac: [],
    pvp: [],
    cargado: false,
    error: ''
  };
  window.IMPLEMENTATION_DATA = datos;

  function escapeHtml(value) {
    return String(value === undefined || value === null || value === '' ? '?' : value)
      .replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
  }

  function attr(value) {
    return escapeHtml(value).replace(/\n/g, ' ');
  }

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var cell = '';
    var quoted = false;
    for (var i = 0; i < text.length; i += 1) {
      var character = text.charAt(i);
      var next = text.charAt(i + 1);
      if (character === '"' && quoted && next === '"') {
        cell += '"';
        i += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        row.push(cell);
        cell = '';
      } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && next === '\n') { i += 1; }
        row.push(cell);
        if (row.some(function (value) { return value !== ''; })) { rows.push(row); }
        row = [];
        cell = '';
      } else {
        cell += character;
      }
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) { return []; }
    var headers = rows.shift().map(function (header) { return header.replace(/^\uFEFF/, '').trim(); });
    return rows.map(function (values) {
      var record = {};
      headers.forEach(function (header, index) { record[header] = (values[index] || '').trim(); });
      return record;
    });
  }

  function readCsv(file) {
    return fetch('assets/data/implementacion/' + file, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) { throw new Error(file + ' (' + response.status + ')'); }
        return response.text();
      })
      .then(parseCsv);
  }

  function baseName(path) {
    return String(path || '').split(/[\\/]/).pop();
  }

  function imagePath(category, path) {
    var file = baseName(path);
    if (!file) { return ''; }
    if (String(path).indexOf('assets/') === 0) { return path; }
    var folder = {
      'objects-equipment': 'objects-equipment',
      'outfits-fashion': 'outfits-fashion',
      'spirit-wisp': 'spirit-wisp',
      titles: 'titles',
      swordflight: 'swordflight',
      skills: 'skills',
      dungeons: 'dungeons',
      'pvp-alliance': 'pvp-alliance',
      shops: 'shops'
    }[category] || category || 'objects-equipment';
    return 'assets/images/game-data/' + folder + '/' + file;
  }

  function text(value) {
    return String(value || '').trim();
  }

  function synonyms(value) {
    var source = text(value).toLowerCase();
    var result = ['objeto', 'item', 'recurso'];
    if (/bag|pack|box|chest|container|voucher|card|vase|glass|cup|goblet/.test(source)) {
      result.push('bolsa', 'cofre', 'caja', 'paquete', 'recipiente', 'tarjeta', 'vale', 'vaso', 'utensilio', 'cristalería');
    }
    if (/stone|crystal|shard|essence|core|gem/.test(source)) { result.push('piedra', 'cristal', 'fragmento', 'esencia', 'núcleo', 'gema'); }
    if (/outfit|dress|robe|fashion|costume|headdress/.test(source)) { result.push('ropa', 'atuendo', 'vestido', 'prenda', 'disfraz', 'sombrero'); }
    if (/mount|beast|dragon|feijian|shenlong|fugu/.test(source)) { result.push('montura', 'cabalgadura', 'bestia', 'vehículo'); }
    if (/sword|blade|spear|bow|weapon|staff|dagger|lance/.test(source)) { result.push('arma', 'espada', 'lanza', 'arco', 'hoja', 'bastón'); }
    if (/talisman|charm|amulet/.test(source)) { result.push('talismán', 'amuleto', 'reliquia', 'encantamiento'); }
    return result.join(' ');
  }

  function normalizeObjects(rows) {
    var allowed = {
      'objects-equipment': 'Objetos y equipo',
      'outfits-fashion': 'Outfits',
      titles: 'Titles',
      'spirit-wisp': 'Spirit / Wisp',
      'item-source': 'Fuentes de objetos'
    };
    return rows.filter(function (row) { return allowed[row.categoria]; }).map(function (row) {
      var name = text(row.nombre_publicado) || text(row.nombre_interno) || '?';
      var description = text(row.descripcion) || '?';
      var source = text(row.fuente_obtencion) || '?';
      var aliases = [name, row.nombre_interno, row.categoria, description, source, synonyms(name + ' ' + row.nombre_interno)].join(' ');
      return {
        id: text(row.id_registro) || '?',
        name: name,
        category: allowed[row.categoria],
        rawCategory: row.categoria,
        description: description,
        source: source,
        status: text(row.estado) || '?',
        bundle: text(row.bundle_origen) || '?',
        image: imagePath(row.categoria, row.icono_relativo),
        aliases: aliases
      };
    });
  }

  function normalizeGoods(rows) {
    return rows.filter(function (row) { return text(row.nombre) && !/^Advanced$/i.test(text(row.nombre)); }).map(function (row) {
      var name = text(row.nombre) || '?';
      return {
        id: 'goods-' + (text(row.id) || '?'),
        name: name,
        category: 'Goods / materiales',
        description: text(row.descripcion) || '?',
        source: text(row.source_names) || '?',
        status: 'Ficha del cliente',
        bundle: text(row.bundle) || '?',
        image: text(row.icono_relativo) || '',
        aliases: [name, row.descripcion, row.source_names, synonyms(name)].join(' ')
      };
    });
  }

  function cardData(item) {
    var searchable = [item.name, item.id, item.category, item.description, item.source, item.aliases].join(' ');
    var media = item.image
      ? '<img src="' + attr(item.image) + '" alt="Icono de ' + attr(item.name) + '" loading="lazy">'
      : '<span class="object-card-pending-icon" aria-label="Imagen no disponible">?</span>';
    return '<article class="object-card" data-object-card tabindex="0" role="button" aria-label="Ver ficha de ' + attr(item.name) + '"' +
      ' data-object-name="' + attr(item.name) + '" data-object-image="' + attr(item.image) + '" data-object-detail-image=""' +
      ' data-object-category="' + attr(item.category) + '" data-object-source="' + attr(item.source) + '"' +
      ' data-object-notes="' + attr(item.description) + '" data-object-id="' + attr(item.id) + '" data-object-model=""' +
      ' data-object-status="' + attr(item.status) + '" data-category="' + attr(item.category) + '" data-search="' + attr(searchable) + '">' +
      '<div class="object-card-media">' + media + '</div><div class="object-card-body"><h2>' + escapeHtml(item.name) + '</h2><p>' + escapeHtml(item.category) + '</p></div></article>';
  }

  function breadcrumbs(title) {
    return '<div class="breadcrumbs" aria-label="Migas de pan"><a href="#/inicio">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">' + escapeHtml(title) + '</span></div>';
  }

  function pageHeader(title, kicker, lead) {
    return breadcrumbs(title) + '<p class="page-kicker">' + escapeHtml(kicker) + '</p><h1>' + escapeHtml(title) + '</h1><p class="lead">' + escapeHtml(lead) + '</p>';
  }

  function fields(entries) {
    return '<dl class="detail-fields">' + entries.map(function (entry) { return '<div class="detail-field"><dt>' + escapeHtml(entry[0]) + '</dt><dd>' + escapeHtml(entry[1]) + '</dd></div>'; }).join('') + '</dl>';
  }

  function entity(title, description, source, icon, image) {
    return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + attr(title) + '" data-detail-description="' + attr(description) + '" data-detail-source="' + attr(source) + '" data-detail-image="' + attr(image || '') + '"><span class="interactive-card-icon">' + (image ? '<img src="' + attr(image) + '" alt="" loading="lazy">' : (icon || '?')) + '</span><span><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(description) + '</small></span><span class="interactive-card-arrow">+</span></button>';
  }

  function systemCards(items, icon) {
    return '<div class="interactive-grid">' + items.map(function (item) { return entity(item.name || item, item.description || '?', item.source || '?', icon || '✦', item.image); }).join('') + '</div>';
  }

  function renderHome() {
    var counts = datos;
    return '<section class="hero-dashboard"><div class="hero-copy"><p class="page-kicker">Guía comunitaria</p><h1>Eternal Sword Pact Guía</h1><p class="lead">Ayuda práctica para conocer el juego, construir cada clase y localizar objetos, sistemas, actividades y recompensas.</p><div class="hero-actions"><a class="button button-primary" href="#/clases">Ver clases</a><a class="button button-secondary" href="#/objetos?apartado=buscador-de-objetos">Buscar objetos</a></div></div><div class="hero-stats">' +
      fields([['Objetos consultables', counts.objetos.length || '?'], ['Mazmorras catalogadas', counts.mazmorras.length || '?'], ['Monstruos registrados', counts.monstruos.length || '?'], ['Habilidades con evidencia', counts.habilidades.length || '?']]) + '</div></section>' +
      '<section class="system-section" id="accesos"><h2>Accesos directos</h2><div class="interactive-grid">' +
      '<a class="interactive-card route-card" href="#/sistemas-del-personaje/stats"><span class="interactive-card-icon">📊</span><span><strong>Stats</strong><small>Campos de Basic Stats y Special Stats.</small></span><span class="interactive-card-arrow">→</span></a>' +
      '<a class="interactive-card route-card" href="#/sistemas-del-personaje/zodiac"><span class="interactive-card-icon">☯</span><span><strong>Zodiac y Glyph</strong><small>Transformaciones, huecos y evidencias extraídas.</small></span><span class="interactive-card-arrow">→</span></a>' +
      '<a class="interactive-card route-card" href="#/actividades-y-mazmorras"><span class="interactive-card-icon">🗺️</span><span><strong>Actividades y dungeons</strong><small>Mapas e iconos registrados en el cliente.</small></span><span class="interactive-card-arrow">→</span></a>' +
      '<a class="interactive-card route-card" href="#/proyecto"><span class="interactive-card-icon">📚</span><span><strong>Fuentes y catálogo</strong><small>Cómo se han reunido y relacionado los datos.</small></span><span class="interactive-card-arrow">→</span></a>' +
      '</div></section>';
  }

  function renderObjects() {
    var entries = datos.objetos.concat(datos.bienes);
    var categories = entries.map(function (item) { return item.category; }).filter(function (value, index, list) { return list.indexOf(value) === index; }).sort();
    var cards = entries.map(cardData).join('');
    return pageHeader('Objetos y obtención', 'Buscador de objetos', 'Busca objetos, materiales, equipo, prendas, Titles, Spirits y recompensas. Las mazmorras y los monstruos tienen su apartado propio y no aparecen aquí.') +
      '<section class="system-section object-search-section" id="buscador-de-objetos"><div class="object-search-controls"><label for="object-search">Buscar por nombre, sinónimo, categoría o procedencia</label><input id="object-search" class="object-search-input" type="search" placeholder="Ej.: vaso, recipiente, cristal, montura, Spirit Root…" autocomplete="off"><label for="object-category">Categoría</label><select id="object-category" class="object-category-select"><option value="all">Todas</option>' + categories.map(function (category) { return '<option value="' + attr(category) + '">' + escapeHtml(category) + '</option>'; }).join('') + '</select></div><p id="object-search-count" class="object-search-count">' + entries.length + ' objetos catalogados</p><div id="object-catalog-grid" class="object-catalog-grid">' + cards + '</div><p id="object-search-empty" class="verification-note" hidden>No hay objetos que coincidan.</p></section>' +
      '<section class="system-section" id="ficha-de-objeto"><h2>Qué muestra cada ficha</h2>' + fields([['Nombre', 'Nombre visible o nombre interno'], ['Descripción', 'Texto del cliente o ?'], ['Obtención', 'Fuente registrada o ?'], ['Imagen', 'Icono extraído o ?'], ['ID', 'Identificador del catálogo']]) + '</section>';
  }

  function renderStats() {
    var rows = datos.estadisticas;
    if (!rows.length && window.STATS_CONTENT) {
      rows = (window.STATS_CONTENT.basic || []).concat(window.STATS_CONTENT.special || []).map(function (name) { return { campo: name, descripcion_en: '?' }; });
    }
    var table = rows.map(function (row) { return '<tr><th scope="row">' + escapeHtml(row.campo || '?') + '</th><td>' + escapeHtml(row.campo || '?') + '</td><td>' + escapeHtml(row.descripcion_en || '?') + '</td><td>?</td><td>?</td></tr>'; }).join('');
    return pageHeader('Stats', 'Sistemas del personaje', 'Campos detectados en Basic Stats y Special Stats. El término del juego se conserva y cada ficha permite ampliar la información.') +
      '<section class="system-section" id="basic-stats"><h2>Basic Stats</h2><div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th>Campo</th><th>Nombre publicado</th><th>Descripción del cliente</th><th>Fórmula</th><th>Efecto exacto</th></tr></thead><tbody>' + table + '</tbody></table></div></section>' +
      '<section class="system-section" id="special-stats"><h2>Special Stats</h2><p>Los campos disponibles se muestran con el mismo modelo; la ficha se completa cuando existe descripción o fórmula independiente.</p><div class="interactive-grid">' + rows.map(function (row) { return entity(row.campo || '?', row.descripcion_en || '?', row.fuente || '?', '📊'); }).join('') + '</div></section>';
  }

  function renderZodiac() {
    var rows = datos.zodiac;
    var unique = {};
    rows = rows.filter(function (row) { var key = [row.tipo, row.nombre, row.descripcion].join('|'); if (unique[key]) { return false; } unique[key] = true; return true; });
    var entries = rows.map(function (row) { return { name: row.nombre || row.tipo || '?', description: row.descripcion || '?', source: row.fuente || '?', image: '' }; });
    return pageHeader('Zodiac Transformations', 'Sistema Zodiac', 'Interfaz de transformaciones y Glyph detectada en los archivos del juego. Los huecos sin ficha legible permanecen visibles como «?».') +
      '<section class="system-section zodiac-interface" id="zodiac-huecos"><h2>Huecos de transformación</h2><div class="zodiac-slot-grid">' + ['Slot 1', 'Slot 2', 'Slot 3', 'Glyph', 'Transform', 'Skill change'].map(function (slot) { return '<button type="button" class="zodiac-slot" data-entity-detail data-detail-title="' + attr(slot) + '" data-detail-description="Compatible: ? · Atributos: ? · Requisitos: ?" data-detail-source="Zodiac: archivos del cliente" data-detail-image=""><span>?</span><strong>' + escapeHtml(slot) + '</strong></button>'; }).join('') + '</div></section>' +
      '<section class="system-section" id="zodiac-catalog"><h2>Transformaciones, Glyph y evidencias</h2>' + systemCards(entries, '☯') + '</section>';
  }

  function renderTechnique() {
    var reference = window.REFERENCE_DATA && window.REFERENCE_DATA.technique ? window.REFERENCE_DATA.technique : { names: [], detailed: [], special: [] };
    var items = (reference.detailed || []).map(function (row) { return { name: row.name, description: (row.stats || []).join(' · '), source: 'Technique: ficha observada' }; });
    (reference.special || []).forEach(function (row) { items.push({ name: row.name, description: (row.facts || []).join(' · '), source: row.status || '?' }); });
    (reference.names || []).forEach(function (name) { if (!items.some(function (item) { return item.name === name; })) { items.push({ name: name, description: '?', source: 'Technique' }); } });
    return pageHeader('Technique', 'Sistema del personaje', 'Libros y habilidades de Technique extraídos de las pantallas y del cliente.') +
      '<section class="system-section" id="plantas"><h2>Plantas y rangos</h2>' + fields([['Plantas observadas', (reference.floors || []).join(', ') || '?'], ['Rangos', (reference.observedTiers || []).join(', ') || '?'], ['Material', reference.material || '?'], ['Fuente observada', reference.observedSource || '?']]) + '</section>' +
      '<section class="system-section" id="technique-catalog"><h2>Techniques registradas</h2>' + systemCards(items, '📜') + '</section>';
  }

  function renderSkill() {
    var grouped = {};
    datos.habilidades.forEach(function (row) {
      var className = text(row.clase_detectada) || '?';
      if (!grouped[className]) { grouped[className] = []; }
      var value = text(row.cadena) || '?';
      if (grouped[className].indexOf(value) === -1) { grouped[className].push(value); }
    });
    var blocks = Object.keys(grouped).sort().map(function (className) {
      return '<section class="system-section" id="skill-' + (window.slugify ? window.slugify(className) : 'clase') + '"><h2>' + escapeHtml(className) + '</h2><div class="interactive-grid">' + grouped[className].map(function (skill) { return entity(skill, 'Descripción, daño, recarga y efectos: ?', 'class-skill-evidence.csv', '✨'); }).join('') + '</div></section>';
    }).join('');
    return pageHeader('Skill', 'Sistema de habilidades', 'Nombres y evidencias de habilidades localizados en los archivos del cliente, agrupados por clase cuando existe una detección segura.') +
      '<section class="system-section" id="skill-resumen">' + fields([['Evidencias de habilidad', datos.habilidades.length || '?'], ['Iconos de Skill', datos.iconosHabilidad.length || '?'], ['Daño inicial', '?'], ['Recarga', '?'], ['Efecto completo', '?']]) + '</section>' + blocks;
  }

  function renderSwordFlight() {
    var names = (window.REFERENCE_DATA && window.REFERENCE_DATA.swordFlight && window.REFERENCE_DATA.swordFlight.names) || [];
    return pageHeader('SwordFlight', 'Sistema del personaje', 'Criaturas y recursos visuales detectados para el sistema SwordFlight.') +
      '<section class="system-section" id="swordflight-catalog"><h2>Fichas disponibles</h2>' + systemCards(names.map(function (name) { return { name: name, description: 'Bonificaciones, compatibilidad de clase, nivel y coste: ?', source: 'SwordFlight: cliente extraído' }; }), '⚔️') + '</section>';
  }

  function renderSpiritRoot() {
    var root = window.REFERENCE_DATA && window.REFERENCE_DATA.spiritRoot ? window.REFERENCE_DATA.spiritRoot : {};
    return pageHeader('Spirit Root', 'Sistema del personaje', 'Raíces elementales, bolsa, resonancia, sacrificio, fusión y núcleos.') +
      '<section class="system-section" id="tipos-de-spirit-root"><h2>Tipos</h2>' + systemCards((root.observedTypes || []).map(function (name) { return { name: name, description: 'Atributos asociados: ? · Rareza: ? · Estrellas: ?', source: 'Spirit Root Bag' }; }), '🌿') + '</section>' +
      '<section class="system-section" id="acciones-spirit-root"><h2>Acciones y módulos</h2>' + systemCards((root.actions || []).concat(['Resonance', 'Sacrifice', 'Ancient Ruins', 'Core Spirit Root']).map(function (name) { return { name: name, description: 'Requisitos, coste y resultado: ?', source: 'Spirit Root: cliente extraído' }; }), '🌿') + '</section>' +
      '<section class="system-section" id="core-spirit-root"><h2>Core Spirit Root</h2>' + systemCards(root.coreRoots || [], '🔮') + '</section>';
  }

  function renderGenericSystem(title, lead, items, icon) {
    return pageHeader(title, 'Sistema del personaje', lead) + '<section class="system-section" id="catalogo-sistema"><h2>Elementos registrados</h2>' + systemCards(items, icon) + '</section>';
  }

  function renderActivities() {
    var cards = datos.mazmorras.map(function (row) {
      var title = text(row.nombre_interno) || '?';
      var image = imagePath('dungeons', row.archivo_salida);
      return entity(title, 'Escena: ' + (text(row.scene_id) || '?') + ' · Capítulo: ' + (text(row.chapter) || '?') + ' · Recompensas: ?', 'Dungeon catalog: ' + (text(row.bundle_origen) || '?'), '🗺️', image);
    }).join('');
    return pageHeader('Actividades y mazmorras', 'Contenido del juego', 'Catálogo visual de dungeons y espacios de actividad extraídos del cliente. Los filtros separan la ficha de dungeon de los monstruos.') +
      '<section class="system-section" id="dungeon-catalog"><div class="object-search-controls"><label for="dungeon-search">Buscar dungeon por nombre interno o bundle</label><input id="dungeon-search" class="object-search-input" type="search" placeholder="Ej.: 1_1_1, advancedungeon…" autocomplete="off"></div><p id="dungeon-count" class="object-search-count">' + datos.mazmorras.length + ' dungeons catalogadas</p><div id="dungeon-grid" class="interactive-grid dungeon-grid">' + cards + '</div></section>' +
      '<section class="system-section" id="monsters"><h2>Monstruos registrados</h2><p>Los monstruos se muestran en esta sección, nunca en el buscador de objetos.</p><div class="interactive-grid">' + datos.monstruos.map(function (row) { return entity(text(row.name_en) || text(row.title_en) || ('Monster ' + (row.monster_id || '?')), 'Nivel: ' + (text(row.lv_raw) || '?') + ' · DEF: ' + (text(row.def_raw) || '?') + ' · RESIST: ' + (text(row.resist_raw) || '?'), text(row.source_file) || '?', '👹'); }).join('') + '</div></section>';
  }

  function renderClass(classSlug) {
    var names = { 'dragon-lancer': 'Dragon Lancer', lunarborn: 'Lunarborn', spiritfox: 'Spiritfox', swordsage: 'Swordsage' };
    var name = names[classSlug] || classSlug;
    var skills = datos.habilidades.filter(function (row) { return text(row.clase_detectada).toLowerCase() === name.toLowerCase(); });
    var skillNames = {};
    skills.forEach(function (row) { var value = text(row.cadena); if (value) { skillNames[value] = true; } });
    var skillCards = Object.keys(skillNames).slice(0, 160).map(function (skill) { return entity(skill, 'Descripción, daño, recarga y efectos: ?', 'class-skill-evidence.csv', '✨'); }).join('');
    var systems = ['Stats recomendadas', 'SwordFlight', 'Technique', 'Spirit Root', 'Zodiac', 'PvE', 'PvP'].map(function (system) { return entity(name + ' · ' + system, 'Compatibilidad, prioridad y configuración: ?', 'Guía de clase', '✦'); }).join('');
    return pageHeader(name, 'Ficha de clase', 'Guía de construcción de ' + name + '. Se relacionan las habilidades que el cliente identifica para esta clase y los sistemas maestros.') +
      '<section class="class-hero"><div class="class-hero-art"><img src="assets/images/backgrounds/class-gallery.png" alt="" loading="lazy"></div>' + fields([['Clase', name], ['Habilidades identificadas', skills.length || '?'], ['Rol', '?'], ['Debilidad/resistencia', '?']]) + '</section>' +
      '<section class="system-section" id="habilidades"><h2>Habilidades identificadas</h2><div class="interactive-grid">' + (skillCards || entity('?', 'No hay nombre de habilidad unido inequívocamente a esta clase.', 'class-skill-evidence.csv', '✨')) + '</div></section>' +
      '<section class="system-section" id="configuracion"><h2>Sistemas de construcción</h2><div class="interactive-grid">' + systems + '</div></section>';
  }

  function renderClasses() {
    return pageHeader('Clases', 'Guía de clases', 'Acceso directo a las cuatro clases y a sus habilidades registradas.') + '<section class="system-section" id="comparacion-de-clases"><div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Clase</th><th>Habilidades identificadas</th><th>Stats</th><th>Relaciones</th></tr></thead><tbody>' + ['dragon-lancer', 'lunarborn', 'spiritfox', 'swordsage'].map(function (slug) { var name = slug.replace('-', ' '); var count = datos.habilidades.filter(function (row) { return text(row.clase_detectada).toLowerCase().indexOf(name) !== -1; }).length; return '<tr><th><a href="#/clases/' + slug + '">' + escapeHtml(name.replace(/\b\w/g, function (m) { return m.toUpperCase(); })) + '</a></th><td>' + (count || '?') + '</td><td>?</td><td>?</td></tr>'; }).join('') + '</tbody></table></div></section>';
  }

  function renderSystems() {
    var items = ['Stats', 'Skill', 'Spirit Root', 'Technique', 'SwordFlight', 'Zodiac Transformations', 'Spirit', 'Wisp'].map(function (name) { return { name: name, description: 'Ficha maestra, apartados y relaciones: ?', source: 'Menú del cliente' }; });
    return pageHeader('Sistemas del personaje', 'Mapa de sistemas', 'Cada sistema se mantiene como página maestra y puede abrirse desde una clase.') + '<section class="system-section" id="sistemas"><div class="interactive-grid">' + items.map(function (item, index) { var routes = ['/sistemas-del-personaje/stats', '/sistemas-del-personaje/skill', '/sistemas-del-personaje/spirit-root', '/sistemas-del-personaje/technique', '/sistemas-del-personaje/swordflight', '/sistemas-del-personaje/zodiac', '/sistemas-del-personaje/spirit', '/sistemas-del-personaje/wisp']; return '<a class="interactive-card route-card" href="#' + routes[index] + '"><span class="interactive-card-icon">✦</span><span><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.description) + '</small></span><span class="interactive-card-arrow">→</span></a>'; }).join('') + '</div></section>';
  }

  function renderProject() {
    return pageHeader('Proyecto', 'Eternal Sword Pact Guía', 'Guía comunitaria no oficial construida a partir de capturas, datos del cliente, recursos extraídos y pruebas directas.') +
      '<section class="system-section" id="sobre-la-guia"><h2>Sobre la guía</h2><p>Su objetivo es ayudar a conocer el juego, construir cada clase, localizar objetos y entender actividades, dungeons y sistemas.</p></section>' +
      '<section class="system-section" id="fuentes"><h2>Fuentes y método</h2>' + fields([['Cliente Google Play / LDPlayer', 'Catalogado'], ['Cliente LDStore', 'Conservado como versión separada'], ['Capturas y vídeos', 'Usados como evidencia complementaria'], ['Autor', 'PeRiCh'], ['Asistencia', 'ChatGPT de OpenAI']]) + '</section>' +
      '<section class="system-section" id="catalogos"><h2>Datos preparados</h2>' + fields([['Objetos', datos.objetos.length + datos.bienes.length], ['Dungeons', datos.mazmorras.length], ['Monstruos', datos.monstruos.length], ['Habilidades', datos.habilidades.length], ['Evidencias Zodiac/Glyph', datos.zodiac.length], ['Huecos documentados', '11']]) + '</section>';
  }

  function renderImplementation(page) {
    var route = page && page.route ? page.route : (window.location.hash.replace(/^#/, '').split('?')[0] || '/inicio');
    if (route === '/inicio') { return renderHome(); }
    if (route === '/objetos') { return renderObjects(); }
    if (route === '/actividades-y-mazmorras') { return renderActivities(); }
    if (route === '/clases') { return renderClasses(); }
    if (route.indexOf('/clases/') === 0) { return renderClass(route.split('/').pop()); }
    if (route === '/sistemas-del-personaje') { return renderSystems(); }
    if (route === '/sistemas-del-personaje/stats') { return renderStats(); }
    if (route === '/sistemas-del-personaje/skill') { return renderSkill(); }
    if (route === '/sistemas-del-personaje/spirit-root') { return renderSpiritRoot(); }
    if (route === '/sistemas-del-personaje/technique') { return renderTechnique(); }
    if (route === '/sistemas-del-personaje/swordflight') { return renderSwordFlight(); }
    if (route === '/sistemas-del-personaje/zodiac') { return renderZodiac(); }
    if (route === '/sistemas-del-personaje/spirit') { return renderGenericSystem('Spirit', 'Spirit, Array, Evolution, Bond, Cleanse y Demoncore.', ['Vista general', 'Array', 'Evolution', 'Bond', 'Cleanse', 'Demoncore'].map(function (name) { return { name: name, description: '?', source: 'Spirit: cliente extraído' }; }), '🔮'); }
    if (route === '/sistemas-del-personaje/wisp') { return renderGenericSystem('Wisp', 'Wisp Array, Sprite, Summon y Sacrifice.', ['Wisp Array', 'Sprite', 'Summon', 'Sacrifice', 'Resonance', 'Spirit Beast Bag'].map(function (name) { return { name: name, description: '?', source: 'Wisp: cliente extraído' }; }), '✨'); }
    if (route === '/equipamiento-y-mejoras') { return renderGenericSystem('Equipamiento y mejoras', 'Piezas, rarezas, tiers, estrellas, craft y mejora.', ['Equipamiento', 'Rarezas', 'Tiers', 'Estrellas', 'Craft', 'Mejoras', 'Bonificaciones', 'Materiales'].map(function (name) { return { name: name, description: '?', source: 'Objects/equipment: cliente extraído' }; }), '🛡️'); }
    if (route === '/proyecto') { return renderProject(); }
    if (route === '/guia-general') { return renderHome(); }
    return renderAnterior ? renderAnterior(page) : '<p>?</p>';
  }

  window.renderGuidePage = renderImplementation;

  function loadAll() {
    Promise.all([
      readCsv('objects-index.csv'),
      readCsv('goods-items-index.csv'),
      readCsv('dungeons-index.csv'),
      readCsv('monsters-index.csv'),
      readCsv('class-skill-evidence.csv'),
      readCsv('skills-icons-index.csv'),
      readCsv('stats-index.csv'),
      readCsv('zodiac-glyph-index.csv'),
      readCsv('pvp-rules-index.csv')
    ]).then(function (result) {
      datos.objetos = normalizeObjects(result[0]);
      datos.bienes = normalizeGoods(result[1]);
      datos.mazmorras = result[2];
      datos.monstruos = result[3];
      datos.habilidades = result[4];
      datos.iconosHabilidad = result[5];
      datos.estadisticas = result[6];
      datos.zodiac = result[7];
      datos.pvp = result[8];
      datos.cargado = true;
      document.dispatchEvent(new CustomEvent('implementation:loaded'));
    }).catch(function (error) {
      datos.cargado = true;
      datos.error = String(error && error.message ? error.message : error);
      document.dispatchEvent(new CustomEvent('implementation:loaded'));
    });
  }

  document.addEventListener('implementation:loaded', function () {
    // El catálogo puede terminar de descargarse antes de que router.js haya
    // creado GuideRouter; se reintenta una vez que el DOM está listo.
    if (window.GuideRouter && window.GuideRouter.render) {
      window.GuideRouter.render();
    } else {
      window.setTimeout(function () {
        if (window.GuideRouter && window.GuideRouter.render) { window.GuideRouter.render(); }
      }, 0);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (datos.cargado && window.GuideRouter && window.GuideRouter.render) { window.GuideRouter.render(); }
  });

  document.addEventListener('input', function (event) {
    if (!event.target || event.target.id !== 'dungeon-search') { return; }
    var query = text(event.target.value).toLowerCase();
    var cards = document.querySelectorAll('#dungeon-grid [data-entity-detail]');
    var visible = 0;
    cards.forEach(function (card) {
      var value = (card.getAttribute('data-detail-title') + ' ' + card.getAttribute('data-detail-source')).toLowerCase();
      var show = !query || value.indexOf(query) !== -1;
      card.hidden = !show;
      if (show) { visible += 1; }
    });
    var count = document.getElementById('dungeon-count');
    if (count) { count.textContent = visible + ' dungeons visibles'; }
  });

  loadAll();
}());
