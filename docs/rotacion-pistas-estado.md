# Seguimiento de rotación Paso Alpino

Fecha local: 2026-11-16 18:03, Costa Rica.

## Turno actual
- Pista: 4/6, Paseo de los Turistas de Puntarenas (`theme.cr = 'puntarenas'`).
- Turno anterior reportado: Ruta 32 Zurquí, PR #35.
- Siguiente pista: 5/6, Ruta 1 Interamericana Norte Guanacaste.
- Rama: `automation/puntarenas-muelle-20261116`.
- Commit de código: `fe84418f4c229304400b3b301ed595fad5afab6e`.
- Cambio: muelle escenográfico 3D con plataforma, barandales y pilotes instanciados; situado fuera de la calzada. No cambia físicas ni vehículos.
- Referencias a contrastar: ICT, Municipalidad de Puntarenas, cartografía pública de OSM (consultar licencias). La ubicación del muelle es artística, NO georreferenciada.
- Pruebas: lectura del código y confirmación de escritura GitHub; **pendientes** sintaxis ejecutada, WebGL, FPS móvil/PC, física, multijugador y visualización desde la cabina.
- Integración: PR #36 contiene cambios independientes en el mismo archivo; **riesgo de conflicto**. No fusionar sin conciliación.

## Lista de preparación para lanzamiento
- [ ] Ruta 2 Cerro de la Muerte: integrar y validar PR #33
- [ ] Ruta 27: integrar y validar PR #34
- [ ] Ruta 32 Zurquí: integrar y validar PR #35
- [ ] Paseo de los Turistas: conciliar PR #36 y nuevo PR del muelle, validar
- [ ] Ruta 1: integrar y validar PR #37
- [ ] Ruta 34: integrar y validar PR #38
- [ ] Integridad visual de vehículos y compatibilidad de ramas
- [ ] Pruebas de sintaxis, WebGL, FPS, física y multijugador
- [ ] Aprobación explícita del usuario antes de fusionar y publicar en Netlify

**Estado global: NO LISTO PARA PUBLICACIÓN.** Los PR pueden contener cambios solapados; ninguna prueba de rendimiento en dispositivo real fue verificada en este turno.

## Turno 2026-11-17 12:01 (Costa Rica) — Puntarenas
- Pista: 4/6, `theme.cr='puntarenas'`. Siguiente: 5/6 Ruta 1 Interamericana Norte.
- PR borrador reutilizado: #39; rama `automation/puntarenas-muelle-20261116`.
- Commit: `cb1561527a5b26398a15c6e3728a6bff06b8085f`.
- Cambio: dos `InstancedMesh` de alas de aves marinas estilizadas (12 alta, 5 baja), fuera de la calzada y sin sombras. Se recalculan límites de visibilidad. No se importan recursos ajenos.
- Fuente de referencia geográfica: paisaje costero del Paseo de los Turistas y terminal marítima INCOP (https://incop.go.cr/terminal-de-cruceros/); fauna decorativa plausible, no ubicación ni especie científicamente verificada.
- Verificación: lectura de archivo y escritura de commit GitHub; PR #39 sigue borrador y GitHub lo informa fusionable con main al consultar metadata. PR #36 también modifica el módulo, compatibilidad mutua no demostrada.
- Pendientes: sintaxis con runtime, inspección visual de orientación de alas, WebGL, FPS móvil/PC, físicas, multijugador, integración entre PR y revisión de vehículos.
- Lanzamiento: NO LISTO. Sin merge, sin Netlify.
