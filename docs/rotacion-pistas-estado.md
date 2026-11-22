# Seguimiento de rotación de pistas — Paso Alpino

Última ejecución registrada: 2026-11-19 15:00 (Costa Rica)
Pista trabajada: 3/6 — Ruta 32 Zurquí (theme.cr: `zurqui`)
Siguiente pista: 4/6 — Paseo de los Turistas Puntarenas (theme.cr: `puntarenas`)
Rotación: Ruta 2 Cerro de la Muerte → Ruta 27 → Ruta 32 Zurquí → Puntarenas → Ruta 1 Guanacaste → Ruta 34 Costanera Sur → repetir.

## Registro 2026-11-19 15:00 — Zurquí
- ID: `zurqui`; siguiente `puntarenas`. Se comprobó el registro previo de Zurquí del 18 de noviembre y se eligió un elemento distinto de portales y luminarias.
- Rama existente: `graphics/zurqui-damp-concrete-20261115`; PR borrador asociado anteriormente: #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 (estado actual de fusión no comprobado).
- Cambio real: dos `THREE.InstancedMesh` para postes y reflectores en el acceso al túnel, 28/18/10 instancias según calidad. Geometría y materiales compartidos; esfera de visibilidad calculada; sin sombras ni colisiones; separación lateral escenográfica de 20 unidades del eje.
- Código: `graphics/costa-rica-tracks.js`; commit `9f9c07a6181bbbb719e84c6d7941e7874207a859`. No se tocaron físicas, vehículos, carretera ni multijugador.
- Fuentes: MOPT (10-04-2026), https://www.mopt.go.cr/noticias/2026/demarcacion-de-rn-32-iniciara-proximo-lunes-13-de-abril (captaluces, demarcación y postes abatibles); MOPT (05-06-2025), https://www.mopt.go.cr/node/1031 (referencia visual y contexto del túnel). Elementos recreados sin copiar imágenes ni modelos.
- Verificación: GitHub confirmó escritura del commit; no se ejecutaron pruebas automáticas Node, WebGL, FPS, físicas, multijugador ni revisión visual desde conducción. Revisar orientación de reflectores y separación efectiva respecto a la calzada.
- Bloqueos: integración con otros PR de Zurquí y validación gráfica/rendimiento pendientes. Sin merge ni despliegue.

## Registro 2026-11-18 21:00 — Zurquí
- Pista: Ruta 32, ID `zurqui`; siguiente: Puntarenas, ID `puntarenas`.
- Rama: `graphics/zurqui-damp-concrete-20261115`; código: `graphics/costa-rica-tracks.js`.
- Cambios: sustituye 24 mallas individuales de los dos portales del túnel por un `THREE.InstancedMesh` con matrices transformadas al espacio mundial, esfera de visibilidad calculada y sin sombras. Se conserva la carretera y no se modifican físicas, vehículos ni multijugador.
- Commits: `7a1a1cdce49ae7a6afd53a50c3774ca00d3b3f8e`, `3038b5cb471b6e4a3ea4522cd788b9069b5eef6e`.
- Fuentes: SINAC https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; LanammeUCR (evaluación del túnel Zurquí) https://www.lanamme.ucr.ac.cr/ . Referencias de contexto; no se copiaron recursos protegidos.
- PR: borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42, rama de esta ejecución; GitHub devolvió mergeable=false. Los PR #17, #35 y #41 también afectan Zurquí; requieren conciliación.
- Pruebas: lectura del archivo y confirmación de dos commits GitHub. No se ejecutaron Node, pruebas visuales WebGL, FPS, físicas ni multijugador. Verificar alineación y aspecto de portales desde conducción.
- Bloqueo: PR #42 no fusionable al crear; faltan conciliación y pruebas críticas. Sin merge ni despliegue.

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

