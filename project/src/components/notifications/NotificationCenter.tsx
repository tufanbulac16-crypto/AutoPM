import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Clock, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'deadline' | 'approval' | 'task' | 'budget' | 'quality';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'deadline',
      title: 'Yaklaşan Teslim Tarihi',
      message: 'BMW X5 Fren Sistemi projesi için CAD tasarım teslimi 3 gün içinde.',
      timestamp: '2024-03-10T10:30:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'approval',
      title: 'Onay Bekliyor',
      message: 'PPAP dokümanları müşteri onayı için bekliyor.',
      timestamp: '2024-03-10T09:15:00Z',
      read: false,
      priority: 'critical'
    },
    {
      id: '3',
      type: 'task',
      title: 'Görev Tamamlandı',
      message: 'CMM ölçüm raporu Fatma Şen tarafından tamamlandı.',
      timestamp: '2024-03-09T16:45:00Z',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'budget',
      title: 'Bütçe Uyarısı',
      message: 'Malzeme kategorisi bütçesinin %80\'i kullanıldı.',
      timestamp: '2024-03-09T14:20:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'quality',
      title: 'Kalite Kontrolü',
      message: 'Yeni uygunsuzluk kaydı oluşturuldu - Acil inceleme gerekli.',
      timestamp: '2024-03-09T11:30:00Z',
      read: false,
      priority: 'critical'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'approval': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'task': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'budget': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'quality': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      default: return 'border-l-green-500 bg-green-50 dark:bg-green-900/10';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'critical': return notif.priority === 'critical';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical').length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bildirimler
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sistem bildirimleri ve uyarılar
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Tümünü Okundu İşaretle
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Bell className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Bildirim</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Okunmamış</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{criticalCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kritik</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Tümü ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Okunmamış ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'critical'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Kritik ({criticalCount})
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 rounded-lg p-4 transition-all duration-200 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'shadow-md' : 'opacity-75'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getTypeIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-medium ${
                      !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className={`text-sm ${
                    !notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Okundu işaretle"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Sil"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Bildirim Bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Seçilen filtreye uygun bildirim bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
};