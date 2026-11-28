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
# Paso Alpino — Rotación de revisión de pistas

## Ejecución 2026-11-19 12:00 Costa Rica — Ruta 27 (2/6)
- Pista: Ruta 27 San José–Caldera; siguiente: Ruta 32 Zurquí (3/6). Historial de esta rama consultado; no se repitió la caché previa de materiales de tableros ni la optimización de delineadores.
- Cambio: reutilización de dos materiales MeshBasicMaterial para indicadores luminosos de estado ABIERTO/CERRADO de ambos pórticos, en vez de crear seis materiales independientes. Sin cambio de colores, geometría, física, carretera, vehículos ni multijugador. No se afirma ganancia de FPS.
- Commit de código: `b6475438757e8f048b64f0b3f565ae757b9237d8`. PR borrador #34 https://github.com/jmortegacu-jpg/paso-alpino/pull/34, título [skip netlify].
- Fuentes contextuales conservadas: CNC https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 y concesionaria https://globalviaruta27.com/ . Posiciones ilustrativas, sin nuevas afirmaciones geográficas.
- Verificado: lectura y actualización de código mediante GitHub. Al consultar PR #34, GitHub reportó mergeable=false; no se resolvió ni se integró. No se ejecutaron pruebas sintácticas automatizadas, WebGL, FPS, cámara de conducción, físicas ni multijugador.
- Checklist Ruta 27: [x] materiales compartidos en tableros y luces de pórtico; [ ] revisar señalización desde conducción; [ ] compatibilidad PR #25/#31/#34; [ ] WebGL/FPS/físicas/multijugador. Global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias. **NO LISTO PARA PUBLICACIÓN**. Sin merge ni Netlify.


## Ejecución 2026-11-18 18:03 Costa Rica — Ruta 27 (2/6)
- Pista trabajada: Ruta 27 San José–Caldera. Siguiente: Ruta 32 Zurquí (3/6), conforme a la rotación persistente; revisado historial de esta rama para evitar repetir cambios.
- PR borrador: https://github.com/jmortegacu-jpg/paso-alpino/pull/34 ; rama `feature/ruta27-senales-legibles-20261115-18h` ; commit `6cf2c4aee722c695d74ad968e2319f2800b3ad7f`.
- Cambio incremental: los tableros QUICK PASS/ABIERTO/CERRADO ahora comparten también MeshBasicMaterial por mensaje (Map), además de la CanvasTexture previamente compartida. Menos materiales duplicados; geometría, letreros, colisiones, físicas, vehículos y multijugador intactos. No se cuantifica ganancia de FPS.
- Fuentes contextuales: https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 ; https://globalviaruta27.com/ . No se consultaron coordenadas ni se cambió trazado; señalización escenográfica.
- Verificado: lectura de código antes de editar y commit GitHub confirmado; PR #34 abierto, borrador y mergeable frente a main al consultar (no implica compatibilidad cruzada). No ejecutados: parser JavaScript, WebGL, capturas de conducción, FPS móvil/PC, físicas y multijugador. Compatibilidad con PR #25, #31 y demás ramas pendiente.
- Checklist Ruta 27: [x] texturas y materiales de peajes reutilizados; [ ] legibilidad desde cabina; [ ] viaductos y trazado aproximado; [ ] pruebas FPS/WebGL/físicas/multijugador; [ ] conciliación PR. Global: seis pistas y vehículos aún sin validación crítica; NO listo para lanzamiento. Sin merge ni Netlify.


