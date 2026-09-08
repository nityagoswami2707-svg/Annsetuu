export const VAPID_PUBLIC_KEY = 'BK3A69vRDGhxgMFW4FS6du5d75OaOTV8RlWWsC0cGOM9fnw06k0EkAnjhC9Pl77btXY_gbYRmSAhZeytWRcK2Bs';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPushNotifications(userId) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push messaging is not supported');
    return;
  }

  try {
    let registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      registration = await navigator.serviceWorker.register('/sw.js');
    }

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }

    // Send subscription to backend
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        subscription: subscription.toJSON()
      })
    });
    console.log('Push notification subscription successful for user:', userId);
  } catch (error) {
    console.error('Error subscribing to push notifications', error);
  }
}

export async function sendPushNotification(userId, title, body, url) {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        payload: {
          title,
          body,
          url
        }
      })
    });
  } catch (error) {
    console.error('Error triggering push notification:', error);
  }
}