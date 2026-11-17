# Seguimiento de rotación de pistas — Paso Alpino

Última ejecución registrada: 2026-11-17 09:00 (Costa Rica)
Pista trabajada: 3/6 — Ruta 32 Zurquí (theme.cr: `zurqui`)
Siguiente pista: 4/6 — Paseo de los Turistas Puntarenas (theme.cr: `puntarenas`)
Rotación: Ruta 2 Cerro de la Muerte → Ruta 27 → Ruta 32 Zurquí → Puntarenas → Ruta 1 Guanacaste → Ruta 34 Costanera Sur → repetir.

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
