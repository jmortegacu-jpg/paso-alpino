# Seguimiento de rotación de pistas — Paso Alpino

Última ejecución registrada: 2026-11-18 03:00 (Costa Rica)
Pista trabajada: 3/6 — Ruta 32 Zurquí (theme.cr: `zurqui`)
Siguiente pista: 4/6 — Paseo de los Turistas Puntarenas (theme.cr: `puntarenas`)
Rotación: Ruta 2 Cerro de la Muerte → Ruta 27 → Ruta 32 Zurquí → Puntarenas → Ruta 1 Guanacaste → Ruta 34 Costanera Sur → repetir.

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