## Ejecución 2026-11-18 00:01 Costa Rica — Ruta 27 (2/6)
- Pista trabajada: Ruta 27 San José–Caldera; siguiente: Ruta 32 Zurquí (3/6). Se consultó el historial de esta rama para evitar repetir la optimización de delineadores.
- Rama/PR: `feature/ruta27-senales-legibles-20261115-18h`, [PR #34](https://github.com/jmortegacu-jpg/paso-alpino/pull/34) (compatibilidad actual no comprobada).
- Código: commit `0a88d7ce596569d98886e3c432eb9cdc7cf51e29`; se actualizaron `instanceMatrix` y `computeBoundingSphere()` para colinas y parches de potrero instanciados; se desactivaron sombras proyectadas por colinas distantes y parches. No se alteraron carretera, colisiones, vehículos ni multijugador.
- Fuentes de contexto: [CNC Ruta 27](https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27), [Globalvia](https://globalviaruta27.com/). Esta ejecución no valida progresivas ni posiciones GPS; el cambio es de renderizado.
- Verificado: lectura del código y escritura en GitHub. No ejecutados: parser JS, WebGL, FPS móvil/PC, físicas, multijugador, capturas desde conducción. PR #25/#31/#34 y otros PR de escenarios requieren revisión conjunta.
- Checklist: [x] optimización de límites de instancias en Ruta 27; [ ] referencias geográficas/cámara; [ ] pruebas de rendimiento y conducción; [ ] integración PR; [ ] revisión de vehículos; [ ] aprobación de lanzamiento. Estado global: seis pistas con propuestas, ninguna certificada para lanzamiento. Sin fusión ni Netlify.

## Ejecución 2026-11-17 05:57 Costa Rica — Tercera vuelta, Ruta 27 (2/6)
- Pista: Ruta 27 San José–Caldera. Siguiente: Ruta 32 Zurquí (3/6).
- Rama/PR: `feature/ruta27-senales-legibles-20261115-18h`, [PR #34](https://github.com/jmortegacu-jpg/paso-alpino/pull/34) (borrador; GitHub reporta mergeable=false).
- Commit: `b0ccc3ff3c76f5f31bf03df04378f4f341527adc`.
- Cambio real: reemplazado `frustumCulled=false` en los dos conjuntos de delineadores instanciados de peajes por `computeBoundingSphere()` después de `setMatrixAt`; permite descarte por cámara con límites actualizados. No altera colisiones, físicas, carretera, vehículos ni multijugador.
- Fuentes de contexto (ubicación escenográfica, no cartografía exacta): [CNC](https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27), [Globalvia](https://globalviaruta27.com/).
- Verificado: lectura del módulo previo y escritura exitosa en GitHub. Pendientes: parseo JS, navegador WebGL, capturas desde conductor, FPS móvil/PC, conducción, multijugador, compatibilidad con PR #25/#31 y demás ramas de escenarios.
- Checklist global: seis pistas con cambios propuestos; ninguna certificada para lanzamiento. Vehículos e integración sin validación final. No fusionar ni desplegar en Netlify.


## Ejecución 2026-11-16 12:06 Costa Rica — Segunda vuelta, Ruta 27 (2/6)
- Pista trabajada: Ruta 27 San José–Caldera. Siguiente: Ruta 32 Zurquí (3/6).
- Rama/PR: `feature/ruta27-senales-legibles-20261115-18h`, PR #34 (borrador). Commit `f4904e3cba5e5ba068839b24297ab94cee8a57ca`.
- Mejora: 20 delineadores reflectivos instanciados por cada uno de dos peajes, colocados a 24 unidades laterales del eje y distribuidos en la aproximación. Dos meshes instanciados, sin luces dinámicas, sin colisiones, sin modificación de carretera/física/multijugador.
- Fuentes de contexto: https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 ; https://globalviaruta27.com/ . Ubicación de pórticos y delineadores artística, no georreferenciada.
- Verificado: escritura exitosa del módulo en rama GitHub. Pendiente: parser JavaScript, WebGL, visibilidad de cámara, FPS móvil/PC, pruebas de conducción y compatibilidad con PR #25/#31/#34. No se ha fusionado ni desplegado.
- Estado global: seis pistas con PR independientes, pendientes integración y pruebas críticas; no listo para Netlify.

Última ejecución: 2026-11-15 18:00, America/Costa_Rica
Pista trabajada: **2/6 Ruta 27, San José–Caldera**
Siguiente pista: **3/6 Ruta 32, Zurquí**
Rama: `feature/ruta27-senales-legibles-20261115-18h`
Commit: `446ce0eaed548fc4731eef88deef3c2902a8169a`
Estado: rama sin fusionar, sin publicación Netlify.

## Historial de rotación
- 2026-11-15 15:03: Ruta 2, PR #33, parque eólico y señalización. Siguiente Ruta 27.
- 2026-11-15 18:00: Ruta 27, PR de esta rama, letreros y legibilidad de peajes. Siguiente Ruta 32.

## Cambios de esta ejecución
- Pórticos existentes conservados, sin barreras físicas. Se amplían tableros de carril de 5,7×2,15 a 7,8×2,5 unidades y letra de 58 a 66 píxeles.
- Texturas de mensajes de peaje compartidas entre dos pórticos mediante Map, evitando canvas/texture duplicados.
- Rótulos nuevos hacia Guachipelín, La Guácima, Atenas/Orotina y Caldera/Puntarenas; orden escenográfico no corresponde a progresivas GPS.
- No se cambian geometría del pavimento, física, vehículos ni multijugador.
- Pendiente sintaxis automatizada, WebGL, capturas y FPS; no afirmar pruebas de conducción.
- Fuente de contexto: Consejo Nacional de Concesiones https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 ; Globalvia Ruta 27 https://globalviaruta27.com/ ; trazado exacto NO verificado.
- PR #31 altera el mismo corredor (index.html), PR #25 nomenclatura; revisar integración antes de fusionar.

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
- [x] Ruta 27: señalización y tableros de peaje mejorados en rama independiente\n- [ ] Ruta 27: intercambios, viaductos, trazado realista, pruebas
- [ ] Ruta 32: túnel, cascadas, fauna, pruebas
- [ ] Puntarenas: faro, muelle, costa, fauna, pruebas
- [ ] Ruta 1: potreros, bosque seco, ganado, pruebas
- [ ] Ruta 34: litoral, puentes, embarcaciones, pruebas
- [ ] Vehículos: modelos, ruedas, PBR, cabinas, pruebas
- [ ] Física, editor de pistas, multijugador, FPS y compatibilidad entre PR
- [ ] Revisión y autorización explícita antes de cualquier publicación Netlify

**No listo para publicar.** Una vuelta completa de seis pistas no equivale a la finalización de los pendientes.

## Turno 2026-11-20 03:02 Costa Rica — pista y vehículo
- Pista trabajada: **2/6 Ruta 27 San José–Caldera**, ID `ruta27`; siguiente **3/6 Ruta 32 Zurquí**. Revisados historial y PR #34, se evitó repetir optimización de materiales de peajes.
- Cambio 3D: 16/8 arriostramientos diagonales en un `THREE.InstancedMesh` del viaducto según calidad, material PBR de acero compartido, sin colisiones ni alteraciones de trazado, física o red. Commit `23d56c834e0290bb00eea2f5aa3ec26446c8b832`. PR borrador #34 https://github.com/jmortegacu-jpg/paso-alpino/pull/34 .
- Referencias de contexto vial: CNC https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 ; concesionaria https://globalviaruta27.com/ . Estructura escenográfica, no reproducción topográfica exacta; sin imágenes externas.
### Vehículos
- Modelo `aurora` — **Aurora V12**, modelo original inspirado en GT, no Lexus oficial. Cambio visual: material físico de ópticas delanteras con clearcoat, menor emisión en Aurora y rugosidad ajustada, sin alterar posiciones, geometría, ruedas, controles ni colisiones. Commit `6eaf6bc8ca4f6917f2b9fbd61326f726f9a7286a`, rama `graphics/aurora-v12-pbr-finish-20261120`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- PR #34 consultado no fusionable con main; PR #45 consultado fusionable antes de este cambio. Compatibilidad entre PR aún no validada.
- Verificado: GitHub aceptó ambos cambios de código. Pendiente parser JS ejecutado, render WebGL, capturas cabina/exterior, FPS móvil/PC, físicas y multijugador. Sin resultados inventados.
- Checklist Ruta 27: [x] arriostramientos del viaducto; [ ] validar escala/visibilidad y conducción; [ ] integrar PR sin conflictos.
- Checklist vehículos: [x] ópticas Aurora con material físico; [ ] comprobar luces en navegador; [ ] revisar carrocerías restantes y rendimiento.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos; [ ] compatibilidad de PR; [ ] WebGL/FPS/físicas/multijugador; [ ] autorización expresa. **NO LISTO PARA NETLIFY; sin merge ni despliegue.**

## Turno 2026-11-20 21:00 Costa Rica — pista 2/6 Ruta 27
- Se revisaron historial y PR #34 y #45; próxima pista: **3/6 Ruta 32 Zurquí**. ID de pista: `ruta27`.
- Mejora real de escena: 36/18 postes de parapeto del viaducto (calidad alta/baja), mediante un único `THREE.InstancedMesh`, material PBR de acero existente, sin nuevas luces, colisiones ni modificación de la calzada. Commit `d783fcb5d7f79aa9041885b4ac0b5286ac29606b`, PR borrador #34 https://github.com/jmortegacu-jpg/paso-alpino/pull/34 .
- Referencias: CNC https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27 y Globalvia https://globalviaruta27.com/ ; viaducto es representación escenográfica, no réplica georreferenciada. Sin copiar fotografías.
### Vehículos
- Aurora V12 (ID `aurora`): cara de espejo reflectante en ambos retrovisores, geometría ligera y material físico compartido por material al consolidar geometría, sin cambios en controles, ejes o física. Commit `ccfd61fc01bcf407e4ad09c71c32e31d5bb9bbcb`, PR #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- PR #34 consultado **no fusionable**; PR #45 consultado fusionable con main antes del cambio, sin certificar compatibilidad conjunta.
- Verificado: GitHub aceptó las dos escrituras. No se ejecutaron parser JS, capturas WebGL, FPS móvil/PC, física ni multijugador. Revisar orientación y visibilidad del parapeto y caras de espejo.
- Checklist Ruta 27: [x] parapeto instanciado; [ ] inspección desde cabina; [ ] FPS y WebGL; [ ] resolver conflicto PR #34.
- Checklist vehículos: [x] reflectores de retrovisores; [ ] captura exterior; [ ] FPS/WebGL; [ ] integración con otros PR.
- Global: [ ] seis pistas validadas e integradas; [ ] vehículos; [ ] PR compatibles; [ ] física/multijugador/FPS/WebGL; [ ] autorización. **NO LISTO PARA NETLIFY. Sin merge ni despliegue.**


## Turno 2026-11-21 15:00 Costa Rica — Ruta 27 (2/6)
- Historial revisado: último turno Ruta 2 (12:00); pista actual **Ruta 27** (ID `ruta27`), próxima **Ruta 32 Zurquí** (3/6). No se repitieron los postes de parapeto ni los arriostramientos anteriores.
- Cambio real: 24/12 reflectores ámbar instanciados sobre el parapeto del viaducto, sin luces dinámicas, colisiones ni cambios en carretera/físicas/red. Commit `69a61a4777a6f63eb0b9759c6e4d0b28da02db8d`, PR borrador [#34](https://github.com/jmortegacu-jpg/paso-alpino/pull/34).
- Fuentes de contexto: [CNC](https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27), [Globalvia](https://globalviaruta27.com/). Posiciones ilustrativas, no progresivas reales. Geometría original, sin copiar fotografías.
### Vehículos
- Modelo `aurora` (Aurora V12, diseño original), `graphics/future-chassis.js`: tres aletas satinadas en cada toma lateral para dar profundidad visible desde exterior, sin cambiar shell, ruedas, ejes, controles ni colisiones. Commit `8e3dabfc0d343285a799e98952295f29d52dc585`, PR borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45).
- Verificado: lectura de código, escrituras aceptadas por GitHub; PR #34 y #45 consultados como borradores **no fusionables** antes de las escrituras. No se ejecutaron parser, render WebGL, capturas, FPS móvil/PC, físicas o multijugador; no se infiere compatibilidad entre ramas.
- Checklist Ruta 27: [x] reflectores viaducto; [ ] cámara conducción y exterior; [ ] rendimiento; [ ] resolver conflicto PR.
- Checklist vehículos: [x] tomas laterales; [ ] captura exterior; [ ] FPS/WebGL; [ ] integración.
- Global: [ ] seis pistas integradas y verificadas; [ ] vehículos; [ ] PR compatibles; [ ] físicas, multijugador y FPS; [ ] autorización expresa. **NO LISTO PARA NETLIFY. Sin fusión ni despliegue.**

## 2026-11-22 09:04 Costa Rica — Ruta 27 (2/6)
- ID verificado: `ruta27` en `graphics/costa-rica-tracks.js`; siguiente pista: **Ruta 32 Zurquí (3/6)**. Historial de rama consultado; no se repitieron reflectores ámbar ni parapetos anteriores.
- Mejora: cuatro paneles de peligro de alto contraste en extremos del viaducto, con tres bandas diagonales por panel. Geometría original, sin texturas externas, luces dinámicas, colisiones ni alteración del trazado. Commit `24bd24eaaf4403abf11bc25cfa198cb82c0b3028`; PR borrador [#34](https://github.com/jmortegacu-jpg/paso-alpino/pull/34) [skip netlify].
- Fuentes contextuales existentes: [CNC](https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27), [Globalvia](https://globalviaruta27.com/). Paneles y viaducto son escenográficos; no georreferenciados.
- Vehículos: `aurora`, remate satinado de zaga y esquinas en cámara exterior, commit `200a22a467cb48b6ba2295d04baf21b7a0e6ca84`, PR borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45).
- Verificado: lectura de código e historial y commits aceptados por GitHub. PR #34 aparecía fusionable individualmente antes de este cambio; PR #45 no fusionable. Compatibilidad cruzada sin verificar.
- [x] Señales de viaducto añadidas; [ ] capturas y legibilidad en conducción; [ ] parser JS; [ ] WebGL y FPS móvil/PC; [ ] física y multijugador; [ ] conciliación de PR.
- Global: [ ] seis pistas probadas e integradas; [ ] vehículos probados; [ ] PR compatibles; [ ] bloqueos resueltos. **NO LISTO PARA PUBLICACIÓN.** Sin merge ni Netlify.


## 2026-11-23 03:04 Costa Rica — Ruta 27 (2/6)
- Pista: Ruta 27, ID `ruta27`; siguiente: **Ruta 32 Zurquí (3/6)**. Historial de la rama y PR #34 consultados para no duplicar los paneles de viaducto previos.
- Código: dos marcadores verticales laterales de aproximación al viaducto, franjas ámbar de alto contraste y material compartido; sin colisiones, luces dinámicas, cambios de carretera o red. Commit `f404a5e9dd4a0afe3fa6ab24c4e081095bbb47d5`, PR borrador [#34](https://github.com/jmortegacu-jpg/paso-alpino/pull/34) [skip netlify].
- Vehículos: Aurora V12 `aurora`, dos lentes de marcador trasero para cámara exterior, commit `d42891bfda48e866063b0ad16243da9dad56584b`, PR borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45).
- Fuentes contextuales conservadas: [CNC](https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27), [Globalvia](https://globalviaruta27.com/). Elementos artísticos no georreferenciados; sin importar imágenes de terceros.
- Verificado: lectura de archivos y commits aceptados por GitHub. PR #34 reportó mergeable=true y PR #45 mergeable=false **antes** de escribir; no implica compatibilidad entre ellos. No ejecutados parser JS, WebGL, FPS móvil/PC, capturas desde conductor/exterior, físicas ni multijugador.
- Checklist Ruta 27: [x] nuevos marcadores; [ ] confirmar legibilidad y orientación visual; [ ] pruebas WebGL/FPS/físicas/red; [ ] integración de PR.
- Checklist vehículos: [x] lentes traseros; [ ] capturas exterior; [ ] FPS/WebGL; [ ] reconciliar PR #45.
- Global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas; [ ] autorización de publicación. **NO LISTO PARA NETLIFY.** Sin merge ni despliegue.
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

## Revisión 2026-11-23 12:00 Costa Rica — Ruta 1 (5/6)
- Pista trabajada: Ruta 1 Interamericana Norte Guanacaste (`ruta1` en escena `alpino`); siguiente: Ruta 34 Costanera Sur (`costanera`). Se consultó historial y PR #37 para evitar repetir elementos.
- Código: 32/20/12 postes reflectivos originales por nivel gráfico, `InstancedMesh` para poste y placa, límites de visibilidad recalculados; fuera de calzada a distancia lateral 19, sin colisiones, física ni luces nuevas. Commit `3d150c1f54c32aaed5398131ca5cf8093d6f4538`, PR borrador #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 [skip netlify].
- Fuente contextual de paisaje: https://www.acguanacaste.ac.cr/ y https://es.visitcostarica.com/where-to-go/guanacaste ; señalización de diseño original, no réplica normativa ni cartografía precisa.
- Vehículo en paralelo: Aurora V12 `aurora`, tomas laterales traseras cosméticas; commit `f50ac878ef163b2c6293cb8e616a202b3fdc0a6d`, PR borrador #45.
- [x] GitHub aceptó código; [ ] parser JS; [ ] capturas conducción/exterior; [ ] WebGL/FPS móvil/PC; [ ] físicas/multijugador; [ ] conflictos de integración PR #37 (no fusionable antes del cambio). Global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias. No fusionar ni publicar Netlify.
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

## Turno 2026-11-20 15:04 Costa Rica — Ruta 34
- Pista trabajada: 6/6 Ruta 34 Costanera Sur, ID `costanera`; siguiente 1/6 Ruta 2 Cerro de la Muerte. Se revisaron las mejoras previas de relieve, rocas y delineadores; no se duplicaron.
- Cambio visual: oleaje costero en `roadShore` con máscara de espuma dinámica y transición cromática de orilla en shader existente; sin mallas adicionales, cambios de trazado, física ni colisiones. Commit `90cacc2ddcedc031e38a68487068be5f9beba276`, PR borrador #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38.
- Vehículos: Aurora V12, ID `aurora`, repetidores ámbar en retrovisores, commits `3e353b6d5a1c15dddffe38b829d860feed5929d7` y corrección de simetría `cdcb03afba6541d8d64d5da987751a61c1b2df31`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes paisajísticas de contraste ya documentadas: ICT https://es.visitcostarica.com/ y SNIT https://www.snitcr.go.cr/ ; elementos escenográficos, no GPS ni activos copiados.
- Verificado: escritura GitHub de ambos cambios; PR #38 y #45 abiertos como borrador y figuraban fusionables con main antes de los nuevos commits, no significa compatibilidad mutua. Sin parser, WebGL, capturas, FPS, física ni multijugador ejecutados en este turno.
- Checklist: [x] shader costero modificado; [x] automóvil mejorado; [ ] inspección desde conducción y exterior; [ ] WebGL/FPS; [ ] pruebas críticas; [ ] reconciliar PR concurrentes; [ ] seis pistas y vehículos integrados. NO LISTO para Netlify; sin merge ni despliegue.

## Turno 2026-11-21 09:00 Costa Rica — Ruta 34 Costanera Sur
- Pista 6/6, tema `costanera`; siguiente 1/6 Ruta 2 Cerro de la Muerte. Se revisó historial del shader de espuma del 20/11: este cambio añade una segunda banda estrecha móvil de rompiente y modulación de ondulación, sin duplicar colinas, postes ni rocas.
- Archivo `graphics/costa-rica-tracks.js`; commit `5020c720cf32c2575ac8aa85cbeb73ab8a484cb5`; PR borrador #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38 . Shader existente, sin nuevas mallas, texturas, físicas o colisiones. Geografía escenográfica, no GPS.
- Vehículo Aurora V12 (`aurora`): nervadura central fina del capó en PBR para lectura desde cámara exterior/conducción; commit `453017c80f72895a586c953850b3ac917a82251d`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Sin cambios de ejes, carrocería estructural, físicas ni controles.
- Fuentes paisajísticas previamente documentadas: MOPT https://www.mopt.go.cr/node/1059 ; ICT https://es.visitcostarica.com/ . No se incorporaron activos externos.
- Verificado: lectura de código anterior y commits aceptados por GitHub. Pendiente: parseo JS, compilación GLSL WebGL, capturas desde conducción/exterior, FPS móvil/PC, físicas y multijugador. PR #38/#40 y #45 requieren conciliación conjunta; no se ha probado compatibilidad.
- Checklist Ruta 34: [x] shader con dos escalas de espuma; [ ] validar aspecto/escala y FPS; [ ] WebGL; [ ] integrar PR #40. Vehículos: [x] detalle visual; [ ] capturas y rendimiento. Global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas; [ ] bloqueos resueltos. **NO LISTO**. Sin merge ni Netlify.

## Turno 2026-11-22 03:00 Costa Rica — Ruta 34 Costanera Sur
- Pista 6/6, ID `costanera`; siguiente 1/6 Ruta 2 Cerro de la Muerte. Historial revisado: no se duplicaron relieve, espuma, rocas ni delineadores.
- Cambio nuevo: 12/7/4 islotes rocosos mar adentro mediante `THREE.InstancedMesh`, PBR mate y geometría original; dos tramos costeros, fuera de calzada y sin colisiones. Commit `76aed46c39cd02036d806547a83e01cdac083bf6`, PR borrador #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38 . Paisaje inspirado en Costa Rica, no georreferenciado.
- Vehículos: Aurora V12 ID `aurora`, tres lamas de rejilla trasera con material carbono existente; commit `a99ef6935e43a66f85bfd4a9554fdf1dfc3790de`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Referencias de contexto previamente documentadas: ICT https://es.visitcostarica.com/ ; SNIT https://www.snitcr.go.cr/ . No se copiaron fotografías ni activos protegidos.
- [x] Escrituras de código aceptadas por GitHub; [ ] parseo JS; [ ] captura y render WebGL; [ ] FPS móvil/PC; [ ] físicas/multijugador; [ ] inspección de escala/visibilidad desde cabina y cámara exterior; [ ] compatibilidad PR #38/#40 y #45. PR #38 y #45 reportados fusionables individualmente antes de cambios, sin demostrar integración conjunta. Sin merge ni Netlify.
- Checklist global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR conciliados; [ ] pruebas críticas; [ ] bloqueos resueltos. NO LISTO.


## 2026-11-22 21:00 Costa Rica — Ruta 34 Costanera Sur
- Pista 6/6, tema `costanera`; siguiente 1/6 Ruta 2 Cerro de la Muerte. Se consultó historial de esta rama y PR #38/#40: no se repitieron islotes, rocas ni espuma del shader.
- Cambio: anillos de espuma marina 3D alrededor de islotes existentes, `THREE.InstancedMesh` con 12/7/4 instancias según calidad, geometría original sin colisiones, texturas externas ni luces nuevas. Commit `6dbb58b7d006e9f9ed3a5b1804893fe2e87811ee`; PR borrador #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38.
- Vehículos: Aurora V12 ID `aurora`, faldones laterales de carbono y filo satinado PBR, sin cambios de física ni controles; commits `7672ecd119bbbec489df34319788438b8793cf3e` y corrección de anchura `7ec6362f0bafeeb63da9afba01384803cafd10cc`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes de contexto ya documentadas: ICT https://es.visitcostarica.com/ y SNIT https://www.snitcr.go.cr/ . Geografía artística, no georreferenciada.
- [x] Parseo JavaScript de ambos módulos con `new Function` tras quitar `export` antes de escritura; [x] commits GitHub confirmados; [ ] WebGL/GLSL y captura desde conducción/exterior; [ ] FPS móvil/PC; [ ] física y multijugador; [ ] reconciliar PR #38/#40/#45. PR #38 y #45 no fusionables individualmente al consultar; integración bloqueada.
- Checklist global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas satisfactorias; [ ] bloqueos resueltos. **NO LISTO**. Sin merge ni Netlify.

## Turno 2026-11-23 14:58 Costa Rica — Ruta 34 Costanera Sur
- Pista única 6/6, ID `costanera`; siguiente 1/6 Ruta 2 Cerro de la Muerte. Historial consultado: ya existían relieve, rocas, espuma e islotes; se evitó duplicarlos.
- Mejora nueva: mirador costero 3D con techo de cuatro aguas, cuatro pilares instanciados y plataforma PBR, situado 68 unidades del eje vial, sin colisiones ni assets de terceros. Archivo `graphics/costa-rica-tracks.js`, commit `f766cd606b6cc8e1b5eeb0f168fc66007112dc31`, PR borrador #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38.
- Vehículo simultáneo Aurora V12: firma luminosa posterior continua con receso y ribete PBR, commit `9b55864aaad208ab67108fb9a2c480c287659def`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes de contexto paisajístico previamente documentadas: ICT https://es.visitcostarica.com/ y SNIT https://www.snitcr.go.cr/ . Mirador escenográfico original, no infraestructura georreferenciada.
- [x] Lectura de historial y escritura GitHub confirmada; [ ] parser JavaScript ejecutado; [ ] inspección WebGL y capturas desde conductor/exterior; [ ] FPS móvil/PC; [ ] físicas y multijugador; [ ] revisar emplazamiento del mirador sobre terreno y oclusión; [ ] compatibilidad PR #38/#40 y #45. PR #38 fusionable individualmente antes del cambio, PR #45 no fusionable. Sin merge ni Netlify.
- Checklist global: [ ] seis pistas validadas; [ ] vehículos validados; [ ] PR conciliados; [ ] pruebas críticas satisfactorias; [ ] bloqueos resueltos. **NO LISTO PARA PUBLICACIÓN**.
# Seguimiento de rotación de pistas — Paso Alpino

Última ejecución registrada: 2026-11-19 15:00 (Costa Rica)
Pista trabajada: 3/6 — Ruta 32 Zurquí (theme.cr: `zurqui`)
Siguiente pista: 4/6 — Paseo de los Turistas Puntarenas (theme.cr: `puntarenas`)
Rotación: Ruta 2 Cerro de la Muerte → Ruta 27 → Ruta 32 Zurquí → Puntarenas → Ruta 1 Guanacaste → Ruta 34 Costanera Sur → repetir.

## Registro 2026-11-19 15:00 — Zurquí
- ID: `zurqui`; siguiente `puntarenas`. Se comprobó el registro previo de Zurquí del 18 de noviembre y se eligió un elemento distinto de portales y luminarias.
- Rama existente: `graphics/zurqui-damp-concrete-20261115`; PR borrador asociado anteriormente: #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 (estado actual de fusión no comprobado).
- Cambio real: dos `THREE.InstancedMesh` para postes y reflectores en el acceso al túnel, 28/18/10 instancias según calidad. Geometría y materiales compartidos; esfera de visibilidad calculada; sin sombras ni colisiones; separación lateral escenográfica de 20 unidades del eje.
- Código: `graphics/costa-rica-tracks.js`; commit `9f9c07a6181bbbb719e84c6d7941e7874207a859`. No se tocaron físicas, vehículos, carretera ni multijugador.
- Fuentes: MOPT (10-04-2026), https://www.mopt.go.cr/noticias/2026/demarcacion-de-rn-32-iniciara-proximo-lunes-13-de-abril (captaluces, demarcación y postes abatibles); MOPT (05-06-2025), https://www.mopt.go.cr/node/1031 (referencia visual y contexto del túnel). Elementos recreados sin copiar imágenes ni modelos.
- Verificación: GitHub confirmó escritura del commit; no se ejecutaron pruebas automáticas Node, WebGL, FPS, físicas, multijugador ni revisión visual desde conducción. Revisar orientación de reflectores y separación efectiva respecto a la calzada.
- Bloqueos: integración con otros PR de Zurquí y validación gráfica/rendimiento pendientes. Sin merge ni despliegue.

## Registro 2026-11-18 21:00 — Zurquí
- Pista: Ruta 32, ID `zurqui`; siguiente: Puntarenas, ID `puntarenas`.
- Rama: `graphics/zurqui-damp-concrete-20261115`; código: `graphics/costa-rica-tracks.js`.
- Cambios: sustituye 24 mallas individuales de los dos portales del túnel por un `THREE.InstancedMesh` con matrices transformadas al espacio mundial, esfera de visibilidad calculada y sin sombras. Se conserva la carretera y no se modifican físicas, vehículos ni multijugador.
- Commits: `7a1a1cdce49ae7a6afd53a50c3774ca00d3b3f8e`, `3038b5cb471b6e4a3ea4522cd788b9069b5eef6e`.
- Fuentes: SINAC https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; LanammeUCR (evaluación del túnel Zurquí) https://www.lanamme.ucr.ac.cr/ . Referencias de contexto; no se copiaron recursos protegidos.
- PR: borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42, rama de esta ejecución; GitHub devolvió mergeable=false. Los PR #17, #35 y #41 también afectan Zurquí; requieren conciliación.
- Pruebas: lectura del archivo y confirmación de dos commits GitHub. No se ejecutaron Node, pruebas visuales WebGL, FPS, físicas ni multijugador. Verificar alineación y aspecto de portales desde conducción.
- Bloqueo: PR #42 no fusionable al crear; faltan conciliación y pruebas críticas. Sin merge ni despliegue.

## Registro 2026-11-18 03:00 — Zurquí (turno de continuación)
- Pista: Ruta 32, ID `zurqui`; siguiente: Puntarenas, ID `puntarenas`.
- Código: `graphics/costa-rica-tracks.js`; commit `cafe1a2b3e5e03b4fbb93badfa312e1b5de093de`.
- Cambio: recalcula matrices y bounding spheres de las copas, troncos y helechos instanciados; desactiva sombras de esa vegetación para favorecer descarte fuera de cámara sin alterar carretera, vehículos ni físicas.
- Fuentes: SINAC https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx (bosque siempreverde, cañones); MOPT https://www.mopt.go.cr/noticias/2026/demarcacion-de-rn-32-iniciara-proximo-lunes-13-de-abril (señalización y captaluces, abril 2026); LanammeUCR https://www.lanamme.ucr.ac.cr/repositorio/bitstream/handle/50625112500/992/Bolet%C3%ADn%2005-2018%20Evaluaci%C3%B3n%20de%20T%C3%BAneles%20carreteros%20en%20Costa%20Rica%20%20T%C3%BAnel%20Zurqu%C3%AD%20RN%2032.pdf?isAllowed=y&sequence=1 (ubicación y vistas del túnel). Referencias consultadas, no se copiaron imágenes ni mapas.
- PR: #35 cambia los mismos archivos; no se verificó la correspondencia de su rama con esta rama, por lo que no se creó otro PR.
- Pruebas: comparación textual de bloques antes de escritura; GitHub confirmó commit. No se ejecutaron Node, WebGL, FPS, físicas ni multijugador. Compatibilidad entre PR sin validar.
- Estado: pendiente de revisión visual desde cabina, validación móvil/PC e integración; no fusionar ni desplegar.

## Registro 2026-11-17 — Zurquí
- Rama: `graphics/zurqui-damp-concrete-20261115`
- Código: `graphics/costa-rica-tracks.js`
- Commit: `e90c27bc0c9c6c621d49735163d3845e44ec6af0`
- Cambio: sustituye las luminarias individuales del techo del túnel por un `THREE.InstancedMesh`, con matrices y esfera de visibilidad recalculadas.
- Fuente de geometría: trazado estilizado ya existente en el repositorio; no se añadieron mapas, fotos ni modelos de terceros.
- Referencias de contexto pendientes de contraste: MOPT/CONAVI para Ruta 32 y SINAC para Parque Nacional Braulio Carrillo.
- PR: existe referencia previa a #35, pero no se ha confirmado que esta rama sea su cabeza; no crear PR duplicado sin comprobarlo.
- Pruebas: lectura de código y sustitución de fragmento confirmadas; no se ejecutaron pruebas de sintaxis en Node, WebGL, FPS, físicas ni multijugador.
- Riesgo: integración con otras ramas que modifican el mismo módulo de escenarios. No fusionar ni desplegar.

## Checklist global de lanzamiento
- [ ] Ruta 2: integración, señales, fauna, conducción y FPS validados
- [ ] Ruta 27: integración, peajes, viaductos, conducción y FPS validados
- [ ] Ruta 32: integración, túnel, cascadas, conducción y FPS validados
- [ ] Puntarenas: integración, faro, muelle, conducción y FPS validados
- [ ] Ruta 1: integración, paisaje, conducción y FPS validados
- [ ] Ruta 34: integración, relieve, conducción y FPS validados
- [ ] Vehículos: apariencia, físicas y colisiones validadas
- [ ] Multijugador, compatibilidad PR y WebGL móvil/PC validados
- [ ] Bloqueos resueltos y autorización humana para Netlify

## Revisión incremental — 2026-11-20 06:03 Costa Rica
- Pista **3/6 Ruta 32 Zurquí**, ID `zurqui`; siguiente **4/6 Paseo de los Turistas Puntarenas**. Se consultaron PR #42 y #45 y los registros previos; no se repitieron luminarias ni delineadores.
- Código Ruta 32: material PBR de bóveda de hormigón con rugosidad .81 y clearcoat .09; nervaduras visuales de túnel en `THREE.InstancedMesh`, 9 piezas por sección, cada 10/18 nodos según calidad. Commit `8dbf5583dfc72667651439a8a0a13bfb53d93ac9`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 .
- **Vehículos:** modelo existente `aurora` / Aurora V12, archivo `graphics/future-chassis.js`; proyectores LED internos en ambos faros, esfera de detalle adaptable (16x10 alta / 10x6 baja), geometría exclusivamente decorativa, sin modificar ejes, ruedas, colisiones, físicas o controles. Commit `fca9d66b2602e1da3cf4a724c89286922653e3b7`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Fuentes contextuales ya registradas: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; evaluación técnica del túnel LanammeUCR https://www.lanamme.ucr.ac.cr/ . Modelos originales, no se copiaron fotografías.
- Verificado: GitHub confirmó ambos commits. Pendientes: ejecutar parser JavaScript, renderizar WebGL y comprobar colocación de nervaduras y proyectores desde cámaras de conductor/exterior, FPS móvil/PC, físicas y multijugador. No se atribuyen resultados no medidos.
- Compatibilidad consultada antes de cambios: PR #42 **no fusionable**, PR #45 **fusionable** con main; no se ha comprobado compatibilidad conjunta ni con PR #17/#35/#41. No fusionar.
- Checklist Ruta 32: [x] nervaduras instanciadas y material de túnel; [ ] verificar escala/cámara y FPS; [ ] integrar PR concurrentes.
- Checklist vehículos: [x] proyectores 3D Aurora V12; [ ] verificar faros y visibilidad; [ ] probar otros vehículos, físicas y FPS.
- Global: [ ] seis pistas verificadas e integradas; [ ] vehículos verificados; [ ] PR compatibles; [ ] WebGL/FPS/físicas/multijugador; [ ] bloqueos resueltos. **No listo para Netlify; sin publicación.**

## Revisión incremental — 2026-11-20 23:55 Costa Rica
- Pista trabajada: **3/6 Ruta 32 Zurquí**, ID `zurqui`; siguiente **4/6 Paseo de los Turistas Puntarenas**. Revisados historial anterior y PR #42; no se duplicaron nervaduras ni luminarias.
- Mejora visual real: bandas reflectantes bajas a ambos lados del túnel, 2 por estación, cada 14 nodos en alta o 25 en reducida, con un `THREE.InstancedMesh`, material PBR de emisión tenue y sin luces dinámicas. Objetivo: sensación de profundidad y velocidad desde cámara conductor. Commit `c9bf5080e258c03c4c738cc36cff004843183588`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 .
- **Vehículos:** Aurora V12, ID `aurora` en `graphics/future-chassis.js`; dos extractores de capó originales de geometría curva con borde satinado y detalle adaptable. Commit `25eec5a7a45e307e3ac9ac75dd08bef79b034a4c`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Fuentes de contexto existentes: SINAC Parque Nacional Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; LanammeUCR https://www.lanamme.ucr.ac.cr/ . Geometría original, ubicación ilustrativa; no fotografías copiadas.
- Verificado: GitHub aceptó ambos commits. Pendientes: parser JavaScript ejecutado, render WebGL, escala y orientación desde conductor, FPS móvil/PC, físicas, multijugador.
- Compatibilidad: PR #42 y #45 estaban **no fusionables** con main al consultar antes del cambio; conflictos con otros PR del mismo módulo sin resolver. No merge ni Netlify.
- Checklist Ruta 32: [x] nervaduras, bóveda PBR, bandas reflectantes; [ ] validar renderizado/posición; [ ] FPS y compatibilidad PR.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos visualmente validados; [ ] pruebas WebGL/FPS/físicas/red; [ ] PR compatibles y bloqueos resueltos; [ ] autorización de publicación. **No listo para Netlify.**

## Revisión 2026-11-21 18:00 Costa Rica — Ruta 32 Zurquí
- Pista 3/6: ID `zurqui`; siguiente 4/6 Puntarenas (`puntarenas`). Historial consultado: las bandas, luminarias, nervaduras y portales ya existían; esta revisión añade un elemento diferente.
- Código: paneles cálidos de techo instanciados con densidad adaptable (paso 22/38 nodos), material PBR con emisión suave, sin luces dinámicas, físicas ni colisiones. Commit `a731136b875bfd393495e83c83b8be1db2332682`; PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42.
- Vehículos: Aurora V12 ID `aurora`, tercera luz de freno curvada bajo luneta trasera, material de freno animado compartido; commit `d96598ff567bd34689e2736e754761ebeb0953c1`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes contextuales: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx y MOPT Ruta 32 https://www.mopt.go.cr/node/1031 . Los paneles son diseño escenográfico original, no réplica exacta.
- Pruebas: GitHub confirmó escrituras. No ejecutadas sintaxis JS, WebGL, FPS, física, multijugador ni capturas; pendiente verificar altura real del techo y oclusión de luz trasera. PR #42/#45 concurrentes con otros cambios en los mismos módulos: compatibilidad sin demostrar.
- Checklist Ruta 32: [x] paneles de techo instanciados; [ ] cámara y WebGL; [ ] FPS móvil/PC; [ ] integrar PR. Vehículos: [x] luz trasera visual; [ ] cámaras, física, FPS y compatibilidad.
- Global: [ ] seis pistas integradas y probadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas y bloqueos resueltos. Sin fusión ni Netlify.

## 2026-11-22 11:57 Costa Rica — Ruta 32 Zurquí (3/6)
- Pista única: ID `zurqui`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 . Siguiente: **4/6 Paseo de los Turistas Puntarenas**.
- Código: cuatro tableros verticales de advertencia ámbar con doce franjas negras, geometría 3D original instanciada en las dos bocas del túnel, para reconocer los accesos desde la cámara de conducción. Dos draw calls, sin luces dinámicas, colisiones, ni alteración de carretera. Commit `bacb26208ef18527edb9c2309399cead6d34a476` [skip netlify].
- Referencias de contexto: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx y MOPT https://www.mopt.go.cr/node/1031 . Posiciones ilustrativas; no es una réplica georreferenciada. No se copiaron fotografías.
### Vehículos
- Modelo original Aurora V12, ID `aurora` en `graphics/future-chassis.js`: parrilla frontal oscura con tres barras satinadas PBR, visible en cámara exterior, sin cambios a ruedas, shell, ejes, físicas, controles o red. Commit `7fec6214077125932ac29e1904de01a5759d55e3`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 [skip netlify].
- PR #42 y #45: borradores **no fusionables** al consultar antes de los cambios. No se ha probado compatibilidad cruzada.
- Verificado: escrituras GitHub confirmadas. [x] geometría instanciada de acceso; [x] parrilla visual; [ ] parseo JS ejecutado; [ ] capturas reales desde conducción y exterior; [ ] WebGL/FPS móvil/PC; [ ] física y multijugador; [ ] integración y resolución de conflictos.
- Estado global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas completas; [ ] bloqueos resueltos. **No listo para lanzamiento. No fusionar ni desplegar Netlify.**

## 2026-11-23 05:55 Costa Rica — Ruta 32 Zurquí (turno 7)
- Historial consultado: turno anterior Ruta 27 (2026-11-23 03:04); pista actual 3/6, ID `zurqui` en `graphics/costa-rica-tracks.js`; siguiente 4/6 `puntarenas`. No se repitió la mejora anterior de reflectores de portal.
- Mejora de pista: 10/7/4 tableros de advertencia de curva ámbar, flecha oscura y poste según calidad, con tres `THREE.InstancedMesh` fuera de la calzada antes del túnel. Commit `1f008be1f67433a0b66f857db3b7408468dee3e9`, borrador [#42](https://github.com/jmortegacu-jpg/paso-alpino/pull/42) [skip netlify].
- Fuentes: MOPT (2026-04-10) https://www.mopt.go.cr/noticias/2026/demarcacion-de-rn-32-iniciara-proximo-lunes-13-de-abril ; SINAC https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/ . Elementos artísticos originales, trazado aproximado, no señalización para navegación.
### Vehículos
- Aurora V12 `aurora`, `graphics/future-chassis.js`: cinco lamas oscuras en cubierta trasera y remates PBR, sin editar hitbox ni controladores. Commit `fc0d62ee63e9fa4668618c13ba16598557386889`, borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45) [skip netlify].
- Integración: PR #42 no fusionable al consultar antes de editar; PR #45 figuraba fusionable individualmente; compatibilidad cruzada no comprobada.
- Pruebas: [x] escritura GitHub; [ ] parser JS ejecutado; [ ] capturas conducción/exterior; [ ] WebGL y FPS móvil/PC; [ ] físicas; [ ] multijugador; [ ] conflictos resueltos.
- Global: [ ] seis pistas integradas; [ ] vehículos verificados visualmente; [ ] PR compatibles; [ ] pruebas críticas satisfactorias. **No publicar en Netlify.**
# Paso Alpino — rotación de pistas y preparación para Netlify

Última revisión: 2026-11-15, turno Ruta 32 Zurquí (3/6).
Siguiente pista: **Paseo de los Turistas, Puntarenas (4/6)**.
Fuente de continuidad: PR #33 Ruta 2, PR #34 Ruta 27, y este PR Ruta 32. Los PR anteriores siguen sin integrar; no confundir sus archivos de seguimiento con el estado de main.

| Turno | Pista / identificador interno | Avance verificable | Estado |
|---|---|---|---|
| 1 | Cerro de la Muerte / `ruta2` | PR #33: parque eólico Coopesantos y señales | Borrador; pruebas visuales pendientes |
| 2 | San José–Caldera / `ruta27` | PR #34: pórticos y señalización | Borrador; pruebas pendientes |
| 3 | Zurquí / `zurqui` | Este PR: reflectores instanciados en túnel y señal de salida | Sintaxis validada; WebGL/FPS pendientes |
| 4 | Puntarenas / `puntarenas` | Próximo turno; considerar compatibilidad PR #22 muelle | Pendiente |
| 5 | Interamericana Norte / `ruta1` | Revisar paisaje Guanacaste | Pendiente |
| 6 | Costanera Sur / `costanera` | Revisar costas y embarcaciones; PR #18 | Pendiente |

## Fuentes para Zurquí
- SINAC Parque Nacional Braulio Carrillo: https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/
- MOPT, 5 junio 2025, proyecto de iluminación y conectividad Ruta 32: https://www.mopt.go.cr/node/1031
- CNC, proyecto de mejora de Ruta 32 (obras proyectadas, NO representarlas como existentes): https://cnc.go.cr/proyectos/gestion-de-iniciativas/rn-32

## Cambios verificables de este turno
- Archivo `graphics/costa-rica-tracks.js`: reflectores de pared en el túnel, `InstancedMesh`, sin luces dinámicas, colisiones ni texturas externas.
- Rótulo adicional de salida del túnel.
- Sintaxis: PASS, parseo JS con `new Function` retirando `export`; lectura posterior confirma código.
- **No ejecutadas:** navegador WebGL, captura desde conductor, FPS móvil/PC, físicas y multijugador. La ausencia de cambios en esos sistemas NO equivale a pruebas aprobadas.
- Posiciones artísticas, no georreferenciadas. No se importan fotografías ni materiales protegidos.

## Checklist de publicación
- [ ] Integración y resolución de conflictos entre PR #22, #25, #31, #32, #33, #34 y los nuevos
- [ ] Seis pistas verificadas desde cámara del conductor con referencias reales
- [ ] Vehículos, luces, ruedas y carrocerías comprobados
- [ ] Sintaxis, WebGL, FPS móvil/PC y memoria
- [ ] Conducción, colisiones y continuidad de carretera
- [ ] Multijugador y entrada a salas desde dos dispositivos
- [ ] Autorización expresa de publicación en Netlify

**No listo para Netlify.** No fusionar ni desplegar automáticamente.

## Segunda vuelta — 2026-11-16, Ruta 32 Zurquí (turno 9)
- **Pista trabajada:** Ruta 32 / identificador `zurqui`. **Siguiente:** Paseo de los Turistas / `puntarenas`.
- **Cambio:** las luminarias del techo del túnel que antes eran meshes separados ahora comparten una sola geometría y un `THREE.InstancedMesh`, con cantidad adaptada a calidad alta/cine o baja/media. Se conservan posiciones, orientación y dimensiones; no hay nuevas luces dinámicas, colisiones ni alteraciones de carretera, vehículos, física o red.
- **Commit:** `b37a4eadbc70532d30c46c335f5704e251ae9a16`; PR #35: https://github.com/jmortegacu-jpg/paso-alpino/pull/35 . Cambio sobre rama borrador, sin fusionar.
- **Fuentes geográficas:** SINAC https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/ ; MOPT https://www.mopt.go.cr/node/1031 . No se importaron fotografías ni se afirmó georreferenciación.
- **Verificación:** escritura confirmada en GitHub; pendiente parser automatizado, WebGL, capturas desde conductor, FPS y memoria móvil/PC, pruebas de conducción y multijugador. La reducción de llamadas de dibujo es estructural, no un FPS medido.
- **Riesgo de integración:** revisar conflictos de `graphics/costa-rica-tracks.js` con PR #17, #25, #33, #34, #36–38; el archivo de seguimiento está duplicado en varias ramas y requiere consolidación antes de fusionar.
- **Publicación:** NO listo para Netlify; no fusionar ni desplegar sin autorización expresa.
