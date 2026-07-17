# Modelos 3D para la guía

La extracción contiene meshes Unity, materiales, texturas y animaciones. Se ha probado una conversión inicial a **GLB/GLTF**, el formato más práctico para mostrar modelos en una web.

## Muestras exportadas

Corrección del inventario actual: la galería contiene **10 muestras** (4 monturas, 2 armaduras y 4 armas).

La galería web incluye actualmente once muestras: cinco monturas, dos piezas de armadura y cuatro armas. Los nombres y bundles se conservan en el índice técnico.

- `assets/models/3d/mounts/mount-302131-shenlong.glb` — montura Shenlong.
- `assets/models/3d/armor/waist-210001-shengshizijia.glb` — pieza de armadura.
- `assets/models/3d/weapons/weapon-1221033.glb` — arma del personaje.

## Índice de meshes

`assets/data/model-mesh-index.csv` contiene **1.398 meshes** encontrados en 585 bundles de modelos. Conserva el bundle y el nombre interno para poder exportar más modelos sin perder la referencia al cliente.

## Importante sobre las texturas

Estas primeras muestras son geometría GLB exportada desde el cliente. Los materiales y texturas Unity están en bundles separados; para una reproducción visual completa hay que enlazar cada `Material` con sus `Texture2D`, convertir los shaders del juego a materiales PBR y, en los personajes animados, conservar el rig y los clips. La conversión por fases evita inventar colores o texturas que no correspondan.

La copia completa de texturas 3D se conserva en `T:\Guia Archivos\analisis\textures-3d`; la web solo debe incluir los modelos que se incorporen a una página para no hacerla demasiado pesada.
