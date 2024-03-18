import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import EditButton from '../../icons/EditButton';

export default function EmailNotification(props) {
  const { t } = useTranslation(['Notifications', 'Notify']);

  const [disabledEmail, setDisabledEmail] = useState(true);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    props.setNotifEmail(val);
  };

  const toggleEmailSwitch = () => {
    props.handleEmailSwitch();
  };

  const toggleEditEmail = () => {
    setDisabledEmail(!disabledEmail);
  };

  const handleUpdateEmail = () => {
    props.handleUpdateEmail();
  };

  return (
    <div className='w-6/7 flex items-center justify-between'>
      <div className='flex w-[15%] text-[1.2vw]'>{t('notifications')}</div>

      <div className='flex w-[5%]'>
        <Switch
          onChange={toggleEmailSwitch}
          checked={props.emailSwitch}
          id='normal'
          className={`${
            props.enabled ? 'bg-[#FB8500]' : 'bg-[#CCCCCC]'
          } relative inline-flex h-[2.2vw] w-full items-center rounded-full`}
        >
          <span
            className={`${
              props.enabled ? 'translate-x-[250%]' : 'translate-x-[50%]'
            } inline-block h-[50%] w-[25%] transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <input
        disabled={disabledEmail}
        type='email'
        value={props.notifEmail}
        onChange={handleEmailChange}
        className='w-[55%] rounded-lg border border-gray-300 bg-transparent p-[1%] text-[1vw] placeholder-black'
        placeholder='example@gmail.com'
      />

      {!disabledEmail ? (
        <div className='flex w-[15%] justify-between'>
          <button className='text-[1.2vw] text-blue-600' onClick={handleUpdateEmail}>
            {t('submit')}
          </button>

          <button className='flex items-center' onClick={toggleEditEmail}>
            <div className='flex items-center text-[1.2vw] text-[#878787]'>Cancel</div>
          </button>
        </div>
      ) : (
        <button className='flex w-[15%] items-center justify-end' onClick={toggleEditEmail}>
          <div className='flex items-center text-[#878787]'>
            <EditButton />
            <div className='text-[1.2vw]'>{t('edit')}</div>
          </div>
        </button>
      )}
    </div>
  );
}
