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
