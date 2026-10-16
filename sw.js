// Paso Alpino: service worker mínimo para que Android permita instalar el juego como app.
// No guarda nada en caché: el juego siempre se carga en su versión más reciente.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
