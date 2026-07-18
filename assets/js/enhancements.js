/*
 * Capa interactiva de la guía.
 *
 * La página no descarta un registro por estar incompleto. Cada ficha conserva
 * el nombre o ID que exista y muestra «?» en los campos que no están en los
 * archivos del juego o todavía no se han podido relacionar.
 */
(function () {
  'use strict';

  var originalRender = window.renderGuidePage;

  function esc(value) {
    return String(value === undefined || value === null || value === '' ? '?' : value)
      .replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
  }

  function attr(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
      });
  }

  function slug(value) {
    return window.slugify ? window.slugify(String(value || '?')) : String(value || '?').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function currentRoute() {
    var route = window.location.hash.replace(/^#/, '').split('?')[0];
    return route || '/inicio';
  }

  function field(label, value, className) {
    return '<div class="detail-field ' + (className || '') + '"><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>';
  }

  function fields(items) {
    return '<dl class="detail-fields">' + items.map(function (item) { return field(item[0], item[1]); }).join('') + '</dl>';
  }

  function pageHeader(title, kicker, lead) {
    return '<div class="breadcrumbs" aria-label="Migas de pan"><a href="#/inicio">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(title) + '</span></div>' +
      '<p class="page-kicker">' + esc(kicker) + '</p><h1>' + esc(title) + '</h1><p class="lead">' + esc(lead) + '</p>';
  }

  function linkCard(route, title, description, icon) {
    return '<a class="interactive-card route-card" href="#' + route + '"><span class="interactive-card-icon" aria-hidden="true">' + (icon || '?') + '</span><span><strong>' + esc(title) + '</strong><small>' + esc(description) + '</small></span><span class="interactive-card-arrow" aria-hidden="true">→</span></a>';
  }

  function detailCard(title, data, image) {
    return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + attr(title) + '" data-detail-description="' + attr(data.description || '?') + '" data-detail-source="' + attr(data.source || '?') + '" data-detail-image="' + attr(image || '') + '"><span class="interactive-card-icon">' + (image ? '<img src="' + attr(image) + '" alt="" loading="lazy">' : '?') + '</span><span><strong>' + esc(title) + '</strong><small>' + esc(data.summary || data.description || '?') + '</small></span><span class="interactive-card-arrow" aria-hidden="true">+</span></button>';
  }

  function interactionPanel(title, entries) {
    return '<section class="interactive-panel system-section" aria-labelledby="interactive-title"><div class="section-heading"><p class="page-kicker">Explorador interactivo</p><h2 id="interactive-title">' + esc(title) + '</h2><p>Pulsa cualquier elemento para abrir su ficha. Los huecos sin datos permanecen visibles como «?».</p></div><div class="interactive-grid">' + entries.join('') + '</div></section>';
  }

  function classRoute(slugName) { return '#/clases/' + slugName; }

  function renderClassComparison() {
    var classes = [
      ['dragon-lancer', 'Dragon Lancer', '🐉'],
      ['lunarborn', 'Lunarborn', '🌙'],
      ['spiritfox', 'Spiritfox', '🦊'],
      ['swordsage', 'Swordsage', '⚔️']
    ];
    return pageHeader('Clases', 'Guía de clases', 'Comparación rápida y acceso a la ficha completa de cada clase.') +
      '<section class="system-section" id="comparacion-de-clases"><div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Clase</th><th>Rol observado</th><th>Daño principal</th><th>Movilidad</th><th>Prioridad recomendada</th></tr></thead><tbody>' + classes.map(function (item) {
        return '<tr><th scope="row"><a href="' + classRoute(item[0]) + '">' + item[2] + ' ' + esc(item[1]) + '</a></th><td>?</td><td>?</td><td>?</td><td>?</td></tr>';
      }).join('') + '</tbody></table></div></section>' +
      interactionPanel('Seleccionar una clase', classes.map(function (item) { return linkCard('/clases/' + item[0], item[1], 'Habilidades, estadísticas, sistemas y configuraciones: ?', item[2]); }));
  }

  function renderClassPage(page, classSlug) {
    var names = { 'dragon-lancer': 'Dragon Lancer', lunarborn: 'Lunarborn', spiritfox: 'Spiritfox', swordsage: 'Swordsage' };
    var name = names[classSlug] || page.title || classSlug;
    var sections = [
      ['Descripción', 'Estilo de juego, fortalezas y limitaciones: ?', '📖'],
      ['Habilidades', 'Skills iniciales, niveles, daño, recarga y efectos: ?', '✨'],
      ['Estadísticas recomendadas', 'Basic Stats, Special Stats y prioridades: ?', '📊'],
      ['SwordFlight recomendado', 'Configuración específica y alternativas: ?', '⚔️'],
      ['Technique', 'Técnicas que encajan con la clase: ?', '📜'],
      ['Spirit Root', 'Elementos, resonancia y sacrificio: ?', '🌿'],
      ['Zodiac recomendado', 'Transformaciones y Glyph compatibles: ?', '☯️'],
      ['PvE', 'Daño, supervivencia y actividades: ?', '🗺️'],
      ['PvP', 'Control, defensa y enfrentamientos: ?', '🏆']
    ];
    var cards = sections.map(function (item) {
      return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name + ' — ' + item[0]) + '" data-detail-description="' + esc(item[1]) + '" data-detail-source="?" data-detail-image=""><span class="interactive-card-icon">' + item[2] + '</span><span><strong>' + esc(item[0]) + '</strong><small>' + esc(item[1]) + '</small></span><span class="interactive-card-arrow">+</span></button>';
    }).join('');
    var classLinks = ['dragon-lancer', 'lunarborn', 'spiritfox', 'swordsage'].map(function (slugName) {
      return linkCard('/clases/' + slugName, names[slugName], slugName === classSlug ? 'Clase seleccionada' : 'Abrir ficha', slugName === classSlug ? '●' : '?');
    }).join('');
    return pageHeader(name, 'Ficha de clase', 'Guía central de ' + name + '. Los datos disponibles se relacionan con las páginas maestras; cualquier campo no encontrado permanece como «?».') +
      '<section class="class-hero"><div class="class-hero-art"><img src="assets/images/backgrounds/class-gallery.png" alt="" loading="lazy"></div><div>' + fields([['Clase', name], ['Habilidades registradas', '?'], ['Stats recomendadas', '?'], ['Modelo visual', '?']]) + '</div></section>' +
      interactionPanel('Contenido de ' + name, sections.map(function (item) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name + ' — ' + item[0]) + '" data-detail-description="' + esc(item[1]) + '" data-detail-source="?" data-detail-image=""><span class="interactive-card-icon">' + item[2] + '</span><span><strong>' + esc(item[0]) + '</strong><small>' + esc(item[1]) + '</small></span><span class="interactive-card-arrow">+</span></button>'; })) +
      '<section class="system-section" id="otras-clases"><h2>Otras clases</h2><div class="interactive-grid">' + classLinks + '</div></section>';
  }

  function renderGeneralHub() {
    var items = [
      ['/guia-general?apartado=primeros-pasos', 'Primeros pasos', 'Qué hacer al comenzar: ?', '🧭'],
      ['/guia-general?apartado=interfaz-principal', 'Interfaz principal', 'Menús, botones y accesos: ?', '🖥️'],
      ['/guia-general?apartado=progresion', 'Progresión', 'Cómo mejorar el personaje: ?', '📈'],
      ['/sistemas-del-personaje/stats', 'Estadísticas', 'Basic Stats y Special Stats con campos interactivos.', '📊'],
      ['/objetos?apartado=buscador-de-objetos', 'Buscador de objetos', 'Localiza objetos por nombre, alias, categoría o fuente.', '🔎'],
      ['/actividades-y-mazmorras', 'Actividades y mazmorras', 'Requisitos, recompensas y mapas disponibles: ?', '🗺️']
    ];
    return pageHeader('Guía general', 'Guía para jugadores', 'Orientación práctica para entender el juego y avanzar sin perder los sistemas importantes.') + '<section class="system-section" id="mapa-general"><div class="interactive-grid">' + items.map(function (item) { return linkCard(item[0], item[1], item[2], item[3]); }).join('') + '</div></section>' + interactionPanel('Campos generales', items.map(function (item) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(item[1]) + '" data-detail-description="' + esc(item[2]) + '" data-detail-source="?" data-detail-image=""><span class="interactive-card-icon">' + item[3] + '</span><span><strong>' + esc(item[1]) + '</strong><small>' + esc(item[2]) + '</small></span><span class="interactive-card-arrow">+</span></button>'; }));
  }

  function renderSystemsHub() {
    var systems = [
      ['/sistemas-del-personaje/stats', 'Stats', 'Basic Stats y Special Stats.', '📊'],
      ['/sistemas-del-personaje/spirit-root', 'Spirit Root', 'Tipos, Fuse, Resonance, Sacrifice y Core.', '🌿'],
      ['/sistemas-del-personaje/technique', 'Technique', 'Plantas, libros, rangos y habilidades.', '📜'],
      ['/sistemas-del-personaje/swordflight', 'SwordFlight', 'Criaturas, ramas y bonificaciones.', '⚔️'],
      ['/sistemas-del-personaje/zodiac', 'Zodiac Transformations', 'Transformaciones y Glyph.', '☯️'],
      ['/sistemas-del-personaje/spirit', 'Spirit', 'Array, Evolution, Bond, Cleanse y Demoncore.', '🔮'],
      ['/sistemas-del-personaje/wisp', 'Wisp', 'Wisp Array, Sprite, Summon y Sacrifice.', '✨'],
      ['/equipamiento-y-mejoras', 'Equipamiento y mejoras', 'Piezas, materiales, rarezas, sets y mejoras.', '🛡️']
    ];
    return pageHeader('Sistemas del personaje', 'Mapa de sistemas', 'Cada sistema tiene una página maestra y se puede abrir desde una clase sin duplicar su información.') + '<section class="system-section" id="sistemas"><div class="interactive-grid">' + systems.map(function (item) { return linkCard(item[0], item[1], item[2], item[3]); }).join('') + '</div></section>' + interactionPanel('Relaciones rápidas', systems.map(function (item) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(item[1]) + '" data-detail-description="' + esc(item[2]) + '" data-detail-source="Menú del juego: ?" data-detail-image=""><span class="interactive-card-icon">' + item[3] + '</span><span><strong>' + esc(item[1]) + '</strong><small>' + esc(item[2]) + '</small></span><span class="interactive-card-arrow">+</span></button>'; }));
  }

  function renderEquipmentHub() {
    var names = ['Equipamiento', 'Rarezas', 'Tiers', 'Estrellas', 'Craft', 'Mejoras', 'Bonificaciones', 'Materiales', 'Rune', 'Awaken', 'Prefix', 'Set', 'Gem', 'Forge', 'Bag', 'Warehouse', 'Fuse', 'Void Star'];
    return pageHeader('Equipamiento y mejoras', 'Construcción del personaje', 'Consulta las piezas y mejoras disponibles. Los valores específicos por clase se muestran como «?» hasta que existan en los datos extraídos.') + '<section class="system-section" id="equipamiento"><div class="interactive-grid">' + names.map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="Descripción: ?; piezas afectadas: ?; niveles: ?; requisitos: ?; materiales: ?" data-detail-source="?" data-detail-image=""><span class="interactive-card-icon">🛡️</span><span><strong>' + esc(name) + '</strong><small>Descripción: ? · Efecto: ? · Obtención: ?</small></span><span class="interactive-card-arrow">+</span></button>'; }).join('') + '</div></section>';
  }

  function renderActivitiesHub() {
    var data = window.REFERENCE_DATA && window.REFERENCE_DATA.activities ? window.REFERENCE_DATA.activities : { confirmed: [], observed: [] };
    var confirmed = (data.confirmed || []).map(function (item) {
      return detailCard(item.name, { description: (item.facts || []).join(' · ') || '?', source: '?' }, item.image);
    });
    var observed = (data.observed || []).map(function (name) {
      return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="?" data-detail-image=""><span class="interactive-card-icon">🗺️</span><span><strong>' + esc(name) + '</strong><small>Requisitos: ? · Recompensas: ? · Reinicio: ?</small></span><span class="interactive-card-arrow">+</span></button>';
    });
    var catalog = window.COMPLETE_GAME_CATALOG || {};
    var dungeonCount = catalog.dungeons && catalog.dungeons.length ? catalog.dungeons.length : '?';
    return pageHeader('Actividades y mazmorras', 'Contenido del juego', 'Explora las actividades observadas y conserva las mazmorras del cliente aunque todavía falten nombres o recompensas legibles.') + '<section class="system-section" id="resumen-actividades"><div class="fact-grid"><article class="fact-card"><h3>Mazmorras catalogadas</h3>' + fields([['Registros del cliente', dungeonCount], ['Nombre visible', '?'], ['Recompensas completas', '?']]) + '</article><article class="fact-card"><h3>Regla de la ficha</h3>' + fields([['Entrada sin imagen', '?'], ['Entrada sin nombre', '?'], ['Relación con objeto', '?']]) + '</article></div></section>' + '<section class="system-section" id="actividades-confirmadas"><h2>Actividades con datos</h2><div class="interactive-grid">' + confirmed.concat(observed).join('') + '</div></section>';
  }

  function getAllObjectEntries() {
    var result = [];
    var seen = {};
    function add(item) {
      if (!item) { return; }
      var name = String(item.name || item.nombre || item.nombre_visible || item.internalName || item.nombre_interno || '?').trim() || '?';
      var id = String(item.id || item.id_registro || '').trim();
      var key = id ? 'id:' + id : 'name:' + name.toLowerCase();
      if (seen[key]) { return; }
      seen[key] = true;
      var category = item.category || item.categoria || 'Objeto';
      var aliases = item.aliases || item.alias || '';
      var source = item.source || item.fuente_obtencion || item.source_method || '?';
      var description = item.description || item.descripcion || item.notes || '?';
      result.push({
        id: id || '?',
        name: name,
        category: category,
        source: source || '?',
        description: description || '?',
        notes: item.notes || '?',
        aliases: String(aliases) + ' objeto item utensilio recipiente herramienta material equipo prenda arma montura talisman spirit root technique title outfit',
        image: item.image || item.archivo || '',
        detailImage: item.detailImage || '',
        model: item.model || item.modelKey || '',
        bundle: item.bundle || item.bundle_origen || '?',
        status: item.status || item.estado || '?'
      });
    }
    var reference = window.REFERENCE_DATA && window.REFERENCE_DATA.objectCatalog && window.REFERENCE_DATA.objectCatalog.entries || [];
    reference.forEach(add);
    (window.GOODS_ITEM_CATALOG || []).forEach(function (item) {
      var name = String(item.nombre || '').trim();
      if (name && !/^Objeto\s+\d+$/i.test(name) && !/^(Permanently|Temporarily|Obtained|Used to|Can be|Will be|Please use)/i.test(name)) { add({ id: item.id, name: name, description: item.descripcion, image: item.archivo, category: 'Objeto / material' }); }
    });
    ((window.COMPLETE_GAME_CATALOG && window.COMPLETE_GAME_CATALOG.objects) || []).forEach(add);
    return result;
  }

  function synonyms(value) {
    var text = String(value || '').toLowerCase();
    var result = ['objeto', 'item'];
    if (/bag|pack|box|chest|container|voucher|card|vase|glass|cup|goblet/.test(text)) { result.push('bolsa', 'cofre', 'caja', 'paquete', 'recipiente', 'tarjeta', 'vale', 'vaso', 'utensilio', 'cristaleria', 'cristalería'); }
    if (/stone|crystal|shard|essence|core|gem/.test(text)) { result.push('piedra', 'cristal', 'fragmento', 'esencia', 'núcleo', 'gema'); }
    if (/outfit|dress|robe|fashion|costume|headdress/.test(text)) { result.push('ropa', 'atuendo', 'vestido', 'prenda', 'disfraz', 'sombrero'); }
    if (/mount|beast|dragon|feijian|shenlong|fugu/.test(text)) { result.push('montura', 'cabalgadura', 'bestia', 'vehículo'); }
    if (/sword|blade|spear|bow|weapon|staff|dagger|lance/.test(text)) { result.push('arma', 'espada', 'lanza', 'arco', 'hoja', 'bastón'); }
    if (/talisman|charm|amulet/.test(text)) { result.push('talismán', 'amuleto', 'reliquia', 'encantamiento'); }
    return result.join(' ');
  }

  function renderObjectsEnhanced() {
    var entries = getAllObjectEntries();
    var categories = entries.map(function (item) { return item.category; }).filter(function (value, index, list) { return value && list.indexOf(value) === index; }).sort();
    var cards = entries.map(function (item) {
      var search = [item.name, item.id, item.category, item.source, item.description, item.notes, item.aliases, synonyms(item.name + ' ' + item.category)].join(' ').toLowerCase();
      var media = item.image ? '<img src="' + esc(item.image) + '" alt="Icono de ' + esc(item.name) + '" loading="lazy">' : '<span class="object-card-pending-icon" aria-label="Imagen no disponible">?</span>';
      return '<article class="object-card" data-object-card tabindex="0" role="button" aria-label="Ver ficha de ' + esc(item.name) + '" data-object-name="' + attr(item.name) + '" data-object-image="' + attr(item.image) + '" data-object-detail-image="' + attr(item.detailImage) + '" data-object-category="' + attr(item.category) + '" data-object-source="' + attr(item.source) + '" data-object-notes="' + attr(item.description) + '" data-object-id="' + attr(item.id) + '" data-object-model="' + attr(item.model) + '" data-object-status="' + attr(item.status) + '" data-category="' + attr(item.category) + '" data-search="' + attr(search) + '"><div class="object-card-media">' + media + '</div><div class="object-card-body"><h2>' + esc(item.name) + '</h2><p>' + esc(item.category) + '</p></div></article>';
    }).join('');
    return pageHeader('Objetos y obtención', 'Buscador de objetos', 'Busca únicamente objetos, equipo, materiales, prendas, armas, monturas, Spirits, Titles y recompensas. No se incluyen monstruos ni mazmorras como resultados de objeto.') +
      '<section class="system-section object-search-section" id="buscador-de-objetos"><div class="object-search-controls"><label for="object-search">Buscar por nombre, alias, categoría o dónde se obtiene</label><input id="object-search" class="object-search-input" type="search" placeholder="Ej.: vaso, recipiente, talismán, Ancient Ruins…" autocomplete="off"><label for="object-category">Categoría</label><select id="object-category" class="object-category-select"><option value="all">Todas</option>' + categories.map(function (category) { return '<option value="' + esc(category) + '">' + esc(category) + '</option>'; }).join('') + '</select></div><p id="object-search-count" class="object-search-count">' + entries.length + ' objetos catalogados</p><div id="object-catalog-grid" class="object-catalog-grid">' + cards + '</div><p id="object-search-empty" class="verification-note" hidden>No hay objetos que coincidan.</p></section>' +
      '<section class="system-section" id="reglas-del-buscador"><h2>Qué muestra cada ficha</h2><div class="fact-grid"><article class="fact-card">' + fields([['Nombre', 'Disponible o ?'], ['Categoría', 'Disponible o ?'], ['Descripción', 'Disponible o ?'], ['Obtención', 'Disponible o ?'], ['Imagen', 'Disponible o ?'], ['ID interno', 'Disponible o ?']]) + '</article><article class="fact-card"><h3>Palabras relacionadas</h3><p>El buscador reconoce equivalencias como vaso, recipiente, utensilio, cristalería, objeto, item y los nombres internos del cliente.</p></article></div></section>';
  }

  function renderStatsEnhanced() {
    var data = window.STATS_CONTENT || { basic: [], special: [] };
    function rows(items) {
      return items.map(function (name) { return '<tr><th scope="row">' + esc(name) + '</th><td>' + esc(name) + '</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>'; }).join('');
    }
    function table(title, items, id) {
      return '<section class="system-section" id="' + id + '"><h2>' + esc(title) + '</h2><div class="table-scroll" tabindex="0"><table class="stats-table"><thead><tr><th>Campo</th><th>Nombre publicado</th><th>Nombre completo</th><th>Descripción</th><th>Fórmula</th><th>Efecto exacto</th></tr></thead><tbody>' + rows(items) + '</tbody></table></div></section>';
    }
    return pageHeader('Stats', 'Sistemas del personaje', 'Tabla editable de los campos que aparecen en Basic Stats y Special Stats. El nombre publicado conserva el término del juego; los demás campos muestran «?» hasta tener una descripción o fórmula exacta.') + table('Basic Stats', data.basic, 'basic-stats') + table('Special Stats', data.special, 'special-stats') + interactionPanel('Explorar una estadística', data.basic.concat(data.special).map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Pantalla de Stats: ?" data-detail-image=""><span class="interactive-card-icon">📊</span><span><strong>' + esc(name) + '</strong><small>Nombre completo: ? · Fórmula: ? · Efecto: ?</small></span><span class="interactive-card-arrow">+</span></button>'; }));
  }

  function appendInteractive(original, page) {
    if (page.type === 'stats') { return renderStatsEnhanced(); }
    if (page.type === 'objects') { return renderObjectsEnhanced(); }
    var extra = [];
    if (page.type === 'spirit-root') {
      var root = window.REFERENCE_DATA.spiritRoot;
      extra = (root.observedTypes || []).concat(root.actions || []).map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Spirit Root: ?" data-detail-image=""><span class="interactive-card-icon">🌿</span><span><strong>' + esc(name) + '</strong><small>Descripción: ? · Requisito: ? · Efecto: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    } else if (page.type === 'technique') {
      extra = (window.REFERENCE_DATA.technique.names || []).map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Technique: ?" data-detail-image=""><span class="interactive-card-icon">📜</span><span><strong>' + esc(name) + '</strong><small>Rango: ? · Stats: ? · Material: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    } else if (page.type === 'swordflight') {
      extra = (window.REFERENCE_DATA.swordFlight.names || []).concat(['Habilidades', 'Ramas', 'Bonificaciones']).map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="SwordFlight: ?" data-detail-image=""><span class="interactive-card-icon">⚔️</span><span><strong>' + esc(name) + '</strong><small>Clase compatible: ? · Nivel: ? · Coste: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    } else if (page.type === 'zodiac') {
      extra = (window.REFERENCE_DATA.zodiac.names || []).concat(['Glyph', 'Huecos de Zodiac', 'Transformación activa', 'Mejoras']).map(function (name) { return '<button type="button" class="interactive-card entity-card zodiac-slot" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Zodiac: ?" data-detail-image=""><span class="interactive-card-icon">☯️</span><span><strong>' + esc(name) + '</strong><small>Compatible: ? · Atributos: ? · Requisitos: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    } else if (page.type === 'spirit') {
      var spirits = (window.REFERENCE_DATA.spirit.rarities || []).reduce(function (all, group) { return all.concat(group.names || []); }, []);
      extra = spirits.map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Spirit: ?" data-detail-image=""><span class="interactive-card-icon">🔮</span><span><strong>' + esc(name) + '</strong><small>Rareza: ? · Bond: ? · Skill: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    } else if (page.type === 'wisp') {
      extra = ['Wisp Array', 'Sprite', 'Summon', 'Sacrifice', 'Resonance', 'Spirit Beast Bag'].map(function (name) { return '<button type="button" class="interactive-card entity-card" data-entity-detail data-detail-title="' + esc(name) + '" data-detail-description="?" data-detail-source="Wisp: ?" data-detail-image=""><span class="interactive-card-icon">✨</span><span><strong>' + esc(name) + '</strong><small>Nivel: ? · Coste: ? · Recompensa: ?</small></span><span class="interactive-card-arrow">+</span></button>'; });
    }
    return (original || '<p>?</p>') + (extra.length ? interactionPanel('Elementos interactivos de la sección', extra) : '');
  }

  window.renderGuidePage = function (page) {
    var route = page.route || currentRoute();
    if (route === '/guia-general') { return renderGeneralHub(); }
    if (route === '/sistemas-del-personaje') { return renderSystemsHub(); }
    if (route === '/equipamiento-y-mejoras') { return renderEquipmentHub(); }
    if (route === '/clases') { return renderClassComparison(); }
    if (route === '/actividades-y-mazmorras') { return renderActivitiesHub(); }
    if (route.indexOf('/clases/') === 0) { return renderClassPage(page, route.split('/').pop()); }
    return appendInteractive(originalRender ? originalRender(page) : null, page);
  };

  function createEntityModal() {
    var existing = document.getElementById('entity-detail-modal');
    if (existing) { return existing; }
    document.body.insertAdjacentHTML('beforeend', '<div id="entity-detail-modal" class="object-detail-modal" hidden aria-hidden="true"><div class="object-detail-backdrop" data-entity-close></div><section class="object-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="entity-detail-title"><button class="object-detail-close" type="button" data-entity-close aria-label="Cerrar">×</button><div class="object-detail-media" id="entity-detail-media"></div><div class="object-detail-copy"><p class="object-card-category" id="entity-detail-category">Ficha interactiva</p><h2 id="entity-detail-title"></h2><p id="entity-detail-description"></p><p><strong>Obtención o relación:</strong> <span id="entity-detail-source"></span></p><div class="detail-fields" id="entity-detail-fields"></div></div></section></div>');
    return document.getElementById('entity-detail-modal');
  }

  function openEntity(button) {
    var modal = createEntityModal();
    var image = button.getAttribute('data-detail-image');
    var media = document.getElementById('entity-detail-media');
    media.innerHTML = image ? '<img class="object-detail-icon" src="' + esc(image) + '" alt="" onerror="this.replaceWith(document.createTextNode(\'?\'))">' : '<span class="object-card-pending-icon">?</span>';
    document.getElementById('entity-detail-title').textContent = button.getAttribute('data-detail-title') || '?';
    document.getElementById('entity-detail-description').textContent = button.getAttribute('data-detail-description') || '?';
    document.getElementById('entity-detail-source').textContent = button.getAttribute('data-detail-source') || '?';
    document.getElementById('entity-detail-fields').innerHTML = fields([['Imagen', image || '?'], ['Compatible', '?' ], ['Requisitos', '?' ], ['Mejora', '?' ]]);
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('object-detail-open');
    modal.querySelector('.object-detail-close').focus();
  }

  function closeEntity() {
    var modal = document.getElementById('entity-detail-modal');
    if (!modal) { return; }
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('object-detail-open');
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('[data-entity-detail]') : null;
    if (button) { openEntity(button); return; }
    if (event.target.closest && event.target.closest('[data-entity-close]')) { closeEntity(); }
  });
  document.addEventListener('keydown', function (event) {
    var button = event.target.closest ? event.target.closest('[data-entity-detail]') : null;
    if (button && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openEntity(button); }
    if (event.key === 'Escape') { closeEntity(); }
  });
  document.addEventListener('catalog:loaded', function () {
    if (window.GuideRouter && currentRoute() === '/objetos') { window.GuideRouter.render(); }
  });
  document.addEventListener('route:changed', function () {
    closeEntity();
    var objectModal = document.getElementById('object-detail-modal');
    if (objectModal) {
      objectModal.hidden = true;
      objectModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('object-detail-open');
    }
  });
}());
