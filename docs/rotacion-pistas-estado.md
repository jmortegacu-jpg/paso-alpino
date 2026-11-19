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
