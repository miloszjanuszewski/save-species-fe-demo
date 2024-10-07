
import React, { useEffect } from 'react';
import { useNotificationStore } from '../../stores/notificationStore';
import './Notification.css';

const Notification: React.FC = () => {
  const message = useNotificationStore((state) => state.message);
  const clearNotification = useNotificationStore((state) => state.clearNotification);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [message, clearNotification]);

  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
