# Referencias verificadas y plan de trazados — Paso Alpino (15-11-2026)

**Estado:** investigación y prototipo en rama; NO desplegar en Netlify ni fusionar sin pruebas. No se dispone de levantamiento topográfico ni polilíneas georreferenciadas. Los circuitos siguen siendo recreaciones inspiradas en carreteras reales, no calcos métricos.

## Ruta 27 San José–Caldera — prioridad 1

Fuentes primarias:
- Consejo Nacional de Concesiones, corredor y longitudes: https://cnc.go.cr/proyectos/en-marcha/corredor-vial-san-jose-caldera-ruta-27
- Concesionaria, descripción técnica por sectores: https://globalviaruta27.com/informacion-del-proyecto/
- BID, mapa esquemático y peajes: https://publications.iadb.org/publications/spanish/document/Casos_de_estudio_en_asociaciones_p%C3%BAblico-privadas_en_Am%C3%A9rica_Latina_y_el_Caribe_Carretera_San_Jos%C3%A9_-_Caldera_Costa_Rica_es_es.pdf
- TEC, esquema de puentes e intercambios: https://repositoriotec.tec.ac.cr/server/api/core/bitstreams/f7d962aa-efbd-43ef-a5ae-d002fb19b731/content

### Sectores verificables
1. San José–Ciudad Colón: 14,2 km, sector urbano, varios carriles y enlaces con Circunvalación, Escazú, Guachipelín, Santa Ana, Ciudad Colón. Incorporar edificios, pasos superiores, peaje Escazú y puentes peatonales.
2. Ciudad Colón–Orotina: 38,8 km, relieve variable, intercambios, taludes, cortes de montaña, ríos, puentes y peajes. Referencias: La Guácima, Siquiares, Turrúcares, Atenas, Balsa, Escobal, Orotina.
3. Orotina–Caldera: 23,8 km, paisaje rural, accesos, puente del río Jesús María, transición hacia el Pacífico.

**Prototipo ya aplicado en esta rama:** nuevos puntos de control del circuito `lago` (identidad Ruta 27), con elevaciones suavizadas de 10 a 82 unidades de juego y más curvas; conserva circuito cerrado y mismo ID para no romper selección y multijugador. NO representa la altimetría ni el trazado real; requiere comprobar pendientes, suelo, colisiones y FPS.

**Próximos cambios seguros:** transiciones urbanas/rurales por sectores, variantes de pórticos de peaje, rampas de intercambio decorativas sin conexión a calzada hasta diseñar física y rutas alternativas; reconstrucción de viaductos con apoyos en barrancos sin atravesar pista. No usar ubicaciones o alturas inventadas como datos reales.

## Otras pistas: criterios de investigación y diseño

- **Ruta 1 Interamericana Norte hacia Liberia:** distinguir tramo urbano del Valle Central, corredor de Puntarenas y paisaje de Guanacaste con bosque tropical seco, potreros, ganado, cercas, llanuras y pasos sobre ríos. Verificar ubicaciones concretas antes de rotular pueblos o puentes.
- **Ruta 2 Interamericana Sur / Cerro de la Muerte:** ascenso a la cordillera de Talamanca, bosque nuboso, páramo de altura, curvas y neblina; vegetación y fauna dependientes de la altitud. No situar tucanes en el páramo.
- **Ruta 32 Zurquí / Braulio Carrillo:** bosque húmedo, cortes de montaña, túnel, ríos y zonas de alta precipitación; conservar señalización de seguridad.
- **Ruta 34 Costanera:** litoral Pacífico, ríos, manglares y zonas urbanas costeras según segmento; no representar toda la ruta como playa continua.
- **Paseo de los Turistas Puntarenas:** calle costera urbana, paseo peatonal, faro y muelle; diferenciar playa, comercios y espacios públicos.

## Reglas para cada PR
1. Adjuntar enlace a mapa/foto oficial o verificable, fecha y tramo.
2. Diferenciar infraestructura existente de obras proyectadas; no presentar proyectos futuros como construidos.
3. Mantener puntos de control suavizados y continuidad del circuito; verificar pendientes máximas y ausencia de carretera distorsionada.
4. No añadir colisiones a la calzada ni bloquear carriles en modo carrera sin diseñar una ruta alternativa funcional.
5. Calidad adaptable: instancing, LOD, materiales PBR y pruebas móviles.
6. Publicar solo con autorización posterior: PR borrador, commits `[skip netlify]`, sin merge.
