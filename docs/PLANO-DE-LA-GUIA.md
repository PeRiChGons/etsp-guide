# Plano de Eternal Sword Pact Guía

## Estructura de la web

La web es una aplicación de una sola página compatible con GitHub Pages. `index.html` contiene la estructura permanente: cabecera, navegación, área central y pie. El enrutador de `assets/js/router.js` escucha los cambios de la ruta hash y sustituye únicamente el contenido central.

- `assets/css/styles.css`: tema oscuro responsive y estados accesibles.
- `assets/js/content.js`: mapa del menú, rutas y apartados.
- `assets/js/reference-data.js`: datos confirmados transcritos del material del proyecto.
- `assets/js/pages.js`: plantillas de las páginas maestras que ya tienen contenido contrastado.
- `assets/js/router.js`: lectura de rutas hash y creación de cada vista.
- `assets/js/app.js`: menú desplegable, estado activo y comportamiento móvil.
- `404.html`: devuelve rutas desconocidas a la aplicación mediante hash.
- `assets/images/`: carpetas preparadas para imágenes futuras.
- `docs/INVESTIGACION-WEB.md`: fuentes públicas consultadas, contradicciones y datos pendientes de comprobar.

No se utilizan frameworks, iframes externos, traductor automático ni integraciones reales de comentarios o Discord.

## Secciones y subsecciones

El menú se divide en Inicio, Guía general, Sistemas del personaje, Equipamiento y mejoras, Clases y Proyecto. Las subsecciones completas se declaran en `GUIDE_MENU`, dentro de `assets/js/content.js`.

Las clases Dragon Lancer, Lunarborn, Spiritfox y Swordsage cuentan con rutas independientes y apartados preparados para descripción, habilidades, estadísticas recomendadas, SwordFlight, Technique, Spirit Root, Zodiac, PvE y PvP.

Las páginas maestras de Stats, Spirit Root, Technique y Wisp ya distinguen entre datos confirmados y datos pendientes. SwordFlight y Zodiac disponen de catálogos iniciales para incorporar la información sin duplicarla dentro de cada clase.

Wisp dispone de la ruta `#/sistemas-del-personaje/wisp`. Registra únicamente la primera pantalla observada y mantiene como pendientes Sacrifice, Spirit Beast Bag, Resonance, Stats Overview y Northern Abyss Order.

## Cómo añadir una nueva página

1. Añade un objeto al array `GUIDE_MENU` de `assets/js/content.js`.
2. Indica un `title`, una `route` que empiece por `/` y, si corresponde, un array `children`.
3. Amplía `getPage()` si la página necesita un conjunto de apartados o una presentación distinta.
4. Si dispone de contenido contrastado, añade su plantilla a `assets/js/pages.js` y sus datos a `assets/js/reference-data.js`.
5. Comprueba el resultado en pantalla grande, tableta y móvil.

## Cómo añadir una nueva ruta

Las rutas utilizan el formato `#/ruta`. Declara la ruta sin `#` en `content.js`, por ejemplo:

```javascript
{ title: 'Nueva sección', route: '/nueva-seccion', children: ['Apartado uno'] }
```

Después se podrá abrir con `#/nueva-seccion`. Si la ruta tiene una lógica especial, añádela a `getPage()` sin modificar la URL base de GitHub Pages.

## Cómo añadir imágenes

1. Guarda cada archivo optimizado en la carpeta temática correspondiente dentro de `assets/images/`.
2. Usa nombres descriptivos en minúsculas y separados por guiones.
3. Incluye siempre un texto alternativo útil mediante el atributo `alt`.
4. Utiliza rutas relativas, por ejemplo `assets/images/classes/dragon-lancer/ejemplo.webp`.
5. Verifica que se dispone de permiso para publicar la imagen y registra su fuente cuando sea necesario.

Las carpetas incluyen `general`, `classes`, `spirit-root`, `technique`, `swordflight` y `zodiac`. Cuando se autorice una captura de Wisp para publicación se añadirá `assets/images/wisp/`. No hay imágenes definitivas todavía.

## Enlaces directos a un apartado concreto

Cada tarjeta recibe un identificador derivado de su título. La navegación interna conserva la ruta y añade el parámetro `apartado`, por ejemplo:

```text
#/clases/dragon-lancer?apartado=habilidades
```

Al abrirlo, el enrutador desplaza el foco al apartado correspondiente. Para nuevos apartados, usa títulos únicos dentro de la página.

## Contenido pendiente

Ya se ha incorporado la estructura contrastada de Stats, Spirit Root, Technique y la primera pantalla de Wisp. Los nombres conocidos de SwordFlight y Zodiac también están organizados, pero sus detalles continúan marcados como **Contenido pendiente**. Además, están pendientes:

- descripciones y fórmulas completas de las estadísticas;
- habilidades y recomendaciones verificadas de cada clase;
- costes, probabilidades, materiales y métodos de obtención que todavía no se hayan capturado;
- explicaciones detalladas de SwordFlight y Zodiac;
- funcionamiento de Wisp, Sacrifice, Resonance, Stats Overview, Spirit Beast Bag y Northern Abyss Order;
- imágenes, capturas y recursos gráficos definitivos;
- traducción automática;
- comentarios o integración con Discord;
- revisión final antes de publicar cambios en `main`.

## Información que debe verificarse

Antes de publicar contenido como definitivo se deben contrastar:

- nombres oficiales y traducciones de sistemas, objetos, clases y habilidades;
- funcionamiento de estadísticas, fórmulas, mejoras y progresión;
- diferencias entre versiones, regiones, plataformas o parches;
- recomendaciones de PvE y PvP y el contexto en que son válidas;
- contenido gratuito, compras, probabilidades y cualquier afirmación sobre P2W;
- licencias, permisos y atribuciones de imágenes y fuentes;
- carácter oficial o comunitario de cada fuente y fecha de última comprobación.

No debe añadirse información del juego basada únicamente en suposiciones.
