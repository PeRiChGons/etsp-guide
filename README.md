# Eternal Sword Pact Guía

Web comunitaria y práctica para aprender Eternal Sword Pact, construir el personaje y consultar el contenido del juego. Esta versión está preparada directamente sobre la rama `main` y conserva los catálogos, páginas, imágenes, modelos y documentación analizados.

## Qué incluye

- Guía general, sistemas del personaje, equipamiento, objetos, actividades, mazmorras y clases.
- Buscador dedicado exclusivamente a objetos, con fichas, obtención, imágenes y visor 3D cuando existe modelo.
- Recomendaciones y páginas maestras para Stats, Spirit Root, Technique, SwordFlight, Zodiac, Spirit y Wisp.
- Actividades como Daily Quest, Rage Boss, Time Realm, Ancient Ruins, Spirit Spring, PvP, Alliance War y Kunlun.
- Fichas de clases Dragon Lancer, Lunarborn, Spiritfox y Swordsage.
- Catálogos extraídos de objetos, mapas, menús, recursos, imágenes, modelos y relaciones.
- Navegación por hash, menú lateral desplegable y panel contextual de subcategorías.
- Diseño responsive para ordenador, tablet y móvil.
- Traducciones JSON propias para español, inglés, alemán y polaco.
- Botón de Google Translate para idiomas adicionales.
- Fondos e ilustraciones originales con marca visible `PeRiCh` y recursos visuales extraídos del juego.
- Motor de implementación que carga los catálogos normalizados de objetos, dungeons, monstruos, habilidades, Stats, Zodiac/Glyph y reglas PvP.
- El buscador usa exclusivamente objetos, materiales, equipo, outfits, Titles y Spirit/Wisp; los 619 dungeons y 610 monstruos se consultan en Actividades y mazmorras.

## Abrirla en local

Abre [index.html](index.html) con un navegador moderno. Para que los catálogos JSON se carguen en todos los navegadores, es preferible servir la carpeta con cualquier servidor estático local.

## Estructura principal

```text
index.html                 Aplicación y marco principal
404.html                   Redirección compatible con GitHub Pages
assets/css/styles.css      Estilos base de la guía
assets/css/styles-visual.css Capa visual inspirada en el juego
assets/js/                  Menú, rutas, páginas, datos, visor 3D y motor de implementación
assets/lang/*.json          Español, inglés, alemán y polaco
assets/data/                Catálogos maestros y datos extraídos
assets/images/              Fondos, capturas e iconos del juego
assets/models/3d/           Modelos GLB asociados a objetos
```

## Copia de la web anterior

La versión anterior se conserva fuera del repositorio en:

`T:\Guia Archivos\backups\etsp-guide-actual-20260718`

No se eliminaron los catálogos ni la documentación de investigación del repositorio.

## Traducción

El selector carga `es.json`, `en.json`, `de.json` o `pl.json`. La opción **Más idiomas** abre Google Translate para el idioma que se indique.

## Nota sobre las imágenes

Los iconos del juego son recursos extraídos del cliente y no se han alterado. Las imágenes creadas específicamente para esta web están en `assets/images/illustrations/` y llevan la marca `PeRiCh`.
