# Catálogo de objetos y obtención

La ruta `#/objetos` centraliza objetos, materiales y recompensas sin duplicar sus explicaciones dentro de Spirit, Wisp, Technique, dungeons o tiendas.

## Prioridad de la ficha

La ficha se construye en este orden: nombre exacto del juego, descripción, método de obtención y palabras alternativas de búsqueda. La imagen y el modelo 3D son complementarios y no bloquean la publicación de esos datos.

El visor 3D no tiene una sección independiente en el menú. Cuando una ficha tenga un modelo asociado, mostrará una casilla **Ver modelo 3D**. En prendas se mostrarán las variantes de género o clase únicamente cuando estén relacionadas en los datos del cliente; las armas se visualizarán sin personaje.

## Qué permite

- Buscar por nombre, categoría o método de obtención.
- Filtrar por Talisman, Spirit, Spirit Root, Technique, Material, Gear, Trinket, Arraycore, Recompensa, Title u Outfit.
- Ver si un dato está confirmado por la interfaz o solo observado en material audiovisual.
- Añadir más adelante la imagen limpia del objeto y un enlace a la página maestra de su sistema.

## Datos de cada ficha

Cada entrada se guarda en `assets/js/reference-data.js`, dentro de `objectCatalog.entries`, con estos campos:

```javascript
{
  name: 'Nombre exacto del juego',
  category: 'Material',
  subtype: 'Objeto, ropa, arma o moneda',
  class: null,
  source: 'Pantalla, dungeon, tienda o actividad',
  status: 'confirmado',
  sourceVideo: 'Nombre del vídeo',
  timestamp: '00:00',
  notes: 'Uso, condición o limitación observada',
  image: 'assets/images/items/nombre-de-la-captura.jpg'
}
```

No se inventan costes ni ubicaciones. Si una pantalla no permite leer el método de obtención, se conserva como pendiente.

## Imágenes

Las capturas de investigación se mantienen fuera de la web pública hasta recortar el icono sin interfaz y comprobar que el nombre coincide. Los Spirits, Titles y Outfits se registran con su propia categoría y fuente de vídeo; las fichas sin recorte muestran deliberadamente «Icono pendiente».

La revisión de vídeos se hace por cambios de pantalla y fotogramas representativos, no copiando una captura general como si fuera el icono del objeto. Cada imagen publicada debe corresponder al objeto cuyo nombre aparece en la misma ventana.

Las actividades también pueden ser el origen de un objeto. Por ejemplo, `Time Stone` enlaza con `Time Realm`, mientras que los talismanes enlazan con `Rage Boss`, `Verdure Shrine` y `Northen Abyss`.
