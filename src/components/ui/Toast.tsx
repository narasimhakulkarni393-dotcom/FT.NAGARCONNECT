import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { notificationService, Notification } from '../../services/notificationService';

export const Toast: React.FC = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotification);
    return unsubscribe;
  }, []);

  if (!notification) return null;

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${styles[notification.type]}`}>
        {icons[notification.type]}
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
    </div>
  );
};
