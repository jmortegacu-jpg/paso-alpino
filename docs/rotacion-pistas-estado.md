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
