"""Copia el juego al sitio: index.html con un número de versión nuevo y version.json igual.
Uso: python3 herramientas/preparar.py ruta/al/paso-alpino.html
Cada publicación cambia la versión; el juego abierto en los celulares lo detecta y ofrece «Actualizar»."""
import sys, json, time, pathlib
src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
assert "__BUILD__" in src, "el juego no tiene la marca de versión"
version = time.strftime("%Y%m%d-%H%M%S", time.gmtime())
html = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="theme-color" content="#0a0f15">\n<meta name="description" content="Paso Alpino: carreras 3D de montaña de OrtegaCorp. Gratis en el celular o la computadora; juegue solo o con sus amigos en línea.">\n'
        '<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" type="image/png" href="icon-192.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Paso Alpino">\n'
        '<meta property="og:type" content="website">\n<meta property="og:site_name" content="Paso Alpino">\n<meta property="og:title" content="Paso Alpino · Carreras 3D de montaña">\n'
        '<meta property="og:description" content="Gratis en el celular o la computadora. Nitro, derrapes, retos y carreras en línea con sus amigos.">\n'
        '<meta property="og:image" content="__SITE_URL__/og.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:url" content="__SITE_URL__/">\n'
        '<meta name="twitter:card" content="summary_large_image">\n'
        '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px);color-scheme:dark}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n'
        '</head>\n<body>\n' + src.replace("__BUILD__", version) + '\n</body>\n</html>\n')
root = pathlib.Path(__file__).resolve().parent.parent
(root / "index.html").write_text(html, encoding="utf-8")
(root / "version.json").write_text(json.dumps({"v": version}) + "\n", encoding="utf-8")
print("versión", version)
