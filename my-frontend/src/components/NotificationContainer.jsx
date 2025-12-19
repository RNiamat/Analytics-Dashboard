import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            <div className="pointer-events-auto">
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        removeNotification={removeNotification}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationContainer;
