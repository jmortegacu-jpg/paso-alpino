# Auditoría de integración de pistas costarricenses — 22 noviembre 2026

> **Solo propuesta de integración en GitHub. No publicar, no fusionar.** Referencias revisadas el 22-11-2026 (hora Costa Rica).

## Evidencia geográfica y límites de fidelidad

- **Ruta 32 / Zurquí:** SINAC confirma montañas de topografía abrupta, bosque siempreverde denso, cañones, ríos y quebradas en Braulio Carrillo. Fuente: https://www.sinac.go.cr/es/ac/accvc/pnbc/paginas/default.aspx . Apropiado: estratos de vegetación, bruma ligera, quebradas *fuera* de la calzada, portales de túnel solo donde el trazado ficticio ya los contemple. No afirmar que la geometría reproduce exactamente el túnel o un cauce georreferenciado.
- **Ruta 34 / Costanera Sur:** SINAC confirma el acceso al Parque Nacional Marino Ballena por Ruta 34, manglares en Estero Negro y alrededores, bosque tropical muy húmedo, costa y playas. Fuente: https://www.sinac.go.cr/ES/ac/acosa/pnmb/Paginas/default.aspx . Apropiado: manglares por sectores y siluetas litorales. No añadir ferris o muelles en tramos arbitrarios de la ruta.
- **Paseo de los Turistas / Puntarenas:** ICT documenta playa principal, muelle de cruceros, quioscos de artesanías y Churchill, zonas deportivas y parques. Fuente: https://es.visitcostarica.com/where-to-go/puntarenas/tourist-attractions-in-puntarenas . Apropiado: mobiliario, fachadas originales, cancha y muelle estilizados fuera de carretera. No afirmar que son reproducciones exactas de edificios.
- **Otras pistas:** Ruta 2, Ruta 27 y Ruta 1 requieren revisión específica de trazado, hitos y licencias antes de añadir geografía identificable.

## Auditoría de integración: riesgos concretos

1. Los PR #36, #39, #40, #41, #43, #44 y #46 modifican `graphics/costa-rica-tracks.js` sobre una base común. **No fusionar en lote:** comprobar cada bloque añadido, nombres de funciones y recursos GPU, y evitar duplicar muelles de #39/#44.
2. Los PR #17, #35, #41, #42 y #43 pueden superponer niebla, cascadas, túneles y quebradas en Zurquí. Confirmar en cámara de conducción y con minimapa si hay obstrucciones.
3. PR #31 altera el trazado de Ruta 27 y exige prueba de anchura, pendientes, curvas, conducción, colisiones y multijugador antes de aprobarse.
4. PR #10 sobre calidad de render debe comprobarse junto a efectos de agua, transparencias y sombras: objetivo 4K **solo en equipos capaces**, con resolución y densidad adaptables.
5. Los PR en borrador no equivalen a una versión validada. La marca `[skip netlify]` debe preceder los títulos de PR y mensajes de commits de trabajo.

## Protocolo de integración y pruebas (bloqueante antes de publicar)

- Crear rama de integración separada de `main`; seleccionar un solo diseño de muelle y conciliar cambios por escena, sin sustituir el archivo completo con la versión de un PR.
- Ejecutar comprobación sintáctica de módulos JavaScript, pruebas existentes del repositorio y detección de referencias indefinidas. Registrar comandos, salida y SHA.
- Abrir las seis pistas en WebGL en computadora y móvil; verificar render inicial, consola sin errores, orientación de señales, profundidad de agua, transparencias, z-fighting y colisiones.
- Conducir una vuelta por pista, comprobar ancho de carretera, puentes, túneles, controles, guardado y salas multijugador.
- Medir FPS, memoria y draw calls en perfiles bajo/medio/alto/cine, con capturas comparables; reducir instancias y sombras según perfil.
- Revisar derechos de cada fotografía, textura y mapa antes de importar; preferir geometría procedimental original o recursos con licencia explícita.
- **Puerta de publicación:** no fusionar ni desplegar mientras falten pruebas esenciales, existan conflictos, o no se pueda verificar el sitio y recuperar la versión anterior.

## Estado de este PR

Solo añade esta auditoría documental, sin alterar código, carreteras, mecánicas, físicas, rendimiento ni Netlify. Las pruebas WebGL y FPS **no se han ejecutado** en esta revisión. No hay afirmación de calidad 4K nativa universal.
