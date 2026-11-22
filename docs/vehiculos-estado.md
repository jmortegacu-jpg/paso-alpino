# Paso Alpino — seguimiento de vehículos

## 2026-11-20 12:00 Costa Rica — Aurora V12
- Modelo original: `aurora` en `graphics/future-chassis.js`; no se usa un Lexus comercial.
- Mejora visual: aro interior metálico para cada una de las cuatro llantas, con `TorusGeometry` 36 segmentos alta/18 reducida, material PBR trim ya existente, alojado en `wh.spin` dentro del ancho de neumático. Sin modificar física, colisiones, ejes ni controles.
- Commit gráfico: `30e22b67138d2a98d7a01df13fd2cee560bdfffa`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45
- Pista revisada en el mismo turno: Ruta 1 Guanacaste, commit `5d11987612ea6dc2b3cdbedccd9ae2b4cecccb98`, PR #37 https://github.com/jmortegacu-jpg/paso-alpino/pull/37 . Siguiente pista Ruta 34.
- Fuente paisaje: Área de Conservación Guanacaste, 2026-10-08 https://www.acguanacaste.ac.cr/espaniolllll/6815-acg . No se copiaron fotografías.
- Verificado: GitHub aceptó commits. Pendientes parser JS, WebGL, FPS, capturas desde conducción y exterior, físicas y multijugador. PR #45 figuraba no fusionable con main al consultar; requiere reconciliación.
- Checklist vehículos: [x] mejora visual incremental; [ ] capturas reales; [ ] FPS móvil/PC; [ ] pruebas WebGL/físicas/multijugador; [ ] compatibilidad PR.
- Checklist global: [ ] seis pistas integradas y probadas; [ ] vehículos validados; [ ] PR compatibles; [ ] bloqueos resueltos. NO publicar en Netlify sin autorización.

## 2026-11-20 15:04 Costa Rica — Aurora V12
- Modelo `aurora` (`graphics/future-chassis.js`): repetidores ámbar discretos en ambas carcasas de retrovisores, con material PBR y emisión visual tenue, sin luces dinámicas, colisiones ni alteración de física. Commits `3e353b6d5a1c15dddffe38b829d860feed5929d7`, `cdcb03afba6541d8d64d5da987751a61c1b2df31` (simetría). PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Pista del turno: Ruta 34 Costanera Sur, oleaje y espuma de orilla shader, commit `90cacc2ddcedc031e38a68487068be5f9beba276`, PR #38 https://github.com/jmortegacu-jpg/paso-alpino/pull/38; próxima Ruta 2.
- Verificado: escrituras GitHub. Pendientes: parser JavaScript, captura WebGL, escala de repetidores desde exterior, FPS móvil/PC, físicas, multijugador, compatibilidad de PR y revisión global. Sin fusión ni Netlify.

## 2026-11-20 18:03 Costa Rica — Aurora V12
- Modelo `aurora`, original; se agregaron dos molduras satinadas curvas siguiendo el estribo con radio 0.014 alta / 0.010 baja, material PBR existente. Commit `a53fcd5f2e40e875b5110608be46b50b0fb6b126`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Pista paralela del turno: Ruta 2 Cerro de la Muerte, crestas distantes con LOD; commit `e85c71bf124d26a147e68b5be4df34ca66b87146`, PR #33. Siguiente Ruta 27. Fuente de paisaje: https://www.coopesantos.com/servicios/generacion-de-energia/.
- Sin modificación de ejes, neumáticos, controles, colisiones ni multijugador. Escritura GitHub confirmada; sin pruebas ejecutadas de parser, WebGL, FPS o cámara. PR #45 no fusionable al consultar antes del cambio. [ ] Captura exterior y conducción; [ ] FPS; [ ] física y red; [ ] compatibilidad PR. **No publicar en Netlify.**

## 2026-11-20 21:00 Costa Rica — Aurora V12
- Se añadió superficie reflectante tridimensional dentro de cada carcasa de retrovisor con `MeshPhysicalMaterial` y geometría de baja complejidad según calidad, sin tocar carrocería estructural, ejes, ruedas, controles, colisiones o multijugador.
- Commit `ccfd61fc01bcf407e4ad09c71c32e31d5bb9bbcb`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista del turno: Ruta 27, postes de parapeto del viaducto, commit `d783fcb5d7f79aa9041885b4ac0b5286ac29606b`, PR #34. Próxima pista Ruta 32.
- Escritura confirmada en GitHub; sin pruebas ejecutadas de parser, WebGL, FPS, físicas ni multijugador. [ ] comprobar simetría y orientación desde cámara exterior; [ ] rendimiento; [ ] integración de PR. **No fusionar ni desplegar Netlify.**

