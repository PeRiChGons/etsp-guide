# Plan de recursos visuales

Este documento define el modelo visual de la guía. Sirve para que los iconos, retratos, fichas, fondos y decoraciones mantengan una apariencia coherente aunque se incorporen en momentos diferentes.

## Principio principal

Los recursos que representan elementos reales del juego deben partir de una captura o fotograma legible. No se inventan nombres, rarezas, colores, habilidades, estadísticas ni efectos.

El generador de imágenes se utilizará para:

- limpiar o recortar una referencia real;
- preparar una variante visual sin modificar el elemento documentado;
- crear fondos y decoraciones que no representen una mecánica del juego;
- construir composiciones para la web cuando el contenido escrito permanezca en HTML.

La información del juego siempre se escribirá como texto editable en la página, no dentro de la imagen. Así se puede corregir, traducir y verificar sin tener que regenerar el recurso.

## Tipos de recurso

### 1. Icono de elemento

Para Spirit, habilidad, material, moneda, Technique, SwordFlight o Zodiac.

- Formato: PNG si necesita transparencia; WebP si tiene fondo.
- Tamaño maestro: 512 × 512 px.
- Composición: un único elemento centrado, margen de seguridad del 12 %.
- No incluir texto, porcentajes ni nombres dentro del icono.
- Nombre: `icono-nombre-v01.png`.

### 2. Retrato de clase o Spirit

Para mostrar una clase o Spirit en una ficha principal.

- Formato: WebP.
- Tamaño maestro: 768 × 1024 px.
- Composición: personaje completo o medio cuerpo, fondo separado y espacio limpio para el título HTML.
- No añadir armaduras, armas, habilidades o efectos que no aparezcan en la referencia.
- Nombre: `retrato-nombre-v01.webp`.

### 3. Ficha visual de sistema o clase

Para las cabeceras de Spirit, Technique, Spirit Root, Wisp, clases y sistemas generales.

- Formato: WebP.
- Tamaño maestro: 1600 × 900 px.
- Composición: fondo atmosférico, elemento principal a un lado y espacio negativo para título, resumen y enlaces.
- El texto de la ficha se mantiene fuera de la imagen.
- Nombre: `ficha-sistema-nombre-v01.webp`.

### 4. Imagen de objeto o material

Para materiales de mejora, piedras, libros, cofres, monedas y piezas de equipo.

- Formato: PNG con transparencia o WebP cuadrado.
- Tamaño maestro: 768 × 768 px.
- Composición: objeto aislado, sin interfaz ni cursor.
- La rareza, el color, las estrellas y el nombre solo se añaden si están confirmados.
- Nombre: `objeto-nombre-v01.webp`.

### 5. Imagen de habilidad

Para Skill, Awakening Skill, Technique especial o efectos de combate.

- Formato: PNG/WebP.
- Tamaño maestro: 1024 × 1024 px.
- Composición: icono o efecto principal sin texto incrustado.
- El nombre, daño, duración y coste se muestran como datos HTML junto a la imagen.
- Nombre: `habilidad-nombre-v01.webp`.

### 6. Fondo de sección

Para el fondo visual de una sección completa.

- Formato: WebP.
- Tamaño maestro: 1920 × 1080 px.
- Composición: oscuro, azul profundo y dorado tenue; contraste bajo para no dificultar la lectura.
- No incluir personajes, logos, nombres ni objetos que puedan confundirse con contenido real del juego.
- Nombre: `fondo-seccion-nombre-v01.webp`.

### 7. Decoración de interfaz

Para marcos, separadores, halos, partículas, cintas, esquinas y adornos.

- Formato: PNG si requiere transparencia; WebP en caso contrario.
- Tamaño: según el uso, preferentemente con versión horizontal y cuadrada.
- Opacidad y contraste moderados.
- No debe parecer un objeto, una moneda o un sistema jugable.
- Nombre: `decoracion-tipo-nombre-v01.png`.

## Carpetas definitivas

```text
assets/images/
├── general/
├── backgrounds/
├── decorations/
├── classes/
│   ├── dragon-lancer/
│   ├── lunarborn/
│   ├── spiritfox/
│   └── swordsage/
├── spirit/
├── skills/
├── items/
├── spirit-root/
├── technique/
├── swordflight/
├── wisp/
└── zodiac/
```

## Flujo para convertir un vídeo en recursos

1. Seleccionar un fotograma donde el nombre, icono o descripción sean legibles.
2. Separar la interfaz del elemento que se quiere reutilizar.
3. Registrar qué está confirmado y qué sigue pendiente.
4. Limpiar o recortar la imagen sin cambiar su identidad.
5. Generar, si hace falta, una variante de fondo o decoración separada.
6. Revisar bordes, colores, texto, transparencia y tamaño en móvil.
7. Guardar el recurso con nombre versionado y añadir su ficha de procedencia.
8. Insertarlo en la página únicamente cuando el dato escrito también esté verificado.

## Ficha de procedencia

Cada recurso final debe poder relacionarse con una fuente. La ficha puede guardarse junto al recurso con el mismo nombre y extensión `.md`:

```markdown
# Nombre del recurso

- Tipo: icono | retrato | ficha | objeto | habilidad | fondo | decoración
- Estado: pendiente | extraído | revisado | publicado
- Fuente: captura, PDF o vídeo de origen
- Elemento exacto: nombre tal como aparece en el juego
- Datos confirmados:
- Datos pendientes:
- Uso previsto:
- Texto alternativo:
- Fecha de revisión:
```

## Convención de versiones

Usaremos `v01`, `v02`, etc. No se sobrescribe una imagen anterior cuando cambie la composición o la fuente. Las versiones descartadas no se publican, pero se conserva la explicación del cambio si afecta a la interpretación del juego.

## Criterio profesional

La imagen debe apoyar la lectura, no sustituirla. Los nombres, efectos, costes, métodos de obtención y recomendaciones se mantendrán como texto HTML accesible, editable y traducible.
