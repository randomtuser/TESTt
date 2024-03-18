import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainsideBar from './mainsidebar';
import HoversideBar from './hoversidebar';
export default function SettingsSidebar() {
  const { t } = useTranslation(['Sidebar']);

  const location = useLocation();
  //console.log(location.pathname.toLocaleLowerCase().substring(1).replace('/', ''));
  let locationTest = location.pathname.toLocaleLowerCase().substring(1).replace('/', '');

  MainsideBar(t).forEach((element) => {
    element.id === locationTest ? (element.active = true) : (element.active = false);

    let svg = document.getElementById(element.id + 'svg');

    if (svg) {
      svg.setAttribute('fill', element.active === true ? '#FB8500' : '#878787');
    }
  });

  const [sidebarbool, setHoverSidebar] = useState(false);

  const handleMouseEnter = () => {
    setHoverSidebar(true);
  };

  const handleMouseLeave = () => {
    setHoverSidebar(false);
  };

  return (
    <>
      <div
        className={`fixed left-0 hidden h-screen w-[23rem] border-r-2 border-zinc-200 bg-white dark:border-0 dark:bg-[#161616] lg:flex`}
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='w-[103px] bg-[#393939] transition-all hover:relative hover:z-10 hover:h-screen hover:w-[80%] dark:bg-[#0D0D0D]'
          // className='w-[28%] bg-[#393939] transition-all hover:relative hover:z-10 hover:h-screen hover:w-[80%]  '
        >
          <div className='mx-auto flex h-[5.5rem] w-[70%] items-center justify-center gap-3 py-7 text-2xl text-[#393939]'>
            <Link
              to={process.env.PUBLIC_URL + '/'}
              className='flex h-fit w-fit items-center justify-center gap-3 '
            >
              <img src='icons/logowhite.svg' alt='' />
            </Link>
          </div>

          <div className=''>
            <div className='mx-auto pt-6'>
              {HoversideBar(t).map((item) => (
                <Link
                  to={process.env.PUBLIC_URL + item.link}
                  key={item.id}
                  className={` flex items-center justify-center gap-6 pb-4 font-sans`}
                  //Can add 'orangesvg' to className to get more awesome effect
                >
                  <div
                    className={`flex h-10 w-[40%]  ${
                      sidebarbool ? ' justify-end ' : 'justify-center'
                    }`}
                  >
                    {item.svg}
                  </div>
                  {sidebarbool ? (
                    <div className={` sidebar h-10 w-[60%] text-xl text-[#878787]`}>
                      {item.text}
                    </div>
                  ) : (
                    ''
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={`block  ${sidebarbool ? ' w-[20%]' : 'w-[72%]'} `}>
          <div className='mx-auto flex w-[70%] items-center gap-3 py-7 text-2xl text-[#393939]'>
            <Link
              to={process.env.PUBLIC_URL + '/settings'}
              className='flex h-fit w-fit items-center justify-center gap-3 dark:text-darkWhite'
            >
              {sidebarbool ? <div className='pt-8'></div> : t('settings')}
            </Link>
          </div>

          <div className={`relative`}>
            <div className='mx-auto w-[70%] pt-6'>
              {MainsideBar(t).map((item) => (
                <Link
                  to={process.env.PUBLIC_URL + item.link}
                  key={item.id}
                  className={` text-xl font-normal ${
                    item.active ? 'text-[#393939] ' : 'text-[#878787]'
                  }   flex items-center gap-4 pb-4 font-sans`}
                  //Can add 'orangesvg' to className to get more awesome effect
                >
                  <div className={`w-[20%] ${sidebarbool ? 'mx-auto h-10' : ''}`}>{item.svg}</div>
                  <div
                    className={`text-xl font-normal ${
                      item.active ? 'text-[#393939] ' : 'text-[#878787]'
                    } `}
                  >
                    {!sidebarbool ? (
                      <div
                        className={`sidesettings overflow-hidden whitespace-nowrap text-xl ${
                          item.active ? 'text-[#393939] dark:text-darkWhite ' : 'text-[#878787]'
                        } `}
                      >
                        {item.text}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
