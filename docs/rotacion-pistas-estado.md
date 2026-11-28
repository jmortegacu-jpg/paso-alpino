# Paso Alpino — Rotación de revisión de pistas

Última ejecución: 2026-11-15 15:03, America/Costa_Rica
Pista trabajada: **1/6 Ruta 2, Cerro de la Muerte / Interamericana Sur**
Siguiente pista: **2/6 Ruta 27, San José–Caldera**
Rama: `feature/ruta2-coopesantos-landmark-20261115-15h`
Commit: `7258fa3d3ebe23a8d00500ad59ee0f2bc94465d0`
Estado: rama sin fusionar, sin publicación Netlify.

## Cambios comprobados en código
- Módulo `graphics/costa-rica-tracks.js`, bloque `id==='ruta2'`: hasta 15 aerogeneradores en calidad alta/cine, 7 en baja/media.
- Torres y bujes instanciados; tres aspas geométricas por rotor con rotación lenta.
- Señales de aproximación `PARQUE EOLICO LOS SANTOS`, `COOPESANTOS` y `CASA MATA · LA PAZ` visibles desde la carretera (ubicación artística).
- Elementos sin colisiones ni cambios a físicas, multijugador o geometría del trazado.
- Materiales Three.js creados en código, sin recursos externos sujetos a derechos.

## Referencias contrastadas
- Coopesantos, parque y localización entre Casa Mata y La Paz, 15 aerogeneradores, torre 44 m: https://www.coopesantos.com/servicios/generacion-de-energia/
- Instituto Tecnológico de Costa Rica, Gamesa G52/850, rotor 52 m, aspas 25,3 m: https://repositoriotec.tec.ac.cr/server/api/core/bitstreams/57ed3012-4412-4d43-b909-c29836567e1e/content
- Las posiciones de los modelos son escenográficas, NO coordenadas reales.

## Pruebas y riesgos
- Confirmado por lectura de archivo y escritura exitosa en GitHub; pendiente validar con parser JS, navegador WebGL, capturas de cámara del conductor, sombras, fps móvil/PC.
- Requiere inspección de orientación de letreros y aspas, compatibilidad con PR #25 (nombres), #31 (trazado Ruta 27) y #32 (ruedas).
- No prometer 4K real ni similitud cartográfica exacta.
- `[skip netlify]` no garantiza que toda configuración de CI ignore el commit; no fusionar.

## Lista de control global
- [x] Ruta 2: primer hito eólico y señalización propuestos en rama
- [ ] Ruta 2: quetzales/dantas, vegetación por altitud, capturas y FPS
- [ ] Ruta 27: intercambios, viaductos, peajes, rótulos, pruebas
- [ ] Ruta 32: túnel, cascadas, fauna, pruebas
- [ ] Puntarenas: faro, muelle, costa, fauna, pruebas
- [ ] Ruta 1: potreros, bosque seco, ganado, pruebas
- [ ] Ruta 34: litoral, puentes, embarcaciones, pruebas
- [ ] Vehículos: modelos, ruedas, PBR, cabinas, pruebas
- [ ] Física, editor de pistas, multijugador, FPS y compatibilidad entre PR
- [ ] Revisión y autorización explícita antes de cualquier publicación Netlify

**No listo para publicar.** Una vuelta completa de seis pistas no equivale a la finalización de los pendientes.

## Segunda vuelta — 2026-11-16 09:11 Costa Rica (turno 7, Ruta 2)
- Revisión de historial: PR #33 Ruta 2, #34 Ruta 27, #35 Zurquí, #36 Puntarenas, #37 Ruta 1, #38 Costanera. El último PR #38 indica volver a Ruta 2; esta revisión retoma la misma rama borrador de Ruta 2 para evitar duplicar el código eólico.
- Cambio concreto: 96 arbustos de altura en alta/cine, 48 en media, 24 en baja, distribuidos en el sector escenográfico alto del circuito (34–67 %); dos InstancedMesh, sin colisiones, sin cambiar carretera ni física. Commit `00cd93bc310b2afac61d5f4f2fe66b5eb1df0394`.
- Fuentes de referencia geográfica: https://www.sinac.go.cr/ ; https://www.coopesantos.com/servicios/generacion-de-energia/ . Vegetación artística, no inventario botánico georreferenciado.
- Validación: escritura en GitHub confirmada; quedan pendientes parser de JavaScript, WebGL, cámara conductor, FPS real y multijugador. La ausencia de cambios en física no sustituye una prueba.
- PR: https://github.com/jmortegacu-jpg/paso-alpino/pull/33 (borrador, no fusionado). Otros PR de escenarios modifican el mismo módulo y requieren integración controlada.
- Siguiente pista de rotación: **2/6 Ruta 27, San José–Caldera**. No publicar en Netlify.
- Checklist: [x] segunda vuelta Ruta 2: vegetación de altura simplificada; [ ] validación visual y de rendimiento; [ ] fauna; [ ] compatibilidad entre PR; [ ] seis pistas y vehículos listos para publicación.

