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
