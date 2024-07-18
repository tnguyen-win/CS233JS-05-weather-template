// Location of this URI for this file.
const workerUri = './sw.js';

// The worker can control all pages within this scope, i.e., in the current directory and all its subdirectories.
const workerScope = './';

const cacheName = 'ExampleCache_v1';

// Register the service worker with the browser and listen for evenets.
registerServiceWorker();

self.addEventListener('install', event => {
    event.waitUntil(
        addResourcesToCache(['index.html', 'styles.css', 'app.js'])
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
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
}

// Sample code from Google.
// Intercept requests and respond with a cached copy; otherwise perform the fetch and place the response in the cache.
self.addEventListener('fetch', async event => {
    // Is this a request for an image?

    event.respondWith(
        caches.open(cacheName).then(cache => {
            // Respond with the image from the cache or from the network
            return cache.match(event.request).then(cachedResponse => {
                return (
                    cachedResponse ||
                    fetch(event.request.url).then(fetchedResponse => {
                        // Add the network response to the cache for future visits.
                        // Note: we need to make a copy of the response to save it in
                        // the cache and use the original as the request response.
                        cache.put(event.request, fetchedResponse.clone());

                        // Return the network response
                        return fetchedResponse;
                    })
                );
            });
        })
    );
});

async function addResourcesToCache(resources) {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
}
