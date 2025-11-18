import React, { useState } from 'react';
import { Bell, X, Check, AlertTriangle, Info} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedId?: string;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'action-required'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'action-required':
        return notification.actionRequired && !notification.isRead;
      default:
        return true;
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };



  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-primary-300 hover:text-primary-50 hover:bg-primary-300/10 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 xs:w-6 xs:h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 xs:h-5 xs:w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 xs:w-80 sm:w-96 bg-white rounded-lg xs:rounded-xl shadow-lg border border-primary-300/20 z-50 max-h-72 xs:max-h-80 sm:max-h-96 overflow-hidden font-comfortaa">
          {/* Header */}
          <div className="p-3 xs:p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <h3 className="text-base xs:text-lg font-semibold text-primary-50">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-50 hover:text-primary-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 xs:px-3 py-1 text-xs xs:text-sm rounded-md transition-colors ${
                  filter === 'all' ? 'bg-white text-primary-50 shadow-sm' : 'text-primary-50'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2 xs:px-3 py-1 text-xs xs:text-sm rounded-md transition-colors ${
                  filter === 'unread' ? 'bg-white text-primary-50 shadow-sm' : 'text-primary-50'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('action-required')}
                className={`px-2 xs:px-3 py-1 text-xs xs:text-sm rounded-md transition-colors ${
                  filter === 'action-required' ? 'bg-white text-primary-50 shadow-sm' : 'text-primary-50'
                }`}
              >
                Action ({actionRequiredCount})
              </button>
            </div>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="p-2 xs:p-3 border-b border-gray-200 bg-gray-50">
              <button
                onClick={onMarkAllAsRead}
                className="text-xs xs:text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-48 xs:max-h-56 sm:max-h-64 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-primary-50">
                <Bell className="w-8 h-8 mx-auto mb-2 text-primary-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 xs:p-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2 xs:gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-xs xs:text-sm font-medium ${
                              !notification.isRead ? 'text-primary-50' : 'text-primary-50/40'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-xs xs:text-sm mt-1 ${
                              !notification.isRead ? 'text-primary-50' : 'text-primary-50/40'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-primary-50/20 mt-1 xs:mt-2">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => onMarkAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => onDismiss(notification.id)}
                              className="text-gray-400 hover:text-gray-600 p-1"
                              title="Dismiss"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {notification.actionRequired && !notification.isRead && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Action Required
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;