# CatÃ¡logo de enlaces y referencias del cliente

CatÃ¡logo generado a partir de la extracciÃ³n de LDPlayer. Solo analiza texto y manifiestos; no abre URLs, no inicia sesiones y no modifica el cliente.

## Resumen

- URLs Ãºnicas registradas: **43**
- Claves internas recurso -> bundle: **57989**
- Registros go_to conservados: **31746**
- Referencias internas de mÃ³dulos: **15368**

## Dominios externos

- [url-sin-dominio-limpio] â€” 3 URLs registradas
- act.qqgame.qq.com â€” 1 URLs registradas
- act-plat.leniu.com â€” 4 URLs registradas
- aip.baidubce.com â€” 2 URLs registradas
- alidownload.swjoy.com â€” 1 URLs registradas
- apisdk2.lnert.com â€” 2 URLs registradas
- beian.miit.gov.cn â€” 1 URLs registradas
- discord.gg â€” 1 URLs registradas
- download.swjoy.com â€” 1 URLs registradas
- game.flash.cn â€” 2 URLs registradas
- github.com â€” 8 URLs registradas
- image.leniugame â€” 1 URLs registradas
- image.leniugame.com â€” 2 URLs registradas
- kefu.leniugame.com â€” 2 URLs registradas
- leniu.com â€” 1 URLs registradas
- newact.swjoy.com â€” 1 URLs registradas
- photo-cdn.leniu.com â€” 1 URLs registradas
- spg.pandoraseer.com â€” 1 URLs registradas
- static.ffzww.com â€” 1 URLs registradas
- twphoto-cos-cdn.leniuhw.com â€” 1 URLs registradas
- webpay.leniugame.com â€” 2 URLs registradas
- www.facebook.com â€” 2 URLs registradas
- www.youtube.com â€” 1 URLs registradas
- yxdt.game.keniub.com â€” 1 URLs registradas

## Familias internas

- `artresourcesv2/ui/texture/...` -> `ui/texture_v2/...assetbundle`: recursos visuales.
- `data_item...` -> `base_id`, nombre, descripciÃ³n, tipo y `go_to`: fichas de objetos.
- `data_item_source...` -> `GoodsSourceItem`: etiquetas de obtenciÃ³n.
- `GameLogic/...` y `require`: mÃ³dulos de interfaz y lÃ³gica.
- `go_to`: destinos numÃ©ricos internos; se conservan sin traducir hasta resolver su enum/intÃ©rprete.
- `enlaces-internos-go_to.csv.zip`: copia comprimida del listado completo de destinos para conservarlo junto al proyecto sin inflar el repositorio.

## Endpoints sensibles encontrados

El cliente contiene endpoints de login/gateway, configuraciÃ³n, soporte, traducciÃ³n, webpay y redes sociales. Se documentan como referencias pasivas; no se probarÃ¡n ni se usarÃ¡n para evadir autenticaciÃ³n, pagos o lÃ­mites.

Los CSV adjuntos contienen el listado completo por archivo, URL, dominio, bundle, clave de recurso y destino `go_to`.
