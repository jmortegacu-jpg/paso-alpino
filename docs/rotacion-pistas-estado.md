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
