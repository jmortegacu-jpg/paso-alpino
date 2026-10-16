// Paso Alpino: service worker mínimo para que Android permita instalar el juego como app
// y para mostrar el aviso «Alguien entró a su sala» cuando el anfitrión está en otra app.
// No guarda nada en caché: el juego siempre se carga en su versión más reciente.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
// Tocar el aviso vuelve a la pestaña o app del juego que ya está abierta.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow ? self.clients.openWindow('./') : undefined;
  }));
});
