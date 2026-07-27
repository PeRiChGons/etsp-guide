/* Catálogo de bosses construido únicamente con vínculos y estadísticas del cliente. */
(function () {
  'use strict';

  var state = { links: [], monsters: [], loaded: false };

  function parseCsv(source) {
    var rows = [];
    var row = [];
    var value = '';
    var quoted = false;

    for (var index = 0; index < source.length; index += 1) {
      var character = source[index];
      var next = source[index + 1];
      if (character === '"' && quoted && next === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        row.push(value);
        value = '';
      } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && next === '\n') { index += 1; }
        row.push(value);
        if (row.some(function (cell) { return cell !== ''; })) { rows.push(row); }
        row = [];
        value = '';
      } else {
        value += character;
      }
    }
    if (value || row.length) { row.push(value); rows.push(row); }
    if (rows.length < 2) { return []; }

    var headers = rows.shift();
    return rows.map(function (cells) {
      var result = {};
      headers.forEach(function (header, cellIndex) { result[header] = cells[cellIndex] || ''; });
      return result;
    });
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function localeText() {
    var locale = window.I18n && window.I18n.getLocale ? window.I18n.getLocale() : 'es';
    var texts = {
      es: {
        loading: 'Cargando catálogo de bosses…', level: 'Nivel', hp: 'HP límite', defense: 'DEF',
        resist: 'RESIST', toughness: 'Toughness', unknown: '?', variants: 'variantes vinculadas',
        formula: 'La fórmula exacta de daño por diferencia de nivel no está demostrada: ?.',
        empty: 'No hay variantes estadísticas legibles para este boss.'
      },
      en: {
        loading: 'Loading boss catalogue…', level: 'Level', hp: 'HP limit', defense: 'DEF',
        resist: 'RESIST', toughness: 'Toughness', unknown: '?', variants: 'linked variants',
        formula: 'The exact damage formula for level difference is not demonstrated: ?.',
        empty: 'No readable statistical variants are available for this boss.'
      },
      de: {
        loading: 'Boss-Katalog wird geladen…', level: 'Stufe', hp: 'HP-Grenze', defense: 'DEF',
        resist: 'RESIST', toughness: 'Toughness', unknown: '?', variants: 'verknüpfte Varianten',
        formula: 'Die exakte Schadensformel für Stufenunterschiede ist nicht belegt: ?.',
        empty: 'Für diesen Boss sind keine lesbaren Statistikvarianten verfügbar.'
      },
      pl: {
        loading: 'Ładowanie katalogu bossów…', level: 'Poziom', hp: 'Limit HP', defense: 'DEF',
        resist: 'RESIST', toughness: 'Toughness', unknown: '?', variants: 'powiązane warianty',
        formula: 'Dokładny wzór obrażeń dla różnicy poziomów nie jest potwierdzony: ?.',
        empty: 'Brak czytelnych wariantów statystyk dla tego bossa.'
      }
    };
    return texts[locale] || texts.en;
  }

  function renderVariant(monster, text) {
    return '<div class="boss-variant"><strong>ID ' + escapeHtml(monster.monster_id || '?') + '</strong>' +
      '<small>' + escapeHtml(text.level) + ': ' + escapeHtml(monster.lv_raw || '?') +
      ' · ' + escapeHtml(text.hp) + ': ' + escapeHtml(monster.hp_lim_raw || '?') +
      ' · ' + escapeHtml(text.defense) + ': ' + escapeHtml(monster.def_raw || '?') +
      ' · ' + escapeHtml(text.resist) + ': ' + escapeHtml(monster.resist_raw || '?') +
      ' · ' + escapeHtml(text.toughness) + ': ' + escapeHtml(monster.tough_raw || '?') + '</small></div>';
  }

  window.renderBossesPage = function () {
    var text = localeText();
    if (!state.loaded) {
      return '<section class="system-section"><p>' + escapeHtml(text.loading) + '</p></section>';
    }

    var monstersById = {};
    state.monsters.forEach(function (monster) { monstersById[monster.monster_id] = monster; });
    var bosses = {};
    state.links.forEach(function (link) {
      if (!bosses[link.boss_name]) { bosses[link.boss_name] = []; }
      var monster = monstersById[link.monster_id] || { monster_id: link.monster_id, name_en: link.name_en };
      if (!bosses[link.boss_name].some(function (entry) { return entry.monster_id === monster.monster_id; })) {
        bosses[link.boss_name].push(monster);
      }
    });

    var cards = Object.keys(bosses).sort().map(function (bossName) {
      var variants = bosses[bossName];
      var visible = variants.slice(0, 12);
      return '<article class="boss-card"><h2>' + escapeHtml(bossName) + '</h2>' +
        '<p>' + variants.length + ' ' + escapeHtml(text.variants) + '</p>' +
        '<div class="boss-variants">' + (visible.length
          ? visible.map(function (monster) { return renderVariant(monster, text); }).join('')
          : '<p>' + escapeHtml(text.empty) + '</p>') + '</div></article>';
    }).join('');

    return '<section class="system-section"><p class="verification-note">' + escapeHtml(text.formula) + '</p>' +
      '<div class="boss-catalog">' + cards + '</div></section>';
  };

  Promise.all([
    fetch('assets/data/implementacion/boss-monster-links.csv', { cache: 'no-store' }).then(function (response) { return response.text(); }),
    fetch('assets/data/implementacion/monsters-index.csv', { cache: 'no-store' }).then(function (response) { return response.text(); })
  ]).then(function (sources) {
    state.links = parseCsv(sources[0]);
    state.monsters = parseCsv(sources[1]);
    state.loaded = true;
    if (window.GuideRouter && window.GuideRouter.render && window.location.hash.indexOf('#/bosses') === 0) {
      window.GuideRouter.render();
    }
  }).catch(function () {
    state.loaded = true;
  });
}());
