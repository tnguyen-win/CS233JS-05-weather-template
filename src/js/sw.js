const workerUri = './sw.js';
const workerScope = './';
const cacheName = 'weather_cache';

registerServiceWorker();

self.addEventListener('install', event => {
    event.waitUntil(
        addResourcesToCache([
            // '../index.html',
            // '../css/input.css'
            // './index.js',
            // './App.jsx',
            // 'App.jsx'
            // 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
            // 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        ])
    );
});

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                workerUri,
                {
                    scope: workerScope
                }
            );
            // switch (true) {
            //     case registration.installing:
            //         console.log('Service worker installing.');
            //         break;
            //     case registration.waiting:
            //         console.log('Service worker installed.');
            //         break;
            //     case registration.active:
            //         console.log('Service worker active.');
            //         break;
            //     default:
            //         break;
            // }
            /* eslint-disable */
            if (registration.installing)
                console.log('Service worker installing.');
            else if (registration.waiting)
                console.log('Service worker installed.');
            else if (registration.active) console.log('Service worker active.');
        } catch (event) {
            console.error('Registration failed with ' + event + '.');
        }
        /* eslint-enable */
    }
}

self.addEventListener('fetch', async event => {
    event.respondWith(
        caches.open(cacheName).then(async cache => {
            const cachedResponse = await cache.match(event.request);

            return (
                cachedResponse ||
                fetch(event.request.url).then(fetchedResponse => {
                    cache.put(event.request, fetchedResponse.clone());

                    return fetchedResponse;
                })
            );
        })
    );
});

async function addResourcesToCache(resources) {
    const cache = await caches.open(cacheName);

    await cache.addAll(resources);
}
