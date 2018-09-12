
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',   
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'
            ]).then(() => {
                console.log('Finished caching!');
            }).catch((error) => {
                console.log('Caching error: ', error);
            })     
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
       caches.match(e.request).then((response) => {
           if (response) {
               console.log('Found', e.request, ' in cache');
               return response;
           } else {
               console.log('Could not find ', e.request, ' in cache, fetching!');
               return fetch(e.request).then((response) => {
                   const clonedResponse = response.clone();
                   caches.open('v1').then((cache) => {
                       cache.put(e.request, clonedResponse);
                       return response;
                   })
               })
               .catch((err) => {
                   console.error(err);
               });
           }
       }) 
    );
});