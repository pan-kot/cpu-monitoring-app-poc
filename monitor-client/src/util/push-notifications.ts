// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API

export type NotificationPermission = 'default' | 'denied' | 'granted';

export default class PushNotifications {
  _canNotify = false;

  constructor() {
    askNotificationPermission().then(permission => {
      if (permission === 'granted') {
        this._canNotify = true;
      }
    });
  }

  push(title: string, body: string) {
    return this._canNotify && new Notification(title, { body });
  }
}

function askNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return Promise.resolve('denied');
  }

  return checkNotificationPromise()
    ? Notification.requestPermission()
    : new Promise(Notification.requestPermission);
}

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (ignore) {
    return false;
  }

  return true;
}
