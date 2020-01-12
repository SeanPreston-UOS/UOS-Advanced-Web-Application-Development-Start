self.addEventListener('install', function(event) {
    console.log("Service Worker Installed");
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                cache.add('/advanced-web/index.html');
                cache.add('/advanced-web/categories.html');
                cache.add('/advanced-web/join.html');
                cache.add('/advanced-web/login.html');
                cache.add('/advanced-web/recipe-page.html');
                cache.add('/advanced-web/recipes.html');
                cache.add('/advanced-web/styles/styles.css');
                cache.add('/advanced-web/images/banner_1.jpg');
                cache.add('/advanced-web/images/banner_2.jpg');
                cache.add('/advanced-web/images/banner_3.jpg');
                cache.add('https://code.jquery.com/jquery-3.4.1.min.js');
                cache.add('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js');
                cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
                cache.add('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
                cache.add('https://fonts.googleapis.com/css?family=Rubik:300,400&display=swap|Roboto:300,400');
            })
    );
});

self.addEventListener('activate', function() {
    console.log("Service Worker Activated");
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if (res) {
                    return res;
                }else{
                    return fetch(event.request);
                }
            })
    );
});
