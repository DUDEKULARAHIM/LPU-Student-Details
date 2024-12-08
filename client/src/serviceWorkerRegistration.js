
// src/serviceWorkerRegistration.js

// This file is part of the create-react-app setup to handle service worker registration

// If you want to learn more about service workers, go to:
// https://developers.google.com/web/fundamentals/primers/service-workers

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.startsWith('127.0.0.1')
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // The URL constructor is available in all browsers that support service workers.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Ensure service worker only works in the same origin as the app
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // This is a local server, so we can check if the service worker exists
          checkValidServiceWorker(swUrl, config);
        } else {
          // Register the service worker for production
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
  
        if (config && config.onSuccess) {
          config.onSuccess(registration);
        }
      })
      .catch((error) => {
        console.error('Service Worker registration failed: ', error);
        if (config && config.onError) {
          config.onError(error);
        }
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found
    fetch(swUrl)
      .then((response) => {
        // If the service worker cannot be found, it's most likely because you're running in development mode
        if (response.status === 404 || response.type === 'opaquer') {
          // No service worker found, unregister any existing service workers
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
          });
        } else {
          // Found the service worker, proceed with registration
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('No internet connection. Service worker not registered.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  