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
