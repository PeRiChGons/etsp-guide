# Catálogo de iconos exactos de objetos del cliente

La extracción de LDPlayer contiene recursos `goods` con una cadena completa de referencia:

```text
ID de objeto
└── artresourcesv2/ui/texture/goods/{ID}
    └── data_assetLinkBundle
        └── ui/texture_v2/goods/*.assetbundle
            └── Texture2D PNG extraída
```

Se han recuperado **6.417 PNG exactos** de **6.473 referencias goods**. Los 56 registros restantes tienen una referencia de recurso válida pero no conservan un PNG cuyo nombre empiece por el ID; se mantienen en el CSV para continuar la correlación mediante el bundle y el nombre interno de Texture2D.

## Ficheros

- `assets/images/items/client-icons/`: iconos exactos, nombrados por ID (`110010003.png`, etc.).
- `assets/data/client-good-icons.csv`: ID, recurso, bundle, textura origen, ruta web y estado.
- `assets/data/client-good-icons.json`: el mismo catálogo para cargarlo desde JavaScript.

Este catálogo incluye objetos y materiales goods, piezas de equipo, recompensas y recursos usados por tiendas, dungeons, Spirit Root, Technique, SwordFlight, Zodiac y otros sistemas. El buscador de objetos debe utilizar este catálogo de `goods`; los iconos de dungeons, monstruos o botones de interfaz se mantienen fuera del buscador y en el archivo visual general.
