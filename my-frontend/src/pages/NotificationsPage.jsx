import React, { useState } from 'react';
import { Award, Bell, FileText, Check, Trash2 } from 'lucide-react';

const NotificationsPage = () => {
    // Mock Data - in a real app this would likely come from a context or API
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New User Registered', description: 'A new user "John Doe" has registered.', time: '5 min ago', type: 'success', icon: Award, read: false },
        { id: 2, title: 'System Warning', description: 'High CPU usage detected on Server-02.', time: '2 hours ago', type: 'warning', icon: Bell, read: false },
        { id: 3, title: 'Report Generated', description: 'Monthly financial report is ready for download.', time: '4 hours ago', type: 'info', icon: FileText, read: false },
        { id: 4, title: 'Security Alert', description: 'Failed login attempt from unknown IP.', time: '1 day ago', type: 'warning', icon: Bell, read: true },
        { id: 5, title: 'Backup Completed', description: 'Daily database backup completed successfully.', time: '1 day ago', type: 'success', icon: Check, read: true },
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your system alerts and messages.</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                    Mark all as read
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className={`p-6 transition-colors ${notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}>
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        }`}>
                                        <notification.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-sm font-semibold ${notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                                                {notification.title}
                                                {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-brand-500 rounded-full"></span>}
                                            </h4>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.description}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                            No notifications found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
