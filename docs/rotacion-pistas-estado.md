# Seguimiento de rotación Paso Alpino

Última ejecución: 2026-11-19 18:00 (Costa Rica). Pista 4/6 Puntarenas; siguiente 5/6 Ruta 1 Guanacaste.

## Registro 2026-11-19 18:00 — Puntarenas (turno 4/6)
- Pista: Paseo de los Turistas, ID `puntarenas`; siguiente: Ruta 1 Guanacaste, ID `ruta1` (verificar ID de circuito al integrar PR #25).
- Historial contrastado: registro previo Puntarenas 19-11 (bitas); se eligió otra mejora, sin duplicar las bitas.
- Rama: `automation/puntarenas-muelle-20261116`; PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39 .
- Cambio en `graphics/costa-rica-tracks.js`: dos barandales del muelle ahora comparten un `THREE.InstancedMesh` con geometría y material únicos, matrices actualizadas, bounding sphere calculada y sombras desactivadas; mismas dimensiones y posiciones. Commit `e7a074decaed0dbe0531b68b5a3db2025f4fee90`.
- Fuente de contexto: INCOP https://incop.go.cr/terminal-de-cruceros/ ; muelle y detalles escenográficos originales, sin copiar recursos protegidos.
- Verificación: escritura GitHub confirmada; lectura posterior y prueba de sintaxis por ejecutar. No se ejecutaron pruebas WebGL, FPS, físicas, multijugador ni cámara de conducción. Menos objetos gráficos no equivale a FPS medidos.
- Integración: PR #36 y #39 modifican el mismo módulo; compatibilidad no demostrada. No merge, no Netlify.


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

## Turno 2026-11-18 06:03 (Costa Rica) — Puntarenas
- Pista: 4/6, Paseo de los Turistas (`theme.cr='puntarenas'`). Siguiente: 5/6 Ruta 1 Interamericana Norte.
- PR existente: #39, rama `automation/puntarenas-muelle-20261116` (evita PR duplicado).
- Commit de código: `a5be34c1bcb959d1533bc1d14644ed22ee964a22`.
- Mejora: actualización explícita de matrices de instancias y bounding spheres de pilotes del muelle y muro costero; sombras desactivadas en ambos. No cambia trazado, colisiones, vehículos ni multijugador.
- Referencias geográficas: INCOP https://incop.go.cr/terminal-de-cruceros/ ; ICT https://www.visitcostarica.com/ . Geometría artística y no cartográfica; no se reutilizaron fotografías.
- Verificación: escritura confirmada por GitHub. Pendiente ejecutar parser JavaScript, render WebGL, FPS móvil/PC, cámara del conductor, físicas y multijugador.
- Integración: PR #36 modifica el mismo módulo; compatibilidad conjunta no demostrada. NO FUSIONAR, NO NETLIFY.
- Checklist global: las seis pistas y vehículos aún requieren integración y pruebas críticas; NO LISTO PARA PUBLICACIÓN.

## Turno 2026-11-19 00:03 (Costa Rica) — Puntarenas
- Pista trabajada: 4/6 Paseo de los Turistas, ID `puntarenas`. Siguiente: 5/6 Ruta 1 Interamericana Norte Guanacaste.
- Rama reutilizada: `automation/puntarenas-muelle-20261116`, PR borrador #39. Se consultó su estado: abierto, borrador y fusionable con `main` en la consulta; **no** se verificó compatibilidad con PR #36.
- Commit de código: `b5680e3f72485f374f337ce9c6b74a391d98c919`.
- Mejora incremental: cuatro bitas estilizadas de amarre en el muelle, dibujadas con un único `THREE.InstancedMesh` y material PBR compartido; matrices y esfera de visibilidad actualizadas, sombras desactivadas. Sin cambios en ruta, colisiones, vehículos ni red.
- Fuentes: INCOP, terminal de cruceros https://incop.go.cr/terminal-de-cruceros/ (documenta bitas); Memoria Institucional 2024 https://incop.go.cr/wp-content/uploads/2025/08/PLANI/MEMORIA%20INST%202024.pdf (documenta estructuras de atraque). Representación artística, sin replicar modelos ni fotografías.
- Verificado: contenido leído desde GitHub antes de la modificación y commit aceptado por API. **Sin verificar:** parser JavaScript ejecutado, WebGL, FPS móvil/PC, física, multijugador, visual desde cabina y compatibilidad entre PR.
- Checklist Puntarenas: [x] accesorio portuario instanciado; [ ] inspección visual y distancias a calzada; [ ] integración PR #36/#39; [ ] pruebas críticas.
- Estado global: seis pistas y vehículos **NO LISTOS**; PR cruzados y pruebas críticas siguen pendientes. Sin merge, sin despliegue ni créditos Netlify.

## Turno 2026-11-20 09:00 Costa Rica — Puntarenas + automóvil
- Pista única trabajada: **4/6 Paseo de los Turistas Puntarenas**, ID `puntarenas`. Próxima: **5/6 Ruta 1 Interamericana Norte Guanacaste**. Historial de esta rama revisado: no se repitieron barandales, pilotes, bitas ni aves.
- Cambio de pista: **4/6 balizas de muelle** según calidad, postes metálicos y ópticas color ámbar con cuatro mallas instanciadas en total (dos nuevas); sin luces dinámicas, sombras ni colisiones. Commit `fe977f3c20284d0c9fc439a13f4248a604c2a9f2`. PR borrador #39 https://github.com/jmortegacu-jpg/paso-alpino/pull/39.
- Fuente de contexto: INCOP, terminal de cruceros https://incop.go.cr/terminal-de-cruceros/ ; balizas y su posición son una interpretación artística, no una reconstrucción exacta ni un recurso protegido.
### Vehículos
- Modelo: **Aurora V12**, ID `aurora`, módulo `graphics/future-chassis.js`. Añadidas ópticas traseras tridimensionales, luz de reversa central y marcos para luces de freno; elementos decorativos adheridos a carrocería, sin tocar ruedas, ejes, colisiones, físicas, dirección o red.
- Commit vehículo `5ebd4022294a5aaade4ae5d9c3456b3448d7f38e`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45. Título y commits llevan `[skip netlify]`.
- Verificado: lecturas previas y commits aceptados por GitHub; #39 consultado fusionable con `main` antes de cambios; #45 consultado no fusionable. No se verificó compatibilidad mutua de PR #36/#39 ni de otras carrocerías.
- Pendientes: parser JS ejecutado, WebGL, capturas de cámara exterior/conducción, dimensiones y oclusión de balizas y ópticas, FPS móvil/PC, físicas y multijugador. **No atribuir mejoras de FPS ni apariencia comprobada sin renderizado.**
- Checklist Puntarenas: [x] balizas 3D instanciadas; [ ] inspección visual y pruebas de rendimiento; [ ] conciliación de PR. Vehículos: [x] detalle trasero Aurora V12; [ ] verificar ópticas y compatibilidad en navegador.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos completos; [ ] PR compatibles; [ ] WebGL/FPS/físicas/multijugador satisfactorios; [ ] bloqueos resueltos. **NO LISTO PARA NETLIFY**. No se fusionó ni publicó.
