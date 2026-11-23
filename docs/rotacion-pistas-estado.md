# Paso Alpino — seguimiento de rotación (propuesta aislada)
Fecha: 2026-11-16 00:03 America/Costa_Rica
Pista trabajada: **5/6 Ruta 1 Interamericana Norte, hacia Guanacaste**
Siguiente pista: **6/6 Ruta 34 Costanera Sur**
Identificador de pista en index.html: `alpino`; tema: `ruta1`.
Rama: `graphics/ruta1-guanacaste-sombra-20261116`.
Cambios: copas amplias de sombra y troncos instanciados para una silueta evocadora del paisaje de Guanacaste; 26 árboles alta/cine, 14 media y 7 baja; no se alteran física, ruta, controles, vehículos ni multijugador. Sin fotografías ni marcas externas.
Contexto existente: potreros, ganado, cercas y rótulos de Ruta 1 ya están en el código de `main`.
Referencias para contraste visual futuro: ICT https://es.visitcostarica.com/where-to-go/guanacaste ; SINAC https://www.sinac.go.cr/ES/ac/act/Paginas/default.aspx . Son puntos de consulta, no se ha certificado semejanza de ubicaciones concretas. La carretera del juego es un circuito ficticio.
Pruebas: escritura en GitHub confirmada; faltan parser JS, captura WebGL, revisión de sombras, FPS móvil/PC y colisiones visuales. Los meshes no participan en física.
Compatibilidad: PR #25 (identidad Ruta 1) y PR #31-36 continúan abiertos; no se han fusionado; posibles conflictos al editar `graphics/costa-rica-tracks.js` requieren reconciliación antes de merge.
Publicación: **NO lista para Netlify**; sin fusión ni despliegue.
## Control de preparación
- [x] Ruta 1: primer conjunto de sombra característico propuesto en rama
- [ ] Ruta 1: validar vegetación, orientación, escala y FPS
- [ ] Ruta 2: eólicas, fauna, páramo y pruebas integradas
- [ ] Ruta 27: peajes, viaductos y trazado, pruebas integradas
- [ ] Ruta 32: túnel, cascadas, fauna y pruebas integradas
- [ ] Puntarenas: muelle, faro, edificaciones, pruebas integradas
- [ ] Ruta 34: litoral, manglares, embarcaciones, pruebas integradas
- [ ] Vehículos, físicas, editor, multijugador, WebGL y FPS
- [ ] Resolver compatibilidad de PR y obtener aprobación expresa para Netlify
Nota: las ramas PR #33-35 mantienen versiones independientes del archivo de seguimiento; consolidar historial antes de integración. No confundir esta rama aislada con un estado único en `main`.

## Revisión incremental — 2026-11-16 21:04 Costa Rica
- Pista: 5/6 Ruta 1 Interamericana Norte Guanacaste. Siguiente: 6/6 Ruta 34 Costanera Sur.
- Cambio: variación determinista de altura y profundidad de copas en los árboles de sombra ya instanciados, sin nuevas instancias, texturas, luces, colisiones ni modificación de carretera/vehículos. Commit gráfico: 2dfc0f1b68951dd7f6f39e89dacb6e0ce644e290.
- PR existente: #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 (borrador). No se crea otro PR duplicado.
- Referencias de contexto: ICT https://es.visitcostarica.com/where-to-go/guanacaste ; SINAC https://www.sinac.go.cr/ES/ac/act/Paginas/default.aspx . No se copiaron fotografías ni modelos.
- Pruebas: reemplazo exacto del bloque y commit GitHub confirmados. Pendiente ejecutar parser JS, WebGL, FPS móvil/PC, cámara conductor, físicas y multijugador; no se atribuyen resultados no medidos.
- Integración: el módulo graphics/costa-rica-tracks.js también es modificado por otros PR; requiere reconciliación antes de merge. Estado de lanzamiento: bloqueado, no fusionar ni desplegar.

