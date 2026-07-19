# Paquete de implementaciÃ³n â€” Eternal Sword Pact GuÃ­a

Generado: 2026-07-18T23:26:16

## QuÃ© queda preparado

- Inventario maestro de menÃºs: 6907 registros.
- Inventario maestro de objetos: 4151 registros.
- Inventario maestro de recursos del cliente: 58898 registros.
- Inventario maestro de dungeons: 4045 registros.
- Inventario maestro de mecÃ¡nicas/UI/lÃ³gica: 6673 registros.
- Fichas de bÃºsqueda de objetos: 3243 registros.
- Goods/items con nombre, descripciÃ³n y go_to cuando existe: 705 registros.
- Recursos visuales especÃ­ficos catalogados: 2994 registros; el inventario completo de recursos estÃ¡ en master-resource-catalog.csv.
- Dungeons visuales: 619; evidencia de campos de boss/monster: 2975.
- Monstruos del cliente: 610; nombres candidatos: 765; bosses nombrados: 26.
- Evidencia de clase/habilidad: 120 filas.
- Spirit Root/SwordFlight/Zodiac/Glyph: Ã­ndices separados y evidencia de fuentes.
- Relaciones ya existentes: 28558 filas.
- Huecos de implementaciÃ³n: 11 filas en implementation-gaps.csv.

## Regla de publicaciÃ³n

Los nombres vacÃ­os permanecen vacÃ­os, las relaciones ambiguas no se fuerzan y los campos que no se recuperan del cliente quedan en implementation-gaps.csv. Google Play/LDPlayer y LDStore se mantienen como versiones distintas.

## Limitaciones que siguen siendo reales

1. Parte de las tablas Lua estÃ¡ serializada como bytecode o requiere estado del servidor; no es seguro convertirla en texto inventado.
2. Los iconos de dungeon no traen siempre el vÃ­nculo directo a escena, capÃ­tulo, requisito y recompensa.
3. Algunos monster_id no tienen nombre legible asociado de forma unÃ­voca.
4. Los valores de debilidad/resistencia de bosses aparecen como claves (isweak/resist/def), pero no todos sus valores se pueden interpretar automÃ¡ticamente.
5. Modelos 3D, clase/gÃ©nero y asociaciÃ³n exacta con objeto/outfit requieren relacionar model_id/surface_id y probarlos en el juego.
6. Las recompensas y disponibilidad dinÃ¡micas del servidor no pueden garantizarse a partir del cliente.

## Orden de implementaciÃ³n recomendado

1. Buscador de objetos: usar objects-index.csv + goods-items-index.csv y mostrar ? solo para campos vacÃ­os.
2. Fichas de recursos/imÃ¡genes: resolver rutas desde images-index.csv y master-resource-catalog.csv.
3. MenÃº y categorÃ­as: usar master-menu-catalog.csv y master-mechanics-catalog.csv como Ã­ndice interno.
4. Dungeons/monstruos: mostrar la ficha visual y enlazar evidencia sin afirmar recompensas no recuperadas.
5. Clases/skills: construir pÃ¡ginas desde class-skill-evidence.csv, stats-index.csv y los catÃ¡logos visuales.
6. Zodiac/Glyph: usar zodiac-glyph-index.csv; los huecos se indican con ? y remiten a implementation-gaps.csv.

## Resumen de relaciones

- mechanic -> belongs_to_system -> system: 6673
- mechanic -> implemented_by_bundle -> bundle: 6377
- object -> belongs_to_category -> menu_category: 4151
- dungeon -> defined_by_bundle -> bundle: 4045
- object -> uses_icon -> resource: 3699
- object -> comes_from_bundle -> bundle: 2994
- dungeon -> uses_icon -> resource: 619

## Secciones de menÃº detectadas

- Objects-Gear: 2290
- Dungeons-Activities: 1320
- Alliance-PvP: 1103
- Skills: 352
- Shops-Economy: 326
- Technique-Godbook: 217
- Other-GameSystems: 189
- Outfits-Fashion: 181
- res: 139
- Spirit-Wisp: 124
- Titles: 118
- texture_v2: 95
- Bond-Social: 68
- Zodiac: 50
- SwordFlight: 40
- special: 1
- fans: 1
- guildBox: 1
- hadesrank: 1
- word: 1
- wardrobe: 1
- world: 1
- verify: 1
- wanfa: 1
- source: 1
- statkv: 1
- guildAuction: 1
- suitCollect: 1
- time: 1
- towerDaily: 1

## Sistemas/mecÃ¡nicas detectados

- Objects-Gear: 2290
- Dungeons-Activities: 1320
- Alliance-PvP: 1103
- Skills: 352
- Shops-Economy: 326
- Technique-Godbook: 217
- Other-GameSystems: 189
- Outfits-Fashion: 181
- Spirit-Wisp: 124
- Titles: 118
- Bond-Social: 68
- Zodiac: 50
- SwordFlight: 40
- special: 1
- fans: 1
- guildBox: 1
- hadesrank: 1
- word: 1
- wardrobe: 1
- world: 1
- verify: 1
- wanfa: 1
- source: 1
- statkv: 1
- guildAuction: 1
- suitCollect: 1
- time: 1
- towerDaily: 1
- godSummons: 1
- hot: 1

## Ficheros principales

Consultar implementation-index.json para la lista completa y los contadores. Este paquete estÃ¡ preparado en la carpeta de anÃ¡lisis, en el repositorio local y en la copia de trabajo de T:\Guia Archivos\etsp-guide; todavÃ­a no se ha publicado en GitHub.

## Pasada semántica 2026-07-19

- Se generaron semantic-links.csv, goods-semantic-index.csv, monster-semantic-index.csv, oss-monster-links.csv y dungeon-semantic-index.csv.
- Se recuperaron 489 nombres directos de monstruos desde los módulos data_mon_* del cliente.
- Se conservaron sin inventar los enlaces que el cliente no hace demostrables; el detalle está en SEMANTIC-STATUS.md.

