import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Switch } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import EditButton from '../../icons/EditButton';

export default function PhoneNotification(props) {
  const { t } = useTranslation(['Notifications', 'Notify']);

  const handlePhoneNumberChange = (value) => {
    props.handlePhoneNumber(value);
  };

  const toggleSMSswitch = () => {
    props.handleSMSswitch();
  };

  const toggleEditPhone = () => {
    props.setDisabledPhone(!props.disabledPhone);
  };

  const handleUpdatePhone = () => {
    props.handleUpdatePhone();
  };

  return (
    <div className='w-6/7 flex items-center justify-between'>
      <div className='flex w-[15%] text-[1.2vw]'>{t('number')}</div>

      <div className='flex w-[5%]'>
        <Switch
          onChange={toggleSMSswitch}
          checked={props.smsSwitch}
          id='normal1'
          className={`${
            props.enabled1 ? 'bg-[#FB8500]' : 'bg-[#CCCCCC]'
          } relative inline-flex h-[2.2vw] w-full items-center rounded-full`}
        >
          <span
            className={`${
              props.enabled1 ? 'translate-x-[250%]' : 'translate-x-[50%]'
            } inline-block h-[50%] w-[25%] transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div className='w-[55%] text-[1vw] placeholder-black'>
        <PhoneInput
          className='phoneInput'
          specialLabel={''}
          country={'th'}
          disabled={props.disabledPhone}
          value={props.notifPhone}
          onChange={handlePhoneNumberChange}
        />
      </div>

      {!props.disabledPhone ? (
        <div className='flex w-[15%] justify-between'>
          <button className='text-[1.2vw] text-blue-600' onClick={handleUpdatePhone}>
            {t('submit')}
          </button>

          <button className='flex items-center' onClick={toggleEditPhone}>
            <div className='flex items-center text-[1.2vw] text-[#878787]'>Cancel</div>
          </button>
        </div>
      ) : (
        <button className='flex w-[15%] items-center justify-end' onClick={toggleEditPhone}>
          <div className='flex items-center text-[#878787]'>
            <EditButton />
            <div className='text-[1.2vw]'>{t('edit')}</div>
          </div>
        </button>
      )}
    </div>
  );
}
