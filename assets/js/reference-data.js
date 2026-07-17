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
        { name: 'Rage Boss', image: 'assets/images/activities/rage-boss-northern-abyss.jpg', facts: ['La actividad muestra Verdure Shrine y Northern Abyss.', 'La pantalla de recompensas incluye Primordial Talisman y el acceso Northern Abyss Order.', 'El nombre Northen/Northern debe conservarse según la etiqueta concreta de cada pantalla.'] },
        { name: 'Ancient Ruins', facts: ['Aparece como actividad accesible desde la pestaña de mazmorras.', 'También figura como método observado para obtener Spirit Root.'] },
        { name: 'Spirit Spring', facts: ['Aparece como actividad relacionada con Aura Crystalline.', 'La recompensa exacta por etapa queda pendiente de transcribir.'] }
      ],
      observed: ['Daily Quest', 'Dungeons', 'PvP', 'Alliance War', 'Kunlun'],
      pending: ['Costes y reinicios exactos de cada actividad.', 'Tabla completa de recompensas por dificultad y etapa.', 'Reglas de Ranking, Daily Chest y Time Heart.', 'Rutas óptimas de Smart Idling.']
    },
    objectCatalog: {
      review: {
        method: 'Fotogramas de cambios de pantalla y muestras temporales; los fotogramas duplicados sin cambios se omiten.',
        lastReview: '16 de julio de 2026',
        evidenceRule: 'Solo se publica una imagen si corresponde al objeto cuyo nombre aparece en la misma ventana.',
        pendingRule: 'Cuando el nombre o el icono no se leen completos, la ficha queda como observado y sin imagen pública.'
      },
      categories: ['Talisman', 'Spirit', 'Spirit Root', 'Technique', 'Material', 'Gear', 'Trinket', 'Arraycore', 'Currency', 'Recompensa', 'Title', 'Outfit'],
      entries: [
        { name: 'Sun Spirit Root', category: 'Spirit Root', source: 'Divine Compass; Dragon Treasure', status: 'confirmado', notes: 'Core Spirit Root observado como Glossy 2-Star, Universal, Lv.100.' },
        { name: 'Moon Spirit Root', category: 'Spirit Root', source: 'Divine Compass; Dragon Treasure', status: 'confirmado', notes: 'Core Spirit Root observado como Glossy 2-Star, Universal, Lv.100.' },
        { name: 'Glossy Core Spirit Root', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento/material mostrado en Spirit Root.' },
        { name: 'Golden Spirit Root Shard', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento mostrado en Spirit Root.' },
        { name: 'Pink Spirit Root Shard', category: 'Material', source: 'Ancient Ruins', status: 'observado', notes: 'Fragmento mostrado en Spirit Root.' },
        { name: 'Aura Crystalline', category: 'Material', source: 'Spirit Spring; Boss Store', status: 'confirmado', image: 'assets/images/items/clean/aura-crystalline-icon.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material visible para avanzar Techniques; su icono aparece en Boss Store.' },
        { name: 'Golden Sword Spell', category: 'Technique', source: 'Compra; contenido P2W confirmado por el autor', status: 'confirmado', notes: 'Desbloquea Sky Piercer hasta Lv.3.' },
        { name: 'Earth Spirit Spell', category: 'Technique', source: 'Método pendiente de confirmar', status: 'observado', notes: 'Desbloquea Rock Shield Lv.3.' },
        { name: 'Basic Cleansing Pill', category: 'Material', source: 'Cleanse', status: 'confirmado', image: 'assets/images/items/clean/basic-cleansing-pill-icon.jpg', sourceVideo: 'Cleanse.mp4', timestamp: '00:00', notes: 'Se consume durante los intentos de Cleanse.' },
        { name: 'Advanced Cleansing Pill', category: 'Material', source: 'Cleanse', status: 'confirmado', image: 'assets/images/items/clean/advanced-cleansing-pill-icon.jpg', sourceVideo: 'Cleanse.mp4', timestamp: '00:00', notes: 'Material mostrado en la interfaz de Cleanse.' },
        { name: 'Wisp Voucher', category: 'Talisman', source: 'Kismet / Spirit Treasure', status: 'observado', sourceVideo: 'Spirit Treasure y lo que consigues.mp4', notes: 'La ventana documentada pregunta si se gastan 110 para completar Treasure Hunt.' },
        { id: '110010003', name: 'Primordial Talisman', category: 'Talisman', source: 'Rage Boss: Verdure Shrine; Northen Abyss', clientGoTo: 7112, clientResource: 'artresourcesv2/ui/texture/goods/110010003', clientBundle: 'ui/texture_v2/goods/goods_9_110010.assetbundle', aliases: ['talisman', 'primordial', 'spirit beast', 'gold spirit beast', 'gold beast', 'summon'], status: 'confirmado', image: 'assets/images/items/game-icons/110010003.png', sourceVideo: 'Wisp.mp4', timestamp: '00:25', notes: 'Registro del cliente: Primordial Talisman. Open for a chance to get up to a Gold Spirit Beast.' },
        { id: '110010002', name: 'True Immortal Talisman', category: 'Talisman', source: 'Rage Boss: Verdure Shrine; Northen Abyss', clientGoTo: 7112, clientResource: 'artresourcesv2/ui/texture/goods/110010002', clientBundle: 'ui/texture_v2/goods/goods_9_110010.assetbundle', aliases: ['talisman', 'true immortal', 'immortal talisman', 'spirit beast', 'pink spirit beast', 'pink beast', 'summon'], status: 'confirmado', image: 'assets/images/items/game-icons/110010002.png', sourceVideo: 'Wisp.mp4', timestamp: '00:30', notes: 'Registro del cliente: True Immortal Talisman. Open for a chance to get up to a Pink Spirit Beast.' },
        { id: '110010001', name: 'Normal Talisman', category: 'Talisman', source: 'Rage Boss: Verdure Shrine; Northen Abyss', clientGoTo: 7112, clientResource: 'artresourcesv2/ui/texture/goods/110010001', clientBundle: 'ui/texture_v2/goods/goods_9_110010.assetbundle', aliases: ['talisman', 'normal', 'spirit beast', 'red spirit beast', 'red beast', 'summon'], status: 'confirmado', image: 'assets/images/items/game-icons/110010001.png', notes: 'Registro del cliente: Normal Talisman. Open for a chance to get up to a Red Spirit Beast.' },
        { name: 'Northen Abyss Order', category: 'Recompensa', source: 'Rage Boss: Northen Abyss', status: 'confirmado', notes: 'Tres niveles observados/confirmados: Basic gratuito, Advanced 4,99 $ y Precious 9,99 $.' },
        { name: 'Demonseal Token', category: 'Currency', source: 'Daily Top-Up; Daily Activities; Level Rewards; Shop', status: 'observado', sourceVideo: 'Kunlun.mp4', notes: 'Token mostrado en Kunlun; se usa en el área Beast para invocar un Beast.' },
        { name: 'Guild Rally Order', category: 'Currency', source: 'Shop / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Objeto visible en la tienda de intercambio.' },
        { name: 'Love Knot', category: 'Currency', source: 'Love / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Objeto visible en las secciones de Love y Exchange.' },
        { name: 'Love Fate', category: 'Currency', source: 'Love Game', status: 'observado', sourceVideo: 'Love, Love Game and giveway.mp4', notes: 'Recurso visible en las pantallas de Love, Token y Co-Travel.' },
        { name: 'Acquainted Ring', category: 'Trinket', source: 'Love Fate', status: 'observado', sourceVideo: 'Love, Love Game and giveway.mp4', notes: 'Anillo mostrado con HP, DEF y BLOCK; Love Fate aparece como método.' },
        { name: 'Alioth Arraycore', category: 'Arraycore', source: 'Spirit Treasure', status: 'confirmado', image: 'assets/images/items/clean/alioth-arraycore-icon.jpg', sourceVideo: 'Spirit Treasure y lo que consigues.mp4', timestamp: '01:40', notes: 'Arraycore observado en T22 con HP 575 y DEF 72.' },
        { name: 'Mizar Arraycore', category: 'Arraycore', source: 'Spirit Treasure', status: 'confirmado', image: 'assets/images/items/clean/mizar-arraycore-icon.jpg', sourceVideo: 'Spirit Treasure y lo que consigues.mp4', timestamp: '01:40', notes: 'Arraycore observado en T22 con ATK 21 y S.A 72.' },
        { name: 'Alkaid Arraycore', category: 'Arraycore', source: 'Spirit Treasure', status: 'confirmado', image: 'assets/images/items/clean/alkaid-arraycore-icon.jpg', sourceVideo: 'Spirit Treasure y lo que consigues.mp4', timestamp: '01:40', notes: 'Arraycore observado en T14 con HP 2300 y DEF 288.' },
        { name: 'Trinket Soulshard', category: 'Material', source: 'Celestial Realm', status: 'observado', sourceVideo: 'Dungeon1.mp4', notes: 'Material mostrado para aumentar el nivel de un Trinket.' },
        { name: 'Trinket Soulcore', category: 'Material', source: 'Celestial Realm', status: 'observado', sourceVideo: 'Dungeon1.mp4', notes: 'Material mostrado para aumentar el nivel de un Trinket.' },
        { name: 'Immortal Chest', category: 'Recompensa', source: 'Darkforce Chest', status: 'observado', sourceVideo: 'otro mas.mp4', notes: 'Cofre mostrado dentro de Darkforce Chest con reglas de intentos y recompensas.' },
        { name: 'Demon Chest', category: 'Recompensa', source: 'Darkforce Chest', status: 'observado', sourceVideo: 'otro mas.mp4', notes: 'Cofre mostrado dentro de Darkforce Chest con reglas de intentos y recompensas.' },
        { name: 'SSR Card Shard', category: 'Material', source: 'Darkforce Chest', status: 'observado', sourceVideo: 'otro mas.mp4', notes: 'Recompensa posible visible en la tabla de probabilidades.' },
        { name: 'SR Card', category: 'Material', source: 'Darkforce Chest', status: 'observado', sourceVideo: 'otro mas.mp4', notes: 'Recompensa posible visible en la tabla de probabilidades.' },
        { name: 'R Card', category: 'Material', source: 'Darkforce Chest', status: 'observado', sourceVideo: 'otro mas.mp4', notes: 'Recompensa posible visible en la tabla de probabilidades.' },
        { name: 'Ingots', category: 'Currency', source: 'Quick Clear / juego', status: 'observado', sourceVideo: 'otro.mp4', notes: 'La regla visible de Quick Clear menciona gastar 500 Ingots.' },
        { name: 'Golden Gear Stone', category: 'Material', source: 'Shop / Exchange', status: 'confirmado', image: 'assets/images/items/clean/golden-gear-stone-icon.jpg', detailImage: 'assets/images/object-details/golden-gear-stone.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material de equipo con icono propio visible en Boss Store.' },
        { name: 'Golden Accessory Stone', category: 'Material', source: 'Chaotic Realm', status: 'confirmado', detailImage: 'assets/images/object-details/golden-accessory-stone.jpg', notes: 'Ficha descriptiva observada en Bag: Gear Material para fabricar anillos y collares dorados.' },
        { name: 'Heavenly Stone - Helm', category: 'Material', source: 'Verdure Shrine; Trading Center', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material Heavenly Stone para casco, mostrado en el tooltip de la tienda.' },
        { name: 'Time Stone', category: 'Recompensa', source: 'Time Realm', status: 'confirmado', sourceVideo: 'juego AFK xD.mp4', timestamp: 'resultado observado', notes: 'Recompensa observada: Time Stone +48 al superar una etapa. La imagen propia del objeto queda pendiente; no se usa una captura general de Time Realm como icono.' },
        { name: 'Sky-Mending Stone', category: 'Material', source: 'Craft / equipo glossy', status: 'confirmado', image: 'assets/images/items/clean/sky-mending-stone-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '01:40', notes: 'Material de forja descrito como necesario para promocionar equipo a calidad glossy.' },
        { name: 'Immortal Gear Holyst', category: 'Material', source: 'Fuse', status: 'confirmado', image: 'assets/images/items/clean/immortal-gear-holyst-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '01:50', notes: 'Material obtenido al fusionar 8 Golden Gear Stones; puede desmontarse de nuevo en Golden Gear Stones.' },
        { name: 'Qiongqi Chestplate', category: 'Gear', source: 'Craft', status: 'confirmado', image: 'assets/images/items/clean/qiongqi-chestplate-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '00:10', notes: 'Pieza de equipo Qiongqi mostrada en la lista de Common Craft.' },
        { name: 'Qiongqi Heavy Boots', category: 'Gear', source: 'Craft', status: 'observado', sourceVideo: 'Craft.mp4', notes: 'Pieza de equipo Qiongqi observada en Craft; falta un fotograma limpio de su icono.' },
        { name: 'Qiongqi Spear', category: 'Gear', source: 'Craft', status: 'confirmado', image: 'assets/images/items/clean/qiongqi-spear-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '00:10', notes: 'Arma Qiongqi mostrada en la lista de Common Craft.' },
        { name: 'Qiongqi Bracers', category: 'Gear', source: 'Craft', status: 'confirmado', image: 'assets/images/items/clean/qiongqi-bracers-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '00:10', notes: 'Pieza de equipo Qiongqi mostrada en la lista de Common Craft.' },
        { name: 'Qiongqi Heavy Helmet', category: 'Gear', source: 'Craft', status: 'confirmado', image: 'assets/images/items/clean/qiongqi-heavy-helmet-icon.jpg', sourceVideo: 'Craft.mp4', timestamp: '00:10', notes: 'Pieza de equipo Qiongqi mostrada en la lista de Common Craft.' },
        { name: 'Qiongqi Belt', category: 'Gear', source: 'Craft', status: 'observado', sourceVideo: 'Craft.mp4', notes: 'Pieza de equipo Qiongqi observada en Craft; falta un recorte limpio porque el mando tapa parte del icono en la muestra disponible.' },
        { name: 'Qiongqi Ring', category: 'Gear', source: 'Chaotic Realm', status: 'observado', sourceVideo: 'Diarias2.mp4', notes: 'Pieza de equipo mostrada con Gear Rating, Power y estadísticas.' },
        { name: 'Trinket Pack - Earth Tier', category: 'Trinket', source: 'Celestial Realm', status: 'confirmado', image: 'assets/images/items/clean/trinket-pack-earth-tier-icon.jpg', sourceVideo: 'Dungeon1.mp4', timestamp: '00:15', notes: 'Proporciona aleatoriamente un Earth Tier Trinket Shard; el tooltip muestra Celestial Realm como método.' },
        { name: 'Trinket Pack - Mystic Tier', category: 'Trinket', source: 'Celestial Realm / Fuse', status: 'confirmado', image: 'assets/images/items/clean/trinket-pack-mystic-tier-icon.jpg', sourceVideo: 'Dungeon1.mp4', timestamp: '00:45', notes: 'Proporciona aleatoriamente un Mystic Tier Trinket; el tooltip muestra Celestial Realm y Fuse.' },
        { name: 'Earth - Ruined Lantern', category: 'Trinket', source: 'Celestial Realm', status: 'confirmado', image: 'assets/images/items/clean/earth-ruined-lantern-icon.jpg', sourceVideo: 'Dungeon1.mp4', timestamp: '00:20', notes: 'Trinket mostrado con descripción y método de obtención Celestial Realm.' },
        { name: 'Resonance Lostsoul', category: 'Trinket', source: 'Celestial Realm', status: 'confirmado', image: 'assets/images/items/clean/resonance-lostsoul-icon.jpg', sourceVideo: 'Dungeon1.mp4', timestamp: '00:40', notes: 'Objeto mostrado con tooltip y método de obtención Celestial Realm.' },
        { name: 'Mystic Primal Stone', category: 'Material', source: 'Mystic Jade', status: 'observado', sourceVideo: 'otro.mp4', notes: 'Objeto R8 - Lv.39 mostrado dentro de Mystic Jade.' },
        { name: 'Friendship Point', category: 'Currency', source: 'Kunlun Mirage; Guild Realm; Multiplayer Dungeon; Mirage Arcadia; Peak Duel', status: 'observado', sourceVideo: 'Diarias1.mp4', notes: 'Moneda intercambiable por objetos según la descripción visible.' },
        { name: 'Star Diamond', category: 'Currency', source: 'Shop / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Moneda mostrada en las secciones de tienda y Exchange.' },
        { name: 'Blue Flux', category: 'Material', source: 'Alliance War; Merit Store', status: 'observado', sourceVideo: 'Alliance War.mp4', notes: 'Tooltip visible en Alliance War; aumenta estadísticas y muestra Alliance War/Merit Store como adquisición.' },
        { name: 'Blue Flux Pack', category: 'Recompensa', source: 'Alliance War; Merit Store', status: 'observado', sourceVideo: 'Alliance War.mp4', notes: 'Pack de Blue Flux mostrado en la pantalla de recompensa/intercambio.' },
        { name: 'Skyfire Heavy Boots', category: 'Gear', source: 'Alliance War', status: 'observado', sourceVideo: 'Alliance War.mp4', notes: 'Pieza anunciada en el registro de recompensas de Alliance War.' },
        { name: 'Transformation Elixir', category: 'Material', source: 'Shop / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Objeto de Zodiac mostrado con tooltip de adquisición en la tienda.' },
        { name: 'Transform Flux Pack', category: 'Recompensa', source: 'Alliance War; Merit Store', status: 'observado', detailImage: 'assets/images/object-details/transform-flux-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack que concede Transform Flux y muestra Alliance War y Merit Store como métodos.' },
        { name: 'T16 Gear Pack', category: 'Gear', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo observado en Boss Store.' },
        { name: 'T17 Gear Pack', category: 'Gear', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo observado en Boss Store.' },
        { name: 'T17 Necklace or Ring', category: 'Gear', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de selección de collar o anillo T17.' },
        { name: 'T17 Accessory or Armor', category: 'Gear', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de selección de accesorio o armadura T17.' },
        { name: 'Island Selection Pack', category: 'Recompensa', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de selección mostrado en la tienda.' },
        { name: 'Accessory Spiritstone', category: 'Material', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/accessory-spiritstone-icon.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material de accesorio con icono propio visible en Boss Store.' },
        { name: 'Pink Gear Spiritstone', category: 'Material', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/pink-gear-spiritstone-icon.jpg', detailImage: 'assets/images/object-details/pink-gear-spiritstone.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material de equipo rosa con icono propio visible en Boss Store.' },
        { name: 'Pink Accessory Spiritstone', category: 'Material', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material de accesorio rosa mostrado en la tienda.' },
        { name: 'Orange 1-Star Holyware', category: 'Gear', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/orange-1-star-holyware-icon.jpg', detailImage: 'assets/images/object-details/orange-1-star-holyware.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Pieza Holyware naranja de 1 estrella mostrada con icono propio en la tienda.' },
        { name: '1-Star Awakened Soul', category: 'Material', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/one-star-awakened-soul-icon.jpg', detailImage: 'assets/images/object-details/one-star-awakened-soul.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material de despertar de alma mostrado con icono propio en la tienda.' },
        { name: 'Orange Rune Shard', category: 'Material', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/orange-rune-shard-icon.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Fragmento de runa naranja mostrado con icono propio en la tienda.' },
        { name: 'Mantra Stone', category: 'Material', source: 'Boss Store / Exchange', status: 'confirmado', image: 'assets/images/items/clean/mantra-stone-icon.jpg', sourceVideo: 'Shop no pay.mp4', timestamp: '03:20', notes: 'Material de runa mostrado con icono propio en la tienda.' },
        { name: 'Orange 0-Star Totem', category: 'Material', source: 'Boss Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Totem naranja de 0 estrellas mostrado en la tienda.' },
        { name: 'Orange 0-Star Totem Select', category: 'Recompensa', source: 'Boss Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/orange-0-star-totem-select.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Caja de selección de Totem naranja de 0 estrellas.' },
        { name: '1 Rose', category: 'Currency', source: 'Shop / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Regalo de una rosa mostrado en la tienda.' },
        { name: '99 Roses', category: 'Currency', source: 'Shop / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de 99 rosas mostrado en la tienda.' },
        { name: 'Feather of the Phoenix', category: 'Material', source: 'Shop / Exchange', status: 'observado', detailImage: 'assets/images/object-details/feather-of-the-phoenix.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Material Feather of the Phoenix mostrado en la tienda.' },
        { name: 'Renomance Card', category: 'Recompensa', source: 'Shop / Exchange', status: 'observado', detailImage: 'assets/images/object-details/rename-card.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Nombre leído en la tarjeta de intercambio; queda pendiente una captura de mayor resolución.' },
        { name: 'Small Zodiac Pack', category: 'Recompensa', source: 'Merit Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de Zodiac pequeño mostrado en Merit Store.' },
        { name: 'Mega Zodiac Pack', category: 'Recompensa', source: 'Merit Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de Zodiac grande mostrado en Merit Store.' },
        { name: 'Zodiac Pinkdust', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/zodiac-pinkdust.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Material Zodiac Pinkdust mostrado en Merit Store.' },
        { name: 'Solar Lord Glyph Shard', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Fragmento de glifo Solar Lord mostrado en Merit Store.' },
        { name: 'Dragonlord Glyph Shard', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Fragmento de glifo Dragonlord mostrado en Merit Store.' },
        { name: 'Mount Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia de montura mostrada en los materiales de la tienda.' },
        { name: 'Trail Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia de Trail mostrada en los materiales de la tienda.' },
        { name: 'Wing Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia de alas mostrada en los materiales de la tienda.' },
        { name: 'Talisman Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia de talismán mostrada en los materiales de la tienda.' },
        { name: 'Spirit Upgrade Pill', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Píldora para mejorar espíritus mostrada en la tienda.' },
        { name: 'Transformation Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia de transformación mostrada en la tienda.' },
        { name: 'Transfer Card', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Tarjeta de transferencia mostrada en la oferta semanal.' },
        { name: 'Renovate Card', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Tarjeta Renovate mostrada en la oferta semanal.' },
        { name: '100000 Copper Coins', category: 'Currency', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Paquete de 100000 Copper Coins mostrado en la oferta semanal.' },
        { name: 'Polish Gem', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Gema de pulido mostrada en la tienda.' },
        { name: 'Lv.1 DMG Gem', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/lv1-dmg-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema de daño de nivel 1 mostrada en la tienda.' },
        { name: 'Lv.1 Berserk Gem', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/lv1-berserk-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Berserk de nivel 1 mostrada en Merit Store.' },
        { name: 'Lv.1 Guardian Gem', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Guardian de nivel 1 mostrada en la tienda.' },
        { name: 'Lv.1 Solid Gem', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Solid de nivel 1 mostrada en la tienda.' },
        { name: 'Lv.1 Gem Pack', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de gemas de nivel 1 mostrado en la tienda.' },
        { name: 'Lv.2 Gem Pack', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de gemas de nivel 2 mostrado en la tienda.' },
        { name: 'Lv.4 Gem Pack', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/lv4-gem-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de gemas de nivel 4 mostrado en la tienda.' },
        { name: 'Lv.3 Gem Pack', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/lv3-gem-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de gemas de nivel 3 mostrado en la tienda.' },
        { name: '100 Ingots', category: 'Currency', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Paquete de 100 Ingots mostrado en la oferta semanal.' },
        { name: '300 Ingots', category: 'Currency', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Paquete de 300 Ingots mostrado en la oferta semanal.' },
        { name: '99.99 Rebate Voucher', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Vale de reembolso de 99,99 mostrado en la tienda.' },
        { name: '19.99 Rebate Voucher', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Vale de reembolso de 19,99 mostrado en la tienda.' },
        { name: '4.99 Rebate Voucher', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Vale de reembolso de 4,99 mostrado en la tienda.' },
        { name: 'Advanced Refining Essence', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/advanced-refining-essence.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Esencia avanzada de refinado mostrada en la tienda.' },
        { name: 'Lv.4 Berserk Gem', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/lv4-berserk-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Berserk de nivel 4 mostrada en Merit Store.' },
        { name: 'Lv.4 Solid Gem', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/lv4-solid-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Solid de nivel 4 mostrada en Merit Store.' },
        { name: 'Lv.4 DMG Gem', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/lv4-dmg-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema de daño de nivel 4 mostrada en Merit Store.' },
        { name: 'Lv.4 Guardian Gem', category: 'Material', source: 'Merit Store / Exchange', status: 'observado', detailImage: 'assets/images/object-details/lv4-guardian-gem.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Gema Guardian de nivel 4 mostrada en Merit Store.' },
        { name: 'Mount Gear Pack', category: 'Gear', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/mount-gear-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo de montura mostrado en la oferta semanal.' },
        { name: 'Wing Gear Pack', category: 'Gear', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/wing-gear-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo de alas mostrado en la oferta semanal.' },
        { name: 'Trail Gear Pack', category: 'Gear', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/trail-gear-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo de Trail mostrado en la oferta semanal.' },
        { name: 'Holyware Gear Pack', category: 'Gear', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/holyware-gear-pack.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Pack de equipo Holyware mostrado en la oferta semanal.' },
        { name: 'Large Stats Pill', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/large-stats-pill.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Píldora de estadísticas grandes mostrada en la oferta semanal.' },
        { name: 'Heavenly Stone - Weapon', category: 'Material', source: 'Verdure Shrine; Trading Center', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material Heavenly Stone para arma, mostrado en el tooltip de la tienda.' },
        { name: 'Heavenly Stone - Belt', category: 'Material', source: 'Verdure Shrine; Trading Center', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material Heavenly Stone para cinturón, mostrado en el tooltip de la tienda.' },
        { name: 'Heavenly Stone - Gloves', category: 'Material', source: 'Verdure Shrine; Trading Center', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material Heavenly Stone para guantes, mostrado en el tooltip de la tienda.' },
        { name: 'Golden Holystone', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material de holystone dorado mostrado en la tienda.' },
        { name: 'Avatar Frame', category: 'Recompensa', source: 'Shop / Weekly Offer', status: 'observado', detailImage: 'assets/images/object-details/avatar-frame.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Marco decorativo de avatar mostrado en la oferta semanal.' },
        { name: 'Primitive Beastall', category: 'Material', source: 'Shop / Weekly Offer', status: 'observado', sourceVideo: 'Shop no pay.mp4', notes: 'Material Primitive Beast mostrado en la tienda; el nombre completo queda pendiente de una captura nítida.' },
        { name: 'Golden Abyss Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Skyward Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Echoed Dream', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Prosper', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Distant Star Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Lantern Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:15', notes: 'Prenda de cabeza Spiritfox; aparece activada en la lista de Headdress.' },
        { name: 'Fox Headdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'observado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:30', notes: 'Nombre legible en la lista de Headdress; icono propio pendiente.' },
        { name: 'Moon Headdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'observado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:30', notes: 'Nombre legible en la lista de Headdress; icono propio pendiente.' },
        { name: 'Mist Headdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'observado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:30', notes: 'Nombre legible en la lista de Headdress; icono propio pendiente.' },
        { name: 'Spiritfox Headdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:45', notes: 'Nombre legible en la lista de Headdress.' },
        { name: 'Iridescent Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:45', notes: 'Nombre legible en la lista de Headdress.' },
        { name: 'Bright Moon Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', image: 'assets/images/items/clean/bright-moon-hairdress-icon.jpg', sourceVideo: 'Outfix Spirit.mp4', timestamp: '00:45', notes: 'Tooltip propio con descripción, estadísticas y adquisición por Event.' },
        { name: 'Mystic Mist Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '01:00', notes: 'Nombre legible en la lista de Headdress.' },
        { name: 'Purple Fog Hairdress', category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', sourceVideo: 'Outfix Spirit.mp4', timestamp: '01:15', notes: 'Nombre legible en la lista de Headdress.' },
        { name: "Heaven's Match Hairdress", category: 'Outfit', class: 'Spiritfox', source: 'Outfit → Headdress', status: 'confirmado', image: 'assets/images/items/clean/heavens-match-hairdress-icon.jpg', sourceVideo: 'Outfix Spirit.mp4', timestamp: '01:15', notes: 'Tooltip propio con descripción, estadísticas y adquisición por Event.' },
        { name: 'Zhuyuan', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part1.mp4', timestamp: '00:00', notes: 'Spirit con pantalla de Biography y Bond; se muestra como Spirit de rareza alta.' },
        { name: 'Dark Phoenix', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part1.mp4', timestamp: '00:45', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Daji', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part1.mp4', timestamp: '01:30', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Jiang Ziya', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part1.mp4', timestamp: '02:15', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Lu Wu', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part2.mp4', timestamp: '00:00', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Yaoji', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part2.mp4', timestamp: '00:45', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Goddess Luo', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part2.mp4', timestamp: '01:30', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Jade Rabbit', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part2.mp4', timestamp: '02:15', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Huodou', category: 'Spirit', source: 'Spirit → Bond', status: 'confirmado', sourceVideo: 'Bond part2.mp4', timestamp: '03:00', notes: 'Spirit con pantalla de Biography y Bond.' },
        { name: 'Silent One', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'observado', sourceVideo: 'Diarias2.mp4', notes: 'Title con método de obtención, estadísticas y validez permanente visibles.' },
        { name: 'Warmhearted', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'observado', sourceVideo: 'Diarias2.mp4', notes: 'Title con método de obtención, estadísticas y validez permanente visibles.' },
        { name: 'Dominant Presence', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Soul Split', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Hope-Leader', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Universal Legend', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Fourth-Class Emperor', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Envy of Justice', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Guild - Vice Leader', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Eternal Love', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: "Fox's Cry", category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Spiritmaster', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Unstoppable', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Lunarborn Immortal', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Jedi Warrior', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Trend Cusp', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Humblebragger', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Great Orator', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Lucky Guy', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Singer&Dancer', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Chivalrous Hero', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Kind Soul', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'No Ethics', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Trend King', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Uncrowned King', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Power of Wealth', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Golden Treasure', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'True Soulmates', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Master Eater', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Highlighted Debut', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Excellent Talent', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Awake Soul', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Chosen One', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Global Superstar', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Cool & Flashy', category: 'Title', source: 'Title → Normal / Legend / Rankings / Celebration', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Title.' },
        { name: 'Soul Break', category: 'Title', source: 'Title → Prefix', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Prefix.' },
        { name: 'Void Refining', category: 'Title', source: 'Title → Prefix', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Prefix.' },
        { name: 'Godling', category: 'Title', source: 'Title → Prefix', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Prefix.' },
        { name: 'Tao Lord', category: 'Title', source: 'Title → Prefix', status: 'confirmado', sourceVideo: 'Diarias2.mp4', notes: 'Nombre visible en la ficha de Prefix.' }
      ].map(function (item) {
        // Los Outfits se comparten entre clases; solo cambia su representación visual.
        if (item.category === 'Outfit') {
          delete item.class;
        }
        // Correcciones y fichas descriptivas verificadas en los fotogramas de la tienda.
        if (item.name === 'Wisp Voucher') {
          item.status = 'confirmado';
          item.detailImage = 'assets/images/object-details/wisp-voucher.jpg';
          item.notes = 'La ficha de tienda lo describe como objeto para Spirit Treasure Draw, con posibilidad de obtener espíritus raros y apariencias especiales de armas.';
        }
        if (item.name === 'Renomance Card') {
          item.name = 'Rename Card';
          item.status = 'confirmado';
          item.notes = 'Nombre exacto leído en la ficha de intercambio.';
        }
        if (item.name === 'Large Stats Pill') {
          item.name = 'Large Stats Pill Pack';
          item.status = 'confirmado';
          item.detailImage = 'assets/images/object-details/large-stats-pill-pack.jpg';
          item.notes = 'Pack que otorga aleatoriamente una Large Stats Pill para Mounts, Trails, Wings o Talismans.';
        }
        if (item.name === 'Primitive Beastall') {
          item.name = 'Primitive Beastsoul';
          item.status = 'confirmado';
          item.detailImage = 'assets/images/object-details/primitive-beastsoul.jpg';
          item.source = 'Mount Dungeon; Kunlun Mirage; Peak Duel; Immortal Brawl';
          item.notes = 'Proporciona energía para las monturas y mejora notablemente sus habilidades.';
        }
        return item;
      })
      .concat([
        { name: 'Primitive Shadowsoul', category: 'Material', source: 'Mount Dungeon; Kunlun Mirage; Peak Duel; Immortal Brawl', status: 'confirmado', detailImage: 'assets/images/object-details/primitive-shadowsoul.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Proporciona energía para los Trails y mejora notablemente sus habilidades.' },
        { name: 'Primitive Feathersoul', category: 'Material', source: 'Wings Dungeon; Chaotic Realm; Peak Duel; Immortal Brawl', status: 'confirmado', detailImage: 'assets/images/object-details/primitive-feathersoul.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Proporciona energía para las alas y mejora notablemente sus habilidades.' },
        { name: 'Primitive Waresoul', category: 'Material', source: 'Talisman Dungeon; Peak Duel; Immortal Brawl', status: 'confirmado', detailImage: 'assets/images/object-details/primitive-waresoul.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Proporciona energía para los talismanes y mejora notablemente sus habilidades.' },
        { name: 'Prime Bubble Frame', category: 'Recompensa', source: 'Event', status: 'confirmado', detailImage: 'assets/images/object-details/prime-bubble-frame.jpg', sourceVideo: 'Shop no pay.mp4', notes: 'Activa permanentemente el Bubble Frame: Prime y concede ATK, DEF, BLOCK y TEN.' }
      ])
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
