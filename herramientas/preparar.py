"""Copia el juego al sitio: index.html con un número de versión nuevo y version.json igual.
Uso: python3 herramientas/preparar.py ruta/al/paso-alpino.html
Cada publicación cambia la versión; el juego abierto en los celulares lo detecta y ofrece «Actualizar»."""
import sys, json, time, pathlib
src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")
assert "__BUILD__" in src, "el juego no tiene la marca de versión"
version = time.strftime("%Y%m%d-%H%M%S", time.gmtime())
html = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="theme-color" content="#0a0f15">\n<meta name="description" content="Paso Alpino: carreras 3D de montaña de OrtegaCorp. Juegue solo o con amigos en línea.">\n'
        '<style>:root{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px);color-scheme:dark}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n'
        '</head>\n<body>\n' + src.replace("__BUILD__", version) + '\n</body>\n</html>\n')
root = pathlib.Path(__file__).resolve().parent.parent
(root / "index.html").write_text(html, encoding="utf-8")
(root / "version.json").write_text(json.dumps({"v": version}) + "\n", encoding="utf-8")
print("versión", version)