## 2026-11-20 23:55 Costa Rica — Aurora V12
- Vehículo: `aurora`, carrocería original inspirada en gran turismo; se agregaron dos extractores curvos de capó con material oscuro PBR y borde satinado, LOD por calidad, sin modificar ejes, ruedas, colisiones, físicas, controles ni multijugador.
- Commit `25eec5a7a45e307e3ac9ac75dd08bef79b034a4c`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista del turno: Ruta 32 Zurquí, bandas reflectantes interiores, commit `c9bf5080e258c03c4c738cc36cff004843183588`, PR #42. Siguiente Puntarenas.
- Escrituras GitHub verificadas; pendientes parser JS, render WebGL y capturas desde cámara exterior, oclusión del capó, FPS móvil/PC, física, red e integración PR. PR #45 no fusionable antes del cambio. **No fusionar ni desplegar Netlify.**


## 2026-11-21 02:55 Costa Rica — Aurora V12
- Modelo original `aurora`, archivo `graphics/future-chassis.js`: costilla oscura adicional de baja geometría en el centro de cada extractor de capó para reforzar la profundidad desde vista exterior. Grosor LOD alta/reducida, sin alterar físicas, ruedas, controles, ejes ni colisiones.
- Commit `3856797d2d7b391080381c83dc5cb6da070e531a`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista del mismo turno: Puntarenas, dos escaleras de muelle instanciadas, commit `65653a3757c994a83f95680120db8ee5b533a4d9`, PR #39; siguiente Ruta 1 Guanacaste.
- GitHub confirmó commits. Pendientes parser JS, render WebGL, capturas conducción/exterior, FPS, física, multijugador y compatibilidad conjunta de PR. Sin merge ni Netlify.


## 2026-11-21 06:03 Costa Rica — Aurora V12
- Modelo original `aurora` en `graphics/future-chassis.js`. Dos líneas satinadas de hombro sobre el capó, siguiendo `roof`, `styleRidge` y `cw` existentes, LOD por grosor. Sin modificar ejes, ruedas, colisiones, físicas, controles ni multijugador.
- Commit `8692a4a92faff04d2a229faeeb7d402f0e1adbfd`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Pista paralela Ruta 1 Guanacaste: guanacaste de copa ancha y señal bosque seco, commit `879a56f0176807f1d232d5971b521e9ec13fa970`; PR #37. Siguiente Ruta 34.
- Verificado: escritura GitHub. Pendientes: sintaxis JS ejecutada, captura frontal/exterior y conductor, FPS móvil/PC, WebGL, física, multijugador y conflictos de PR.
- [x] cambio incremental; [ ] revisión visual; [ ] rendimiento; [ ] integración. **No fusionar ni publicar Netlify.**

## 2026-11-21 09:00 Costa Rica — Aurora V12
- ID `aurora`, `graphics/future-chassis.js`: nervadura central de capó hecha con curva y material PBR existente; grosor alta .019 / reducida .012. Complementa hombros del capó existentes sin modificar shell estructural, ejes, colisiones, física, controles ni red.
- Commit `453017c80f72895a586c953850b3ac917a82251d`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Pista paralela Ruta 34, rompiente costera secundaria, commit `5020c720cf32c2575ac8aa85cbeb73ab8a484cb5`, PR #38. Siguiente Ruta 2.
- GitHub aceptó cambios; no ejecutados parser, WebGL, capturas, FPS, física o multijugador. [ ] verificar oclusión de capó desde cámaras; [ ] FPS; [ ] compatibilidad con otras ramas. No fusionar ni publicar Netlify.


