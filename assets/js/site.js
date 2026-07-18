const state = {
  language: localStorage.getItem('etsp-language') || 'es',
  translations: {},
  objects: [],
  dungeons: [],
  mechanics: [],
  menus: [],
  relations: [],
  metadata: {},
};

const view = document.getElementById('app-view');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const menuToggle = document.getElementById('menu-toggle');
const languageSelector = document.getElementById('language-selector');
const objectDialog = document.getElementById('object-dialog');
const dialogContent = document.getElementById('dialog-content');

const t = (key) => state.translations[key] || key;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const firstText = (...values) => values.find((value) => String(value || '').trim()) || '';

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
  return response.json();
}

async function loadLanguage(language) {
  state.translations = await loadJson(`assets/lang/${language}.json`);
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (state.translations[key]) node.textContent = state.translations[key];
  });
  localStorage.setItem('etsp-language', language);
  languageSelector.value = language;
}

function openExternalTranslation() {
  const language = window.prompt(t('chooseLanguage') || 'Escribe el código del idioma (fr, it, pt, ja, etc.):', 'fr');
  if (!language) return;
  const url = `https://translate.google.com/translate?sl=es&tl=${encodeURIComponent(language)}&u=${encodeURIComponent(window.location.href)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function setMenu(open) {
  sidebar.classList.toggle('open', open);
  sidebarBackdrop.classList.toggle('visible', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

function setActiveRoute(route) {
  document.querySelectorAll('[data-route]').forEach((link) => link.classList.toggle('active', link.dataset.route === route));
}

function iconMarkup(item) {
  if (item.icon) return `<img src="${escapeHtml(item.icon)}" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode('✦'))">`;
  return '<span class="fallback-glyph">✦</span>';
}

function renderHome() {
  setActiveRoute('inicio');
  view.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">${escapeHtml(t('communityGuide'))}</p>
        <h1>${escapeHtml(t('title'))}</h1>
        <p>${escapeHtml(t('heroText'))}</p>
        <div class="hero-actions">
          <a class="button primary" href="#/objetos">${escapeHtml(t('openObjects'))}</a>
          <a class="button secondary" href="#/sistemas">${escapeHtml(t('openSystems'))}</a>
        </div>
      </div>
    </section>
    <div class="stat-strip">
      <div class="stat"><b>${state.metadata.objects || '—'}</b><span>${escapeHtml(t('objects'))}</span></div>
      <div class="stat"><b>${state.metadata.dungeons || '—'}</b><span>${escapeHtml(t('maps'))}</span></div>
      <div class="stat"><b>${state.metadata.mechanics || '—'}</b><span>${escapeHtml(t('mechanics'))}</span></div>
      <div class="stat"><b>${state.metadata.relations || '—'}</b><span>${escapeHtml(t('relations'))}</span></div>
    </div>
    <section class="feature-grid">
      <article class="feature-card"><div class="feature-icon">◈</div><h3>${escapeHtml(t('objects'))}</h3><p>${escapeHtml(t('objectsIntro'))}</p></article>
      <article class="feature-card"><div class="feature-icon">◇</div><h3>${escapeHtml(t('systems'))}</h3><p>${escapeHtml(t('systemsIntro'))}</p></article>
      <article class="feature-card"><div class="feature-icon">⌘</div><h3>${escapeHtml(t('maps'))}</h3><p>${escapeHtml(t('mapsIntro'))}</p></article>
      <article class="feature-card"><div class="feature-icon">♜</div><h3>${escapeHtml(t('classes'))}</h3><p>${escapeHtml(t('classesIntro'))}</p></article>
    </section>`;
}

function renderObjects() {
  setActiveRoute('objetos');
  const categories = [...new Set(state.objects.map((item) => item.category).filter(Boolean))].sort();
  view.innerHTML = `
    <div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('database'))}</p><h1>${escapeHtml(t('objects'))}</h1></div><p>${escapeHtml(t('objectsIntro'))}</p></div>
    <div class="toolbar"><input id="object-search" class="search-box" type="search" placeholder="${escapeHtml(t('objectSearchPlaceholder'))}" autocomplete="off"><select id="object-category" class="filter-select"><option value="">${escapeHtml(t('allCategories'))}</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}</select><span id="object-count" class="result-count"></span></div>
    <div id="object-grid" class="cards-grid"></div>`;
  const search = document.getElementById('object-search');
  const category = document.getElementById('object-category');
  const grid = document.getElementById('object-grid');
  const count = document.getElementById('object-count');
  const draw = () => {
    const needle = search.value.trim().toLocaleLowerCase();
    const selected = category.value;
    const results = state.objects.filter((item) => {
      if (selected && item.category !== selected) return false;
      if (!needle) return true;
      return [item.name, item.internalName, item.description, item.category, item.source].join(' ').toLocaleLowerCase().includes(needle);
    }).slice(0, 180);
    count.textContent = `${results.length} / ${state.objects.length}`;
    grid.innerHTML = results.length ? results.map((item, index) => `<article class="card" tabindex="0" data-object-index="${state.objects.indexOf(item)}"><div class="card-icon">${iconMarkup(item)}</div><div class="card-body"><h3 class="card-title">${escapeHtml(item.name || item.internalName || t('unnamed'))}</h3><div class="card-meta"><span>${escapeHtml(item.category || t('object'))}</span><span>#${escapeHtml(item.id)}</span></div>${item.description ? `<p class="card-description">${escapeHtml(item.description)}</p>` : ''}</div></article>`).join('') : `<div class="empty">${escapeHtml(t('noResults'))}</div>`;
    grid.querySelectorAll('[data-object-index]').forEach((card) => {
      const open = () => openObject(state.objects[Number(card.dataset.objectIndex)]);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
    });
  };
  search.addEventListener('input', draw); category.addEventListener('change', draw); draw();
}

