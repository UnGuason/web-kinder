
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

//importScripts('/__/firebase/init.js');
firebase.initializeApp({
  'messagingSenderId': '103953800507'
});
const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
/*
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
 notification = webkitNotifications.createNotification(payload.data.titulo)
notification.onclick = function(){
    window.focus();
    this.cancel();
};
return self.registration.showNotification('leo');
    });
*/


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // background message
  
  const notificationTitle = payload.data.titulo;
  const notificationOptions = {
    body: payload.data.mensaje,
    icon: 'https://www.unbleck.com/services/logo-kinderv.png'
    
  };



  return self.registration.showNotification(notificationTitle,
      notificationOptions);
}
);
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://virtualkinder.com')
  );

});

// [END background_handler]