# Eternal Sword Pact Guía

Nueva web local, basada en los catálogos extraídos del cliente de Eternal Sword Pact y preparada para GitHub Pages.

## Qué incluye

- Buscador dedicado exclusivamente a objetos.
- 4.151 registros de objetos, con búsqueda por nombre, nombre interno, descripción, categoría y origen.
- Fichas de objeto con icono, categoría, descripción, origen e ID.
- Catálogo de 4.045 mapas y dungeons.
- Catálogo de 6.673 módulos de mecánicas y 6.907 entradas de menús.
- 28.558 relaciones entre recursos, objetos, menús y sistemas.
- Navegación por hash sin recargar la aplicación.
- Cabecera, menú lateral y pie adaptables a PC, tablet y móvil.
- Traducciones JSON propias para español, inglés, alemán y polaco.
- Botón de Google Translate para idiomas adicionales.
- Fondos e ilustraciones originales con marca visible `PeRiCh`.

## Abrirla en local

Abre [index.html](index.html) con un navegador moderno. Para que los catálogos JSON se carguen en todos los navegadores, es preferible servir la carpeta con cualquier servidor estático local.

## Estructura principal

```text
index.html                 Aplicación y marco principal
404.html                   Redirección compatible con GitHub Pages
assets/css/site.css        Diseño, responsive y animaciones
assets/js/site.js          Navegación, búsqueda, fichas y traducción
assets/lang/*.json         Español, inglés, alemán y polaco
assets/data/site/          Catálogos JSON generados desde el análisis
assets/images/game-data/   Iconos extraídos del cliente del juego
assets/images/illustrations/ Fondos e ilustraciones originales PeRiCh
```

## Copia de la web anterior

La versión anterior se conserva fuera del repositorio en:

`T:\Guia Archivos\backups\etsp-guide-actual-20260718`

No se eliminaron los catálogos ni la documentación de investigación del repositorio.

## Traducción

El selector carga `es.json`, `en.json`, `de.json` o `pl.json`. La opción **Más idiomas** abre Google Translate para el idioma que se indique.

## Nota sobre las imágenes

Los iconos del juego son recursos extraídos del cliente y no se han alterado. Las imágenes creadas específicamente para esta web están en `assets/images/illustrations/` y llevan la marca `PeRiCh`.