## Tercera vuelta — 2026-11-17 03:04 Costa Rica (Ruta 2)
- Historial comprobado: última revisión Ruta 34 en PR #38; PR #40 de Costanera también abierto. Se continúa Ruta 2 en PR #33, sin crear una rama duplicada. ID de escenario: `def.theme.cr === 'ruta2'`.
- Cambio verificable: las 15/7 torres y bujes eólicos instanciados recalculan sus esferas envolventes después de `setMatrixAt`, en vez de desactivar `frustumCulled` globalmente. Commit `d5d4484beff0f64528a7a22c6f182278d4a89a12`. Se pretende evitar renderizar torres fuera de cámara; ahorro real de FPS no medido.
- Referencia geográfica: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ ; ubicación de las turbinas continúa siendo artística y no GPS.
- PR: https://github.com/jmortegacu-jpg/paso-alpino/pull/33 (borrador). GitHub reporta `mergeable=false`: bloqueo de integración por investigar. PR #38 y #40 comparten módulo de escenarios; no fusionar sin revisar diferencias.
- Pruebas: comprobación estática de sustitución de código y escritura GitHub; no se ejecutó parser, WebGL, FPS, física ni multijugador. Sin cambios de vehículos o carretera.
- Checklist Ruta 2: [x] mejora de culling eólico; [ ] inspección desde cámara; [ ] quetzales y dantas plausibles; [ ] medición móvil/PC; [ ] integración PR #33. Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] pruebas críticas; [ ] aprobación para Netlify.
- Siguiente pista: **Ruta 27, San José–Caldera (2/6)**. No desplegar, fusionar ni consumir créditos Netlify.

## Revisión incremental — 2026-11-17 20:56 Costa Rica (Ruta 2)
- Historial: última pista Ruta 34 PR #38; turno actual Ruta 2 PR #33; siguiente Ruta 27 PR #34. ID `ruta2`, conservado.
- Mejora: 18/10/6 siluetas de árboles de bosque montano según calidad; troncos y copas instanciados, fuera de carretera, sin sombras nuevas, colisiones, texturas ni cambios a vehículos o físicas. Geometría artística, no cartografía.
- Referencias: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ y SINAC https://www.sinac.go.cr/ . Sin imágenes copiadas.
- Compatibilidad: PR #33 reportó mergeable=false al consultar; otros PR #25, #34–40 modifican escenarios y requieren conciliación.
- Pruebas: código guardado en GitHub; parser pendiente; pendientes parser JS, WebGL, FPS móvil/PC, cámara de conducción, físicas y multijugador.
- Checklist Ruta 2: [x] árboles montanos ligeros; [ ] orientación de señales; [ ] fauna; [ ] pruebas visuales y FPS; [ ] integración. Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] pruebas críticas; [ ] autorización Netlify.
- Sin merge ni despliegue. Siguiente Ruta 27.
- Commit gráfico: 43c65480b07365ad4197884c99ea94319ded37a5.

## Rotación — 2026-11-18 15:00 Costa Rica (Ruta 2)
- Historial consultado: turno previo Costanera Sur PR #38; siguiente Ruta 2 PR #33. Se reutiliza rama existente; ID de escenario `ruta2`.
- Cambio: afloramientos rocosos originales de alta montaña con `THREE.InstancedMesh`, 24/12/6 instancias según calidad, alejados de la calzada; material PBR mate, límites de visibilidad calculados, sin sombras dinámicas ni colisiones. Se corrige un comentario de código que presentaba erróneamente el número de turbinas escenográficas como un dato real.
- Código: commit `845f79fd0dbc1a42e0b8f5493be33ce569e21e8b`; PR borrador https://github.com/jmortegacu-jpg/paso-alpino/pull/33 .
- Referencias para el contexto montano: SINAC https://www.sinac.go.cr/ ; Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ . Rocas y posiciones artísticas, no cartografía exacta ni recursos copiados.
- Verificación: escritura GitHub confirmada; falta parser JS, render WebGL, FPS móvil/PC, cámara conductor, física y multijugador. PR #33 reportó mergeable=true al consultar, pero la compatibilidad cruzada con PR #25 y #34–41 no está validada.
- Checklist Ruta 2: [x] rocas de alta montaña LOD; [ ] letreros vistos desde conductor; [ ] fauna; [ ] FPS/WebGL; [ ] integración. Global: [ ] seis pistas integradas; [ ] vehículos; [ ] pruebas críticas; [ ] autorización.
- Próxima pista: **Ruta 27, San José–Caldera**. No fusionar ni desplegar Netlify.

