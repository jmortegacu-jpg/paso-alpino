# Referencias de paisajes — revisión 2026-11-15

## Paseo de los Turistas, Puntarenas
Fuente ICT: https://es.visitcostarica.com/where-to-go/puntarenas/tourist-atractions-in-puntarenas
El ICT documenta playa principal, muelle de cruceros, quioscos, artesanías, Churchill, áreas recreativas, parques, duchas y baños. También confirma un hotel frente al mar: https://es.visitcostarica.com/planning-your-trip/hotels/tioga-hotel
**Implementado en esta rama:** bloques hoteleros genéricos con ventanas PBR y bancas de paseo; geometría original, no réplica de edificios específicos. Conservar muelle/faro como propuestas separadas, validar ubicación antes de afirmar fidelidad cartográfica.

## Zurquí / Braulio Carrillo
Fuente SINAC: https://www.sinac.go.cr/ES/ac/accvc/pnbc/Paginas/default.aspx/
SINAC describe montañas boscosas, cañones, ríos y quebradas, bosque siempreverde y especies documentadas. La niebla y cascadas son pertinentes como efectos ambientales, pero no se debe inventar una cascada real en una coordenada determinada. Propuesta: mejorar densidad del dosel y sombreado con LOD, lluvia opcional y profundidad atmosférica.

## Costanera Sur / Ruta 34
Fuente SINAC: https://www.sinac.go.cr/ES/ac/acosa/pnmb/Paginas/default.aspx
SINAC confirma el acceso a Marino Ballena por Ruta 34, manglares, aves costeras y fauna marina. No ubicar ballenas o delfines sobre la calzada. Propuesta: separar zonas urbanas, vegetación, playas y manglar según segmento elegido.

## Próximas validaciones
- Referencias fotográficas: utilizar los sitios oficiales como referencia de composición, no descargar ni incorporar fotografías sin licencia.
- Mantener carriles, físicas y rutas multijugador sin cambios.
- Comprobar WebGL en navegador real, conteo de draw calls, FPS móvil y calidad de sombras antes de fusionar.
- Objetivo 4K adaptable solo en hardware compatible; no afirmar 4K nativo universal.
- Las mejoras son evocaciones artísticas; falta georreferenciación exacta.