function openObject(item) {
  dialogContent.innerHTML = `<div class="dialog-body"><div class="dialog-art">${iconMarkup(item)}</div><div><h2 class="dialog-title">${escapeHtml(item.name || item.internalName || t('unnamed'))}</h2><div class="dialog-section"><h3>${escapeHtml(t('category'))}</h3><p>${escapeHtml(item.category || '—')}</p></div>${item.description ? `<div class="dialog-section"><h3>${escapeHtml(t('description'))}</h3><p>${escapeHtml(item.description)}</p></div>` : ''}${item.source ? `<div class="dialog-section"><h3>${escapeHtml(t('obtainedFrom'))}</h3><p>${escapeHtml(item.source)}</p></div>` : ''}<div class="dialog-section"><h3>ID</h3><p>${escapeHtml(item.id || '—')}</p></div></div></div>`;
  if (typeof objectDialog.showModal === 'function') objectDialog.showModal(); else objectDialog.setAttribute('open', '');
}

function renderSystems() {
  setActiveRoute('sistemas');
  const grouped = new Map();
  state.mechanics.filter((row) => row.entry_type === 'configuration_module').forEach((row) => { if (!grouped.has(row.system)) grouped.set(row.system, []); grouped.get(row.system).push(row); });
  const rows = [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(0, 120);
  view.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('database'))}</p><h1>${escapeHtml(t('systems'))}</h1></div><p>${escapeHtml(t('systemsIntro'))}</p></div><div class="illustration-panel systems"><div class="illustration-panel-label">${escapeHtml(t('systems'))}</div></div><div class="data-list" style="margin-top:20px">${rows.map(([system, entries]) => `<article class="data-row"><strong>${escapeHtml(system)}</strong><span>${escapeHtml(entries[0].evidence || '')}</span><span class="tag">${entries.length} ${escapeHtml(t('entries'))}</span></article>`).join('')}</div>`;
}

function renderMaps() {
  setActiveRoute('mapas');
  const named = state.dungeons.filter((row) => row.name).slice(0, 3000);
  view.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('database'))}</p><h1>${escapeHtml(t('maps'))}</h1></div><p>${escapeHtml(t('mapsIntro'))}</p></div><div class="illustration-panel maps"><div class="illustration-panel-label">${escapeHtml(t('maps'))}</div></div><div class="toolbar"><input id="map-search" class="search-box" type="search" placeholder="${escapeHtml(t('mapSearchPlaceholder'))}"><span id="map-count" class="result-count"></span></div><div id="map-list" class="data-list"></div>`;
  const search = document.getElementById('map-search'); const list = document.getElementById('map-list'); const count = document.getElementById('map-count');
  const draw = () => { const needle = search.value.toLocaleLowerCase(); const results = named.filter((row) => `${row.name} ${row.sceneId} ${row.config}`.toLocaleLowerCase().includes(needle)).slice(0, 180); count.textContent = `${results.length} / ${named.length}`; list.innerHTML = results.map((row) => `<article class="data-row"><strong>${escapeHtml(row.name)}</strong><span>${escapeHtml(row.sceneId || row.config || '')}</span><span class="tag">${escapeHtml(row.type)}</span></article>`).join('') || `<div class="empty">${escapeHtml(t('noResults'))}</div>`; };
  search.addEventListener('input', draw); draw();
}

