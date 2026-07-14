/* Catálogo central de rutas. Todo el contenido editorial pendiente queda señalado. */
(function () {
  'use strict';

  var classSections = ['Descripción', 'Habilidades', 'Estadísticas recomendadas', 'SwordFlight recomendado', 'Technique', 'Spirit Root', 'Zodiac recomendado', 'PvE', 'PvP'];

  window.GUIDE_MENU = [
    { title: 'Inicio', route: '/inicio' },
    { title: 'Guía general', route: '/guia-general', children: [
      'Primeros pasos', 'Interfaz principal', 'Progresión', 'Estadísticas', 'Recursos y monedas', 'Consejos para nuevos jugadores', 'Contenido gratuito y P2W'
    ] },
    { title: 'Sistemas del personaje', route: '/sistemas-del-personaje', children: [
      { title: 'Stats', route: '/sistemas-del-personaje/stats', children: ['Basic Stats', 'Special Stats'] },
      'Skill',
      { title: 'Spirit Root', route: '/sistemas-del-personaje/spirit-root', children: ['Tipos de Spirit Root', 'Mejoras', 'Fuse', 'Decompose', 'Resonance', 'Sacrifice', 'Core Spirit Root', 'Obtención y materiales'] },
      { title: 'Technique', route: '/sistemas-del-personaje/technique', children: ['Funcionamiento general', 'Plantas', 'Techniques normales', 'Techniques especiales', 'Materiales de mejora'] },
      { title: 'SwordFlight', route: '/sistemas-del-personaje/swordflight', children: ['Funcionamiento general', 'Vermilion Bird', 'Azure Dragon', 'Azure Bird', 'Black Tortoise', 'White Tiger', 'Soaring Snake'] },
      { title: 'Zodiac Transformations', route: '/sistemas-del-personaje/zodiac', children: ['Funcionamiento general', 'Gonggong', 'Hou Yi', 'Western Queen'] },
      { title: 'Spirit', route: '/sistemas-del-personaje/spirit', children: ['Vista general', 'Spirits documentados', 'Basic y Upgrade', 'Array y Arraycore', 'Kismet / Spirit Treasure', 'Evolution', 'Bond', 'Cleanse y Tier Up', 'Demoncore y Pill Array', 'Datos pendientes'] },
      { title: 'Wisp', route: '/sistemas-del-personaje/wisp', children: ['Vista general', 'Wisp Array', 'Sprite y Summon', 'Sacrifice', 'Accesos relacionados', 'Datos pendientes'] }
    ] },
    { title: 'Equipamiento y mejoras', route: '/equipamiento-y-mejoras', children: ['Equipamiento', 'Rarezas', 'Tiers', 'Estrellas', 'Craft', 'Mejoras', 'Bonificaciones', 'Materiales'] },
    { title: 'Clases', route: '/clases', children: [
      'Comparación de clases',
      { title: 'Dragon Lancer', route: '/clases/dragon-lancer', children: classSections },
      { title: 'Lunarborn', route: '/clases/lunarborn', children: classSections },
      { title: 'Spiritfox', route: '/clases/spiritfox', children: classSections },
      { title: 'Swordsage', route: '/clases/swordsage', children: classSections }
    ] },
    { title: 'Proyecto', route: '/proyecto', children: ['Sobre la guía', 'Objetivo', 'Autores', 'Verificación de la información', 'Fuentes', 'Investigación web', 'Aviso sobre contenido no oficial'] }
  ];

  // Nombres transcritos de las capturas del juego aportadas para la guía.
  // No se añaden interpretaciones hasta disponer de una descripción verificada.
  window.STATS_CONTENT = {
    basic: [
      'HP', 'ATK', 'S.A', 'DEF', 'CRIT', 'TEN', 'PEN', 'BLOCK',
      'DMG Absorption', 'DMG Boost', 'DMG RED', 'Focus Strike',
      'Focus Resistance', 'Bash', 'Bash Resistance', 'Skill Bonus',
      'Skill Reduction', 'Spirit Bonus', 'Spirit Reduction',
      'Transformation Bonus', 'Transformation Reduction',
      'Technique Bonus', 'Technique Reduction'
    ],
    special: [
      'HP Bonus', 'ATK Bonus', 'S.A Bonus', 'DEF Bonus', 'CRIT Bonus',
      'TEN Bonus', 'PEN Bonus', 'CRIT DMG Bonus', 'BLOCK Bonus', 'Stun',
      'Stun RES', 'Suppression', 'Suppression RES', 'EXP Boost',
      'Stamina Points Bonus'
    ]
  };

  // Convierte títulos en identificadores legibles y estables para enlaces internos.
  window.slugify = function (text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  function flattenTitles(items) {
    var result = [];
    items.forEach(function (item) {
      var entry = typeof item === 'string' ? { title: item } : item;
      result.push(entry.title);
      if (entry.children) { result = result.concat(flattenTitles(entry.children)); }
    });
    return result;
  }

  function findTopLevel(route) {
    return window.GUIDE_MENU.find(function (item) {
      return item.route === route || (route.indexOf('/clases/') === 0 && item.route === '/clases');
    });
  }

  window.getPage = function (route) {
    var classMatch = route.match(/^\/clases\/(dragon-lancer|lunarborn|spiritfox|swordsage)$/);
    var top = findTopLevel(route);
    var customPages = {
      '/inicio': { title: 'Inicio', type: 'home', sections: ['Estado de la guía', 'Accesos rápidos', 'Método de trabajo'] },
      '/sistemas-del-personaje/stats': { title: 'Stats', type: 'stats', sections: ['Basic Stats', 'Special Stats', 'Criterio de verificación'] },
      '/sistemas-del-personaje/spirit-root': { title: 'Spirit Root', type: 'spirit-root', sections: ['Tipos de Spirit Root', 'Mejoras', 'Fuse', 'Decompose', 'Resonance', 'Sacrifice', 'Core Spirit Root', 'Obtención y materiales'] },
      '/sistemas-del-personaje/technique': { title: 'Technique', type: 'technique', sections: ['Funcionamiento general', 'Plantas', 'Techniques normales', 'Techniques especiales', 'Materiales de mejora'] },
      '/sistemas-del-personaje/swordflight': { title: 'SwordFlight', type: 'swordflight', sections: ['Funcionamiento general', 'Vermilion Bird', 'Azure Dragon', 'Azure Bird', 'Black Tortoise', 'White Tiger', 'Soaring Snake'] },
      '/sistemas-del-personaje/zodiac': { title: 'Zodiac Transformations', type: 'zodiac', sections: ['Funcionamiento general', 'Gonggong', 'Hou Yi', 'Western Queen'] },
      '/sistemas-del-personaje/spirit': { title: 'Spirit', type: 'spirit', sections: ['Vista general', 'Spirits documentados', 'Basic y Upgrade', 'Array y Arraycore', 'Kismet / Spirit Treasure', 'Evolution', 'Bond', 'Cleanse y Tier Up', 'Demoncore y Pill Array', 'Datos pendientes'] },
      '/sistemas-del-personaje/wisp': { title: 'Wisp', type: 'wisp', sections: ['Vista general', 'Wisp Array', 'Sprite y Summon', 'Sacrifice', 'Accesos relacionados', 'Datos pendientes'] },
      '/proyecto': { title: 'Proyecto', type: 'project', sections: ['Sobre la guía', 'Objetivo', 'Autores', 'Verificación de la información', 'Fuentes', 'Investigación web', 'Aviso sobre contenido no oficial'] }
    };
    if (customPages[route]) {
      var customPage = customPages[route];
      customPage.route = route;
      if (route.indexOf('/sistemas-del-personaje/') === 0) {
        customPage.parent = 'Sistemas del personaje';
        customPage.parentRoute = '/sistemas-del-personaje';
      }
      return customPage;
    }
    if (classMatch) {
      var names = { 'dragon-lancer': 'Dragon Lancer', lunarborn: 'Lunarborn', spiritfox: 'Spiritfox', swordsage: 'Swordsage' };
      return { title: names[classMatch[1]], parent: 'Clases', sections: classSections };
    }
    if (!top) { return null; }
    return {
      title: top.title,
      parent: null,
      sections: top.children ? flattenTitles(top.children) : ['Presentación de la guía', 'Estado del contenido']
    };
  };
}());
