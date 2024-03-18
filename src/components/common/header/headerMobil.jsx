import NotificationPopup from '../notificationPopup/notificationPopup';
import { useState, useEffect } from 'react';
function HeaderMobil(props) {
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
    <div className='flex lg:hidden'>
      <div className='mt-[16px] grid h-12 w-full grid-cols-3 items-center justify-between px-6 font-bold text-[#393939] dark:bg-[#1B1B1B] dark:text-darkWhite'>
        <button className='col-span-1 dark:invert' onClick={props.toggleSidebar}>
          <img src='icons/sidebarbutton.svg' alt=''></img>
        </button>
        <div className='col-span-1 flex items-center justify-center text-center text-base'>
          {props.headerText}
        </div>
        <div className='col-span-1 flex items-end justify-end gap-3'>
          <img
            src='icons/darkmodeIcon.svg'
            width={20}
            height={20}
            className='icon dark:invert'
            alt='Select a lenguage'
            onClick={handleSwitch}
          />
          <div
            onClick={() => {
              props.toggleModalScan();
            }}
          >
            <svg
              className='cursor-pointer fill-[#393939] dark:fill-white'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 5V0H5V2H2V5H0ZM0 20V15H2V18H5V20H0ZM15 20V18H18V15H20V20H15ZM18 5V2H15V0H20V5H18ZM15.5 15.5H17V17H15.5V15.5ZM15.5 12.5H17V14H15.5V12.5ZM14 14H15.5V15.5H14V14ZM12.5 15.5H14V17H12.5V15.5ZM11 14H12.5V15.5H11V14ZM14 11H15.5V12.5H14V11ZM12.5 12.5H14V14H12.5V12.5ZM11 11H12.5V12.5H11V11ZM17 3V9H11V3H17ZM9 11V17H3V11H9ZM9 3V9H3V3H9ZM7.5 15.5V12.5H4.5V15.5H7.5ZM7.5 7.5V4.5H4.5V7.5H7.5ZM15.5 7.5V4.5H12.5V7.5H15.5Z' />
            </svg>
          </div>

          <NotificationPopup notifications={props.notificationList} notify={props.notify} mobile />
        </div>
      </div>
    </div>
  );
}
export default HeaderMobil;
