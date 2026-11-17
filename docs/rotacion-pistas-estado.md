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
