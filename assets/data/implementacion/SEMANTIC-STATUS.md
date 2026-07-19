# Estado semántico de Eternal Sword Pact

Generado: 2026-07-19T02:06:40.4942925+02:00

## Resultado

Se han convertido en relaciones navegables todos los enlaces que aparecen de forma directa en los catálogos del cliente. Cada relación conserva su archivo de evidencia y su confianza.

| Medida | Resultado |
|---|---:|
| Relaciones directas | 30026 |
| Relaciones respaldadas por evidencia del cliente | 199 |
| Relaciones detectadas sin unicidad garantizada | 118 |
| Goods/items catalogados | 705 |
| Goods con descripción | 274 |
| Módulos de monstruo | 610 |
| Monstruos con nombre directo recuperado | 489 |
| Enlaces boss → monster por coincidencia exacta | 31 |
| Recursos visuales de dungeon | 619 |
| Claves de escena extraídas del nombre interno | 38 |

## Qué no se inventa

Los campos sin una relación demostrable permanecen vacíos. La interfaz puede mostrarlos como ?, pero este paquete no convierte un icono, una clave Lua o una recompensa dinámica en un nombre que no esté respaldado por el cliente.

## Huecos reales restantes

- Nombre/capítulo/recompensas de algunos recursos visuales de dungeon.
- Asociación entre iconos visuales y fichas textuales cuando el cliente no comparte ID.
- Valores numéricos almacenados en bytecode LuaJIT.
- Asociación segura de modelos 3D con clase, género, objeto u outfit.
- Recompensas y disponibilidad dependientes del servidor.
- Interpretación de valores isweak, esist y def de bosses.

Los archivos semantic-links.csv, goods-semantic-index.csv, monster-semantic-index.csv, oss-monster-links.csv y dungeon-semantic-index.csv son los índices que debe consumir la web.
