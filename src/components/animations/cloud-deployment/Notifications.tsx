
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Cloud } from "lucide-react";
import { NotificationType } from "./types";

interface NotificationsProps {
  notifications: NotificationType[];
  onDismiss: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="hz-abs hz-z-header hz-col hz-stack-2 hz-mw-xs">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`hz-r-md hz-p-3 hz-shadow-lg ${
              notification.type === 'success' ? 'hz-bg-surface hz-bordered' :
              notification.type === 'error' ? 'hz-bg-raised hz-bordered' :
              'hz-bg-raised hz-bordered'
            }`}
          >
            <div className="hz-row hz-ai-start">
              <div className="hz-none hz-mt-1">
                {notification.type === 'success' && <Check className="hz-sq-2 hz-fg-muted" />}
                {notification.type === 'error' && <X className="hz-sq-2 hz-fg-muted" />}
                {notification.type === 'info' && <Cloud className="hz-sq-2 hz-fg-muted" />}
              </div>
              <div className="hz-ml-2">
                <p className="hz-t-sm hz-w-medium hz-fg">{notification.title}</p>
                <p className="hz-t-xs hz-fg-soft">{notification.message}</p>
              </div>
              <button 
                className="hz-ml-4 hz-none hz-fg-muted hz-link"
                onClick={() => onDismiss(notification.id)}
              >
                <X className="hz-sq-2" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
