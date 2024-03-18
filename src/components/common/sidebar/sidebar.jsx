import { Link } from 'react-router-dom';
import { useState, useEffect, cloneElement } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainSideBar from './mainSideBar';
import SidebarMobile from './sidebarMobile';
export default function Sidebar(props) {
  const { t } = useTranslation(['Sidebar']);

  const location = useLocation();
  //console.log(location.pathname.toLocaleLowerCase().substring(1).replace('/', ''));
  let locationname = false;
  // local
  // let locationTest = location.pathname.toLocaleLowerCase().substring(1).replace('/', '');

  // deploy
  let locationTest = location.pathname.toLocaleLowerCase().substring(1).split('/').pop();
  if (
    locationTest === 'signin' ||
    locationTest === 'signup' ||
    locationTest === 'afterregister' ||
    locationTest === 'newpassword' ||
    locationTest === 'registeremail' ||
    locationTest === 'resetpassword' ||
    locationTest === 'terms' ||
    locationTest === 'privacy' ||
    /^signupuser(\/.*)?$/.test(location.pathname.toLocaleLowerCase().replace('/', ''))
  ) {
    locationname = true;
  }

  const [sidebarItems, setSidebarItems] = useState(MainSideBar(t));

  useEffect(() => {
    setSidebarItems((prevSidebarItems) =>
      prevSidebarItems.map((item) => ({
        ...item,
        active: item.id === locationTest,
      })),
    );
  }, [locationTest]);

  let trad;

  const [user1, setUser1] = useState({});

  switch (user1.role) {
    case 'owner':
      trad = `${t('owner')}`;
      break;

    case 'user':
      trad = `${t('user')}`;
      break;
    default:
  }

  return (
    <>
      {locationname === false ? (
        // <div className='hidden h-full w-full select-none bg-white lg:block'>
        <>
          <div
            className={`fixed left-0 hidden h-screen w-[312px] border-zinc-200 bg-white dark:bg-[#0D0D0D] lg:block 3xl:left-auto 3xl:block 3xl:w-[16.2vw]`}
          >
            <div className='ml-[3em] flex items-center justify-center gap-3 py-7 3xl:ml-[1vw]  '>
              <Link
                to={process.env.PUBLIC_URL + '/'}
                className='flex h-fit w-fit  items-center justify-center gap-3 dark:invert'
              >
                <img className='scale-[.8] 3xl:w-[2vw]' src='icons/logo.svg' alt='' />
                <img className='mt-2 w-[11em] 3xl:w-[10vw] ' src='icons/metalmaker.svg' alt='' />
              </Link>
            </div>

            <div className='relative'>
              <div className='font-popins ml-auto w-[77%] pt-6 3xl:ml-[5Fvw]'>
                {sidebarItems.map((item) => (
                  <Link
                    to={process.env.PUBLIC_URL + item.link}
                    key={item.id}
                    className=' flex items-center gap-0 pb-[24px] font-sans '
                    //Can add orangesvg to className to get more awesome effect
                  >
                    <div
                      className={`w-[18%] scale-[1] tracking-wider	 ${
                        item.active ? 'fill-[#FB8500]' : 'fill-[#878787] opacity-70'
                      } `}
                    >
                      {cloneElement(item.svg, {
                        className: 'fill-inherit 3xl:scale-[1.2]',
                      })}
                    </div>
                    <div
                      className={` text-[1.5em] font-normal  hover:text-[#393939] dark:hover:text-white 3xl:text-[1.2vw] ${
                        item.active
                          ? 'text-[#393939] dark:text-darkWhite '
                          : 'text-[#878787] opacity-70 '
                      } `}
                    >
                      {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
                    </div>
                    <div
                      className={`-scale-y-1 absolute  right-0  h-9 w-[6px] rounded-sidebarButton ${
                        item.active ? '' : 'hidden'
                      } bg-[#FB8500] `}
                    ></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        // </div>
        ''
      )}
      <SidebarMobile
        closeSideBar={props.closeSideBar}
        isOpenSideBar={props.isOpenSidebar}
        toggleSidebar={props.toggleSidebar}
        user1={user1}
        t={t}
      />
    </>
  );
}
