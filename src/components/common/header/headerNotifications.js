import { useEffect } from 'react';
import { getNotifications } from './api/getNotifications';
import { GroupSubscription } from './api/groupSubscription';
export const HeaderNotifications = (notificationList, profile, setNotificationList) => {
  useEffect(() => {
    if (profile.group !== undefined) {
      if (!notificationList) {
        getNotifications(setNotificationList, profile);
      }
      const subscription = GroupSubscription(handleDatabaseEvent, profile);

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [profile.group]);
  const handleDatabaseEvent = (event) => {
    // Update the notificationList state based on the event
    setNotificationList((prevNotificationList) => {
      switch (event.eventType) {
        case 'INSERT':
          return [event.new, ...prevNotificationList];
        case 'UPDATE':
          return prevNotificationList.map((notification) =>
            notification.id === event.new.id ? event.new : notification,
          );
        case 'DELETE':
          return prevNotificationList.filter((notification) => notification.id !== event.old.id);
        default:
          return prevNotificationList;
      }
    });
  };
};
