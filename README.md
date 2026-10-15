# Paso Alpino

Juego de carreras 3D de montaña de **OrtegaCorp**. Se juega en el navegador de cualquier celular o computadora, solo contra la computadora o en línea con hasta 6 amigos.

## Qué hay en este sitio

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El juego completo |
| `panel.html` | Panel en vivo: personas conectadas, visitas de hoy y totales (abrir en `/panel`) |
| `netlify/functions/visitas.mjs` | Contador de visitas (función de Netlify, guarda los datos en Netlify Blobs) |
| `netlify/functions/ranking.mjs` | Ranking mundial por pista y cantidad de vueltas |
| `manifest.webmanifest`, `icon-*.png` | Para instalar el juego como app en el celular |
| `og.png` | Imagen de vista previa al compartir el enlace (WhatsApp, Facebook) |
| `version.json` | Versión publicada; el juego la revisa cada minuto y ofrece «Actualizar» cuando cambia |
| `netlify.toml` | Configuración del sitio |
| `herramientas/preparar.py` | Copia una versión nueva del juego al sitio |

## Cómo se actualiza

Cada cambio que se sube a este repositorio lo publica Netlify automáticamente en menos de un minuto.
Quien tenga el juego abierto ve el aviso «Hay una mejora nueva del juego» y lo actualiza con un toque (nunca en medio de una carrera).

## Privacidad

El contador no guarda nombres ni datos personales: cada navegador recibe un identificador al azar.
