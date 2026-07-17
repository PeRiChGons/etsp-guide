# Modelos 3D para la guía

La extracción contiene meshes Unity, materiales, texturas y animaciones. Se ha probado una conversión inicial a **GLB/GLTF**, el formato más práctico para mostrar modelos en una web.

## Inventario exportado

Se han exportado **112 meshes relevantes**: 30 monturas, 69 armas y 13 piezas de outfit/armadura. Los nombres técnicos, bundles, género detectado y rutas web están en `assets/data/model-catalog-full.csv`.

El visor no se publica como una sección independiente. Cada ficha de objeto mostrará la casilla **Ver modelo 3D** únicamente cuando exista una relación entre el objeto y uno de estos archivos.

- `assets/models/3d/mounts/mount-302131-shenlong.glb` — montura Shenlong.
- `assets/models/3d/armor/waist-210001-shengshizijia.glb` — pieza de armadura.
- `assets/models/3d/weapons/weapon-1221033.glb` — arma del personaje.

## Índice de meshes

`assets/data/model-mesh-index.csv` contiene **1.398 meshes** encontrados en 585 bundles de modelos. `assets/data/model-catalog-full.csv` contiene el subconjunto relevante que ya se ha convertido a GLB.

## Importante sobre las texturas

Los modelos exportados son geometría GLB procedente del cliente. Los materiales y texturas Unity están en bundles separados; para una reproducción visual completa hay que enlazar cada `Material` con sus `Texture2D`, convertir los shaders del juego a materiales PBR y, en los personajes animados, conservar el rig y los clips. La conversión por fases evita inventar colores o texturas que no correspondan.

La copia completa de texturas 3D se conserva en `T:\Guia Archivos\analisis\textures-3d`; la web solo debe incluir los modelos que se incorporen a una página para no hacerla demasiado pesada.
