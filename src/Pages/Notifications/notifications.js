import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useAuth } from '../../hooks/auth';
import { useTranslation } from 'react-i18next';
import 'react-phone-input-2/lib/style.css';
import EmailNotification from '../../components/notificationPage/emailNotification';
import PhoneNotification from '../../components/notificationPage/phoneNotification';
import { loadUserData, loadPreferences, update } from './api/notificationsApi';
import MobileButton from '../../components/foundriesPage/mobileButton';

export default function Notification({ notify }) {
  const { t } = useTranslation(['Notifications', 'Notify']);
  const { user } = useAuth();
  const userId = user?.id;

  const [prefs, setPrefs] = useState({});
  const [user1, setUser1] = useState({});
  const [notifEmail, setNotifEmail] = useState('');
  const [notifPhone, setNotifPhone] = useState('');
  const [emailSwitch, setEmailSwitch] = useState(false);
  const [smsSwitch, setSmsSwitch] = useState(false);

  const [disabledEmail, setDisabledEmail] = useState(true);
  const [disabledPhone, setDisabledPhone] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);

  // Load user data and preferences on component mount
  useEffect(() => {
    loadUserData(userId, setUser1);
    loadPreferences(userId, setPrefs);
  }, [userId]);

  // Update input fields based on preferences changes
  useEffect(() => {
    setInputs();
  }, [prefs]);

  const setInputs = () => {
    setNotifEmail(prefs.sec_email);
    setNotifPhone(prefs.sec_phone != null ? prefs.sec_phone : '');

    if (prefs.via_pref === 1) {
      setEmailSwitch(false);
      setSmsSwitch(true);
      setEnabled1(true);
    } else if (prefs.via_pref === 2) {
      setEmailSwitch(true);
      setSmsSwitch(false);
      setEnabled(true);
    } else if (prefs.via_pref === 3) {
      setEmailSwitch(true);
      setSmsSwitch(true);
      setEnabled(true);
      setEnabled1(true);
    } else {
      setEmailSwitch(false);
      setSmsSwitch(false);
    }
  };

  const handleEmailSwitch = async () => {
    const newValue = !emailSwitch;
    setEnabled(!enabled);
    setEmailSwitch(newValue);
    const prefVal = (newValue ? 2 : 0) + (smsSwitch ? 1 : 0);
    await update(prefVal);
    console.log(newValue);
  };

  const handleSMSswitch = async () => {
    const newValue = !smsSwitch;
    setEnabled1(!enabled1);
    setSmsSwitch(newValue);
    const prefVal = (emailSwitch ? 2 : 0) + (newValue ? 1 : 0);
    await update(prefVal);
    console.log(newValue);
  };

  const handlePhoneNumber = (value) => {
    console.log(value);
    const val = `+${value}`;
    const rgx = /^[0-9 ]+$/;
    if (val.length < 20 && (val.length === 1 || rgx.test(val.substring(1)))) {
      setNotifPhone(val);
    }
  };

  const handleUpdateEmail = async () => {
    await supabase.from('pref_user').update({ sec_email: notifEmail }).eq('user_id', userId);
    setDisabledEmail(!disabledEmail);
    notify(`${t('Notify:notifyEmailUpdate')}`, 'success');
  };

  const handleUpdatePhone = async () => {
    await supabase.from('pref_user').update({ sec_phone: notifPhone }).eq('user_id', userId);
    setDisabledPhone(!disabledPhone);
    notify(`${t('Notify:notifyPhoneUpdate')}`, 'success');
  };

  return (
    <>
      <div className=''>
        <MobileButton />
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-[2%] flex w-[96%] flex-wrap rounded-[10px] bg-[#FFFFFF] p-[3%] dark:bg-[#0D0D0D] dark:text-[#FFFFFFDE]'>
          <div className='flex w-full flex-col space-y-[2%]'>
            <div className='w-6/7 text-justify text-[1.5vw] text-[#878787] md:w-full'>
              {t('info')}
            </div>
            <EmailNotification
              setNotifEmail={setNotifEmail}
              handleEmailSwitch={handleEmailSwitch}
              emailSwitch={emailSwitch}
              enabled={enabled}
              notifEmail={notifEmail}
              handleUpdateEmail={handleUpdateEmail}
            />

            <PhoneNotification
              handleSMSswitch={handleSMSswitch}
              smsSwitch={smsSwitch}
              enabled1={enabled1}
              notifPhone={notifPhone}
              handlePhoneNumber={handlePhoneNumber}
              setDisabledPhone={setDisabledPhone}
              handleUpdatePhone={handleUpdatePhone}
              disabledPhone={disabledPhone}
            />
          </div>
        </div>
      </div>
    </>
  );
}