## Revisión incremental — 2026-11-20 06:03 Costa Rica
- Pista **3/6 Ruta 32 Zurquí**, ID `zurqui`; siguiente **4/6 Paseo de los Turistas Puntarenas**. Se consultaron PR #42 y #45 y los registros previos; no se repitieron luminarias ni delineadores.
- Código Ruta 32: material PBR de bóveda de hormigón con rugosidad .81 y clearcoat .09; nervaduras visuales de túnel en `THREE.InstancedMesh`, 9 piezas por sección, cada 10/18 nodos según calidad. Commit `8dbf5583dfc72667651439a8a0a13bfb53d93ac9`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 .
- **Vehículos:** modelo existente `aurora` / Aurora V12, archivo `graphics/future-chassis.js`; proyectores LED internos en ambos faros, esfera de detalle adaptable (16x10 alta / 10x6 baja), geometría exclusivamente decorativa, sin modificar ejes, ruedas, colisiones, físicas o controles. Commit `fca9d66b2602e1da3cf4a724c89286922653e3b7`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Fuentes contextuales ya registradas: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; evaluación técnica del túnel LanammeUCR https://www.lanamme.ucr.ac.cr/ . Modelos originales, no se copiaron fotografías.
- Verificado: GitHub confirmó ambos commits. Pendientes: ejecutar parser JavaScript, renderizar WebGL y comprobar colocación de nervaduras y proyectores desde cámaras de conductor/exterior, FPS móvil/PC, físicas y multijugador. No se atribuyen resultados no medidos.
- Compatibilidad consultada antes de cambios: PR #42 **no fusionable**, PR #45 **fusionable** con main; no se ha comprobado compatibilidad conjunta ni con PR #17/#35/#41. No fusionar.
- Checklist Ruta 32: [x] nervaduras instanciadas y material de túnel; [ ] verificar escala/cámara y FPS; [ ] integrar PR concurrentes.
- Checklist vehículos: [x] proyectores 3D Aurora V12; [ ] verificar faros y visibilidad; [ ] probar otros vehículos, físicas y FPS.
- Global: [ ] seis pistas verificadas e integradas; [ ] vehículos verificados; [ ] PR compatibles; [ ] WebGL/FPS/físicas/multijugador; [ ] bloqueos resueltos. **No listo para Netlify; sin publicación.**

## Revisión incremental — 2026-11-20 23:55 Costa Rica
- Pista trabajada: **3/6 Ruta 32 Zurquí**, ID `zurqui`; siguiente **4/6 Paseo de los Turistas Puntarenas**. Revisados historial anterior y PR #42; no se duplicaron nervaduras ni luminarias.
- Mejora visual real: bandas reflectantes bajas a ambos lados del túnel, 2 por estación, cada 14 nodos en alta o 25 en reducida, con un `THREE.InstancedMesh`, material PBR de emisión tenue y sin luces dinámicas. Objetivo: sensación de profundidad y velocidad desde cámara conductor. Commit `c9bf5080e258c03c4c738cc36cff004843183588`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 .
- **Vehículos:** Aurora V12, ID `aurora` en `graphics/future-chassis.js`; dos extractores de capó originales de geometría curva con borde satinado y detalle adaptable. Commit `25eec5a7a45e307e3ac9ac75dd08bef79b034a4c`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 .
- Fuentes de contexto existentes: SINAC Parque Nacional Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx ; LanammeUCR https://www.lanamme.ucr.ac.cr/ . Geometría original, ubicación ilustrativa; no fotografías copiadas.
- Verificado: GitHub aceptó ambos commits. Pendientes: parser JavaScript ejecutado, render WebGL, escala y orientación desde conductor, FPS móvil/PC, físicas, multijugador.
- Compatibilidad: PR #42 y #45 estaban **no fusionables** con main al consultar antes del cambio; conflictos con otros PR del mismo módulo sin resolver. No merge ni Netlify.
- Checklist Ruta 32: [x] nervaduras, bóveda PBR, bandas reflectantes; [ ] validar renderizado/posición; [ ] FPS y compatibilidad PR.
- Checklist global: [ ] seis pistas integradas y verificadas; [ ] vehículos visualmente validados; [ ] pruebas WebGL/FPS/físicas/red; [ ] PR compatibles y bloqueos resueltos; [ ] autorización de publicación. **No listo para Netlify.**

