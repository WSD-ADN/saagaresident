window.onload = function() {
    let imagesToLoad = document.querySelectorAll('.slideImageBlur');
    let loadedCount = 0;
  
    imagesToLoad.forEach(function(image) {
      if (image.complete) {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          removeBlur();
        }
      } else {
        image.addEventListener('load', function() {
          loadedCount++;
        //   console.log('Imagen cargada:', image.src);
          if (loadedCount === imagesToLoad.length) {
            removeBlur();
          }
        });
      }
    });
  
    function removeBlur() {
      imagesToLoad.forEach(function(image) {
        image.classList.remove('slideImageBlur');
      });
      
    }
  
    // Configuración de caché de recursos estáticos
    let staticAssets = [
      '/public/build/tailwind.css',
      './tailwind.css',
      '/src/loadingBlur.js',
      '/src/main.js',
      // Agrega aquí más recursos estáticos que deseas cachear
    ];
  
    // Obtiene la lista de imágenes de la carpeta 'src/img/'
    fetch('/src/img/')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = Array.from(doc.querySelectorAll('a'))
          .filter(link => link.href.match(/\.(jpe?g|png|gif|svg)$/))
          .map(link => link.href);
  
        staticAssets = staticAssets.concat(images);
  
        // Agrega los recursos estáticos al caché
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/src/service-worker.js')
            .then(function(registration) {
              if (registration.waiting) {
                registration.waiting.postMessage('skipWaiting');
              }
            });
        }
        // console.log('Imágenes cargadas:', images); 
      })
      .catch(error => {
        console.error('Error al obtener la lista de imágenes:', error);
      });
  };
  