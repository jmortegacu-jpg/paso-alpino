# [skip netlify] Paseo de los Turistas: muelle y mobiliario (20-11-2026)

## Fuentes de referencia
- ICT, atractivos de Puntarenas: https://es.visitcostarica.com/where-to-go/puntarenas/tourist-atractions-in-puntarenas — describe el Paseo de los Turistas junto a la playa, muelle de cruceros, quioscos, parques y servicios.
- ICT, paseos históricos de Puntarenas: https://es.visitcostarica.com/things-to-do/culture/historical-walks/puntarenas — antecedentes del muelle y edificios históricos.
- ICT, Hotel Tioga: https://es.visitcostarica.com/planning-your-trip/hotels/tioga-hotel — confirma alojamiento frente al mar sobre el Paseo de los Turistas.
- SINAC, Braulio Carrillo: https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx — montañas, cañones, ríos y bosques densos para futuras iteraciones de Zurquí.
- ICT, Rancho La Merced: https://es.visitcostarica.com/planning-your-trip/other-activities/rancho-la-merced — manglares del río Morete y bosque húmedo para un sector localizado de Costanera Sur.

## Implementación
- Muelle estilizado de geometría original, con cubierta, pilotes y barandas; ubicado fuera de la calzada y orientado hacia el lado del agua.
- Bancas ligeras sobre el paseo. Densidad adaptable: 12 en alta/cine, 5 en media/baja; muelle de 56 o 42 unidades de juego según calidad.
- Materiales MeshStandardMaterial (PBR básico), sin texturas externas ni activos con licencias ajenas.
- Ningún cambio a spline, físicas, colisiones, selección de pista ni multijugador.
- No se afirma que las medidas ni coordenadas del muelle correspondan a la estructura real; circuito artístico.

## Validación pendiente
- Revisar en WebGL el nivel del muelle respecto al agua y terreno, y confirmar orientación a lo largo del circuito.
- Medir FPS y uso de memoria en teléfono de gama media y escritorio.
- Validar compatibilidad de sombras, reflejos y calidad visual antes de fusionar.
- No introducir HDR/niebla volumétrica real sin medición y fallback móvil.
