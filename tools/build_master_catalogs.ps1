$ErrorActionPreference = 'Stop'

$analysis = 'T:\Guia Archivos\analisis'
$catalogs = Join-Path $analysis 'catalogos'
$extractGoogle = 'T:\Guia Archivos\juego-extraido'
$extractLdStore = 'T:\Guia Archivos\juego-extraido-ldstore\AndroidData\com.mten.ld'
$repo = 'C:\Users\Central\Documents\GitHub\etsp-guide'
$out = Join-Path $analysis 'catalogos-maestros'
$repoData = Join-Path $repo 'assets\data\catalogos-maestros'

function Get-Rows([string] $Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return @() }
    return @(Import-Csv -LiteralPath $Path)
}

function S([object] $Value) {
    if ($null -eq $Value) { return '' }
    return ([string]$Value).Trim()
}

function P([object] $Value) { return (S $Value).Replace('\','/') }

function Stable([string] $Prefix, [object[]] $Parts) {
    $payload = $Prefix + '|' + (($Parts | ForEach-Object { S $_ }) -join '|')
    $sha = [System.Security.Cryptography.SHA1]::Create()
    $hash = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($payload))
    $hex = ([BitConverter]::ToString($hash)).Replace('-','').ToLowerInvariant().Substring(0,16)
    return "$Prefix-$hex"
}

function Save-Catalog([string] $Name, [object[]] $Rows) {
    $path = Join-Path $out $Name
    $Rows | Export-Csv -LiteralPath $path -NoTypeInformation -Encoding UTF8
    Copy-Item -LiteralPath $path -Destination (Join-Path $repoData $Name) -Force
    return [pscustomobject]@{ catalog = $Name; rows = @($Rows).Count; analysis = $path; repository = (Join-Path $repoData $Name) }
}

New-Item -ItemType Directory -Force -Path $out,$repoData | Out-Null

# Catálogo de menús, carpetas UI y módulos.
$menu = New-Object System.Collections.Generic.List[object]
foreach ($r in (Get-Rows (Join-Path $analysis 'system-map\system-map.csv'))) {
    $category = S $r.categoria; $name = S $r.nombre; $bundle = P $r.bundle_origen
    $menu.Add([pscustomobject][ordered]@{
        menu_id = Stable 'menu' @('logic',$category,$name,$bundle); entry_type='logic_entry'; section=$category; category=$category; subcategory=''; entry_name=$name; entry_count='1'; source_file='analisis/system-map/system-map.csv'; bundle=$bundle; bytes=(S $r.bytes); version_source='Google Play LDPlayer'; evidence='extraído del cliente'
    })
}
foreach ($r in (Get-Rows (Join-Path $catalogs 'ui-folder-catalog.csv'))) {
    $section=S $r.seccion; $category=S $r.carpeta
    $menu.Add([pscustomobject][ordered]@{
        menu_id=Stable 'menu' @('ui',$section,$category); entry_type='ui_folder'; section=$section; category=$category; subcategory=''; entry_name=$category; entry_count=(S $r.archivos); source_file='analisis/catalogos/ui-folder-catalog.csv'; bundle=''; bytes=''; version_source='Google Play LDPlayer'; evidence='carpeta de interfaz extraída'
    })
}
foreach ($r in (Get-Rows (Join-Path $catalogs 'modules-by-system.csv'))) {
    $module=S $r.modulo
    $menu.Add([pscustomobject][ordered]@{
        menu_id=Stable 'menu' @('module',$module); entry_type='data_module'; section=$module; category=$module; subcategory=''; entry_name=$module; entry_count=(S $r.entradas); source_file='analisis/catalogos/modules-by-system.csv'; bundle=''; bytes=''; version_source='Google Play LDPlayer'; evidence='módulo de configuración/lógica detectado'
    })
}

# Catálogo de objetos y textos del cliente.
$object = New-Object System.Collections.Generic.List[object]
$clientText = Get-Rows (Join-Path $catalogs 'client-item-text-catalog.csv')
$textByName = @{}
foreach ($r in $clientText) { $n=S $r.nombre; if($n){$textByName[$n.ToLowerInvariant()]=$r} }
foreach ($r in (Get-Rows (Join-Path $catalogs 'object-search-database.csv'))) {
    $internal=S $r.nombre_interno; $visible=S $r.nombre_visible; $lookup=($visible,$internal | Where-Object {$_} | Select-Object -First 1); $extra=$textByName[$lookup.ToLowerInvariant()]
    $desc=S $r.descripcion; if(-not $desc -and $extra){$desc=S $extra.descripcion_cliente}
    $object.Add([pscustomobject][ordered]@{
        object_id=(S $r.id_registro); record_type='search_resource'; category=(S $r.categoria); internal_name=$internal; published_name=$visible; description=$desc; source_method=(S $r.fuente_obtencion); source_parameters=(S $r.parametros_fuente); icon_path=(P $r.icono_relativo); bundle=(P $r.bundle_origen); width=(S $r.ancho); height=(S $r.alto); evidence=((S $r.estado) -or 'registro de búsqueda extraído'); version_source='Google Play LDPlayer'; source_file='analisis/catalogos/object-search-database.csv'
    })
}
foreach ($r in (Get-Rows (Join-Path $catalogs 'goods-item-catalog.csv'))) {
    $name=S $r.nombre; $extra=$textByName[$name.ToLowerInvariant()]; $desc=S $r.descripcion; if(-not $desc -and $extra){$desc=S $extra.descripcion_cliente}
    $object.Add([pscustomobject][ordered]@{
        object_id=(S $r.id); record_type='goods_item'; category='goods'; internal_name=''; published_name=$name; description=$desc; source_method=''; source_parameters=(S $r.go_to); icon_path=(P $r.archivo); bundle=(P $r.bundle); width=''; height=''; evidence='catálogo de goods del cliente'; version_source='Google Play LDPlayer'; source_file='analisis/catalogos/goods-item-catalog.csv'
    })
}
$known = @{}; foreach($r in $object){$known[((S $r.published_name).ToLowerInvariant()+'|'+(S $r.description))]=$true}
foreach ($r in $clientText) {
    $name=S $r.nombre; $desc=S $r.descripcion_cliente; $key=$name.ToLowerInvariant()+'|'+$desc
    if($name -and -not $known.ContainsKey($key)){
        $object.Add([pscustomobject][ordered]@{
            object_id=(Stable 'text' @($name)); record_type='client_text_only'; category='text_without_object_link'; internal_name=''; published_name=$name; description=$desc; source_method=''; source_parameters=(S $r.go_to_detectado); icon_path=''; bundle=''; width=''; height=''; evidence='texto del cliente sin objeto enlazado'; version_source='Google Play LDPlayer'; source_file='analisis/catalogos/client-item-text-catalog.csv'
        })
    }
}

# Catálogo general de recursos: sprites, texturas, modelos, mallas, iconos y bundles.
$resource = New-Object System.Collections.Generic.List[object]
function Add-Resource([string]$Type,[object]$Key,[object]$Name,[object]$Path,[object]$Bundle,[object]$Width,[object]$Height,[object]$Size,[string]$Source,[string]$Version='Google Play LDPlayer',[string]$Evidence='extraído del cliente') {
    $resource.Add([pscustomobject][ordered]@{resource_id=(Stable $Type @($Key,$Path,$Bundle)); resource_type=$Type; resource_name=(S $Name); path=(P $Path); bundle=(P $Bundle); width=(S $Width); height=(S $Height); size_bytes=(S $Size); source_file=$Source; version_source=$Version; evidence=$Evidence})
}
foreach($r in (Get-Rows (Join-Path $analysis 'sprites-ui\sprites-index.csv'))){Add-Resource 'ui_sprite' $r.nombre $r.nombre $r.archivo_salida $r.bundle_origen $r.ancho $r.alto '' 'analisis/sprites-ui/sprites-index.csv'}
foreach($r in (Get-Rows (Join-Path $analysis 'textures-3d\textures-index.csv'))){Add-Resource 'texture' $r.nombre $r.nombre $r.archivo_salida $r.bundle_origen $r.ancho $r.alto $r.bytes 'analisis/textures-3d/textures-index.csv'}
foreach($r in (Get-Rows (Join-Path $analysis 'modelos\model-catalog-full.csv'))){$ev='modelo extraído';if(-not(S $r.genero)){$ev='modelo extraído; asociación de clase pendiente'};Add-Resource 'model' $r.model_id $r.nombre_tecnico $r.glb $r.bundle $r.vertices $r.caras '' 'analisis/modelos/model-catalog-full.csv' 'Google Play LDPlayer' $ev}
foreach($r in (Get-Rows (Join-Path $analysis 'modelos\model-mesh-index.csv'))){Add-Resource 'mesh' $r.path_id $r.mesh_name $r.mesh_name $r.bundle '' '' $r.submeshes 'analisis/modelos/model-mesh-index.csv'}
foreach($r in $object){if(S $r.icon_path){Add-Resource 'object_icon' $r.object_id ($r.published_name,$r.internal_name|Where-Object{$_}|Select-Object -First 1) $r.icon_path $r.bundle $r.width $r.height '' (S $r.source_file) (S $r.version_source) 'icono enlazado al registro de objeto'}}
foreach($pair in @(@($extractGoogle,'Google Play LDPlayer'),@($extractLdStore,'LDStore'))){$root=[string]$pair[0];$ver=[string]$pair[1];if(Test-Path -LiteralPath $root){foreach($f in (Get-ChildItem -LiteralPath $root -Recurse -File -Filter '*.assetbundle' -ErrorAction SilentlyContinue)){Add-Resource 'assetbundle' ($f.FullName.Substring($root.Length)) $f.Name ($f.FullName.Substring($root.Length)) '' '' '' $f.Length 'extracción local de AssetBundles' $ver 'archivo AssetBundle inventariado'}}}

# Catálogo de dungeons y escenas.
$dungeon = New-Object System.Collections.Generic.List[object]
foreach($r in (Get-Rows (Join-Path $catalogs 'dungeons.csv'))){$dungeon.Add([pscustomobject][ordered]@{dungeon_id=(Stable 'dungeon-icon' @($r.nombre,$r.bundle_origen));record_type='dungeon_visual_resource';scene_id='';name=(S $r.nombre);chapter='';scene_config='';icon_path=(P $r.archivo_salida);bundle=(P $r.bundle_origen);width=(S $r.ancho);height=(S $r.alto);source_file='analisis/catalogos/dungeons.csv';version_source='Google Play LDPlayer';evidence='recurso visual de dungeon'})}
foreach($r in (Get-Rows (Join-Path $analysis 'text-assets\text-assets-index.csv'))){$name=S $r.nombre;$bundle=P $r.bundle_origen;if($bundle -match 'lua_config_scene' -or $name -match 'lua_config_scene'){$parts=$name -split '__';$scene=if($parts.Count){$parts[0]}else{$name};$entity=if($parts.Count -gt 1){$parts[1]}else{'scene'};$dungeon.Add([pscustomobject][ordered]@{dungeon_id=(Stable 'scene' @($name,$bundle));record_type='scene_config';scene_id=$scene;name='';chapter='';scene_config=$name;icon_path='';bundle=$bundle;width='';height='';source_file='analisis/text-assets/text-assets-index.csv';version_source='Google Play LDPlayer';evidence="config de escena $entity; nombre visible requiere enlazar texto"})}}

# Catálogo de mecánicas, módulos y entradas de lógica/UI.
$mechanics = New-Object System.Collections.Generic.List[object]
foreach($r in (Get-Rows (Join-Path $analysis 'system-map\system-map.csv'))){$cat=S $r.categoria;$name=S $r.nombre;$bundle=P $r.bundle_origen;$mechanics.Add([pscustomobject][ordered]@{mechanic_id=(Stable 'mechanic' @($cat,$name,$bundle));system=$cat;entry_type='logic_or_ui_entry';entry_name=$name;module='';bundle=$bundle;source_file='analisis/system-map/system-map.csv';bytes=(S $r.bytes);version_source='Google Play LDPlayer';evidence='entrada de lógica/UI extraída'})}
foreach($r in (Get-Rows (Join-Path $catalogs 'modules-by-system.csv'))){$module=S $r.modulo;$mechanics.Add([pscustomobject][ordered]@{mechanic_id=(Stable 'module' @($module));system=$module;entry_type='configuration_module';entry_name=$module;module=$module;bundle='';source_file='analisis/catalogos/modules-by-system.csv';bytes='';version_source='Google Play LDPlayer';evidence=('módulo con '+(S $r.entradas)+' entradas; ejemplos: '+(S $r.ejemplos))})}

# Relaciones entre catálogos.
$relations = New-Object System.Collections.Generic.List[object]
function Add-Relation([string]$FromType,[object]$FromId,[string]$Relation,[string]$ToType,[object]$ToId,[string]$Source,[string]$Evidence,[string]$Version='Google Play LDPlayer'){$relations.Add([pscustomobject][ordered]@{relation_id=(Stable 'rel' @($FromType,$FromId,$Relation,$ToType,$ToId));from_type=$FromType;from_id=(S $FromId);relation=$Relation;to_type=$ToType;to_id=(S $ToId);source_file=$Source;version_source=$Version;evidence=$Evidence})}
$resourceByPath=@{};foreach($r in $resource){$p=P $r.path;if($p -and -not $resourceByPath.ContainsKey($p)){$resourceByPath[$p]=S $r.resource_id}}
foreach($r in $object){$oid=S $r.object_id;$cat=S $r.category;if($cat){Add-Relation 'object' $oid 'belongs_to_category' 'menu_category' $cat (S $r.source_file) 'categoría del catálogo de objetos'};$icon=P $r.icon_path;if($icon){$rid=$resourceByPath[$icon];if(-not $rid){$rid=Stable 'object_icon' @($oid)};Add-Relation 'object' $oid 'uses_icon' 'resource' $rid (S $r.source_file) 'ruta de icono registrada'};$bundle=P $r.bundle;if($bundle){Add-Relation 'object' $oid 'comes_from_bundle' 'bundle' $bundle (S $r.source_file) 'bundle de origen registrado'}}
foreach($r in $mechanics){$mid=S $r.mechanic_id;$sys=S $r.system;if($sys){Add-Relation 'mechanic' $mid 'belongs_to_system' 'system' $sys (S $r.source_file) 'categoría/módulo extraído'};$bundle=P $r.bundle;if($bundle){Add-Relation 'mechanic' $mid 'implemented_by_bundle' 'bundle' $bundle (S $r.source_file) 'bundle de lógica/UI'}}
foreach($r in $dungeon){$did=S $r.dungeon_id;$bundle=P $r.bundle;if($bundle){Add-Relation 'dungeon' $did 'defined_by_bundle' 'bundle' $bundle (S $r.source_file) 'config o recurso visual de escena'};$icon=P $r.icon_path;if($icon){$rid=$resourceByPath[$icon];if(-not $rid){$rid=Stable 'dungeon_icon' @($did)};Add-Relation 'dungeon' $did 'uses_icon' 'resource' $rid (S $r.source_file) 'icono de dungeon'}}

# Huecos explícitos, sin inventar datos.
$gaps = New-Object System.Collections.Generic.List[object]
$missingNames=@($object|Where-Object{(S $_.record_type) -eq 'search_resource' -and -not(S $_.published_name)}).Count
$gaps.Add([pscustomobject][ordered]@{gap_id='objects-visible-name';priority='alta';area='objects';count=$missingNames;description='Registros de búsqueda con icono pero sin nombre visible enlazado.';source='object-search-database.csv';next_action='Relacionar nombre/descripcion de TextAssets y ficha del objeto.'})
$sourceCount=@(Get-Rows (Join-Path $catalogs 'item-source-database.csv')).Count
$gaps.Add([pscustomobject][ordered]@{gap_id='item-source-object-link';priority='alta';area='objects';count=$sourceCount;description='Fuentes internas detectadas sin relación inequívoca con un objeto concreto.';source='item-source-database.csv';next_action='Resolver parámetros type/param contra IDs de goods y objetos.'})
$visualCount=@($dungeon|Where-Object{(S $_.record_type) -eq 'dungeon_visual_resource'}).Count
$gaps.Add([pscustomobject][ordered]@{gap_id='dungeon-semantic-link';priority='alta';area='dungeons';count=$visualCount;description='Iconos de dungeons que necesitan enlazarse con nombre, escena, capítulo, objetivos y recompensas.';source='dungeons.csv';next_action='Relacionar iconos con lua_config_scene y datos de actividad.'})
$gaps.Add([pscustomobject][ordered]@{gap_id='lua-bytecode-fields';priority='alta';area='mechanics';count=19225;description='TextAssets del cliente; algunos campos están serializados como bytecode Lua y no exponen directamente todas las relaciones.';source='text-assets-index.csv';next_action='Decodificar estructuras o contrastar con capturas del juego.'})
$gaps.Add([pscustomobject][ordered]@{gap_id='zodiac-master-catalog';priority='media';area='zodiac';count=1;description='El CSV zodiac.csv existente está vacío, aunque hay configuraciones, iconos y Glyph extraídos.';source='zodiac.csv / zodiac-icons.csv / configs godRune';next_action='Construir el catálogo Zodiac/Glyph desde las configuraciones internas.'})
$blankModels=@(Get-Rows (Join-Path $analysis 'modelos\model-catalog-full.csv')|Where-Object{-not(S $_.genero)}).Count
$gaps.Add([pscustomobject][ordered]@{gap_id='model-class-association';priority='media';area='models';count=$blankModels;description='Modelos 3D extraídos sin asociación automática a clase, género o pieza concreta.';source='model-catalog-full.csv';next_action='Relacionar modelo con outfit/arma mediante IDs de configuración y capturas.'})
$ldCount=@($resource|Where-Object{(S $_.version_source) -eq 'LDStore'}).Count
$gaps.Add([pscustomobject][ordered]@{gap_id='ldstore-semantic-diff';priority='media';area='versions';count=$ldCount;description='AssetBundles de LDStore inventariados, pero todavía no fusionados semánticamente con los catálogos de Google Play.';source='juego-extraido-ldstore';next_action='Comparar nombres, hashes y módulos y marcar diferencias de versión.'})
$gaps.Add([pscustomobject][ordered]@{gap_id='server-runtime-data';priority='alta';area='global';count='';description='Estados de cuenta, recompensas dinámicas, disponibilidad real y datos exclusivos del servidor no se pueden garantizar desde los archivos del cliente.';source='alcance del cliente';next_action='Registrar como dato de servidor o capturar dentro del juego.'})

$summaries = @()
$summaries += Save-Catalog 'menu-catalog.csv' $menu
$summaries += Save-Catalog 'object-catalog.csv' $object
$summaries += Save-Catalog 'resource-catalog.csv' $resource
$summaries += Save-Catalog 'dungeon-catalog.csv' $dungeon
$summaries += Save-Catalog 'mechanics-catalog.csv' $mechanics
$summaries += Save-Catalog 'relations.csv' $relations
$summaries += Save-Catalog 'catalog-gaps.csv' $gaps

$report = [ordered]@{generated_from=@('T:/Guia Archivos/analisis','T:/Guia Archivos/juego-extraido','T:/Guia Archivos/juego-extraido-ldstore/AndroidData/com.mten.ld');catalogs=$summaries;rules=@('Cada fila conserva fuente, bundle, versión y estado de evidencia.','No se inventan nombres, descripciones, recompensas o asociaciones de clase.','Los huecos quedan en catalog-gaps.csv.','Google Play y LDStore se mantienen como versiones diferenciadas.')}
$json = $report | ConvertTo-Json -Depth 6
$json | Set-Content -LiteralPath (Join-Path $out 'catalog-summary.json') -Encoding UTF8
$json | Set-Content -LiteralPath (Join-Path $repoData 'catalog-summary.json') -Encoding UTF8
$readme = @'
# Catálogos maestros de Eternal Sword Pact

Generados a partir de los índices de la extracción de LDPlayer y de las dos instalaciones diferenciadas:

- Google Play: `com.mten.tgp`
- LDStore: `com.mten.ld`

Cada fila conserva la fuente, el bundle, la versión y el estado de evidencia. Los datos que todavía no pueden relacionarse de forma inequívoca se encuentran en `catalog-gaps.csv`; no se rellenan con suposiciones.

## Archivos

- `menu-catalog.csv`: menús, carpetas de UI, módulos y entradas de lógica.
- `object-catalog.csv`: objetos, goods, iconos y textos del cliente.
- `resource-catalog.csv`: sprites, texturas, modelos, mallas, iconos y AssetBundles.
- `dungeon-catalog.csv`: recursos visuales y configuraciones de escenas.
- `mechanics-catalog.csv`: módulos y entradas de sistemas/mecánicas.
- `relations.csv`: relaciones entre objetos, recursos, sistemas, bundles y dungeons.
- `catalog-gaps.csv`: información faltante o que necesita una relación adicional.
'@
$readme | Set-Content -LiteralPath (Join-Path $out 'README.md') -Encoding UTF8
$readme | Set-Content -LiteralPath (Join-Path $repoData 'README.md') -Encoding UTF8
$summaries | ConvertTo-Json -Depth 5
