// Service Worker para ApenasCorrer PWA
// Permite funcionamento offline completo

const CACHE_NAME = 'apenascorrer-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/data.js',
  './js/audio.js',
  './js/app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// Instalação do Service Worker e Caching dos Arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching files...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker e Remoção de Caches Antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheKeys => {
      return Promise.all(
        cacheKeys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia Cache-First com Fallback de Rede
self.addEventListener('fetch', event => {
  // Ignora chamadas de APIs externas se houver (ex: Google Fonts) ou lida de forma básica
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then(networkResponse => {
          // Salva dinamicamente no cache se for uma requisição interna de sucesso
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Caso offline total e recurso não cacheado
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
