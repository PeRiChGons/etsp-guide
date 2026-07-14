# Eternal Sword Pact Guía

Aplicación web responsive y comunitaria para organizar una futura guía de **Eternal Sword Pact**. Funciona como una SPA sin dependencias ni proceso de compilación, preparada para publicarse en GitHub Pages.

> **Estado:** en desarrollo. La estructura y varias páginas maestras están disponibles; el contenido se incorpora únicamente cuando puede verificarse.

## Contenido disponible en desarrollo

- portada con accesos rápidos y método de trabajo;
- listado de Basic Stats y Special Stats;
- estructura documentada de Spirit Root;
- plantas, nombres, fichas y materiales observados de Technique;
- catálogos iniciales de SwordFlight y Zodiac Transformations;
- página propia de Spirit con 15 Spirits, Array, Evolution, Cleanse y Pill Array;
- estructura de Bond documentada mediante dos vídeos, con rangos, afinidad, Biography y capítulos;
- primera pantalla documentada del nuevo sistema Wisp;
- registro provisional de Hot Spring, Kunlun, Love/Token y Kismet/Spirit Treasure a partir de vídeos;
- registro de fuentes oficiales, guías externas y contradicciones detectadas;
- información de autoría, fuentes y carácter no oficial del proyecto.

Las páginas todavía incompletas muestran claramente **Contenido pendiente** y no presentan suposiciones como datos del juego.

## Ramas

- `main`: rama estable destinada al contenido revisado y publicable.
- `desarrollo`: rama de trabajo para preparar y revisar cambios antes de incorporarlos a `main` mediante Pull Request.

## Probar la web

1. Descarga o clona la rama `desarrollo`.
2. Abre `index.html` directamente en un navegador moderno.
3. Como alternativa, inicia cualquier servidor web estático en la raíz del proyecto y abre la dirección local indicada.
4. Comprueba rutas como `#/inicio`, `#/guia-general` y `#/clases/dragon-lancer`.

No es necesario instalar dependencias ni compilar archivos.

## GitHub Pages

Enlace previsto: <https://perichgons.github.io/etsp-guide/>

La publicación todavía debe configurarse o activarse desde la rama que se decida usar para GitHub Pages.

## Documentación

Consulta [docs/PLANO-DE-LA-GUIA.md](docs/PLANO-DE-LA-GUIA.md) para conocer la arquitectura, el mapa de contenidos y la forma de ampliar la guía.

El archivo [docs/INVESTIGACION-WEB.md](docs/INVESTIGACION-WEB.md) registra las fuentes consultadas, los límites de cada una y la información que todavía debe verificarse dentro del juego.

El archivo [docs/REGISTRO-SPIRIT.md](docs/REGISTRO-SPIRIT.md) clasifica las 104 capturas aportadas para el sistema Spirit y separa los datos confirmados de los pendientes.
