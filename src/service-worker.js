self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-site-cache').then(function(cache) {
        return cache.addAll([
            '/public/build/tailwind.css',
            '/src/tailwind.css',
            '/src/loadingBlur.js',
            '/src/main.js',
          // Agrega aquí más recursos estáticos que deseas cachear
        ]);
      })
    );
  });