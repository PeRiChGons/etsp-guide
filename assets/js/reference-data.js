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
          facts: ['Sky Piercer hasta Lv.3 en la captura', 'Genera Five-Element Force', 'Con cinco acumulaciones invoca Divine Dragon', 'Technique Stats +50 % al completar T7']
        },
        {
          name: 'Earth Spirit Spell',
          status: 'Método de obtención pendiente de verificar',
          facts: ['Rock Shield Lv.3 en la captura', 'DMG RED +7,5 % durante 8 segundos', 'Genera una acumulación de Five-Element Force', 'Technique Stats +50 % al completar T10']
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
