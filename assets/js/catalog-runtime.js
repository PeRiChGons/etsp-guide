/*
 * Carga los catálogos grandes del cliente sin convertirlos en páginas separadas.
 * Los registros incompletos se conservan: el buscador los muestra y usa «?»
 * en los campos que todavía no tienen un valor legible.
 */
(function () {
  'use strict';

  var catalog = {
    objects: [],
    dungeons: [],
    mechanics: [],
    menus: [],
    relations: [],
    loaded: false,
    error: ''
  };

  window.COMPLETE_GAME_CATALOG = catalog;

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var cell = '';
    var quoted = false;
    var i;
    for (i = 0; i < text.length; i += 1) {
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
    if (cell !== '' || row.length) {
      row.push(cell);
      rows.push(row);
    }
    if (!rows.length) { return []; }
    var headers = rows.shift().map(function (header) { return header.replace(/^\uFEFF/, '').trim(); });
    return rows.map(function (values) {
      var result = {};
      headers.forEach(function (header, index) { result[header] = (values[index] || '').trim(); });
      return result;
    });
  }

  function readJson(path) {
    return fetch(path, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) { throw new Error(path + ' (' + response.status + ')'); }
      return response.json();
    });
  }

  function readCsv(path) {
    return fetch(path, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) { throw new Error(path + ' (' + response.status + ')'); }
      return response.text();
    }).then(parseCsv);
  }

  function normalizeObjects(rows) {
    var allowed = {
      'objects-equipment': 'Objetos y equipo',
      'outfits-fashion': 'Outfits',
      titles: 'Titles',
      swordflight: 'SwordFlight',
      'spirit-wisp': 'Spirit y Wisp'
    };
    return rows.filter(function (row) { return allowed[row.categoria]; }).map(function (row) {
      return {
        id: row.id_registro || '?',
        name: row.nombre_visible || row.nombre_interno || '?',
        internalName: row.nombre_interno || '?',
        category: allowed[row.categoria] || row.categoria || '?',
        description: row.descripcion || '?',
        source: row.fuente_obtencion || '?',
        image: row.icono_relativo ? 'assets/images/game-data/' + row.categoria + '/' + row.icono_relativo.split(/[\\/]/).pop() : '',
        bundle: row.bundle_origen || '?',
        status: row.estado || '?',
        aliases: [row.nombre_interno || '', row.categoria || '', 'objeto', 'item'].join(' ')
      };
    });
  }

  Promise.all([
    readJson('assets/data/object-search-database.json'),
    readCsv('assets/data/catalogos-maestros/dungeon-catalog.csv'),
    readCsv('assets/data/catalogos-maestros/mechanics-catalog.csv'),
    readCsv('assets/data/catalogos-maestros/menu-catalog.csv'),
    readCsv('assets/data/catalogos-maestros/relations.csv')
  ]).then(function (result) {
    catalog.objects = normalizeObjects(result[0]);
    catalog.dungeons = result[1];
    catalog.mechanics = result[2];
    catalog.menus = result[3];
    catalog.relations = result[4];
    catalog.loaded = true;
    document.dispatchEvent(new CustomEvent('catalog:loaded'));
  }).catch(function (error) {
    catalog.error = String(error && error.message ? error.message : error);
    catalog.loaded = true;
    document.dispatchEvent(new CustomEvent('catalog:loaded'));
  });
}());
