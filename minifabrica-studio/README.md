# MiniFábrica Studio 3 — rostros, instrucciones, stickers y voz

**Estado:** prototipo funcional de composición local + integración opcional de OpenAI por funciones de Netlify. No es un clon de MomentCam, Kling o Flow; no incluye aún animación facial de calidad cinematográfica ni sincronización fonética profesional.

## Funciones reales

- Subir una foto autorizada, detectar rostro con MediaPipe (requiere internet para descargar modelos) o usar recorte aproximado cuando falle.
- Mantener los píxeles del rostro en el modo local para conservar ojos, nariz, gafas, piel, peinado y otros rasgos visibles. La detección puede fallar con fotos borrosas, de perfil o muy pequeñas.
- Escribir una indicación como "Buenos días, saluda con la mano"; el **modo local** interpreta palabras clave, elige una de las escenas disponibles y agrega el texto. No genera una ilustración original.
- **Modo IA opcional**: imagen nueva con OpenAI Images Edits, usando fotografía como referencia de identidad. Puede alterar rasgos accidentalmente; requiere revisión humana y la foto se envía a OpenAI en este modo.
- Descargar PNG, WebP, GIF (animación del cuerpo y efectos) y ZIP de 8 stickers WebP estáticos.
- Voz del dispositivo (Web Speech), grabación de voz real propia o autorizada, voz sintética OpenAI opcional. Vídeo WebM con movimiento **aproximado** de la boca en función del volumen de audio (no visemas, doblaje cinematográfico ni clonación).

## Ejecutar localmente

Abre `index.html` en un navegador con conexión. Algunas funciones necesitan HTTPS/localhost: usa por ejemplo `python -m http.server 8000` y abre http://localhost:8000. La generación local no precisa API ni paga por cada resultado. El primer uso de MediaPipe descarga modelos del CDN.

## Publicar en Netlify

1. Crea **un repositorio nuevo privado** en GitHub para esta aplicación, distinto a otros juegos o proyectos. Incluye todos los archivos de esta carpeta, sin fotografías personales.
2. Conecta el repositorio a Netlify, como un sitio nuevo. No hace falta comando de build; publish `.`; functions `netlify/functions`.
3. La web y los stickers locales funcionan aun sin API. Para activar la IA en tu beta, define en Netlify > Site configuration > Environment variables: `OPENAI_API_KEY` (secreto del servidor), `ENABLE_PAID_AI=true`, `STUDIO_ACCESS_CODE` (contraseña privada de uso para pruebas). **Nunca pegues la clave API en HTML, repositorios o mensajes públicos.**
4. Deploy. La generación por IA consume saldo y puede agotar tiempo de ejecución del proveedor de funciones. Para producción masiva: backend con cola de trabajos, autenticación de usuarios, cuotas, moderación, facturación, límites por IP y métricas de uso.
5. Los usuarios deben autorizar uso de sus rostros. En el modo IA se envía la foto al proveedor API; explica esta transferencia antes de usarlo, incluye política de privacidad y consentimiento revocable.

## WhatsApp

Los GIF no son stickers animados nativos de WhatsApp. El ZIP incluye WebP **estáticos**; para stickers animados nativos falta codificar WebP animado y un importador WhatsApp para Android/iOS o una aplicación empaquetadora de stickers. No confundas 4K con la resolución requerida de stickers.

## Voz clonada

**Aún no implementado**. Se requiere permiso explícito de la persona y acceso a un proveedor de voz clonada. Las voces personalizadas grabadas de OpenAI solo están disponibles para organizaciones elegibles y requieren grabación de consentimiento y muestra. En esta versión hay grabación real y TTS con voces estándar. Nunca clones voces de terceros sin autorización.

## Nota de API

En noviembre de 2026, la API de OpenAI permite `images/edits` con `gpt-image-1.5` e `input_fidelity=high`; se incluye como ejemplo. El modelo de voz `gpt-4o-mini-tts` está marcado para retiro en enero de 2027, por lo que deberá migrarse antes de esa fecha. Esta aplicación **no se conecta automáticamente a la cuenta ni a la suscripción ChatGPT Plus**: requiere una API key independiente con facturación de API.

## Estructura

```
index.html                       Editor / compositor / prompt / audio
netlify/functions/generate-sticker.mjs   Servidor seguro para imágenes IA
netlify/functions/speak.mjs             Servidor seguro para TTS
netlify.toml                    Configuración del sitio
.env.example                    Plantilla de variables, nunca claves reales
.gitignore                      Evita subir secretos y medios personales
```

## Pendientes importantes

- Pruebas con Android, iPhone y Safari; optimización de máscaras faciales con anteojos, cabello canoso y fotos de baja nitidez.
- Separación robusta del fondo y mejora del corte en barbilla/cuello.
- Sincronización labial real (fonemas, visemas y expresiones), labios en vídeo de calidad.
- Cuotas, almacenamiento con caducidad, eliminación de datos, flujo de consentimiento por persona y acceso por cuenta para IA pública.
- Exportador WebP animado e integración con paquetes oficiales de WhatsApp.
- Mejorar cuerpo/caricatura como las ilustraciones de referencia (sin reutilizar obras de MomentCam ni franquicias sin permiso).