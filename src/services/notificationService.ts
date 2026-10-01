export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

type NotificationListener = (notification: Notification | null) => void;

class NotificationManager {
  private listeners: Set<NotificationListener> = new Set();
  private currentNotification: Notification | null = null;
  private timeoutId: NodeJS.Timeout | null = null;

  subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(notification: Notification | null) {
    this.currentNotification = notification;
    this.listeners.forEach((listener) => listener(notification));
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 4000) {
    // Clear existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const notification: Notification = {
      id: `notification-${Date.now()}`,
      type,
      message,
      duration,
    };

    this.notify(notification);

    this.timeoutId = setTimeout(() => {
      this.notify(null);
    }, duration);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration || 5000);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.notify(null);
  }
}

export const notificationService = new NotificationManager();
