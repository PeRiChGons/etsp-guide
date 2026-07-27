/* Caché básico de la aplicación. Los datos del chat siempre se consultan en Supabase. */
var CACHE_NAME = 'etsp-guide-v20260727-bosses';
var APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/css/styles-visual.css',
  './assets/js/content.js',
  './assets/js/i18n.js',
  './assets/js/community.js',
  './assets/js/complete-guide.js',
  './assets/js/bosses.js',
  './assets/js/intro.js',
  './assets/js/router.js',
  './assets/js/app.js',
  './assets/images/app/icon-192.png',
  './assets/images/app/icon-512.png',
  './assets/images/app/logo-perich.png',
  './assets/images/home/four-classes.png',
  './assets/lang/guide-es.json',
  './assets/lang/guide-en.json',
  './assets/lang/guide-de.json',
  './assets/lang/guide-pl.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(APP_SHELL);
  }));
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) {
      return key !== CACHE_NAME;
    }).map(function (key) {
      return caches.delete(key);
    }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET' || event.request.url.indexOf('supabase.co') !== -1) { return; }
  event.respondWith(fetch(event.request).then(function (response) {
    var copy = response.clone();
    caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
    return response;
  }).catch(function () {
    return caches.match(event.request).then(function (cached) {
      return cached || caches.match('./index.html');
    });
  }));
});
