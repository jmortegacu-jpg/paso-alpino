# Paso Alpino — rotación de pistas y preparación para Netlify

Última revisión: 2026-11-15, turno Ruta 32 Zurquí (3/6).
Siguiente pista: **Paseo de los Turistas, Puntarenas (4/6)**.
Fuente de continuidad: PR #33 Ruta 2, PR #34 Ruta 27, y este PR Ruta 32. Los PR anteriores siguen sin integrar; no confundir sus archivos de seguimiento con el estado de main.

| Turno | Pista / identificador interno | Avance verificable | Estado |
|---|---|---|---|
| 1 | Cerro de la Muerte / `ruta2` | PR #33: parque eólico Coopesantos y señales | Borrador; pruebas visuales pendientes |
| 2 | San José–Caldera / `ruta27` | PR #34: pórticos y señalización | Borrador; pruebas pendientes |
| 3 | Zurquí / `zurqui` | Este PR: reflectores instanciados en túnel y señal de salida | Sintaxis validada; WebGL/FPS pendientes |
| 4 | Puntarenas / `puntarenas` | Próximo turno; considerar compatibilidad PR #22 muelle | Pendiente |
| 5 | Interamericana Norte / `ruta1` | Revisar paisaje Guanacaste | Pendiente |
| 6 | Costanera Sur / `costanera` | Revisar costas y embarcaciones; PR #18 | Pendiente |

## Fuentes para Zurquí
- SINAC Parque Nacional Braulio Carrillo: https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/
- MOPT, 5 junio 2025, proyecto de iluminación y conectividad Ruta 32: https://www.mopt.go.cr/node/1031
- CNC, proyecto de mejora de Ruta 32 (obras proyectadas, NO representarlas como existentes): https://cnc.go.cr/proyectos/gestion-de-iniciativas/rn-32

## Cambios verificables de este turno
- Archivo `graphics/costa-rica-tracks.js`: reflectores de pared en el túnel, `InstancedMesh`, sin luces dinámicas, colisiones ni texturas externas.
- Rótulo adicional de salida del túnel.
- Sintaxis: PASS, parseo JS con `new Function` retirando `export`; lectura posterior confirma código.
- **No ejecutadas:** navegador WebGL, captura desde conductor, FPS móvil/PC, físicas y multijugador. La ausencia de cambios en esos sistemas NO equivale a pruebas aprobadas.
- Posiciones artísticas, no georreferenciadas. No se importan fotografías ni materiales protegidos.

## Checklist de publicación
- [ ] Integración y resolución de conflictos entre PR #22, #25, #31, #32, #33, #34 y los nuevos
- [ ] Seis pistas verificadas desde cámara del conductor con referencias reales
- [ ] Vehículos, luces, ruedas y carrocerías comprobados
- [ ] Sintaxis, WebGL, FPS móvil/PC y memoria
- [ ] Conducción, colisiones y continuidad de carretera
- [ ] Multijugador y entrada a salas desde dos dispositivos
- [ ] Autorización expresa de publicación en Netlify

**No listo para Netlify.** No fusionar ni desplegar automáticamente.

## Segunda vuelta — 2026-11-16, Ruta 32 Zurquí (turno 9)
- **Pista trabajada:** Ruta 32 / identificador `zurqui`. **Siguiente:** Paseo de los Turistas / `puntarenas`.
- **Cambio:** las luminarias del techo del túnel que antes eran meshes separados ahora comparten una sola geometría y un `THREE.InstancedMesh`, con cantidad adaptada a calidad alta/cine o baja/media. Se conservan posiciones, orientación y dimensiones; no hay nuevas luces dinámicas, colisiones ni alteraciones de carretera, vehículos, física o red.
- **Commit:** `b37a4eadbc70532d30c46c335f5704e251ae9a16`; PR #35: https://github.com/jmortegacu-jpg/paso-alpino/pull/35 . Cambio sobre rama borrador, sin fusionar.
- **Fuentes geográficas:** SINAC https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/ ; MOPT https://www.mopt.go.cr/node/1031 . No se importaron fotografías ni se afirmó georreferenciación.
- **Verificación:** escritura confirmada en GitHub; pendiente parser automatizado, WebGL, capturas desde conductor, FPS y memoria móvil/PC, pruebas de conducción y multijugador. La reducción de llamadas de dibujo es estructural, no un FPS medido.
- **Riesgo de integración:** revisar conflictos de `graphics/costa-rica-tracks.js` con PR #17, #25, #33, #34, #36–38; el archivo de seguimiento está duplicado en varias ramas y requiere consolidación antes de fusionar.
- **Publicación:** NO listo para Netlify; no fusionar ni desplegar sin autorización expresa.
