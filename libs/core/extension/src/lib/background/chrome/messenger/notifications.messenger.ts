type NotificationsMessengerProps = {
  notificationId: string;
};

type NotificationsMessengerCreateProps = NotificationsMessengerProps & {
  options: chrome.notifications.NotificationOptions<true>;
};
type NotificationsMessengerUpdateProps = NotificationsMessengerProps & {
  options: chrome.notifications.NotificationOptions<false>;
};

export type NotificationsRequest = {
  messenger: 'notifications';
  methodName: 'create' | 'update' | 'clear';
} & (NotificationsMessengerProps | NotificationsMessengerCreateProps | NotificationsMessengerUpdateProps);

export class NotificationsMessenger {
  create({ notificationId, options }: NotificationsMessengerCreateProps, callback: ((notificationId: string) => void) | undefined) {
    chrome.notifications.create(notificationId, options, callback);
  }

  update({ notificationId, options }: NotificationsMessengerUpdateProps, callback: ((wasUpdated: boolean) => void) | undefined) {
    chrome.notifications.update(notificationId, options, callback);
  }

  clear({ notificationId }: NotificationsMessengerProps, callback: ((wasCleared: boolean) => void) | undefined) {
    chrome.notifications.clear(notificationId, callback);
  }
}