## Revisión incremental — 2026-11-19 09:00 Costa Rica (Ruta 2)
- Pista: **1/6 Ruta 2 Cerro de la Muerte** (ID `ruta2`); siguiente: **2/6 Ruta 27 San José–Caldera**.
- Historial consultado: Ruta 34 revisada 2026-11-19 06:00 en PR #38; esta rama de Ruta 2 ya contenía rocas, bosque montano, arbustos, aerogeneradores y señales. No se duplicaron.
- Mejora: 32/20/12 postes delineadores blancos con banda ámbar según calidad alta/media/baja; dos `THREE.InstancedMesh`, geometría y materiales propios, colocados a 22 unidades laterales, sin colisiones ni cambios de calzada, vehículos, física o multijugador. Commit `1c43b9003d1cb29f984a0f00109a2c599e3e06ec`.
- Fuentes de orientación: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ ; SINAC https://www.sinac.go.cr/ . Los delineadores son ilustrativos; ubicación no cartográfica, no se copiaron fotografías.
- PR borrador #33: https://github.com/jmortegacu-jpg/paso-alpino/pull/33 ; GitHub reportó fusionable frente a main al consultar antes del cambio, **no** equivale a compatibilidad cruzada entre PR.
- Verificado: escritura GitHub. Pendiente: parser JS, lectura posterior, capturas WebGL desde conducción, legibilidad de rótulos, FPS móvil/PC, físicas, multijugador, integración con PR #25/#34–42.
- Checklist Ruta 2: [x] aerogeneradores; [x] vegetación y rocas; [x] delineadores instanciados; [ ] fauna plausible; [ ] revisión visual; [ ] WebGL/FPS; [ ] compatibilidad.
- Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] físicas y multijugador; [ ] FPS y WebGL; [ ] bloqueos resueltos. **NO LISTO PARA PUBLICAR**. Sin merge ni despliegue Netlify.

## Turno 2026-11-20 00:02 Costa Rica — pista 1/6 y vehículo
- Pista trabajada: **Ruta 2 Cerro de la Muerte** (`ruta2`), próxima **Ruta 27**. Se revisó el historial de la rama y el turno anterior Ruta 34; no se duplicaron turbinas, árboles ni delineadores.
- Escenario: segunda silueta de cordillera montana a distancia, 16/9/5 montañas instanciadas según calidad, material PBR mate, tintes por instancia y límites de visibilidad recalculados. Sin colisiones ni modificación del trazado. Commit `122e5bee10c0cc571755ff70185285948e7bfcd3`; PR borrador #33 https://github.com/jmortegacu-jpg/paso-alpino/pull/33 .
- Fuente contrastada: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ (15 aerogeneradores entre Casa Mata y La Paz, junto a la Interamericana Sur); ubicación del escenario ilustrativa, sin coordenadas GPS ni imágenes copiadas.
### Vehículos
- Modelo verificado: **Aurora V12** (`aurora`, carrocería paramétrica original inspirada en un GT; no existe modelo comercial Lexus LFA en el código inspeccionado). Se ajustó pintura multicapa PBR, rugosidad/metalness/reflejos, transparencia y acabado de cristales y molduras para apariencia menos plástica, sin tocar geometría, ruedas, físicas, controles ni red.
- Commit vehículo `5c2686aec146026a2e744ab6f1b6b66c6e0a55fb`; rama `graphics/aurora-v12-pbr-finish-20261120`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 ; independiente del PR de pista para evitar conflictos de módulo.
- Pruebas verificadas: GitHub aceptó ambas escrituras y creación de PR #45. **No ejecutados** parser JavaScript, WebGL, capturas antes/después, FPS móvil/PC, conducción, físicas ni multijugador. Los cambios de materiales no alteran las dimensiones ni colisiones.
- Integración: PR #33 reportó fusionable al consultar; PR #45 reportó no fusionable al crearse (estado provisional). Compatibilidad cruzada de PR y carrocerías pendiente. No merge ni Netlify.
- Checklist: [x] Ruta 2 profundidad escenográfica; [ ] captura conductor y WebGL/FPS; [x] Aurora PBR revisado en código; [ ] inspección visual Aurora garaje/conducción y FPS; [ ] seis pistas y vehículos integrados; [ ] PR compatibles; [ ] físicas/multijugador y pruebas críticas; [ ] autorización de publicación. **NO LISTO PARA LANZAMIENTO.**

## 2026-11-20 18:03 Costa Rica — pista 1/6 y vehículo
- Historial de Ruta 34 y Ruta 2 consultado; **Ruta 2 Cerro de la Muerte** (ID `ruta2`) trabajada; siguiente **Ruta 27**.
- Escenario: crestas distantes con más facetas solo en calidad alta y alturas no uniformes para reducir apariencia de colinas repetidas, manteniendo 16/9/5 instancias. Commit `e85c71bf124d26a147e68b5be4df34ca66b87146`, PR borrador #33 https://github.com/jmortegacu-jpg/paso-alpino/pull/33.
- Referencia contextual: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ ; ubicación de la pista es ilustrativa y no reproduce cartografía exacta. Sin activos externos.
### Vehículos
- Aurora V12 (ID `aurora`): moldura satinada de estribo, curvada según el perfil de la carrocería a ambos lados, con geometría reducida en calidad baja. Sin física ni colisiones nuevas. Commit `a53fcd5f2e40e875b5110608be46b50b0fb6b126`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Verificación: commits de GitHub aceptados. **Pendientes** parser JS, captura WebGL, FPS móvil/PC, conducción, físicas, multijugador y comparación visual. PR #33 figuraba fusionable y #45 no fusionable al consultar antes de estos cambios; compatibilidad cruzada pendiente.
- Checklist: [x] silueta montañosa incremental; [x] detalle exterior Aurora; [ ] verificar escala, carretera y culling; [ ] FPS/WebGL; [ ] resolver PR #45 y demás PR; [ ] validar seis pistas, vehículos y pruebas críticas. **NO LISTO PARA NETLIFY.** Sin merge ni despliegue.


