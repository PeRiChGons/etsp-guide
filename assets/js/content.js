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
      { title: 'Spirit Root', children: ['Tipos de Spirit Root', 'Mejoras', 'Fuse', 'Decompose', 'Resonance', 'Sacrifice', 'Core Spirit Root'] },
      { title: 'Technique', children: ['Funcionamiento general', 'Plantas', 'Techniques normales', 'Techniques especiales', 'Materiales de mejora'] },
      { title: 'SwordFlight', children: ['Funcionamiento general', 'Vermilion Bird', 'Azure Dragon', 'Azure Bird', 'Black Tortoise', 'White Tiger', 'Soaring Snake'] },
      { title: 'Zodiac Transformations', children: ['Funcionamiento general', 'Gonggong', 'Hou Yi', 'Western Queen'] }
    ] },
    { title: 'Equipamiento y mejoras', route: '/equipamiento-y-mejoras', children: ['Equipamiento', 'Rarezas', 'Tiers', 'Estrellas', 'Craft', 'Mejoras', 'Bonificaciones', 'Materiales'] },
    { title: 'Clases', route: '/clases', children: [
      'Comparación de clases',
      { title: 'Dragon Lancer', route: '/clases/dragon-lancer', children: classSections },
      { title: 'Lunarborn', route: '/clases/lunarborn', children: classSections },
      { title: 'Spiritfox', route: '/clases/spiritfox', children: classSections },
      { title: 'Swordsage', route: '/clases/swordsage', children: classSections }
    ] },
    { title: 'Proyecto', route: '/proyecto', children: ['Sobre la guía', 'Objetivo', 'Autores', 'Verificación de la información', 'Fuentes', 'Aviso sobre contenido no oficial'] }
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
    if (route === '/sistemas-del-personaje/stats') {
      return {
        title: 'Stats',
        parent: 'Sistemas del personaje',
        parentRoute: '/sistemas-del-personaje',
        type: 'stats',
        sections: ['Basic Stats', 'Special Stats', 'Criterio de verificación']
      };
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