## Revisión incremental — 2026-11-17 15:04 Costa Rica
- Pista trabajada: 5/6 Ruta 1 Interamericana Norte (ID `alpino`, tema `ruta1`); siguiente: 6/6 Ruta 34 Costanera Sur.
- Cambio: recalcular `computeBoundingSphere()` y marcar `instanceMatrix.needsUpdate` en troncos y copas del arbolado existente, desactivar sombras de estos dos meshes para contener costo de renderizado. Sin alteración de carretera, vehículos, colisiones ni multijugador. Commit: `7988fa95841e366ae356ef4b7c63bc909230e09e`.
- PR borrador existente: #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37; consultado como fusionable con main antes del cambio, no se certifica compatibilidad con otros PR. PR #39 Puntarenas continúa no fusionable con main; evitar merges hasta reconciliar.
- Referencias contextuales: ICT https://es.visitcostarica.com/where-to-go/guanacaste ; SINAC https://www.sinac.go.cr/ES/ac/act/Paginas/default.aspx . No se copiaron fotografías, marcas ni modelos.
- Pruebas: GitHub aceptó escritura; revisión estática del bloque sustituido. Pendientes parser JS ejecutado, WebGL, FPS móvil/PC, cámara de conducción, física, multijugador y comprobación de integración entre PR.
- Checklist: [x] ajuste incremental de arbolado Ruta 1; [ ] prueba visual y FPS Ruta 1; [ ] cinco pistas restantes integradas y verificadas; [ ] vehículos y multijugador; [ ] compatibilidad de PR; [ ] autorización de publicación. Netlify sin publicar.

## Revisión incremental — 2026-11-18 08:56 Costa Rica
- Pista: 5/6 Ruta 1 Interamericana Norte Guanacaste; identificador `alpino`, tema `ruta1`. Siguiente: 6/6 Ruta 34 Costanera Sur.
- Cambio real: 12/7/4 cortez amarillo estilizados según calidad, troncos y copas de floración amarilla con dos `THREE.InstancedMesh`, geometría procedimental, PBR, límites de visibilidad recalculados y sin sombras ni colisiones nuevas. Fuera de calzada. Commit: `55875ed32ec6d67b4c3b89c44623933200a2dd63`.
- Fuente botánica: Área de Conservación Guanacaste https://www.acguanacaste.ac.cr/arboretum/4814-cortez-amarillo (Handroanthus ochraceus, floración amarilla y uso en potreros); bosque seco https://www.acguanacaste.ac.cr/biodesarrollo/programa-sectores/sector-santa-rosa . Modelos originales, no se copiaron fotografías.
- PR borrador reutilizado: #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 . Consultado fusionable con main antes del commit; no implica compatibilidad con los demás PR. #34 y #39 consultados no fusionables; múltiples PR editan el mismo módulo.
- Verificación: GitHub aceptó commit. No se ejecutaron parser JavaScript, WebGL, FPS, cámara de conducción, físicas ni multijugador; todos pendientes. Verificar posición visual y escala de árboles en navegador.
- Checklist: [x] incorporación de flora reconocible con instancing; [ ] prueba visual y FPS Ruta 1; [ ] integración de seis pistas; [ ] vehículos; [ ] pruebas críticas; [ ] conflictos PR. **No listo para Netlify; no merge ni despliegue.**


## Revisión incremental — 2026-11-19 03:01 Costa Rica
- Pista trabajada: **5/6 Ruta 1 Interamericana Norte Guanacaste**; ID existente `alpino`, tema `ruta1`. Siguiente: **6/6 Ruta 34 Costanera Sur**.
- Rama/PR reutilizados: `graphics/ruta1-guanacaste-sombra-20261116`, PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 ; sin PR duplicado.
- Código: commit `5583cf17c89bb45613366c957c63716eb3d44c91`. Se trasladó `new THREE.BoxGeometry(.38,.15,.26)` de dentro del bucle de vacas a una única geometría `cowEar` compartida por todos los animales. En calidad alta evita crear 19 geometrías redundantes (20 vacas); en baja evita 7 (8 vacas). El número de mallas y draw calls no cambia; ahorro de asignaciones, no FPS medidos. Sin cambios de física, carretera, red, vehículos ni coordenadas.
- Referencias visuales contextuales: ICT https://es.visitcostarica.com/where-to-go/guanacaste ; SINAC https://www.sinac.go.cr/ES/ac/act/Paginas/default.aspx . No se descargaron ni copiaron fotos; potreros y ganado son decorativos, sin fidelidad geográfica garantizada.
- Verificado: lectura y reemplazo exacto del bloque, escritura GitHub aceptada. Pendientes: parser JS ejecutado, WebGL, FPS móvil/PC, inspección de ganado desde cabina, físicas, multijugador y compatibilidad de PR #25/#37 y otros que editan el mismo módulo. No declarar éxito de pruebas no ejecutadas.
- Checklist Ruta 1: [x] vegetación y fauna procedimentales; [x] reducción de geometrías duplicadas del ganado; [ ] validación visual/LOD/FPS; [ ] integración sin conflictos; [ ] conducción y red.
- Estado global: [ ] seis pistas integradas y validadas; [ ] vehículos revisados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias; [ ] aprobación explícita. **NO LISTO PARA NETLIFY.** Sin merge ni despliegue.

