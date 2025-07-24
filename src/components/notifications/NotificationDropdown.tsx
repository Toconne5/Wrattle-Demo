
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, DollarSign, Users, TrendingUp, MessageCircle, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from '../../contexts/NotificationContext';

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return DollarSign;
      case 'tag':
        return MessageCircle;
      case 'friend_request':
        return Users;
      case 'challenge_achievement':
      case 'new_challenge':
        return Trophy;
      default:
        return TrendingUp;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'bg-green-100 text-green-600';
      case 'tag':
        return 'bg-blue-100 text-blue-600';
      case 'friend_request':
        return 'bg-purple-100 text-purple-600';
      case 'challenge_achievement':
      case 'new_challenge':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white border shadow-lg">
        <div className="p-3 border-b flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.slice(0, 10).map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })
          )}
        </div>
        {notifications.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-3">
              <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700">
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
