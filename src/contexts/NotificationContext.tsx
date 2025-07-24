
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification, NotificationContextType } from '../types/notifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'investment',
      title: 'Investment Received',
      message: 'Sarah sent you $25 to invest in AAPL',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      userId: 'current-user',
      relatedUserId: 'sarah-123',
      relatedUserName: 'Sarah M.',
      relatedData: { amount: '$25', stock: 'AAPL' }
    },
    {
      id: '2',
      type: 'tag',
      title: 'Tagged in Comment',
      message: 'Mike tagged you in a comment about TSLA',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      userId: 'current-user',
      relatedUserId: 'mike-456',
      relatedUserName: 'Mike R.',
      relatedData: { stock: 'TSLA', postId: 'post-123' }
    },
    {
      id: '3',
      type: 'challenge_achievement',
      title: 'Challenge Complete!',
      message: 'You completed the "First Investment" challenge and earned 50 points!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      userId: 'current-user',
      relatedData: { challengeId: 'first-investment', challengeName: 'First Investment' }
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
