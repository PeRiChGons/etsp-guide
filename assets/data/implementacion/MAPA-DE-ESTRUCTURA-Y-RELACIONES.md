# Mapa de estructura y relaciones

Este documento se genera a partir de relations.csv y de los catÃ¡logos maestros. No sustituye a las fuentes: indica quÃ© relaciones se pueden utilizar ya y cuÃ¡les requieren completar un hueco.

## Relaciones mÃ¡s frecuentes

- mechanic -> belongs_to_system -> system: 6673
- mechanic -> implemented_by_bundle -> bundle: 6377
- object -> belongs_to_category -> menu_category: 4151
- dungeon -> defined_by_bundle -> bundle: 4045
- object -> uses_icon -> resource: 3699
- object -> comes_from_bundle -> bundle: 2994
- dungeon -> uses_icon -> resource: 619

## InterpretaciÃ³n prÃ¡ctica

- object -> belongs_to_category -> menu_category: coloca un recurso en el menÃº/categorÃ­a del buscador.
- object -> uses_icon -> resource: muestra la imagen asociada cuando existe ruta.
- object -> comes_from_bundle -> bundle: conserva el origen tÃ©cnico de la imagen o ficha.
- Las demÃ¡s relaciones deben conservar source_file, ersion_source y evidence al transformarse en enlaces de la guÃ­a.

## No hacer

- No unir una imagen de dungeon con una recompensa solo porque el nombre interno se parezca.
- No convertir un nombre candidato de monster-name-unique.csv en nombre definitivo sin ID/escena.
- No inventar una contraclase o debilidad a partir de una flecha de una imagen ilustrativa.
- No mezclar Google Play/LDPlayer con LDStore sin un diff de versiÃ³n.
