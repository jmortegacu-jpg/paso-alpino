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