## 2026-11-21 12:00 Costa Rica — Aurora V12
- Modelo `aurora`, módulo `graphics/future-chassis.js`: capucha de tablero y dos instrumentos cilíndricos con biseles PBR, solo en detalle alto, geometría original. Commit `3a90363aa829459fbd5de5f0adbc3daea3bb866b`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Pista paralela Ruta 2, barrera montana instanciada, commit `7d1dae2ec34b1e7fc24910dcb228d33733f3e16e`, PR #33; siguiente Ruta 27.
- Sin cambios de físicas, ruedas, ejes, controles, colisiones o red. GitHub aceptó código. [ ] comprobar visual desde conductor y exterior; [ ] parser JS; [ ] WebGL; [ ] FPS móvil/PC; [ ] pruebas de físicas/multijugador; [ ] compatibilidad con PR de carrocerías. **No fusionar ni publicar en Netlify**.


## 2026-11-21 15:00 Costa Rica — Aurora V12
- ID `aurora`, `graphics/future-chassis.js`: seis aletas satinadas (tres por toma lateral), material PBR compartido, solo geometría decorativa exterior. Commit `8e3dabfc0d343285a799e98952295f29d52dc585`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista paralela Ruta 27: reflectores ámbar de viaducto, commit `69a61a4777a6f63eb0b9759c6e4d0b28da02db8d`, PR #34. Próxima Ruta 32.
- GitHub aceptó escrituras; PR #34 y #45 no fusionables al consultar. [ ] parser JS; [ ] WebGL; [ ] capturas cabina/exterior; [ ] FPS móvil/PC; [ ] física/red; [ ] resolver conflictos. No fusionar ni desplegar Netlify.

## 2026-11-21 18:00 Costa Rica — Aurora V12
- Modelo `aurora` en `graphics/future-chassis.js`: tercera luz de freno curva, material `material.tail` animado, colocada junto a luneta trasera. Geometría decorativa, sin cambios de colisión, ejes, controles, física o red.
- Commit `d96598ff567bd34689e2736e754761ebeb0953c1`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Pista paralela única Ruta 32 Zurquí: paneles de techo instanciados, commit `a731136b875bfd393495e83c83b8be1db2332682`, PR #42; siguiente Puntarenas.
- [x] Escritura confirmada GitHub; [ ] render exterior y conducción (posición bajo cristal); [ ] parser JS; [ ] WebGL/FPS móvil/PC; [ ] física/multijugador; [ ] resolver conflictos PR. Sin merge ni Netlify.

## 2026-11-21 21:04 Costa Rica — Aurora V12
- Modelo aurora, graphics/future-chassis.js: dos agujas rojas 3D con material PBR y emisión tenue en instrumentos de cabina; detalle visual sin cambios físicos. Commit 5daeade343fd0315f7984de7f72d9197b7995c22, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista paralela Puntarenas: toldos de paseo marítimo instanciados, commit a52dd0a1dddfc1342fcd6f4281fb3660c0322182, PR #39. Siguiente Ruta 1 Guanacaste.
- Verificado: GitHub aceptó escrituras. Pendientes parser, WebGL, cámara, FPS, físicas, multijugador y compatibilidad PR. [x] detalle visual; [ ] capturas reales; [ ] integración. Sin merge ni Netlify.


## 2026-11-22 00:00 Costa Rica — Aurora V12
- ID real `aurora` en `graphics/future-chassis.js`: dos aletas satinadas de difusor trasero, material `material.trim` existente, geometría ligera sin alterar rig, dimensiones funcionales, ejes, física, colisiones, controles ni multijugador.
- Commit `4341d0c851d61a45698de0567769326eeb47d36f`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Pista del mismo turno Ruta 1: afloramientos de bosque seco, commit `47cdadbd1e9f697d378f0000636d0a5aeb98ce7c`, PR #37; siguiente Ruta 34.
- Verificado: lectura y escritura aceptada por GitHub. [x] detalle visible propuesto para cámara exterior; [ ] comprobar posición y ausencia de solapamiento en render WebGL; [ ] capturas; [ ] FPS móvil/PC; [ ] parser; [ ] físicas/red; [ ] compatibilidad PR. **Sin merge ni Netlify**.

