import React, { Fragment, useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';
import { Menu, Transition, Switch } from '@headlessui/react';
import AccountIcon from './Icons/Account';
import SecurityIcon from './Icons/Security';
import ManageIcon from './Icons/Manage';
import NotificationIcon from './Icons/Notification';
import SupportIcon from './Icons/Support';
import PrivacyIcon from './Icons/Privacy';
import LogoutIcon from './Icons/Logout';
import Modal from '../modals/modal';

const SettingsPopup = (props) => {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const toggleModal = () => {
    setOpenLogoutModal((prevState) => !prevState);
  };

  async function logout() {
    await supabase.auth.signOut();
    navigate(process.env.PUBLIC_URL + '/signin');
  }

  const { t } = useTranslation(['Settings', 'Sidebar', 'Modals']);

  const options = [
    {
      id: 1,
      optionName: `${t('account')}`,
      icon: <AccountIcon />,
      link: '/settings',
    },
    {
      id: 2,
      optionName: `${t('security')}`,
      icon: <SecurityIcon />,
      link: '/security',
    },
    {
      id: 3,
      optionName: `${t('manage')}`,
      icon: <ManageIcon />,
      link: '/users',
    },
    {
      id: 4,
      optionName: `${t('notifications')}`,
      icon: <NotificationIcon />,
      link: '/notifications',
    },
    {
      id: 5,
      optionName: `${t('support')}`,
      icon: <SupportIcon />,
      link: '/support',
    },
    {
      id: 6,
      optionName: `${t('Privacy policy')}`,
      icon: <PrivacyIcon />,
      link: '/privacy',
    },
  ];

  let trad;

  switch (props.user.role) {
    case 1:
      trad = t('owner');
      break;
    case 2:
      trad = t('user');
      break;
    case 3:
      trad = t('admin');
      break;
    default:
      trad = t('owner');
      break;
  }
  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div
            onClick={() => {
              if (!!props?.setBgShadow) {
                props.setBgShadow(!props.test);
              }
            }}
          >
            <Menu.Button className='flex items-center'>
              {props.mobileVersion ? (
                t('settings')
              ) : (
                <>
                  <div className='relative'>
                    <div className='h-9 w-9 !rounded-md 3xl:h-[3.5vh] 3xl:w-[3.5vh]'>
                      <img
                        className='icon h-full w-full !rounded-md object-cover '
                        src={props.photoUrl}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='flex items-center'>
                      <div className='ml-2 text-base dark:text-darkWhite  3xl:text-[0.7vw]'>
                        {props.user && props.fullName ? props.fullName : 'Default'}
                      </div>
                      <BiChevronDown size={22} color='gray' />
                    </div>
                    <div className='ml-2 text-left text-sm text-[#969696] 3xl:text-[0.6vw]'>
                      {props.user && props.user.role ? trad : 'Undefined'}
                    </div>
                  </div>
                </>
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
              className={`absolute ${
                props.mobileVersion ? '-right-20' : '-right-2'
              } z-50 mr-2 mt-2 w-[200px] origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:invert`}
            >
              <div className='h-[200px] overflow-auto lg:h-auto '>
                {options.map((option) => {
                  if (
                    option.id === 3 &&
                    !(props.user.role === 1 || props.user.role === 3 || props.user.role === 4)
                  ) {
                    return;
                  } else {
                    return (
                      <Menu.Item key={option.optionName}>
                        {({ active }) => (
                          <Link
                            onClick={(e) => {
                              if (props.mobileVersion) {
                                props.toggleSidebar();
                              }
                              if (option.switch) {
                                e.preventDefault();
                                // handleSwitch();
                              }
                            }}
                            to={process.env.PUBLIC_URL + option.link}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700 '
                            } ${
                              option.switch && 'justify-between'
                            } flex cursor-pointer items-center gap-2 border-0 px-6 py-[9px] text-sm`}
                          >
                            <div className='flex items-center gap-[15px] whitespace-nowrap'>
                              <div className='flex h-5 w-5 items-center justify-center'>
                                {option.icon}
                              </div>
                              {option.optionName}
                            </div>
                            {option.switch}
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  }
                })}
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        if (!!props?.setBgShadow) {
                          props.setBgShadow(false);
                        }
                        toggleModal();
                      }}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } border-red flex cursor-pointer items-center gap-[15px] px-6 py-2 text-sm`}
                    >
                      <div className='flex h-5 w-5 items-center justify-center'>
                        <LogoutIcon />
                      </div>
                      {/* <BiLogOut color='red' size={20} /> */}
                      {t('signout')}
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Modal
          isOpen={openLogoutModal}
          toggleModal={toggleModal}
          title={t('sure', { ns: 'Modals' })}
          defaultButtons={false}
          small={true}
        >
          <p className='text-[15px]'>{t('logout', { ns: 'Modals' })}</p>
          <div className='flex justify-end space-x-4'>
            <button
              className='rounded border bg-white p-2 py-2 px-4 font-semibold text-[#393939]'
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className='rounded border bg-[#F44336] p-2 py-2 px-4 font-semibold text-white'
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SettingsPopup;