## Revisión 2026-11-21 18:00 Costa Rica — Ruta 32 Zurquí
- Pista 3/6: ID `zurqui`; siguiente 4/6 Puntarenas (`puntarenas`). Historial consultado: las bandas, luminarias, nervaduras y portales ya existían; esta revisión añade un elemento diferente.
- Código: paneles cálidos de techo instanciados con densidad adaptable (paso 22/38 nodos), material PBR con emisión suave, sin luces dinámicas, físicas ni colisiones. Commit `a731136b875bfd393495e83c83b8be1db2332682`; PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42.
- Vehículos: Aurora V12 ID `aurora`, tercera luz de freno curvada bajo luneta trasera, material de freno animado compartido; commit `d96598ff567bd34689e2736e754761ebeb0953c1`, PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45.
- Fuentes contextuales: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx y MOPT Ruta 32 https://www.mopt.go.cr/node/1031 . Los paneles son diseño escenográfico original, no réplica exacta.
- Pruebas: GitHub confirmó escrituras. No ejecutadas sintaxis JS, WebGL, FPS, física, multijugador ni capturas; pendiente verificar altura real del techo y oclusión de luz trasera. PR #42/#45 concurrentes con otros cambios en los mismos módulos: compatibilidad sin demostrar.
- Checklist Ruta 32: [x] paneles de techo instanciados; [ ] cámara y WebGL; [ ] FPS móvil/PC; [ ] integrar PR. Vehículos: [x] luz trasera visual; [ ] cámaras, física, FPS y compatibilidad.
- Global: [ ] seis pistas integradas y probadas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas y bloqueos resueltos. Sin fusión ni Netlify.

## 2026-11-22 11:57 Costa Rica — Ruta 32 Zurquí (3/6)
- Pista única: ID `zurqui`, PR borrador #42 https://github.com/jmortegacu-jpg/paso-alpino/pull/42 . Siguiente: **4/6 Paseo de los Turistas Puntarenas**.
- Código: cuatro tableros verticales de advertencia ámbar con doce franjas negras, geometría 3D original instanciada en las dos bocas del túnel, para reconocer los accesos desde la cámara de conducción. Dos draw calls, sin luces dinámicas, colisiones, ni alteración de carretera. Commit `bacb26208ef18527edb9c2309399cead6d34a476` [skip netlify].
- Referencias de contexto: SINAC Braulio Carrillo https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx y MOPT https://www.mopt.go.cr/node/1031 . Posiciones ilustrativas; no es una réplica georreferenciada. No se copiaron fotografías.
### Vehículos
- Modelo original Aurora V12, ID `aurora` en `graphics/future-chassis.js`: parrilla frontal oscura con tres barras satinadas PBR, visible en cámara exterior, sin cambios a ruedas, shell, ejes, físicas, controles o red. Commit `7fec6214077125932ac29e1904de01a5759d55e3`; PR borrador #45 https://github.com/jmortegacu-jpg/paso-alpino/pull/45 [skip netlify].
- PR #42 y #45: borradores **no fusionables** al consultar antes de los cambios. No se ha probado compatibilidad cruzada.
- Verificado: escrituras GitHub confirmadas. [x] geometría instanciada de acceso; [x] parrilla visual; [ ] parseo JS ejecutado; [ ] capturas reales desde conducción y exterior; [ ] WebGL/FPS móvil/PC; [ ] física y multijugador; [ ] integración y resolución de conflictos.
- Estado global: [ ] seis pistas integradas; [ ] vehículos validados; [ ] PR compatibles; [ ] pruebas críticas completas; [ ] bloqueos resueltos. **No listo para lanzamiento. No fusionar ni desplegar Netlify.**
