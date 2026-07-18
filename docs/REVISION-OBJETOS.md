# Revisión de objetos por fotogramas

La revisión de los vídeos de `Subidos` se hace por cambios de pantalla y muestras temporales en los tramos largos. Los fotogramas repetidos durante un combate o una pantalla estática no se duplican en la base de datos.

Para publicar una ficha se exige:

- nombre legible en la interfaz;
- uso o descripción visible;
- método de obtención;
- vídeo y minuto de evidencia;
- icono propio, sin confundirlo con una captura general;
- estado `confirmado` u `observado`.

El inventario actual cubre Craft, Spirit Root, Technique, Wisp, Spirit Treasure, Celestial Realm, tiendas, Love, Mystic Jade, Darkforce Chest, Titles y actividades. Los nombres o iconos que no se pueden asociar con seguridad quedan registrados como observados y sin imagen pública.

## Evidencia ya corregida

- Primordial Talisman y True Immortal Talisman: iconos extraídos de las ventanas de `Wisp.mp4`.
- Qiongqi Spear, Bracers, Chestplate y Heavy Helmet: iconos de la lista `Common Craft` en `Craft.mp4`.
- Earth Tier Trinket Pack, Mystic Tier Trinket Pack, Earth - Ruined Lantern y Resonance Lostsoul: ventanas propias de `Dungeon1.mp4`.

La base de datos de la web está en `assets/js/reference-data.js`, dentro de `objectCatalog.entries`; `docs/INVENTARIO-OBJETOS.md` mantiene el control humano de lo publicado y lo pendiente.

En esta revisión quedan 180 fichas de objetos, espíritus, materiales, monedas, recompensas, Titles y sistemas con nombre de objeto. De ellas, 27 tienen icono propio verificado y 25 incluyen además una ficha descriptiva ampliada. El resto sigue siendo útil para buscar el nombre y su obtención, pero muestra deliberadamente «Icono pendiente» hasta que exista una ventana inequívoca.

La revisión también ha añadido iconos propios para Alioth Arraycore, Mizar Arraycore y Alkaid Arraycore, con sus valores T22/T14 y estadísticas visibles en `Spirit Treasure y lo que consigues.mp4`.

`Diarias2.mp4` también permite ampliar el buscador con Titles y Prefixes que aparecen en sus fichas. Se han incorporado nombres legibles como Dominant Presence, Soul Split, Hope-Leader, Universal Legend, Eternal Love, Spiritmaster, Unstoppable, Lunarborn Immortal, Trend King, Power of Wealth, True Soulmates, Master Eater, Highlighted Debut, Excellent Talent, Global Superstar, Cool & Flashy, Soul Break, Void Refining, Godling y Tao Lord. Sus imágenes decorativas quedan pendientes hasta disponer de un recorte propio de cada ficha.

La pasada de `Shop no pay.mp4` ha ampliado el índice con packs de equipo, gemas, esencias, materiales de Zodiac, objetos de tienda, ofertas semanales y materiales Heavenly Stone. Estas fichas se mantienen como `observado` cuando el nombre es legible pero el fotograma no permite aislar un icono inequívoco; no se reutiliza la captura completa de la tienda como imagen del objeto.

También se han recortado desde una ventana nítida de Boss Store los iconos de `Accessory Spiritstone`, `Golden Gear Stone`, `Pink Gear Spiritstone`, `Orange 1-Star Holyware`, `1-Star Awakened Soul`, `Orange Rune Shard`, `Mantra Stone` y `Aura Crystalline`. `Outfix Spirit.mp4` permite además publicar los iconos de `Bright Moon Hairdress` y `Heaven's Match Hairdress`.

La revisión de `Bond part1.mp4` y `Bond part2.mp4` ha añadido al buscador los Spirits identificables `Zhuyuan`, `Dark Phoenix`, `Daji`, `Jiang Ziya`, `Lu Wu`, `Yaoji`, `Goddess Luo`, `Jade Rabbit` y `Huodou`, con su ruta `Spirit → Bond` y la marca de tiempo de la evidencia.

Las fichas de la tienda que muestran además la ventana descriptiva guardan ahora una captura ampliada en `assets/images/object-details/`. Al pulsar la tarjeta del objeto se muestra esa ficha real junto con el icono, el nombre, la obtención y las notas. Solo se añaden cuando el fotograma permite asociar sin dudas el nombre y el objeto.
