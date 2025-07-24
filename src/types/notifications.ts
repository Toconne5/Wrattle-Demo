
export interface Notification {
  id: string;
  type: 'tag' | 'investment' | 'challenge_achievement' | 'new_challenge' | 'friend_request';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId: string;
  relatedUserId?: string;
  relatedUserName?: string;
  relatedData?: {
    amount?: string;
    stock?: string;
    challengeId?: string;
    challengeName?: string;
    chatId?: string;
    postId?: string;
  };
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}