## Revisión incremental — 2026-11-19 21:02 Costa Rica
- Pista trabajada: **5/6 Ruta 1 Interamericana Norte Guanacaste**, ID `alpino`, tema `ruta1`. Siguiente: **6/6 Ruta 34 Costanera Sur**. Se consultó el historial previo y se evitó repetir el ajuste de geometría de orejas del ganado.
- Cambio en `graphics/costa-rica-tracks.js`: tras configurar las matrices de postes de cerca instanciados se marca `instanceMatrix.needsUpdate=true`, se recalcula `computeBoundingSphere()` y se desactivan sombras de postes. El objetivo es evitar desapariciones por culling en cámara de conducción; sin cambios en número de postes, posiciones, física, carretera, vehículos ni multijugador. Commit `06c33b0e175d7eb3e1c46dd1a1fe7f4cea1b1010`.
- PR borrador reutilizado: #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 ; consultado como **no fusionable** antes del cambio. Revisar compatibilidad con PR #25 y demás cambios concurrentes en el mismo módulo.
- Referencias visuales de contexto: ICT https://es.visitcostarica.com/where-to-go/guanacaste y SINAC https://www.sinac.go.cr/ES/ac/act/Paginas/default.aspx ; no se copiaron recursos externos. Geografía escenográfica, no navegación exacta.
- Pruebas verificadas: lectura del archivo, sustitución única del bloque y commit GitHub aceptado. No se ejecutaron parser JS, WebGL, FPS móvil/PC, físicas ni multijugador. Pendiente inspeccionar culling desde cámara de conducción y compatibilidad de PR.
- Checklist Ruta 1: [x] actualización de matrices y límites de postes; [ ] verificación visual/LOD/FPS; [ ] integración sin conflictos; [ ] conducción y red.
- Checklist global: [ ] seis pistas integradas y probadas; [ ] vehículos revisados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias; [ ] autorización expresa. **NO LISTO PARA NETLIFY.** Sin merge ni despliegue.

## Revisión 2026-11-20 12:00 Costa Rica — pista 5/6 y vehículo
- Pista trabajada: Ruta 1 Interamericana Norte Guanacaste; ID real `ruta1` (escena `alpino` en index). Siguiente pista: Ruta 34 Costanera Sur. Historial de PR #37 revisado; no se repitieron copas, cercas ni ganado.
- Cambio de pista: nueva línea de colinas de bosque seco estilizado a 145–173 unidades fuera de calzada, 20/11/6 instancias por calidad, material PBR mate, color por instancia, geometría compartida y límites de visibilidad recalculados. Commit `5d11987612ea6dc2b3cdbedccd9ae2b4cecccb98`. PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 .
- Fuentes: ACG (08-10-2026) https://www.acguanacaste.ac.cr/espaniolllll/6815-acg ; ACG Santa Rosa https://www.acguanacaste.ac.cr/turismo/sector-santa-rosa . Inspiración ecológica, sin topografía exacta ni recursos copiados.
- Vehículos: Aurora V12 (`M.id==='aurora'`), PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Se añadió un aro metálico interior por rueda con segmentos de LOD; commit `30e22b67138d2a98d7a01df13fd2cee560bdfffa`. Mantiene dimensiones, ruedas, físicas y controles. El detalle va en `wh.spin` y gira con la rueda.
- Verificado: lecturas GitHub y commits de ambos archivos. No se ejecutaron parser JS, renderizado WebGL, capturas, FPS móvil/PC, físicas ni multijugador. PR #37 aparecía fusionable con main antes de cambios; PR #45 no fusionable. Ambos requieren comprobación posterior y compatibilidad con PR concurrentes.
- Checklist Ruta 1: [x] nueva silueta de colinas con LOD; [ ] inspección desde cabina; [ ] WebGL/FPS; [ ] integración de PR.
- Checklist Vehículos: [x] aro interior Aurora; [ ] captura de llanta y carrocería; [ ] FPS; [ ] física y red; [ ] conflictos PR #45.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos validados; [ ] PR compatibles; [ ] WebGL/FPS/física/multijugador; [ ] bloqueos resueltos. NO listo para Netlify; sin fusión ni despliegue.


