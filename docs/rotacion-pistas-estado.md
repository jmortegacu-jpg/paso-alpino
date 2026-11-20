# Paso Alpino — rotación de pistas (rama aislada)
Fecha: 2026-11-16, America/Costa_Rica
Turno: **6/6 Ruta 34 Costanera Sur** (tema de escenario: `costanera`).
Anterior verificado: Ruta 1 en PR #37 (rama `graphics/ruta1-guanacaste-sombra-20261116`).
Siguiente turno: **1/6 Ruta 2 Cerro de la Muerte**. Tras ese turno continuar Ruta 27, Zurquí, Puntarenas, Ruta 1 y Ruta 34.
Cambio: 42 colinas instanciadas alta/cine, 24 media y 12 baja; relieve costero tierra adentro en los tramos con mar, sin colisiones, sombras dinámicas nuevas ni cambios de física. Geometría 3D original de baja complejidad.
Archivo: `graphics/costa-rica-tracks.js`; commit `969083fb093e20a6232fc7915ea8d1761fd5c9d2`.
Referencias de orientación paisajística: ICT https://es.visitcostarica.com/ ; mapa nacional https://www.snitcr.go.cr/ . Las ubicaciones son escenográficas y no verificadas como puntos GPS.
Pruebas: análisis de sintaxis JS mediante parser Function (eliminando export) satisfactorio; escritura GitHub confirmada. No ejecutadas: WebGL, capturas desde conducción, FPS móvil/PC, físicas y multijugador.
Compatibilidad: PR #18 (embarcaciones Costanera) y #25, #31–37 pendientes; modificaciones concurrentes en el mismo módulo pueden requerir rebase manual. No fusionar sin validación.
Publicación: **NO LISTA**. Sin merge ni Netlify.

## Checklist global
- [x] Ruta 2: parque eólico en PR #33; [ ] validar visual, fauna, páramo y FPS
- [x] Ruta 27: peajes y señales PR #34; [ ] validar trazado, WebGL y FPS
- [x] Ruta 32: túnel y reflectores PR #35; [ ] validar visual y FPS
- [x] Puntarenas: fachadas y paseo PR #36; [ ] validar muelle, faro, FPS
- [x] Ruta 1: árboles de sombra PR #37; [ ] validar escala y FPS
- [x] Ruta 34: relieve costero en esta rama; [ ] validar sectores marinos, orientación, FPS
- [ ] Reconciliar PR y pruebas integradas de vehículos, carretera, físicas, editor, multijugador, WebGL y FPS
- [ ] Obtener autorización expresa antes de publicar en Netlify

## Revisión incremental — 2026-11-17 00:00 Costa Rica
- Pista: 6/6 Ruta 34 Costanera Sur; siguiente: 1/6 Ruta 2 Cerro de la Muerte.
- Corrección: actualizar explícitamente instanceMatrix y esfera envolvente de colinas InstancedMesh tras colocar las instancias, evitando límites de culling desactualizados; desactivar castShadow para no incrementar coste de sombras. Sin alterar carretera, físicas, vehículos ni multijugador.
- Commit gráfico: f36f3a04786c2073ec83a1d3ba448ccd40a4e0b3; PR #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38 (borrador).
- Fuentes de contexto existentes: ICT https://es.visitcostarica.com/ y SNIT https://www.snitcr.go.cr/; sin imágenes copiadas ni pretensión de trazado exacto.
- Prueba realizada: parser JavaScript sobre el archivo completo retirando el token export (satisfactoria). No ejecutadas: WebGL real, cámara de conducción, FPS móvil/PC, físicas y multijugador.
- Compatibilidad: PR #18 y demás ramas de gráficos aún requieren integración y pruebas conjuntas; esta rama no se fusionó. Netlify sin despliegue.

