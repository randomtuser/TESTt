import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState } from 'react';
import EnglishIcon from './Icons/English';
import SpanishIcon from './Icons/Spanish';
import PolishIcon from './Icons/Polish';
import PortugeseIcon from './Icons/Portugese';
import TurkishIcon from './Icons/Sik';

const LanguagePopup = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(getCookie('i18nextLng') || 'en');
  const { t } = useTranslation(['Modals']);

  const handleLanguageChange = (value) => {
    const selected = value;
    setSelectedLanguage(selected);
    setCookie('i18nextLng', selected, 30);
    document.documentElement.lang = selected;
    i18n.changeLanguage(selected);
  };

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  const options = [
    {
      optionName: t('en'),
      active: false,
      value: 'en',
      icon: <EnglishIcon />,
    },
    {
      optionName: t('es'),
      active: false,
      value: 'es',
      icon: <SpanishIcon />,
    },
    {
      optionName: t('pl'),
      active: false,
      value: 'pl',
      icon: (
        <div className='h-[16px] w-[20px]'>
          <PolishIcon />
        </div>
      ),
    },
    {
      optionName: t('pt'),
      active: false,
      value: 'pt',
      icon: (
        <div className='h-[16px] max-h-[16px] w-[20px] max-w-[20px]'>
          <PortugeseIcon />
        </div>
      ),
    },
    {
      optionName: t('tk'),
      active: false,
      value: 'tk',
      icon: (
        <div className='h-[16px] w-[20px]'>
          <TurkishIcon />
        </div>
      ),
    },
  ];

  options.forEach((element) => {
    element.active = element.value === selectedLanguage ? true : false;
  });

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='flex items-center'>
        <div
          onClick={() => {
            if (!!props?.setBgShadow) {
              props.setBgShadow(!props.test);
            }
          }}
        >
          {props.mobileVersion ? (
            <>
              <div className='flex gap-3'>
                <img
                  src='icons/languageGray.svg'
                  width={20}
                  height={20}
                  className='icon dark:invert '
                  alt='Select a lenguage'
                />
                <div className='flex w-full text-lg font-normal text-[#878787] hover:text-[#393939] dark:hover:text-white'>
                  {t('lang')}
                </div>
              </div>
            </>
          ) : (
            <img
              src='icons/language.svg'
              width={20}
              height={20}
              className='icon dark:invert 3xl:h-[1.6vh]  3xl:w-[1.6vh]'
              alt='Select a lenguage'
            />
          )}
        </div>
      </Menu.Button>
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
          className={`absolute ${
            props.mobileVersion ? '-right-[90px]' : '-right-2'
          }  z-50 mr-2 mt-2 w-[200px] origin-top-right rounded-md   bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:bg-black dark:text-darkWhite dark:opacity-95 lg:-right-2`}
        >
          <div className='px-6 pt-2 font-bold text-[#393939] dark:text-darkWhite'>{t('lang')}</div>
          <div className='mx-auto mt-2 flex w-[80%]  border border-[#CCCCCC]' />
          <div className='flex w-full flex-col items-center'>
            {options.map((option) => (
              <div
                key={option.optionName}
                className='flex w-full cursor-pointer items-center justify-between py-2 px-5 hover:bg-slate-200'
                onClick={() => handleLanguageChange(option.value)}
              >
                <div className='flex items-center'>
                  <div className='mr-2'>{option.icon}</div>
                  <div>{option.optionName}</div>
                </div>
                <div>
                  <svg
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='4'
                      cy='4'
                      r='4'
                      fill={`${option.active ? ' #FB8500' : '#CCCCCC'}`}
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguagePopup;