## Revisión — 2026-11-21 06:03 Costa Rica
- Pista 5/6 Ruta 1 Interamericana Norte Guanacaste, tema `ruta1` (escena `alpino`); siguiente 6/6 Ruta 34 Costanera Sur. Historial anterior revisado: se añadió un hito distinto de colinas, ganado, cercas y cortez amarillo.
- Mejora real: árbol de guanacaste de copa amplia original (tronco y 9/6/3 copas instanciadas según calidad), señal «BOSQUE SECO · GUANACASTE» a un costado, fuera de calzada. Commit `879a56f0176807f1d232d5971b521e9ec13fa970`. PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37.
- Vehículos: Aurora V12 original (`aurora`, `graphics/future-chassis.js`), dos líneas de realce del capó siguiendo la superficie existente y LOD de grosor, sin tocar física, colisiones, ruedas ni controles. Commit `8692a4a92faff04d2a229faeeb7d402f0e1adbfd`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes contextuales: ICT https://es.visitcostarica.com/where-to-go/guanacaste ; Área de Conservación Guanacaste https://www.acguanacaste.ac.cr/ . Hitos estilizados, no ubicaciones reales ni navegación GPS. Sin copiar fotografías ni modelos.
- Verificado: lectura de archivos y commits aceptados por GitHub. Pendientes parser JS ejecutado, inspección WebGL, escala y orientación de letrero y árbol desde cabina, FPS móvil/PC, físicas, multijugador, compatibilidad de PR.
- Checklist Ruta 1: [x] hito de copa amplia y señal; [ ] captura conductor y exterior; [ ] WebGL/FPS; [ ] integración.
- Checklist Vehículos: [x] líneas de capó; [ ] visual/FPS; [ ] WebGL/física/red; [ ] compatibilidad.
- Global: [ ] seis pistas integradas y probadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas superadas; [ ] bloqueos resueltos. **NO LISTO PARA NETLIFY**. Sin fusionar ni desplegar.


## Revisión — 2026-11-22 00:00 Costa Rica
- Pista **5/6 Ruta 1 Interamericana Norte Guanacaste**, ID `ruta1` (escena `alpino`); próxima **6/6 Ruta 34 Costanera Sur**. Historial consultado: se evitó repetir guanacaste, cerros, ganado y cercas.
- Código: afloramientos ocre de suelo/roca estilizados, `THREE.InstancedMesh` con 28/15/7 instancias según calidad, geometría dodecaédrica y material PBR mate. Colocados a 88–102 unidades laterales, fuera de la calzada; sin colliders ni luces dinámicas. Commit `47cdadbd1e9f697d378f0000636d0a5aeb98ce7c`. PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 .
- Vehículo paralelo: Aurora V12, dos aletas satinadas del difusor trasero, commit `4341d0c851d61a45698de0567769326eeb47d36f`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Detalle visual sin cambios de físicas, controles, colisiones o red.
- Referencias contextuales: Área de Conservación Guanacaste https://www.acguanacaste.ac.cr/ ; ICT https://es.visitcostarica.com/where-to-go/guanacaste . No se copiaron fotos ni modelos; representación estilizada sin precisión GPS.
- Verificado: lectura de fuentes GitHub y aceptación de ambos commits. No se ejecutaron parser JavaScript, WebGL, capturas de cámara, FPS móvil/PC, física ni multijugador. Compatibilidad entre PR pendientes, no fusionar ni desplegar.
- Checklist Ruta 1: [x] afloramientos instanciados adaptativos; [ ] visibilidad desde conducción y exterior; [ ] FPS/WebGL; [ ] conflictos de PR. Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas superadas. **No listo para Netlify**.

## Turno 2026-11-22 18:05 Costa Rica — Ruta 1 (5/6)
- Pista: Ruta 1 Interamericana Norte Guanacaste (`ruta1`); **siguiente Ruta 34 Costanera Sur** (`costanera`). Historial previo revisado: no se repitieron guanacastes, cortez amarillo, afloramientos, cercas ni colinas.
- Mejora real: refugio rural sombreado 3D original fuera de la calzada, cubierta de material PBR, cuatro columnas `THREE.InstancedMesh` y banco. Referencia contextual: https://www.acguanacaste.ac.cr/ y https://es.visitcostarica.com/where-to-go/guanacaste . Interpretación escenográfica, no ubicación cartográfica exacta. Código `graphics/costa-rica-tracks.js`, commit `ad949453a8bedda926bd641c541ebecaf0a78d39`; PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 [skip netlify].
### Vehículos
- Aurora V12 (`aurora`): dos tomas de aire frontales laterales con dos lamas satinadas cada una, material PBR existente, sin cambios de físicas/colisiones/ruedas/controles/red. Commit `d6a93b48cd71da3d40bc3c06db810247bf9dc724`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 [skip netlify].
- Verificado: lectura de IDs, historial y aceptación de ambos commits por GitHub. PR #37 y #45 abiertos en borrador, **no fusionables** al consultar antes de edición. [x] detalles geométricos; [ ] parser JS; [ ] WebGL/capturas cámara; [ ] FPS móvil/PC; [ ] físicas y multijugador; [ ] compatibilidad PR. Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] pruebas críticas; [ ] conflictos resueltos. No fusionar ni desplegar Netlify.
