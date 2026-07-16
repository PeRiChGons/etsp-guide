/* Datos confirmados o pendientes usados por las páginas maestras de sistemas. */
(function () {
  'use strict';

  window.REFERENCE_DATA = {
    spiritRoot: {
      observedTypes: ['Thunder', 'Metal', 'Wood', 'Earth', 'Ice', 'Water', 'Wind', 'Fire'],
      actions: ['Fuse', 'Decompose', 'Upgrade All', 'Auto Upgrade', 'Remove', 'Equip'],
      comparisonFields: ['Power', 'Spirit Root Rating', 'Basic Stats', 'Supreme Stats'],
      resonanceCategories: ['Orange Resonance', 'Red Resonance', 'Pink Resonance', 'Golden Resonance'],
      resonanceLevels: ['0-star', '1-star', '2-star', '3-star'],
      resonanceStats: ['PEN', 'BLOCK', 'HP', 'DEF', 'S.A', 'CRIT', 'TEN', 'ATK'],
      fragments: ['Glossy Core Spirit Root', 'Golden Spirit Root Shard', 'Pink Spirit Root Shard'],
      coreRoots: [
        { name: 'Sun Spirit Root', observed: 'Glossy 2-Star · Universal · Lv.100', sources: ['Divine Compass', 'Dragon Treasure'] },
        { name: 'Moon Spirit Root', observed: 'Glossy 2-Star · Universal · Lv.100', sources: ['Divine Compass', 'Dragon Treasure'] }
      ]
    },
    technique: {
      floors: ['1F', '2F', '3F', '4F', '5F'],
      observedTiers: ['T7', 'T10', 'T13'],
      names: [
        'Ninefold Arcane', 'Heavenly Arcane', 'Primordial Arcane', 'Golden Sword Spell',
        'Immortal Script', 'Heavenly Chapter', 'Innate Aura', 'Earth Spirit Spell',
        'Sunfire Break', 'Rosy Light Knack', 'Limitless Divinity', 'Phoenfire Spell',
        'Nether Law', 'Fivefold Realm', 'Violet Thunder', 'Lotus Sutra',
        'True Essence', 'No-Leak Body', 'True Formula', 'Leaf Spell'
      ],
      detailed: [
        { name: 'Ninefold Arcane', tier: 'T(7/7)', stats: ['HP Bonus 0,76 %', 'DEF Bonus 2,81 %', 'BLOCK Bonus 1,41 %', 'Technique Stats +50 %'] },
        { name: 'Heavenly Arcane', tier: 'T(7/7)', stats: ['ATK Bonus 0,76 %', 'S.A Bonus 2,81 %', 'CRIT Bonus 1,41 %', 'Technique Stats +50 %'] },
        { name: 'Primordial Arcane', tier: 'T(7/7)', stats: ['HP Bonus 1,16 %', 'BLOCK Bonus 1,41 %', 'TEN Bonus 2,81 %', 'Technique Stats +50 %'] },
        { name: 'Immortal Script', tier: 'T(10/10)', stats: ['ATK Bonus 1,37 %', 'PEN Bonus 1,41 %', 'CRIT Bonus 1,41 %', 'Technique Stats +50 %'] },
        { name: 'Heavenly Chapter', tier: 'T(10/10)', stats: ['HP Bonus 0,89 %', 'ATK Bonus 0,68 %', 'PEN Bonus 1,41 %', 'Technique Stats +50 %'] },
        { name: 'Innate Aura', tier: 'T(10/10)', stats: ['HP Bonus 0,76 %', 'DEF Bonus 2,81 %', 'BLOCK Bonus 1,41 %', 'Technique Stats +50 %'] }
      ],
      special: [
        {
          name: 'Golden Sword Spell',
          status: 'P2W confirmado por el autor',
          facts: ['Golden Sword Spell desbloquea Sky Piercer hasta Lv.3', 'Genera Five-Element Force', 'Con cinco acumulaciones invoca Divine Dragon', 'Technique Stats +50 % al completar T7']
        },
        {
          name: 'Earth Spirit Spell',
          status: 'Método de obtención pendiente de verificar',
          facts: ['Earth Spirit Spell desbloquea Rock Shield Lv.3', 'DMG RED +7,5 % durante 8 segundos', 'Genera una acumulación de Five-Element Force', 'Technique Stats +50 % al completar T10']
        }
      ],
      material: 'Aura Crystalline',
      observedSource: 'Spirit Spring'
    },
    swordFlight: {
      names: ['Vermilion Bird', 'Azure Dragon', 'Azure Bird', 'Black Tortoise', 'White Tiger', 'Soaring Snake']
    },
    zodiac: {
      names: ['Gonggong', 'Hou Yi', 'Western Queen']
    },
    spirit: {
      captureDate: '14 de julio de 2026',
      capturedPages: 104,
      tabs: ['Details', 'Array', 'Evolution', 'Bond', 'Cleanse', 'Demoncore'],
      rarities: [
        { label: 'UR', names: ['Zhuyan', 'Dark Phoenix', 'Daji', 'Jiang Ziya', 'Yaoji', 'Lu Wu'] },
        { label: 'SSR', names: ['Huodou', 'Azure Ox', 'Sleek Rat', 'Jade Rabbit', 'Goddess Luo', 'White Tiger'] },
        { label: 'SR', names: ['Vermilion Bird', 'Dreamsnake', 'Martial Lord'] }
      ],
      arrayStates: ['Battle', 'Aid'],
      visibleStats: ['HP', 'ATK', 'DEF', 'S.A', 'PEN', 'CRIT', 'BLOCK', 'TEN'],
      upgradeActions: ['Quick Upgrade', 'Upgrade', 'Roll Back', 'Talent'],
      arrayFacts: [
        'Main Array consta de tres posiciones.',
        'Assistance Array consta de nueve posiciones ocupadas en la pantalla documentada.',
        'Las estadísticas de los Spirits desplegados se añaden a las del personaje.',
        'El Assistance Array aumenta el daño de Awakening Skill del Main Spirit según sus estrellas.'
      ],
      arrayActions: ['Get Spirit', 'Unlock Position', 'Quick Use', 'Remove the spirit'],
      evolutionFacts: [
        'Spirit Evolution aumenta la estrella del Spirit.',
        'La vista previa muestra cambios de Power, Rating, estadísticas y nivel de Awakening Skill.',
        'La evolución observada solicita una copia del Spirit y otro material de estrella.',
        'La interfaz ofrece Quick evolution y filtros All, SR, SSR y Meta.'
      ],
      treasure: {
        tabs: ['Kismet', 'Cross-Server Log', 'Personal Records'],
        drawActions: ['Single Draw', '10-Draw', '50-Draw'],
        guarantees: ['Cada 50 draws garantiza 3-Star SSR', 'Cada 10 draws garantiza 2-Star SR'],
        visibleMessages: ['Fortuna Favors You!', 'Kismet Spirit Treasure Luck Points have been cleared!'],
        voucher: 'Wisp Voucher',
        voucherPrompt: 'Spend 110 to purchase and complete this Treasure Hunt?',
        arraycore: [
          'Alioth Arraycore · T22 · HP 575 · DEF 72',
          'Mizar Arraycore · T22 · ATK 21 · S.A 72',
          'Alkaid Arraycore · T14 · HP 2300 · DEF 288'
        ],
        arrayFacts: [
          'La pantalla muestra Main Array, Assistance Array y Arraycore.',
          'El texto visible indica que los Spirits del Assistance Array aumentan el daño de Awakening Skill según sus estrellas.',
          'Fast Evolution permite mejorar rápidamente Spirits inferiores a 5 estrellas que puedan evolucionar.',
          'Los Spirits de 5 estrellas o superiores aparecen seleccionados por defecto en Fast Evolution.',
          'Put in spirits solicita dos Spirits de 5 estrellas en el estado documentado.'
        ],
        pending: [
          'Coste real de cada tipo de draw y moneda utilizada.',
          'Reglas completas de Luck Points y del Treasure Hunt.',
          'Relación exacta entre Wisp Voucher, Kismet y Spirit Treasure.',
          'Recompensas completas y requisitos de Fast Evolution.'
        ]
      },
      bond: {
        tabs: ['Present', 'Biography'],
        ranks: ['Stranger', 'Familiar', 'Confidant', 'Admired'],
        biographyFields: ['Title', 'Faction', 'Ability', 'Likes', 'Dislikes'],
        chapters: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'],
        actions: ['Voice', 'Story', 'Return'],
        intimacyObserved: [
          'Zhuyan · UR · Intimacy Points Lv.200 · 0/450',
          'Lu Wu · UR · Intimacy Points Lv.101 · 20/380',
          'Jiang Ziya · UR · Intimacy Points Lv.146 · 20/380',
          'Goddess Luo · SSR · Intimacy Points Lv.101 · 20/380',
          'Vermilion Bird · SR · Intimacy Points Lv.31 · 60/240',
          'Nezha · LR · Intimacy Points Lv.0 · 0/100'
        ],
        examples: [
          { spirit: 'Zhuyan', bond: 'Admired', details: ['Title: Chaos Root', 'Faction: Ancient Demoncourt', 'Ability: War Snare', 'Likes: Banana, Yaoji', 'Dislikes: Title: Huodou'] },
          { spirit: 'Lu Wu', bond: 'Confidant', details: ['Title: Enlightened Primabeast', 'Faction: Celestial Court', 'Ability: Circle of Sun&Moon', 'Likes: Meat, Wine', 'Dislikes: Vegetable'] },
          { spirit: 'Yaoji', bond: 'Confidant', details: ['Title: Mount Goddess', 'Faction: Celestial Court', 'Ability: Mount Charm', 'Likes: flowers, bask in the sun', 'Dislikes: Insect'] },
          { spirit: 'White Tiger', bond: 'Confidant', details: ['Title: White Tiger Sage', 'Faction: Ancient Demoncourt', 'Ability: White Tiger Dash', 'Likes: Monkey Head, Meat', 'Dislikes: Werewolf'] },
          { spirit: 'Dreamsnake', bond: 'Familiar', details: ['Title: Mount Li Spirit', 'Faction: Ancient Demoncourt', 'Ability: Serpent Step', 'Likes: practice sword, read stories (texto parcialmente visible)', 'Dislikes: Realgar'] },
          { spirit: 'Nezha', bond: 'Stranger', details: ['Title: Third Prince', 'Faction: Celestial Court', 'Ability: Samadhi Fire', 'Likes: Lotus root, toys', 'Dislikes: Pagoda King'] }
        ],
        confirmed: [
          'Present muestra Intimacy Points, una barra de progreso, estadísticas de referencia y los botones Quick Upgrade y Upgrade.',
          'Biography muestra el rango de Bond, los campos descriptivos y capítulos desplegables.',
          'En Nezha se observan capítulos bloqueados con requisitos de Affinity Lv.1 y Affinity Lv.11.',
          'Las fichas documentadas incluyen rarezas UR, SSR, SR y LR; los valores de Intimacy Points dependen del Spirit.'
        ],
        pending: [
          'Materiales y métodos para obtener Intimacy Points.',
          'Umbrales completos de cada rango de Bond.',
          'Bonificaciones mecánicas exactas asociadas a cada rango.',
          'Coste y resultado de Quick Upgrade y Upgrade.',
          'Requisitos completos de desbloqueo de cada capítulo.',
          'Efecto de Voice, Story y de los objetos de regalo.'
        ]
      },
      cleanseStats: ['HP Aptitude', 'ATK Aptitude', 'DEF Aptitude', 'S.A Aptitude', 'PEN Aptitude', 'CRIT Aptitude', 'Block Aptitude', 'TEN Aptitude'],
      cleanseActions: ['Auto Refine', 'Cleanse', 'Smart Refinement', 'Tier Up'],
      cleanseMaterials: ['Basic Cleansing Pill', 'Advanced Cleansing Pill'],
      cleanseVideo: {
        captureDate: '14 de julio de 2026',
        duration: '47,77 segundos',
        spirit: 'Dark Phoenix',
        rarity: 'UR',
        tier: 'T7',
        displayedCap: '14-Star Meta Spirit Cleanse Cap: T10',
        startingAptitudes: ['HP 437/500', 'ATK 406/500', 'PEN 399/500', 'Crit 414/500', 'TEN 435/500'],
        startingTotal: 2091,
        startingPower: '5.251.158',
        observedTotal: 2119,
        observedPower: '5.296.924',
        basicPillCounter: '33/1 → 6/1',
        manualFlow: [
          'Cleanse genera una propuesta para las cinco aptitudes.',
          'Las flechas verdes y rojas comparan la propuesta con los valores aceptados.',
          'Do not replace descarta la propuesta y Replace la aplica.',
          'El contador de Basic Cleansing Pill disminuye una unidad por intento.'
        ],
        automaticFlow: [
          'Auto Refine repite los intentos sin nuevas pulsaciones.',
          'Mientras está activo, el botón cambia a Stop Refining.',
          'Smart Refinement estaba activado durante la ejecución automática.',
          'El criterio exacto usado por Smart Refinement está pendiente de confirmar.'
        ]
      },
      pillArrayGroups: ['Trace Pill Array', 'Spirit Pill Array'],
      pillArrays: [
        'Sweeping Sand Array', 'Nether Frost Array', 'Earth Heart Array', 'Pit Treasure Array',
        'Yin-Yang Nine Stars Array', 'Endless Ice Array', 'Soaring Trigrams Array',
        'Three Talents Array', 'Six Heavens Array', 'The Plough Array'
      ],
      demoncoreActions: ['Inlay', 'Fuse', 'Decompose', 'Acquisition Method', 'Unequip'],
      pending: [
        'Contenido de Bond.',
        'Reglas completas de Arraycore.',
        'Costes y métodos de obtención de cada Spirit.',
        'Probabilidades y equivalencias de los materiales de Evolution.',
        'Funcionamiento exacto de Tier Up y límites de Cleanse.',
        'Lista completa de Demoncores y requisitos de cada Pill Array.'
      ]
    },
    activities: {
      captureDate: '16 de julio de 2026',
      confirmed: [
        { name: 'Time Realm', image: 'assets/images/activities/time-realm.jpg', facts: ['Mapa de etapas con rutas alternativas y nodos bloqueados.', 'La pantalla muestra Progress, Ranking, Daily Chest, Time Heart y Smart Idling.', 'La configuración de inactividad permite priorizar Time Lock Cleers o Elite Stage Clears.', 'La recompensa observada fue Time Stone +48.'] },
        { name: 'Rage Boss', image: 'assets/images/items/northern-abyss-talisman.jpg', facts: ['La actividad muestra Verdure Shrine y Northern Abyss.', 'La pantalla de recompensas incluye Primordial Talisman y el acceso Northern Abyss Order.', 'El nombre Northen/Northern debe conservarse según la etiqueta concreta de cada pantalla.'] },
        { name: 'Ancient Ruins', facts: ['Aparece como actividad accesible desde la pestaña de mazmorras.', 'También figura como método observado para obtener Spirit Root.'] },
        { name: 'Spirit Spring', facts: ['Aparece como actividad relacionada con Aura Crystalline.', 'La recompensa exacta por etapa queda pendiente de transcribir.'] }
      ],
      observed: ['Daily Quest', 'Dungeons', 'PvP', 'Alliance War', 'Kunlun'],
      pending: ['Costes y reinicios exactos de cada actividad.', 'Tabla completa de recompensas por dificultad y etapa.', 'Reglas de Ranking, Daily Chest y Time Heart.', 'Rutas óptimas de Smart Idling.']
    },
    objectCatalog: {
      categories: ['Talisman', 'Spirit Root', 'Technique', 'Material', 'Recompensa', 'Title', 'Outfit'],
      entries: [
        { name: 'Sun Spirit Root', category: 'Spirit Root', source: 'Divine Compass; Dragon Treasure', status: 'confirmado', notes: 'Core Spirit Root observado como Glossy 2-Star, Universal, Lv.100.' },
        { name: 'Moon Spirit Root', category: 'Spirit Root', source: 'Divine Compass; Dragon Treasure', status: 'confirmado', notes: 'Core Spirit Root observado como Glossy 2-Star, Universal, Lv.100.' },
        { name: 'Glossy Core Spirit Root', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento/material mostrado en Spirit Root.' },
        { name: 'Golden Spirit Root Shard', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento mostrado en Spirit Root.' },
        { name: 'Pink Spirit Root Shard', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento mostrado en Spirit Root.' },
        { name: 'Aura Crystalline', category: 'Material', source: 'Spirit Spring', status: 'confirmado', notes: 'Material visible para avanzar Techniques.' },
        { name: 'Golden Sword Spell', category: 'Technique', source: 'Compra; contenido P2W confirmado por el autor', status: 'confirmado', notes: 'Desbloquea Sky Piercer hasta Lv.3.' },
        { name: 'Earth Spirit Spell', category: 'Technique', source: 'Método pendiente de confirmar', status: 'observado', notes: 'Desbloquea Rock Shield Lv.3.' },
        { name: 'Basic Cleansing Pill', category: 'Material', source: 'Cleanse', status: 'observado', notes: 'Se consume durante los intentos de Cleanse.' },
        { name: 'Advanced Cleansing Pill', category: 'Material', source: 'Cleanse', status: 'observado', notes: 'Material mostrado en la interfaz de Cleanse.' },
        { name: 'Wisp Voucher', category: 'Talisman', source: 'Kismet / Spirit Treasure', status: 'observado', notes: 'La ventana documentada pregunta si se gastan 110 para completar Treasure Hunt.' },
        { name: 'Primordial Talisman', category: 'Talisman', source: 'Rage Boss: Verdure Shrine; Northen Abyss', status: 'confirmado', image: 'assets/images/items/northern-abyss-talisman.jpg', notes: 'La obtención desde Rage Boss fue confirmada por el autor.' },
        { name: 'Immortal Talisman', category: 'Talisman', source: 'Rage Boss: Verdure Shrine; Northen Abyss', status: 'confirmado', image: 'assets/images/items/northern-abyss-talisman.jpg', notes: 'La obtención desde Rage Boss fue confirmada por el autor.' },
        { name: 'Northen Abyss Order', category: 'Recompensa', source: 'Rage Boss: Northen Abyss', status: 'confirmado', image: 'assets/images/items/northern-abyss-talisman.jpg', notes: 'Tres niveles observados/confirmados: Basic gratuito, Advanced 4,99 $ y Precious 9,99 $.' },
        { name: 'Friendship Point', category: 'Recompensa', source: 'Kunlun Mirage; Guild Realm; Multiplayer Dungeon; Mirage Arcadia; Peak Duel', status: 'observado', notes: 'La descripción indica que se intercambia por objetos.' },
        { name: 'Golden Gear Stone', category: 'Material', source: 'Shop / Exchange; origen exacto por pantalla pendiente', status: 'observado', notes: 'Objeto visible en tienda/material audiovisual.' },
        { name: 'Heavenly Stone - Helm', category: 'Material', source: 'Shop / Exchange; origen exacto por pantalla pendiente', status: 'observado', notes: 'Objeto visible en tienda/material audiovisual.' },
        { name: 'Time Stone', category: 'Recompensa', source: 'Time Realm', status: 'confirmado', image: 'assets/images/activities/time-realm.jpg', notes: 'Recompensa observada: Time Stone +48 al superar una etapa.' }
      ]
    },
    wisp: {
      captureDate: '14 de julio de 2026',
      arrayLevel: 7,
      power: '22.601.915',
      experience: '403/435',
      occupiedSlots: 12,
      emptySlots: 4,
      aptitudeValues: [330, 386, 373, 441, 445, 225, 470, 500, 600, 591, 514, 450],
      tabs: ['Sprite', 'Sacrifice'],
      actions: ['Quick Summon', 'Summon'],
      relatedAccess: ['Spirit Beast Bag', 'Resonance', 'Stats Overview', 'Northern Abyss Order'],
      summonText: 'When opened, Wisp Array Level EXP +1',
      observedCountdown: '9d 06h32m',
      pendingScreens: [
        'Ayuda del sistema (?)',
        'Detalle de un Wisp',
        'Spirit Beast Bag',
        'Resonance',
        'Stats Overview',
        'Sacrifice',
        'Northern Abyss Order'
      ]
    }
  };
}());