## Revisión incremental — 2026-11-17 18:04 Costa Rica
- Pista: 6/6 Ruta 34 Costanera Sur. Siguiente: 1/6 Ruta 2 Cerro de la Muerte.
- Historial contrastado: turno anterior informado Ruta 1 (PR #37); PR #38 es la rama de relieve Costanera. Existe además PR #40 de manglar Costanera, en rama separada: **no se han combinado**, y ambos modifican `graphics/costa-rica-tracks.js`.
- Mejora de este turno: variación tonal determinista por instancia (`setColorAt`) para colinas costeras, sin nuevos meshes, texturas, luces, físicas, colisiones ni cambios a vehículos; commit `961c9d342c6c65f83af33112a137bf0407830a63` en PR #38.
- Fuentes paisajísticas de referencia ya documentadas: ICT https://es.visitcostarica.com/ y SNIT https://www.snitcr.go.cr/ . Trazado y ubicación escenográficos, no GPS.
- Verificación: GitHub aceptó la escritura del código. Pendientes: parseo JS automatizado, prueba WebGL de `instanceColor`, cámara de conducción, FPS móvil/PC, física, multijugador y compatibilidad conjunta de PR #38 y #40. No declarar rendimiento mejorado sin medición.
- Lanzamiento: **NO LISTO**. Checklist de seis pistas y vehículos sigue incompleto; no merge ni Netlify.

## Revisión incremental — 2026-11-18 12:00 Costa Rica
- Pista trabajada: **6/6 Ruta 34 Costanera Sur** (ID de escena `costanera`). Siguiente: **1/6 Ruta 2 Cerro de la Muerte**.
- Historial consultado: PR #38 y registro de mejoras del 16 y 17 de noviembre; no se repitió la mejora de colinas ni su color por instancia. PR #40 añade manglar en rama distinta; **no se integró**.
- Cambio real: dos `THREE.InstancedMesh` de 48/24/12 postes reflectantes según calidad, fuera de la calzada, sin colisiones ni sombras; señales escenográficas DOMINICAL · UVITA y RUTA 34 · HACIA PALMAR NORTE. No se modifican carretera, físicas, vehículos o multijugador.
- Commit de código: `f6f0de0cad4697015696da6d59d55e0a64b52c9d`. PR borrador #38: https://github.com/jmortegacu-jpg/paso-alpino/pull/38 .
- Referencias verificadas: MOPT 2025-06-02 https://www.mopt.go.cr/node/1059 (demarcación y captaluces Dominical-Uvita); MOPT 2025-07-04 https://www.mopt.go.cr/noticias/2025/quienes-visiten-el-pacifico-sur-en-vacaciones-se-toparan-con-36-km-completamente (poblados y tramo). Las posiciones son ilustrativas, no GPS. Sin uso de fotografías protegidas.
- Comprobación: escritura GitHub confirmada; lectura posterior del código y de los nuevos nombres pendiente. Sin pruebas ejecutadas de sintaxis JavaScript, WebGL, cámara conductor, FPS móvil/PC, físicas, multijugador ni compatibilidad integrada de PR #38/#40. No atribuir mejoras de FPS sin medición.
- Checklist de esta pista: [x] detalle 3D ligero; [x] señales de orientación ilustrativas; [ ] verificar legibilidad/escala y colocación; [ ] medir FPS; [ ] comprobar renderizado WebGL; [ ] integrar PR #40 sin conflictos.
- Global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR compatibles; [ ] físicas/multijugador/FPS/WebGL satisfactorios; [ ] bloqueos resueltos. **NO LISTO PARA PUBLICACIÓN.** Sin merge ni Netlify.

## Revisión incremental — 2026-11-19 06:00 Costa Rica
- Pista trabajada: **6/6 Ruta 34 Costanera Sur**, tema `costanera`. Siguiente pista: **1/6 Ruta 2 Cerro de la Muerte**.
- Historial: se comprobó el registro de Ruta 34 del 18/11 y el turno anterior Ruta 1 del 19/11; no se repitieron los postes ni las colinas. Se reutilizó la rama de PR #38. PR #40 (manglar) continúa independiente.
- Mejora de código: 28/16/8 afloramientos rocosos según calidad alta/media/baja, geometría dodecaédrica original y material PBR compartido con `THREE.InstancedMesh`, colocados tierra adentro a más de 55 unidades del centro de la pista; `instanceMatrix.needsUpdate`, `computeBoundingSphere()`, sin sombras ni colisiones. No se alteraron la carretera, físicas, vehículos o multijugador.
- Commit gráfico: `efa077d5550acad192732093177253c18631496e`. PR borrador #38: https://github.com/jmortegacu-jpg/paso-alpino/pull/38 . El título mantiene `[skip netlify]`.
- Fuentes: MOPT (2025-06-02) https://www.mopt.go.cr/node/1059 y MOPT (2025-08-01) https://www.mopt.go.cr/noticias/2025/mejoras-en-costanera-sur-la-convierten-en-una-excelente-ruta-alterna-por-cierre-de . Referencias de costa, demarcación y tramo Dominical-Uvita; rocas escenográficas, no puntos cartográficos exactos. No se copiaron fotografías ni activos protegidos.
- Prueba verificada: relectura del archivo desde GitHub y compilación sintáctica con `new Function` tras retirar `export` satisfactoria. No se ejecutaron WebGL, FPS móvil/PC, cámara de conducción, físicas ni multijugador.
- Compatibilidad: PR #38 y #40 modifican `graphics/costa-rica-tracks.js`; integración aún no validada. Mantener como bloqueo hasta pruebas conjuntas.
- Checklist Costanera: [x] relieve instanciado; [x] delineadores; [x] rocas PBR ligeras; [ ] comprobación visual de escala, terreno y letreros; [ ] WebGL/FPS; [ ] compatibilidad PR #38/#40.
- Global: [ ] seis pistas visualmente verificadas; [ ] vehículos; [ ] PR compatibles; [ ] físicas/multijugador; [ ] FPS/WebGL; [ ] bloqueos resueltos. **NO LISTO PARA PUBLICACIÓN**. Sin merge ni Netlify.

## Mejora visual prioritaria — 2026-11-19, Costa Rica
- Pista: **6/6 Ruta 34 Costanera Sur** (ID `costanera`); siguiente: **1/6 Ruta 2 Cerro de la Muerte**. Historial previo revisado: no se repitieron rocas, postes ni colinas cercanas.
- Cambio de calidad visual: colinas próximas con más facetas en calidad alta y rugosidad PBR ajustada; **segunda línea de montañas** azul-verdosas más distante (18/10/5 instancias según calidad), con variación de silueta y escala para profundidad desde cámara de conducción. Un solo draw call adicional para la cresta, geometría y material compartidos, sin texturas externas, sombras, luces dinámicas ni colisiones.
- Commit de código: `f317e069c8834eb77ffa0fa3ee32289c78a4f5ed`. PR borrador reutilizado: #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38 ; título `[skip netlify]`.
- Referencias paisajísticas documentadas: ICT https://es.visitcostarica.com/ ; SNIT https://www.snitcr.go.cr/ . Composición escenográfica original, sin afirmar correspondencia GPS ni copiar imágenes.
- Verificado: escritura del archivo GitHub confirmada. **No se han ejecutado** parser JavaScript, captura WebGL, FPS móvil/PC, pruebas de conducción, físicas ni multijugador en este turno. Debe revisarse el efecto visual de la cordillera, la oclusión y la escala desde cabina.
- Compatibilidad: PR #38 consultado **no fusionable** con `main` antes de la escritura; PR #40 toca el mismo módulo. Bloqueo pendiente de resolución antes de integrar.
- Checklist Ruta 34: [x] doble profundidad de relieve con LOD y PBR; [ ] comprobar renderizado y escala desde conductor; [ ] FPS móvil/PC; [ ] resolver compatibilidad PR #38/#40.
- Checklist global: [ ] seis pistas integradas y validadas; [ ] vehículos y carrocerías verificados; [ ] PR compatibles; [ ] pruebas WebGL/FPS/físicas/multijugador; [ ] autorización expresa. **NO fusionar ni publicar Netlify.**
