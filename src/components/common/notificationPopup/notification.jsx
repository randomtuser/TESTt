import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Notification(props) {
  const [userDate, setUserDate] = useState('');
  const date = new Date(props.notification.created_at);
  const { t } = useTranslation(['Modals']);

  function getTimeElapsed(date) {
    const now = new Date();
    const timeDiff = now - date;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${t('hace')} ${weeks} ${t('week')}${weeks > 1 ? 's' : ''} ${t('ago')}`;
    } else if (days > 0) {
      return `${t('hace')} ${days} ${t('day')}${days > 1 ? 's' : ''} ${t('ago')}`;
    } else if (hours > 0) {
      return `${t('hace')} ${hours} ${t('hour')}${hours > 1 ? 's' : ''} ${t('ago')}`;
    } else if (minutes > 0) {
      return `${t('hace')} ${minutes} ${t('minute')}${minutes > 1 ? 's' : ''} ${t('ago')}`;
    } else {
      return t('now');
    }
  }

  useEffect(() => {
    if (props.notification.created_at !== '') {
      const date = new Date(props.notification.created_at);
      setUserDate(getTimeElapsed(date));
    } else {
      setUserDate('Never');
    }
  }, []);

  return (
    <div className='min-h-20 mt-6 flex w-full text-black dark:text-darkWhite'>
      <div className='mt-1 flex h-[28px] min-h-[28px] w-[28px] min-w-[28px] items-start justify-start'>
        {props.notification.type === 1 ? (
          <img src='icons/infoNotif.svg' alt='info' />
        ) : props.notification.type === 2 ? (
          <img src='icons/cautionNotif.svg' alt='caution' />
        ) : props.notification.type === 3 ? (
          <img src='icons/addNewUserOrange.svg' alt='new' />
        ) : props.notification.type === 4 ? (
          <img src='icons/addDbIcon.svg' alt='addIcon' />
        ) : props.notification.type === 6 ? (
          <img src='icons/addDbIcon.svg' alt='newFoundry' />
        ) : props.notification.type === 7 ? (
          <img src='icons/addDbIcon.svg' alt='newPrinter' />
        ) : (
          props.notification.type === 5 && <img src='icons/dbIcon.svg' alt='icon' />
        )}
      </div>
      <div className='flex w-full flex-col'>
        <div className='flex w-full justify-between'>
          <div className='ml-2 flex whitespace-pre-wrap font-normal'>
            {props.notification.type === 1 ? (
              props.notification.message
            ) : props.notification.type === 2 ? (
              props.notification.message
            ) : props.notification.type === 3 ? (
              <div>
                {props.notification.data.email} {t('joinedText')}
              </div>
            ) : props.notification.type === 4 ? (
              <div>
                {t('newMaterialText')} {props.notification.data.qty} {t('materialText2')}{' '}
                {props.notification.data.newMaterial}
              </div>
            ) : props.notification.type === 6 ? (
              <div>{props.notification.data} </div>
            ) : props.notification.type === 7 ? (
              <div>{props.notification.data} </div>
            ) : (
              props.notification.type === 5 && (
                <div>
                  {t('updateMaterialText')} {props.notification.data.qty} {t('materialText2')}{' '}
                  {props.notification.data.updatedMaterial}
                </div>
              )
            )}
          </div>
          {/* {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')} */}
          {!props.notification.read && (
            <button
              className='flex min-w-[24px] text-gray-500'
              onClick={() => {
                props.dismiss(props.notification.id);
              }}
            >
              <img src='icons/readNotification.svg' alt='read' />
            </button>
          )}
        </div>
        <div className='ml-2 mt-2 text-gray-500'>{getTimeElapsed(date)}</div>
      </div>
    </div>
  );
}

export default Notification;
