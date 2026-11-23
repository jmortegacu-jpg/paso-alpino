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
