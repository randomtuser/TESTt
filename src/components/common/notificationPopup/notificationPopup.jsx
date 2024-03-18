import React, { Fragment, useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import Notification from './notification.jsx';
import { Menu, Transition, Switch } from '@headlessui/react';
import './notificationPopup.css';
import { useTranslation } from 'react-i18next';

export default function NotificationPopup(props) {
  const [notifications, setNotifications] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [size, setSize] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const { t } = useTranslation(['Modals']);

  useEffect(() => {
    if (props.notifications) {
      setNotifications(props.notifications);
      setUnreadCount(countUnread());
    }
  }, [props.notifications]);

  function onlyRead() {
    setVisibleNotifications(
      notifications
        .filter((notif) => !enabled || !notif.read)
        .slice(0, size ? notifications.length : 3),
    );
  }

  useEffect(() => {
    onlyRead();
  }, [notifications, enabled, size]);

  const countUnread = () => {
    return props.notifications.reduce((count, notif) => {
      return !notif.read ? count + 1 : count;
    }, 0);
  };

  const dismissAll = async () => {
    try {
      const updates = notifications.map((notification) => ({
        id: notification.id,
        read: true,
      }));

      const { data, error } = await supabase.from('group_notifications').upsert(updates);

      if (error) {
        props.notify(
          'There has been an error dismissing the notifications. Please, try again later',
          'error',
        );
        return;
      }

      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));

      setNotifications(updatedNotifications);
      props.notify('Notifications have been dismissed correctly.', 'success');
    } catch (error) {
      props.notify(
        'There has been an error dismissing the notifications. Please, try again later',
        'error',
      );
    }
  };

  const dismissNotification = async (notifId) => {
    try {
      const { data, error } = await supabase
        .from('group_notifications')
        .update({ read: true })
        .eq('id', notifId)
        .select();

      if (error) {
        props.notify(
          'There has been an error dismissing the notification. Please, try again later',
          'error',
        );
        return;
      }

      // const index = notifications.findIndex((notification) => notification.id === notifId);
      // if (index !== -1) {
      //   const updatedNotifications = [
      //     ...notifications.slice(0, index),
      //     data[0],
      //     ...notifications.slice(index + 1),
      //   ];
      //   setNotifications(updatedNotifications);
      // }

      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === notifId) {
          return data[0];
        } else {
          return notification;
        }
      });
      setNotifications(updatedNotifications);
    } catch (error) {
      props.notify(
        'There has been an error dismissing the notification. Please, try again later',
        'error',
      );
    }
  };

  // const visibleNotifications = size ? notifications : notifications.slice(0, 3);

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div
        onClick={() => {
          if (!!props?.setBgShadow) {
            props.setBgShadow(!props.test);
          }
        }}
      >
        <Menu.Button className='flex items-center'>
          {unreadCount === 0 ? (
            <img
              src='icons/notifyIconEmpty.svg'
              alt='Emp'
              className='icon dark:invert 3xl:h-[2.1vh] 3xl:w-[2.1vh]'
            />
          ) : (
            <div>
              <img
                className='icon block dark:hidden'
                src='icons/notifyIcon.svg'
                alt='Notification Icon'
              />
              <img
                className='icon hidden dark:block'
                src='icons/notifyIconDark.svg'
                alt='Notification Icon'
              />
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='headers-slide-enter'
        //enterFrom='slide-enter-active'
        enterTo='headers-slide-enter-active'
        leave='headers-slide-exit'
        //leaveFrom='transform opacity-100 scale-100'
        leaveTo='headers-slide-exit-active'
      >
        <Menu.Items
          className={`${
            !props.mobile ? 'right-0 w-[536px]' : '-right-4 w-[360px]'
          } scrollable-content absolute z-[100]  mt-2 max-h-[550px] origin-top-right overflow-hidden  overflow-y-auto rounded-md bg-white px-6 py-6 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black dark:text-darkWhite`}
        >
          <div className='flex w-full items-center justify-between border-b pb-6'>
            <div className='text-xl font-bold'>{t('notifs')}</div>
            <div className='flex items-center text-sm md:text-base'>
              {t('unread')}
              <Switch
                value={enabled}
                onClick={() => {
                  setEnabled(!enabled);
                }}
                id='normal1'
                className={`${
                  enabled ? 'bg-[#FB8500]' : 'bg-[#CCCCCC]'
                } relative ml-2 inline-flex h-[23px] w-[49px] items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? 'translate-x-[26px]' : 'translate-x-1'
                  } inline-block h-[19px] w-[19px] transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>

          {visibleNotifications.length > 0 ? (
            <>
              <div className='mt-2 -mb-2'>
                {enabled && (
                  <button className='text-[#2D9CDB] hover:underline' onClick={dismissAll}>
                    {t('dismiss')}
                  </button>
                )}
              </div>
              {visibleNotifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  dismiss={dismissNotification}
                />
              ))}
              {!size &&
                ((notifications.length >= 4 && !enabled) || (enabled && unreadCount >= 4)) && (
                  <div className='mt-2 flex justify-center'>
                    <button
                      className='text-[#2D9CDB] hover:underline'
                      onClick={() => setSize(true)}
                    >
                      {t('showAll')}
                    </button>
                  </div>
                )}
              {size && (!enabled || (enabled && unreadCount >= 4)) && (
                <div className='mt-2 flex justify-center'>
                  <button className='text-[#2D9CDB] hover:underline' onClick={() => setSize(false)}>
                    {t('showLess')}
                  </button>
                </div>
              )}

              {/* {(!size && visibleNotifications.length >= 3 && !enabled) ||
                (!size && enabled && unreadCount >= 4 && (
                  <div className='mt-2 flex justify-center'>
                    <button
                      className='text-[#2D9CDB] hover:underline'
                      onClick={() => setSize(true)}
                    >
                      Show all
                    </button>
                  </div>
                ))}
              {size && enabled && unreadCount >= 4 && (
                <div className='mt-2 flex justify-center'>
                  <button className='text-[#2D9CDB] hover:underline' onClick={() => setSize(false)}>
                    {t('showLess')}
                  </button>
                </div>
              )} */}
            </>
          ) : (
            <div className='mt-5 w-full text-center text-gray-400'>{t('noNotifs')}</div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