function renderMechanics() {
  setActiveRoute('mecanicas');
  const systems = [...new Set(state.mechanics.map((row) => row.system).filter(Boolean))].sort();
  view.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('database'))}</p><h1>${escapeHtml(t('mechanics'))}</h1></div><p>${escapeHtml(t('mechanicsIntro'))}</p></div><div class="toolbar"><input id="mechanic-search" class="search-box" type="search" placeholder="${escapeHtml(t('mechanicSearchPlaceholder'))}"><select id="mechanic-system" class="filter-select"><option value="">${escapeHtml(t('allSystems'))}</option>${systems.map((system) => `<option value="${escapeHtml(system)}">${escapeHtml(system)}</option>`).join('')}</select></div><div id="mechanic-list" class="data-list"></div>`;
  const search = document.getElementById('mechanic-search'); const filter = document.getElementById('mechanic-system'); const list = document.getElementById('mechanic-list');
  const draw = () => { const needle = search.value.toLocaleLowerCase(); const results = state.mechanics.filter((row) => (!filter.value || row.system === filter.value) && `${row.system} ${row.entry_name} ${row.evidence}`.toLocaleLowerCase().includes(needle)).slice(0, 220); list.innerHTML = results.map((row) => `<article class="data-row"><strong>${escapeHtml(row.entry_name || row.system)}</strong><span>${escapeHtml(row.evidence || '')}</span><span class="tag">${escapeHtml(row.entry_type)}</span></article>`).join('') || `<div class="empty">${escapeHtml(t('noResults'))}</div>`; };
  search.addEventListener('input', draw); filter.addEventListener('change', draw); draw();
}

function renderClasses() {
  setActiveRoute('clases');
  const classes = ['Dragon Lancer', 'Lunarborn', 'Spiritfox', 'Swordsage'];
  view.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('guide'))}</p><h1>${escapeHtml(t('classes'))}</h1></div><p>${escapeHtml(t('classesIntro'))}</p></div><section class="class-hero"><div><p class="eyebrow">${escapeHtml(t('classGuide'))}</p><h1>${escapeHtml(t('classes'))}</h1></div></section><div class="cards-grid" style="margin-top:20px">${classes.map((name) => `<article class="feature-card"><div class="feature-icon">♜</div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(t('classCard'))}</p></article>`).join('')}</div>`;
}

function renderRelations() {
  setActiveRoute('relaciones');
  const counts = new Map(); state.relations.forEach((row) => { const key = `${row.from_type} → ${row.relation} → ${row.to_type}`; counts.set(key, (counts.get(key) || 0) + 1); });
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 100);
  view.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${escapeHtml(t('database'))}</p><h1>${escapeHtml(t('relations'))}</h1></div><p>${escapeHtml(t('relationsIntro'))}</p></div><div class="stat-strip"><div class="stat"><b>${state.relations.length}</b><span>${escapeHtml(t('relations'))}</span></div><div class="stat"><b>${new Set(state.relations.map((row) => row.from_type)).size}</b><span>${escapeHtml(t('sourceTypes'))}</span></div><div class="stat"><b>${new Set(state.relations.map((row) => row.to_type)).size}</b><span>${escapeHtml(t('targetTypes'))}</span></div></div><div class="data-list">${rows.map(([label, count]) => `<article class="data-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(t('relationSummary'))}</span><span class="tag">${count}</span></article>`).join('')}</div>`;
}

function route() {
  const value = location.hash.replace(/^#\/?/, '').split('/')[0] || 'inicio';
  if (value === 'objetos') renderObjects(); else if (value === 'sistemas') renderSystems(); else if (value === 'mapas') renderMaps(); else if (value === 'mecanicas') renderMechanics(); else if (value === 'clases') renderClasses(); else if (value === 'relaciones') renderRelations(); else renderHome();
  setMenu(false); document.getElementById('main-content').focus({ preventScroll: true });
}

async function start() {
  try {
    await loadLanguage(state.language);
    [state.objects, state.dungeons, state.mechanics, state.menus, state.relations, state.metadata] = await Promise.all([
      loadJson('assets/data/site/objects.json'), loadJson('assets/data/site/dungeons.json'), loadJson('assets/data/site/mechanics-catalog.json'), loadJson('assets/data/site/menu-catalog.json'), loadJson('assets/data/site/relations.json'), loadJson('assets/data/site/metadata.json'),
    ]);
    route();
  } catch (error) {
    view.innerHTML = `<div class="empty">${escapeHtml(error.message)}</div>`;
  }
}

menuToggle.addEventListener('click', () => setMenu(!sidebar.classList.contains('open')));
sidebarBackdrop.addEventListener('click', () => setMenu(false));
document.getElementById('dialog-close').addEventListener('click', () => objectDialog.close());
languageSelector.addEventListener('change', async () => { if (languageSelector.value === 'google') { openExternalTranslation(); languageSelector.value = state.language; return; } await loadLanguage(languageSelector.value); route(); });
window.addEventListener('hashchange', route);
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') { setMenu(false); if (objectDialog.open) objectDialog.close(); } });

start();
