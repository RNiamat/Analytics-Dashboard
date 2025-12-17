import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
};

const styles = {
    success: "border-green-500 bg-green-50 text-green-900",
    error: "border-red-500 bg-red-50 text-red-900",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-900",
    info: "border-blue-500 bg-blue-50 text-blue-900",
};

const NotificationItem = ({ notification, removeNotification }) => {
    const { id, type = 'info', message } = notification;

    return (
        <div
            className={`
        flex items-start p-4 mb-3 rounded-lg shadow-lg border-l-4 
        transform transition-all duration-300 ease-in-out hover:scale-[1.02]
        animate-in slide-in-from-right fade-in duration-300
        ${styles[type] || styles.info}
        min-w-[300px] max-w-md
      `}
            role="alert"
        >
            <div className="flex-shrink-0 mr-3 mt-0.5">
                {icons[type] || icons.info}
            </div>
            <div className="flex-1 mr-2 text-sm font-medium">
                {message}
            </div>
            <button
                onClick={() => removeNotification(id)}
                className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-black/5 focus:ring-2 focus:ring-black/5 transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-4 h-4 opacity-70" />
            </button>
        </div>
    );
};

export default NotificationItem;
