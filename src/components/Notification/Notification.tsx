import { useState, useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
  type: 'info' | 'error';
  duration?: number;
}

export function Notification({ message, type, duration = 5000 }: NotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}