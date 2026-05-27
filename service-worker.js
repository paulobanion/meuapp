// service-worker.js — Cache First, 100% offline
const CACHE = 'total-investido-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './react.production.min.js',
  './react-dom.production.min.js',
  './babel.min.js',
  './components.js',
  './forms.js',
  './app.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './logo.png',
];

// Install: pre-cache everything
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache first, fallback to network, fallback to index.html
self.addEventListener('fetch', (e) => {
  // Only handle GET requests for our origin
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((response) => {
          // Cache valid responses dynamically
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
