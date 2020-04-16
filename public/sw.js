
self.addEventListener('install', e => {
    console.log('SERVICE WORKER: installed');
    e.waitUntil(
        caches.open('static')
          .then(cache => {
              cache.addAll([
                  '/',
                  '/index.html',
                  '/src/js/app.js',
                  '/src/css/app.css',
                  'src/images/pwa.jpg',
                  'https://fonts.googleapis.com/css?family=Raleway:400,700'
              ])
          })
          .catch(err => console.log(err))
    );
});

self.addEventListener('activate', e => {
    console.log('SW installed');
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res) return res;
                  return fetch(e.request);
              })
    );
});
