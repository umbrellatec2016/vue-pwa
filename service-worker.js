const cacheVersion = 'v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheVersion).then(cache => cache.addAll([
      './index.html',
    ])),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    if (response !== undefined) {
      return response;
    }
    return fetch(event.request).then((rs) => {
      const responseClone = rs.clone();

      caches.open(cacheVersion).then((cache) => {
        cache.put(event.request, responseClone);
      });
      return rs;
    }).catch(() => console.log('no cache response!'));
  }));
});
