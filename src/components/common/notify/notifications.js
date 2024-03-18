import React, { useEffect } from 'react';
import NotificationsSystem, { setUpNotifications, useNotifications, atalhoTheme } from 'reapop';

export default function Notifications({ notifyParent }) {
  const { notifications, dismissNotification } = useNotifications();
  const { notify } = useNotifications();

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: 'top-center',
        dismissible: true,
        dismissAfter: 3000,
      },
    });
  }, []);

  useEffect(() => {
    notifyParent(notify); // Pass the notify function directly
  }, [notify, notifyParent]);

  return (
    <div>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={atalhoTheme}
      />
    </div>
  );
}
