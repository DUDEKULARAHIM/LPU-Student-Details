// src/serviceWorkerRegistration.js

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.startsWith('127.0.0.1')
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
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
  fetch(swUrl)
    .then((response) => {
      if (response.status === 404 || response.type === 'opaquer') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister();
        });
      } else {
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
