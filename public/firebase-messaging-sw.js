// importScripts(
//   "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
// );

// importScripts(
//   "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
// );

// firebase.initializeApp({
//   apiKey: "AIzaSyAD-dTvg63O7s8fd_Cn4pWYfODb7DXsmcE",
//   authDomain: "amberalertdemo.firebaseapp.com",
//   projectId: "amberalertdemo",
//   storageBucket: "amberalertdemo.firebasestorage.app",
//   messagingSenderId: "859664231016",
//   appId: "1:859664231016:web:09699ed43d6b8551aaa9dd"
// });

// const messaging =
//   firebase.messaging();

// messaging.onBackgroundMessage(
//   (payload) => {
//     console.log(
//       "Background Message",
//       payload
//     );

//     self.registration.showNotification(
//       payload.notification?.title ||
//         "Amber Alert",
//       {
//         body:
//           payload.notification?.body ||
//           "",
//         icon: "/favicon.svg",
//         badge: "/favicon.svg",
//         requireInteraction: true
//       }
//     );
//   }
// );

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAD-dTvg63O7s8fd_Cn4pWYfODb7DXsmcE",
  authDomain: "amberalertdemo.firebaseapp.com",
  projectId: "amberalertdemo",
  storageBucket: "amberalertdemo.firebasestorage.app",
  messagingSenderId: "859664231016",
  appId: "1:859664231016:web:09699ed43d6b8551aaa9dd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message", payload);

  self.registration.showNotification(
    payload.notification?.title || "🚨 Amber Alert",
    {
      body: payload.notification?.body || "",
      icon: "/favicon.svg",
      badge: "/favicon.svg",

      requireInteraction: true,
      vibrate: [500, 500, 500, 500, 500],

      tag: "amber-alert",
      renotify: true,

      data: {
        url: "/"
      }
    }
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("/")
  );
});