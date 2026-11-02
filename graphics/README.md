# OrtegaCorp Next-Gen · Gráficos 3D de Paso Alpino

## Alcance actual
El motor de gráficos utiliza **Seven original car bodies** generados en JavaScript/Three.js, no imágenes ni modelos descargados de fabricantes:
- Aurora V12: grand tourer tecnológico de silueta baja
- Cometa: hiperdeportivo de circuito, doble ala
- Quetzal GT: GT de lujo, iluminación ovalada
- Volcán: gran deportivo japonés futurista, luces traseras circulares
- Relámpago: deportivo eléctrico con luces matriciales
- Colibrí: coupé ligero
- Danta: SUV deportivo de montaña

El módulo **`future-chassis.js`** implementa la estructura de carrocería por secciones longitudinales, guardabarros ajustados al tamaño de neumáticos, cristales, asientos, tablero, toma de aire, paneles aerodinámicos, faros y llantas con detalle anclado a la rueda giratoria. A diferencia de imágenes estáticas, estos vehículos son objetos WebGL que se mueven con los coches reales del juego.

## Integración
- `index.html` importa `buildFutureChassis` y `syncFuturePaint`.
- `setPlayerCar()` construye el vehículo nuevo y conserva pivotes, física, cámara y volante.
- `setCarModel()` lo utiliza también para rivales, con menos detalle.
- `applyPaint()` sincroniza la pintura personalizada.
- La animación existente del freno activa los nuevos pilotos traseros.
- El antiguo `future-vehicles.js` se mantiene como referencia histórica, pero ya no se importa.
- La carrocería GLB de demostración externa se desactivó. Los modelos originales son la fuente visual.

## Rendimiento
- Mayor nivel de malla para calidad Alta y Cine 4K.
- Menor nivel de malla y menos radios para rivales y teléfonos.
- La escena general mantiene el sistema de sombras, carretera y ajustes de calidad original.

## Pruebas y pendientes
Se comprobó:
- Sintaxis JavaScript de los módulos y del script principal.
- Instanciación simulada de siete tipos en calidad alta y reducida.
- Ausencia de vértices no finitos en las superficies construidas.
- Integridad de cuatro pivotes de rueda por coche.
- Enlace al material de luz trasera y respeto a malla original oculta.
- Compilación y despliegue exitosos en Netlify.

**Falta:** inspección visual con WebGL real en Chrome y Android, revisión de geometría/cara de dirección, solapamientos, cámara interior, rendimiento de GPU y validación física perceptual de ruedas. No fusionar esta rama con `main` hasta probar la vista previa.

## Arte y derechos
Los nuevos diseños son conceptos originales de OrtegaCorp desarrollados con proporciones de alto rendimiento, sin logotipos ni geometrías copiadas de automóviles comerciales. Los referentes de Ferrari, Porsche, Lamborghini, Lexus, Toyota Supra, Nissan Skyline y Land Rover son únicamente inspiración general de categorías de carrocería.

El objetivo final de calidad hiperrealista aún requiere nuevas iteraciones artísticas, optimización y pruebas de juego reales.