## 2026-11-21 12:00 Costa Rica — Ruta 2 / vehículo
- Pista 1/6 **Ruta 2 Cerro de la Muerte** (ID `ruta2`), siguiente 2/6 **Ruta 27**. Se revisó el historial de Ruta 34 (2026-11-21 09:00) y los cambios anteriores de Ruta 2: no se duplicaron crestas, arbustos, aerogeneradores ni delineadores.
- Escenario: barrera de seguridad montana escenográfica, 26/16/9 postes y vigas instanciadas según calidad; acero PBR, a 26 unidades laterales del eje, sin cuerpos físicos, sin cambios de calzada ni controles. Commit `7d1dae2ec34b1e7fc24910dcb228d33733f3e16e`, PR borrador #33 https://github.com/jmortegacu-jpg/paso-alpino/pull/33.
- Referencias de paisaje: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ y SNIT https://www.snitcr.go.cr/ ; geometría y ubicación ilustrativas, NO señalización ni navegación reales.
### Vehículos
- Aurora V12 (ID `aurora`, archivo `graphics/future-chassis.js`): tablero con capucha de instrumentos y dos relojes 3D, solo en calidad alta, visibles potencialmente desde parabrisas/cabina. Commit `3a90363aa829459fbd5de5f0adbc3daea3bb866b`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45. Sin modificar ejes, ruedas, colisiones, controles o físicas.
- Verificación: GitHub confirmó commits. **Sin pruebas ejecutadas** de parser JS, WebGL, capturas desde cabina, FPS móvil/PC, física y multijugador; por tanto la visibilidad del tablero y continuidad de barrera son hipótesis pendientes.
- Compatibilidad: PR de escenarios y vehículos abiertos; verificar conflictos antes de cualquier merge, especialmente #33 y #45 con main y otros PR. [ ] revisar geometría desde conducción; [ ] comprobar WebGL/FPS; [ ] pruebas críticas; [ ] integrar seis pistas y vehículos; [ ] resolver conflictos. **NO LISTO para publicación**. No merge ni Netlify.


## 2026-11-22 06:00 Costa Rica — Ruta 2 y vehículo
- Pista 1/6: Ruta 2 Cerro de la Muerte, ID `ruta2`; siguiente 2/6 Ruta 27 San José–Caldera. Revisado historial: no se duplicaron turbinas, cordilleras, rocas, delineadores ni barreras.
- Mejora visual: 5/3/2 siluetas originales estilizadas de quetzal con cuerpo verde, pecho rojo y cola larga; tres `InstancedMesh`, sin texturas ajenas ni cuerpos de colisión, sobre perchas montanas fuera de la calzada. Código commit `70c8b4550add3168bc89bd7cc2015280b137c5cb`; PR borrador #33 https://github.com/jmortegacu-jpg/paso-alpino/pull/33 .
- Referencias contextuales ya registradas: Coopesantos https://www.coopesantos.com/servicios/generacion-de-energia/ y SINAC https://www.sinac.go.cr/ . Ubicación y fauna escenográficas, no georreferenciadas; no se copiaron fotografías.
### Vehículos
- Aurora V12, ID `aurora`, módulo `graphics/future-chassis.js`: dos marcos circulares metálicos de escapes traseros con interior oscuro, geometría original y detalle escalado por calidad; commit `03bce087a393fa5341d58712be4f56cc642b53ef`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Sin modificaciones intencionales de física, ruedas, controles, colisiones ni red.
- [x] Lectura de archivos e historial; [x] dos commits aceptados por GitHub; [ ] parseo JavaScript; [ ] render WebGL y capturas desde conducción/exterior; [ ] comprobar quetzales y escapes sin solapamiento; [ ] FPS móvil/PC; [ ] físicas y multijugador; [ ] compatibilidad cruzada de PR. PR #33/#45 fusionables individualmente antes del cambio, integración conjunta no comprobada.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas aprobadas; [ ] bloqueos resueltos. Sin merge ni Netlify.

## 2026-11-23 00:00 Costa Rica — Rotación 1/6 Ruta 2
- Pista: Ruta 2 Cerro de la Muerte (tema `ruta2`), rama `feature/ruta2-coopesantos-landmark-20261115-15h`, PR #33. Siguiente: **Ruta 27**.
- Cambio: 36/20/10 árboles de bosque nuboso según calidad, troncos y copas instanciados, fuera de la calzada, sin colisiones ni texturas ajenas. Commit `e16c88c609e90465eb2fa69f9745dd01ea6fcfa5`.
- Fuentes de contexto: https://www.sinac.go.cr/ (ecosistemas de altura); https://www.coopesantos.com/servicios/generacion-de-energia/ (parque eólico). Posiciones artísticas, no GPS.
- Vehículos: Aurora V12, canards delanteros, commit `e397f646bde49695c442950e4367b783695bce2b`, PR #45.
- [x] Escritura GitHub; [ ] sintaxis ejecutada; [ ] WebGL/cámara; [ ] FPS móvil/PC; [ ] físicas; [ ] multijugador; [ ] compatibilidad de PR (conflictos conocidos). No fusionar ni publicar.

