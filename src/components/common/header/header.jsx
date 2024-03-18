import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsPopup from '../settingsPopup/settingsPopup';
import Modal from '../modals/modal';
import QrReader from '../qrReader/qrReader';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/auth';
import LanguagePopup from '../languagePopup/languagePopup';
import NotificationPopup from '../notificationPopup/notificationPopup';
import HeaderMobil from './headerMobil';
import HeaderTraducciones from './headerTraducciones';
import { HeaderNotifications } from './headerNotifications';
import { loadUserData } from './api/loadUserData';
import HeaderQrLogo from '../../../icons/headerQrLogo';
import { Transition } from '@headlessui/react';

const Header = (props) => {
  const { t } = useTranslation(['Header']);
  const { profile } = useAuth();
  const location = useLocation();
  const user = props.user;
  // const id = user?.id;
  const id = props.user?.id;
  // const [user, setUser] = useState(props.user);
  const [photoUrl, setPhotoUrl] = useState();
  const [user1, setUser1] = useState({});
  const [fullName, setFullName] = useState();
  const [isOpenModalScan, setIsOpenModalScan] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState();
  const [display, setDisplay] = useState(false);
  const [isOpenSettingsPopup, setIsOpenSettingsPopup] = useState(false);
  const [bgShadow, setBgShadow] = useState(false);
  const isFoundriesDashboard = /\/foundries\/dashboard\/.*/.test(location.pathname);

  const buttonNotifRef = useRef(null);
  const popupNotifRef = useRef(null);

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (props.fullName != null) {
      user1.first_name = props.fullName;
      setFullName(props.fullName);
    }
  }, [props.fullName]);

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (isOpenSettingsPopup) {
        setIsOpen(false);
      }
      if (
        isOpenSettingsPopup &&
        !buttonRef.current.contains(event.target) &&
        !popupRef.current.contains(event.target)
      ) {
        setIsOpenSettingsPopup(false);
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isOpenSettingsPopup]);

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (isOpen) {
        setIsOpenSettingsPopup(false);
      }
      if (
        isOpen &&
        !buttonNotifRef.current.contains(event.target) &&
        !popupNotifRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isOpen]);
  HeaderNotifications(notificationList, profile, setNotificationList);
  useEffect(() => {
    // setUser1(loadUserData());
    loadUserData(setPhotoUrl, setFullName, setUser1, props.userPic, id);
    // loadUserData(setUser1);
  }, [user]);

  useEffect(() => {
    if (props.userPic != null) {
      let updateUser = user1;
      updateUser.avatar_url = props.userPic;
      setUser1(updateUser);
      setPhotoUrl(props.userPic);
    }
  }, [props.userPic]);
  const toggleModalScan = () => {
    setDisplay(!display);
    setIsOpenModalScan(!isOpenModalScan);
  };
  useEffect(() => {
    setBgShadow(false);
  }, [location]);
  let locationTest = location.pathname.toLocaleLowerCase().substring(1).split('/').pop();
  const validLocations = [
    'signin',
    'signup',
    'signupusermail',
    'afterregister',
    'afterregisteruser',
    'newpassword',
    'signuptest',
    'registeremail',
    'signupuser',
    'resetpasswordtest',
    'terms',
  ];

  let locationname =
    validLocations.includes(locationTest) ||
    /^signupuser(\/.*)?$/.test(location.pathname.toLocaleLowerCase().replace('/', ''));

  let headerText = '';

  switch (location.pathname) {
    case '/':
      headerText = `${t('overview')}`;
      break;
    case '/contact':
      headerText = `${t('contact')}`;
      break;
    case '/foundries':
      headerText = `${t('foundries')}`;
      break;
    case '/printers':
      headerText = `${t('printers')}`;
      break;
    case '/alloys':
      headerText = `${t('alloys')}`;
      break;
    case '/crucibles':
      headerText = `${t('crucibles')}`;
      break;
    case '/settings':
      // headerText = `${t('settings')}`;
      headerText = `Account`;
      break;
    case '/security':
      headerText = `${t('security')}`;
      break;
    case '/users':
      headerText = `${t('users')}`;
      break;
    case '/support':
      headerText = `${t('support')}`;
      break;
    case '/notifications':
      headerText = `${t('notifications')}`;
      break;
    case '/privacy':
      headerText = `${t('Privacy policy')}`;
      break;
    default:
      headerText = '';
  }

  if (isFoundriesDashboard) {
    headerText = t('dashboard');
  }

  function setCookie(cname, cvalue) {
    document.cookie = cname + '=' + cvalue + ';';
  }

  function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  function checkCookie() {
    let theme = getCookie('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setEnabled(true);
    } else {
      document.documentElement.classList.remove('dark');
      setEnabled(false);
    }
  }

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    checkCookie();
  }, []);

  function handleSwitch() {
    if (enabled) {
      setCookie('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setCookie('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
    setEnabled(!enabled);
  }

  return (
    <>
      {locationname === false ? (
        <div className='3xl:h-[5vh]'>
          <Modal
            title={`${t('scan')}`}
            isOpen={isOpenModalScan}
            toggleModal={toggleModalScan}
            defaultButtons={false}
          >
            <div className=''>
              <QrReader
                toggleModalScan={toggleModalScan}
                notify={props.notify}
                display={display}
                trad={HeaderTraducciones}
              />
            </div>
          </Modal>
          <div className='cancel mt-[1.2vw] hidden h-[55px] w-full items-center justify-between px-10 dark:bg-[#1B1B1B] md:px-[1.2vw] lg:flex'>
            {isFoundriesDashboard && (
              <button
                id='dashboardBackButton'
                className='mr-3 flex items-center rounded bg-white p-2 pl-3'
              >
                <span className='h-4 w-4 rotate-[225deg] transform border-t-2 border-r-2 border-[#393939] border-opacity-70 '>
                  {' '}
                </span>
              </button>
            )}
            <div className='  flex h-16 w-fit items-center !text-left text-3xl font-bold text-[#393939] dark:text-darkWhite 3xl:text-[1.2vw]'>
              {headerText}
            </div>
            <div className=' flex w-fit items-center justify-end gap-4 3xl:mt-[1.1vh]'>
              <img
                src='icons/darkmodeIcon.svg'
                width={24}
                height={24}
                className='icon dark:invert 3xl:h-[2vh] 3xl:w-[2vh]'
                alt='Select a lenguage'
                onClick={handleSwitch}
              />
              <LanguagePopup setBgShadow={setBgShadow} bgShadow={bgShadow} />
              <HeaderQrLogo toggleModalScan={toggleModalScan} />

              <NotificationPopup
                notifications={notificationList}
                notify={props.notify}
                setBgShadow={setBgShadow}
                bgShadow={bgShadow}
              />
              <SettingsPopup
                setBgShadow={setBgShadow}
                bgShadow={bgShadow}
                photoUrl={photoUrl}
                user={user1}
                fullName={fullName}
              />
            </div>
          </div>
          <HeaderMobil
            toggleSidebar={props.toggleSidebar}
            headerText={headerText}
            toggleModalScan={toggleModalScan}
            notificationList={notificationList}
            notify={props.notify}
          />
        </div>
      ) : (
        ''
      )}
      {bgShadow && (
        <div
          onClick={() => setBgShadow(false)}
          className='fixed top-0 left-0 z-30 h-screen w-screen bg-black opacity-50 dark:bg-[#FFFFFF] dark:opacity-25'
          style={{ overflow: 'hidden' }} // Prevent scrolling when the blackout is active
        ></div>
      )}
    </>
  );
};

export default Header;
