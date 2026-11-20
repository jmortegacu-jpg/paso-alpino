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