## 2026-11-23 17:58 Costa Rica — Ruta 2 (1/6)
- Historial: turno previo Ruta 34 PR #38, rotación retoma Ruta 2. ID real `ruta2`; próxima **Ruta 27 San José–Caldera (2/6)**.
- Mejora de escenario: cuatro/tres/dos siluetas originales de dantas según calidad, cuerpos, cabezas y patas instanciados con material mate, en claros del bosque fuera de la carretera. Commit `bfe86678f6f0fe5b1d526e77e16a1c3b5fc2b676`; PR borrador https://github.com/jmortegacu-jpg/paso-alpino/pull/33.
- Fuentes de contexto: https://www.sinac.go.cr/ ; https://www.coopesantos.com/servicios/generacion-de-energia/ . Distribución artística, no ubicaciones GPS ni imágenes copiadas.
- Vehículo del mismo turno: Aurora V12, firma diurna doble delantera, commit `950f62c23c36c9952194ce696ef1b2d556a4f822`, PR #45.
- Verificado: escrituras GitHub; no se ejecutaron parser, WebGL, FPS, cámaras, físicas o multijugador. PR #33 y #45 no fusionables frente a main en consulta previa; compatibilidad cruzada pendiente.
- Checklist Ruta 2: [x] aerogeneradores [x] vegetación montana [x] quetzales [x] dantas decorativas [ ] capturas de conducción [ ] WebGL/FPS [ ] integración.
- Checklist global: [ ] seis pistas integradas [ ] vehículos validados [ ] PR compatibles [ ] pruebas críticas [ ] bloqueos resueltos. **No listo para lanzamiento. Sin merge ni Netlify.**
# Seguimiento de rotación Paso Alpino

Última ejecución: 2026-11-19 18:00 (Costa Rica). Pista 4/6 Puntarenas; siguiente 5/6 Ruta 1 Guanacaste.