## 2026-11-22 03:00 Costa Rica — Aurora V12
- ID `aurora`, `graphics/future-chassis.js`: tres lamas traseras horizontales en carbono, encima del difusor, para reforzar la profundidad de la zaga desde cámara exterior. Geometría visual ligera; sin cambios a rig, ejes, colisiones, físicas, controles ni multijugador.
- Commit `a99ef6935e43a66f85bfd4a9554fdf1dfc3790de`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 . Pista paralela única Ruta 34, islotes rocosos marinos instanciados, commit `76aed46c39cd02036d806547a83e01cdac083bf6`, PR #38; siguiente Ruta 2.
- [x] Escritura GitHub; [ ] validar posición y oclusión con capturas reales; [ ] parser; [ ] WebGL; [ ] FPS móvil/PC; [ ] físicas y multijugador; [ ] conflictos PR concurrentes. No fusionar ni publicar Netlify.


## 2026-11-22 06:00 Costa Rica — Aurora V12
- Modelo `aurora`: dos embellecedores de salida de escape de geometría original, toros metálicos con fondo oscuro, para distinguir la zaga desde cámara exterior. Commit `03bce087a393fa5341d58712be4f56cc642b53ef`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista única paralela Ruta 2, siluetas de quetzales instanciadas, commit `70c8b4550add3168bc89bd7cc2015280b137c5cb`, PR #33; siguiente Ruta 27.
- [x] escritura de código; [ ] parseo JS; [ ] capturas reales y visibilidad de escapes; [ ] WebGL/FPS móvil/PC; [ ] físicas y multijugador; [ ] compatibilidad PR. No se tocaron colisiones, ruedas ni controles. Sin merge ni Netlify.

## 2026-11-22 09:04 Costa Rica — Aurora V12
- Modelo `aurora` (diseño original), archivo `graphics/future-chassis.js`. Se agregó un remate metálico horizontal de zaga con extremos verticales, visible potencialmente desde cámara exterior; utiliza `material.trim` PBR existente, sin alterar ruedas, física, controles, colisiones ni red.
- Commit `200a22a467cb48b6ba2295d04baf21b7a0e6ca84`; PR borrador [#45](https://github.com/jmortegacu-jpg/paso-alpino/pull/45) [skip netlify]. PR no fusionable al consultar antes del cambio.
- Pista paralela: Ruta 27, paneles de peligro en extremos del viaducto, commit `24bd24eaaf4403abf11bc25cfa198cb82c0b3028`, PR #34. Próxima Ruta 32.
- [x] Commit GitHub confirmado; [ ] parser JS; [ ] render real desde exterior/cabina y solapamientos; [ ] FPS/WebGL; [ ] físicas/multijugador; [ ] conflictos de integración. **Sin merge ni Netlify**.


## 2026-11-22 11:57 Costa Rica — Aurora V12
- ID `aurora` en `graphics/future-chassis.js`. Parrilla delantera oscura con tres lamas satinadas PBR de geometría ligera, sin cambios en física, controles, ruedas, colisiones ni red. Commit `7fec6214077125932ac29e1904de01a5759d55e3`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Pista del turno: Ruta 32 Zurquí, paneles de advertencia instanciados en las bocas del túnel, commit `bacb26208ef18527edb9c2309399cead6d34a476`, PR #42; siguiente Puntarenas.
- [x] GitHub confirmó escrituras; [ ] validar posición frontal desde cámara exterior; [ ] parser JS; [ ] WebGL y FPS móvil/PC; [ ] físicas y multijugador; [ ] resolver conflictos PR #42/#45. Sin merge ni Netlify.

## 2026-11-22 14:55 Costa Rica — Aurora V12
- Modelo `aurora`, archivo `graphics/future-chassis.js`: dos cejas de faro tridimensionales de doble trazo oscuro/satinado, geometría decorativa sobre fascia, LOD según calidad, sin modificar colisiones, ruedas, física, controles ni red. Commit `deaee71668d5e5e4ab586e4be8557656e2d68fa0`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 [skip netlify].
- Pista paralela única: Puntarenas, cubierta portuaria y pilares instanciados, commit `ed6d30deb90e7c192f82cea3e6f27bc47ad09cb7`, PR #39; siguiente Ruta 1 Guanacaste.
- [x] Escritura GitHub; [ ] parser JS; [ ] capturas reales de conducción/exterior y solapamientos; [ ] WebGL/FPS móvil/PC; [ ] física/multijugador; [ ] conflictos de integración PR #45. **Sin merge ni Netlify**.