## Registro 2026-11-19 18:00 — Puntarenas (turno 4/6)
- Pista: Paseo de los Turistas, ID `puntarenas`; siguiente: Ruta 1 Guanacaste, ID `ruta1` (verificar ID de circuito al integrar PR #25).
- Historial contrastado: registro previo Puntarenas 19-11 (bitas); se eligió otra mejora, sin duplicar las bitas.
- Rama: `automation/puntarenas-muelle-20261116`; PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39 .
- Cambio en `graphics/costa-rica-tracks.js`: dos barandales del muelle ahora comparten un `THREE.InstancedMesh` con geometría y material únicos, matrices actualizadas, bounding sphere calculada y sombras desactivadas; mismas dimensiones y posiciones. Commit `e7a074decaed0dbe0531b68b5a3db2025f4fee90`.
- Fuente de contexto: INCOP https://incop.go.cr/terminal-de-cruceros/ ; muelle y detalles escenográficos originales, sin copiar recursos protegidos.
- Verificación: escritura GitHub confirmada; lectura posterior y prueba de sintaxis por ejecutar. No se ejecutaron pruebas WebGL, FPS, físicas, multijugador ni cámara de conducción. Menos objetos gráficos no equivale a FPS medidos.
- Integración: PR #36 y #39 modifican el mismo módulo; compatibilidad no demostrada. No merge, no Netlify.


Fecha local: 2026-11-16 18:03, Costa Rica.

## Turno actual
- Pista: 4/6, Paseo de los Turistas de Puntarenas (`theme.cr = 'puntarenas'`).
- Turno anterior reportado: Ruta 32 Zurquí, PR #35.
- Siguiente pista: 5/6, Ruta 1 Interamericana Norte Guanacaste.
- Rama: `automation/puntarenas-muelle-20261116`.
- Commit de código: `fe84418f4c229304400b3b301ed595fad5afab6e`.
- Cambio: muelle escenográfico 3D con plataforma, barandales y pilotes instanciados; situado fuera de la calzada. No cambia físicas ni vehículos.
- Referencias a contrastar: ICT, Municipalidad de Puntarenas, cartografía pública de OSM (consultar licencias). La ubicación del muelle es artística, NO georreferenciada.
- Pruebas: lectura del código y confirmación de escritura GitHub; **pendientes** sintaxis ejecutada, WebGL, FPS móvil/PC, física, multijugador y visualización desde la cabina.
- Integración: PR #36 contiene cambios independientes en el mismo archivo; **riesgo de conflicto**. No fusionar sin conciliación.

## Lista de preparación para lanzamiento
- [ ] Ruta 2 Cerro de la Muerte: integrar y validar PR #33
- [ ] Ruta 27: integrar y validar PR #34
- [ ] Ruta 32 Zurquí: integrar y validar PR #35
- [ ] Paseo de los Turistas: conciliar PR #36 y nuevo PR del muelle, validar
- [ ] Ruta 1: integrar y validar PR #37
- [ ] Ruta 34: integrar y validar PR #38
- [ ] Integridad visual de vehículos y compatibilidad de ramas
- [ ] Pruebas de sintaxis, WebGL, FPS, física y multijugador
- [ ] Aprobación explícita del usuario antes de fusionar y publicar en Netlify

**Estado global: NO LISTO PARA PUBLICACIÓN.** Los PR pueden contener cambios solapados; ninguna prueba de rendimiento en dispositivo real fue verificada en este turno.

## Turno 2026-11-17 12:01 (Costa Rica) — Puntarenas
- Pista: 4/6, `theme.cr='puntarenas'`. Siguiente: 5/6 Ruta 1 Interamericana Norte.
- PR borrador reutilizado: #39; rama `automation/puntarenas-muelle-20261116`.
- Commit: `cb1561527a5b26398a15c6e3728a6bff06b8085f`.
- Cambio: dos `InstancedMesh` de alas de aves marinas estilizadas (12 alta, 5 baja), fuera de la calzada y sin sombras. Se recalculan límites de visibilidad. No se importan recursos ajenos.
- Fuente de referencia geográfica: paisaje costero del Paseo de los Turistas y terminal marítima INCOP (https://incop.go.cr/terminal-de-cruceros/); fauna decorativa plausible, no ubicación ni especie científicamente verificada.
- Verificación: lectura de archivo y escritura de commit GitHub; PR #39 sigue borrador y GitHub lo informa fusionable con main al consultar metadata. PR #36 también modifica el módulo, compatibilidad mutua no demostrada.
- Pendientes: sintaxis con runtime, inspección visual de orientación de alas, WebGL, FPS móvil/PC, físicas, multijugador, integración entre PR y revisión de vehículos.
- Lanzamiento: NO LISTO. Sin merge, sin Netlify.

## Turno 2026-11-18 06:03 (Costa Rica) — Puntarenas
- Pista: 4/6, Paseo de los Turistas (`theme.cr='puntarenas'`). Siguiente: 5/6 Ruta 1 Interamericana Norte.
- PR existente: #39, rama `automation/puntarenas-muelle-20261116` (evita PR duplicado).
- Commit de código: `a5be34c1bcb959d1533bc1d14644ed22ee964a22`.
- Mejora: actualización explícita de matrices de instancias y bounding spheres de pilotes del muelle y muro costero; sombras desactivadas en ambos. No cambia trazado, colisiones, vehículos ni multijugador.
- Referencias geográficas: INCOP https://incop.go.cr/terminal-de-cruceros/ ; ICT https://www.visitcostarica.com/ . Geometría artística y no cartográfica; no se reutilizaron fotografías.
- Verificación: escritura confirmada por GitHub. Pendiente ejecutar parser JavaScript, render WebGL, FPS móvil/PC, cámara del conductor, físicas y multijugador.
- Integración: PR #36 modifica el mismo módulo; compatibilidad conjunta no demostrada. NO FUSIONAR, NO NETLIFY.
- Checklist global: las seis pistas y vehículos aún requieren integración y pruebas críticas; NO LISTO PARA PUBLICACIÓN.

## Turno 2026-11-19 00:03 (Costa Rica) — Puntarenas
- Pista trabajada: 4/6 Paseo de los Turistas, ID `puntarenas`. Siguiente: 5/6 Ruta 1 Interamericana Norte Guanacaste.
- Rama reutilizada: `automation/puntarenas-muelle-20261116`, PR borrador #39. Se consultó su estado: abierto, borrador y fusionable con `main` en la consulta; **no** se verificó compatibilidad con PR #36.
- Commit de código: `b5680e3f72485f374f337ce9c6b74a391d98c919`.
- Mejora incremental: cuatro bitas estilizadas de amarre en el muelle, dibujadas con un único `THREE.InstancedMesh` y material PBR compartido; matrices y esfera de visibilidad actualizadas, sombras desactivadas. Sin cambios en ruta, colisiones, vehículos ni red.
- Fuentes: INCOP, terminal de cruceros https://incop.go.cr/terminal-de-cruceros/ (documenta bitas); Memoria Institucional 2024 https://incop.go.cr/wp-content/uploads/2025/08/PLANI/MEMORIA%20INST%202024.pdf (documenta estructuras de atraque). Representación artística, sin replicar modelos ni fotografías.
- Verificado: contenido leído desde GitHub antes de la modificación y commit aceptado por API. **Sin verificar:** parser JavaScript ejecutado, WebGL, FPS móvil/PC, física, multijugador, visual desde cabina y compatibilidad entre PR.
- Checklist Puntarenas: [x] accesorio portuario instanciado; [ ] inspección visual y distancias a calzada; [ ] integración PR #36/#39; [ ] pruebas críticas.
- Estado global: seis pistas y vehículos **NO LISTOS**; PR cruzados y pruebas críticas siguen pendientes. Sin merge, sin despliegue ni créditos Netlify.

## Turno 2026-11-20 09:00 Costa Rica — Puntarenas + automóvil
- Pista única trabajada: **4/6 Paseo de los Turistas Puntarenas**, ID `puntarenas`. Próxima: **5/6 Ruta 1 Interamericana Norte Guanacaste**. Historial de esta rama revisado: no se repitieron barandales, pilotes, bitas ni aves.
- Cambio de pista: **4/6 balizas de muelle** según calidad, postes metálicos y ópticas color ámbar con cuatro mallas instanciadas en total (dos nuevas); sin luces dinámicas, sombras ni colisiones. Commit `fe977f3c20284d0c9fc439a13f4248a604c2a9f2`. PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39.
- Fuente de contexto: INCOP, terminal de cruceros https://incop.go.cr/terminal-de-cruceros/ ; balizas y su posición son una interpretación artística, no una reconstrucción exacta ni un recurso protegido.
### Vehículos
- Modelo: **Aurora V12**, ID `aurora`, módulo `graphics/future-chassis.js`. Añadidas ópticas traseras tridimensionales, luz de reversa central y marcos para luces de freno; elementos decorativos adheridos a carrocería, sin tocar ruedas, ejes, colisiones, físicas, dirección o red.
- Commit vehículo `5ebd4022294a5aaade4ae5d9c3456b3448d7f38e`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45. Título y commits llevan `[skip netlify]`.
- Verificado: lecturas previas y commits aceptados por GitHub; #39 consultado fusionable con `main` antes de cambios; #45 consultado no fusionable. No se verificó compatibilidad mutua de PR #36/#39 ni de otras carrocerías.
- Pendientes: parser JS ejecutado, WebGL, capturas de cámara exterior/conducción, dimensiones y oclusión de balizas y ópticas, FPS móvil/PC, físicas y multijugador. **No atribuir mejoras de FPS ni apariencia comprobada sin renderizado.**
- Checklist Puntarenas: [x] balizas 3D instanciadas; [ ] inspección visual y pruebas de rendimiento; [ ] conciliación de PR. Vehículos: [x] detalle trasero Aurora V12; [ ] verificar ópticas y compatibilidad en navegador.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos completos; [ ] PR compatibles; [ ] WebGL/FPS/físicas/multijugador satisfactorios; [ ] bloqueos resueltos. **NO LISTO PARA NETLIFY**. No se fusionó ni publicó.


## Revisión incremental — 2026-11-21 02:55 Costa Rica
- Pista única: **4/6 Puntarenas**, ID `puntarenas`; siguiente **5/6 Ruta 1 Guanacaste**. Se comprobó el historial de la rama y PR #39/#46; no se duplicaron muelle, bitas ni balizas.
- Cambio visual: dos escaleras de seguridad originales en el extremo del muelle, con cuatro pasamanos y 12/8 peldaños según calidad, dos `THREE.InstancedMesh`, límites de visibilidad calculados y sin sombras/colisiones. Código `graphics/costa-rica-tracks.js`, commit `65653a3757c994a83f95680120db8ee5b533a4d9`, PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39 .
- **Vehículos:** Aurora V12 (`aurora`), costilla interior oscura en cada extractor de capó, LOD de grosor según calidad. Archivo `graphics/future-chassis.js`, commit `3856797d2d7b391080381c83dc5cb6da070e531a`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Fuentes contextuales existentes: INCOP https://incop.go.cr/terminal-de-cruceros/ e ICT https://es.visitcostarica.com/where-to-go/puntarenas/tourist-atractions-in-puntarenas . Escaleras son una interpretación artística, no reproducción exacta.
- Verificado: lectura de archivos, IDs y PR abiertos; GitHub confirmó los dos commits. PR #39 y #45 figuraban abiertos, borrador y fusionables individualmente antes de la escritura; #46 también abierto. No se comprobó compatibilidad conjunta.
- Pendientes: parser JS, inspección WebGL, oclusión/escala de escaleras y extractores, FPS móvil/PC, físicas, multijugador y conciliación PR #36/#39/#44/#46.
- Checklist Puntarenas: [x] detalle portuario 3D instanciado; [ ] cámara, FPS y colisiones; [ ] integrar PR. Vehículos: [x] detalle de capó; [ ] validación visual/física. **No listo para Netlify; sin merge ni despliegue.**

## Turno 2026-11-21 21:04 Costa Rica — Puntarenas (4/6)
- Pista: Paseo de los Turistas, ID puntarenas; siguiente: Ruta 1 Guanacaste, ID ruta1. Historial revisado para evitar repetir muelle, balizas y escaleras.
- Mejora: 36/18 toldos costeros según calidad, geometría compartida y THREE.InstancedMesh con matrices y bounding sphere actualizadas; posiciones basadas en puntos, tangentes y normales del trazado. Decorativos sin colisiones ni luces dinámicas. Commit a52dd0a1dddfc1342fcd6f4281fb3660c0322182, PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39 .
- Fuentes contextuales: INCOP https://incop.go.cr/terminal-de-cruceros/ e ICT https://es.visitcostarica.com/ . Diseño artístico original, no cartografía exacta ni fotografías copiadas.
### Vehículos
- Aurora V12, ID aurora, graphics/future-chassis.js: agujas rojas tridimensionales en dos instrumentos de cabina; no cambia física, controles, ejes ni red. Commit 5daeade343fd0315f7984de7f72d9197b7995c22, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Verificado: commits GitHub aceptados. Pendientes: parser JS ejecutado, WebGL, cámara, orientación de toldos, FPS móvil/PC, físicas, multijugador, conflictos e integración de PR.
- Checklist Puntarenas: [x] toldos instanciados; [ ] visual/FPS; [ ] integración. Vehículos: [x] agujas 3D; [ ] cámara interior/FPS. Global: [ ] seis pistas integradas; [ ] PR compatibles; [ ] WebGL/FPS/físicas/multijugador; [ ] bloqueos resueltos. NO LISTO PARA PUBLICACIÓN. Sin merge ni Netlify.

## Turno 2026-11-22 14:55 Costa Rica — Puntarenas (4/6)
- Pista única: **Paseo de los Turistas Puntarenas**, ID `puntarenas`; siguiente: **Ruta 1 Interamericana Norte Guanacaste**, ID `ruta1`. Historial y PR #39 consultados; se evitó duplicar toldos, escaleras, balizas y pilotes.
- Mejora de pista: cubierta elevada de terminal portuaria en extremo terrestre del muelle, con techo PBR y cuatro soportes instanciados, geometría original, sin texturas protegidas, luces dinámicas ni cuerpos de colisión. Archivo `graphics/costa-rica-tracks.js`, commit `ed6d30deb90e7c192f82cea3e6f27bc47ad09cb7`, PR borrador [#39](https://github.com/jmortegacu-jpg/paso-alpino/pull/39), [skip netlify].
- Fuentes de contexto: INCOP https://incop.go.cr/terminal-de-cruceros/ ; ICT https://es.visitcostarica.com/ . La cubierta es interpretación escenográfica y su escala/posición requieren inspección visual.
### Vehículos
- Aurora V12, ID `aurora`, `graphics/future-chassis.js`: cejas volumétricas de faros con doble trazo oscuro/satinado, material PBR compartido, LOD por calidad. Commit `deaee71668d5e5e4ab586e4be8557656e2d68fa0`, PR borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45), [skip netlify].
- Verificación: GitHub aceptó ambos commits; PR #39 abierto/borrador/fusionable individualmente antes de edición; PR #45 abierto/borrador/no fusionable. No se ejecutaron parser, WebGL, FPS móvil/PC, físicas ni multijugador; no hay capturas reales. Pendiente comprobar visibilidad desde conducción y exterior, ausencia de solapamientos y compatibilidad entre PR.
- Checklist Puntarenas: [x] techo de terminal y pilares instanciados; [ ] inspección de cámara y distancias; [ ] pruebas y PR conciliados. Vehículos: [x] cejas de faros; [ ] cámara/FPS/WebGL. Global: [ ] seis pistas verificadas e integradas; [ ] vehículos; [ ] PR compatibles; [ ] pruebas críticas; [ ] bloqueos. **NO LISTO PARA NETLIFY**. Sin merge ni despliegue.

## Turno 2026-11-23 08:58 Costa Rica — Puntarenas (4/6)
- Pista: Paseo de los Turistas, ID `puntarenas`; siguiente: Ruta 1 Guanacaste (`ruta1`). Se revisó historial de PR #39 para evitar repetir toldos, muelle, balizas y cubierta.
- Cambio: bandas de fachada azul PBR en ambos bordes de la cubierta portuaria existente, 2 instancias, sin colisiones, luces dinámicas ni recursos externos. Commit `cbbaa4cfb8a20fe03ee2906eb82704af91eea734`, PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39 .
- Referencias contextuales del proyecto: INCOP https://incop.go.cr/terminal-de-cruceros/ e ICT https://es.visitcostarica.com/ . Geometría artística no georreferenciada.
### Vehículos
- Aurora V12 (`aurora`): borde metálico satinado en extractores del capó (calidad alta), sin tocar física, controles ni colisiones. Commit `d2384a1601cf49c71e70112b0c12e12f35c173ba`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Verificado: lectura de fuentes GitHub, IDs y aceptación de commits. Pendiente: parser JS ejecutado, capturas WebGL interior/exterior, FPS móvil/PC, físicas, multijugador y compatibilidad de PR concurrentes.
- Checklist Puntarenas: [x] bandas de cubierta; [ ] revisión desde conducción; [ ] pruebas y conciliación PR. Vehículos: [x] borde de extractor; [ ] validación visual/FPS. Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias; [ ] bloqueos resueltos. NO LISTO PARA NETLIFY. Sin fusión ni despliegue.
