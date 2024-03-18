import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { useAuth } from '../../../hooks/auth';

export default function Hamburger(props) {
  const mainSidebar = [
    {
      text: 'Overview',
      icon: process.env.PUBLIC_URL + '/icons/overview.png',
      link: '/',
    },
    {
      text: 'Foundries',
      icon: process.env.PUBLIC_URL + '/icons/foundry_dash.svg',
      link: '/foundries',
    },
    {
      text: 'Printers',
      icon: process.env.PUBLIC_URL + '/icons/printer_dash.svg',
      link: '/printers',
    },
    {
      text: 'Alloys',
      icon: process.env.PUBLIC_URL + '/icons/alloy.png',
      link: '/alloys',
    },

    {
      text: 'Crucibles',
      icon: process.env.PUBLIC_URL + '/icons/crucible.png',
      link: '/crucibles',
    },
    {
      text: 'Settings',
      icon: process.env.PUBLIC_URL + '/icons/settings_fill.svg',
      link: '/settings',
    },
    {
      text: 'Log Out',
      icon: process.env.PUBLIC_URL + '/icons/power_fill.svg',
      link: '/settings',
    },
  ];

  const { user } = useAuth();
  const id = user?.id;

  async function loadUserData() {
    let { data, error } = await supabase.from('profiles').select().eq('id', id);
    // data[0].avatar_url = (
    //   await supabase.storage.from('avatars').createSignedUrl(user1.avatar_url + '.png', 3600)
    // );
    /*     let prueba = await (
      await supabase.storage.from('avatars').createSignedUrl(data[0].avatar_url + '.png', 3600)
    ).data.signedUrl;
    data[0].avatar_url = prueba; */
    setUser1(data[0]);
  }

  useEffect(() => {
    loadUserData(setUser1);
  }, [user]);

  const [user1, setUser1] = useState({});

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const style = props;

  return (
    <>
      <div className='flex lg:hidden'>
        <button
          type='button'
          className='-m-2.5 inline-flex h-16 w-16 items-center justify-center rounded-md p-2.5 text-gray-700'
          onClick={() => setMobileMenuOpen(true)}
        >
          <img
            src={process.env.PUBLIC_URL + '/icons/overview_dash.png'}
            className='h-8 w-8'
            alt=''
          ></img>
        </button>
      </div>

      <Dialog as='div' className='lg:hidden  ' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-10 ' />
        <Dialog.Panel
          className={`fixed inset-y-0 bg-zinc-100 ${
            style === 1 ? ' right-0' : ''
          } z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div
            type='button'
            className='-m-2.5 flex w-full justify-end rounded-md p-2.5 text-gray-700'
          >
            <RxCross1
              className='h-6 w-6'
              aria-hidden='true'
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
          <div className='flex items-center gap-8'>
            <Link to='/settings' onClick={() => setMobileMenuOpen(false)}>
              <div className=' flex items-center py-4'>
                <img
                  className=' h-[60px] w-[60px] rounded-full object-cover'
                  src={user1.avatar_url}
                  alt='Avatar'
                  width='100'
                  height='100'
                />
                <div className=' xl:text-md hyphens-auto  pl-5  text-gray-800 lg:text-sm'>
                  <div className='font-bold'>{user1.full_name}</div>
                  <div className='text-[15px] text-gray-400'>{user1.role}</div>
                </div>
              </div>
            </Link>
          </div>

          <nav>
            {mainSidebar.map((item) => (
              <div key={item.text}>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={item.link}
                  className=' mb-[2 %] flex h-full w-[70%]  items-center rounded-md bg-zinc-100 p-[2%]  font-semibold text-gray-800 hover:text-black hover:invert  md:mb-[5%] 2xl:mb-[6%]'
                >
                  <img src={item.icon} className=' w-[15%]  ' alt='overview' />
                  <div className='ml-4'>{item.text}</div>
                </Link>
                {item.text === 'Overview' || item.text === 'Crucibles' ? (
                  <hr className='mt-[5%] mb-[5%] mr-4    border border-black'></hr>
                ) : (
                  ''
                )}
              </div>
            ))}
          </nav>

          {/* <div className='mt-6 flow-root bg-zinc-100'>
            <div className=' flex flex-col   '>
              <Link to='/settings ' onClick={() => setMobileMenuOpen(false)}>
                <div className=' flex flex-col items-center   '>
                  <img
                    className='h-20 w-20 rounded-full object-cover'
                    src={user1.avatar_url}
                    alt='Avatar'
                    width='100'
                    height='100'
                  />
                  <h2 className='mt-4 font-bold text-gray-800'>{user1.full_name}</h2>
                  <span className='text-sm text-gray-500'>{user1.role}</span>
                </div>
              </Link>
              <nav className='  ml-4 mt-4 mr-4  '>
                <div className='grid grid-rows-3 gap-6'>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to='/'
                    className='flex h-full w-full  items-center gap-6    bg-zinc-100 font-semibold text-gray-800 hover:bg-zinc-200'
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/icons/overview.png '}
                      className=' w-[20%] '
                      alt='overview'
                    ></img>
                    <div>Overview</div>
                  </Link>

                  <div className='flex'>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to='/Foundries'
                      className='flex items-center justify-start   bg-zinc-100  font-semibold text-gray-800 hover:bg-zinc-200'
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/icons/foundry_dash.svg'}
                        className=' w-[20%] p-1'
                        alt='overview'
                      ></img>

                      <div className='ml-8 flex'>Foundries</div>
                    </Link>
                  </div>

                  <div className='flex'>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to='/Materials'
                      className='flex items-center justify-start  bg-zinc-100   font-semibold text-gray-800  hover:bg-zinc-200'
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/icons/alloy.png'}
                        className=' w-[20%] p-1'
                        alt='overview'
                      ></img>
                      <div className='ml-8 flex'>Alloys</div>
                    </Link>
                  </div>

                  <span className='w-[100%] items-center justify-center border-b border-zinc-600  '></span>
                </div>

                <div className='mt-6 grid grid-rows-2 gap-6'>
                  <div className='flex'>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to='/Printers'
                      className='flex items-center justify-start  bg-zinc-100   font-semibold   hover:bg-zinc-200'
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/icons/printer_dash.svg'}
                        className=' w-[20%]   p-1 '
                        alt='overview'
                      ></img>

                      <div className='ml-8 flex'>Printers</div>
                    </Link>
                  </div>

                  <div className='flex p-[1%]'>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to='/Crucibles  '
                      className='flex items-center justify-start   bg-zinc-100   font-semibold text-gray-800  hover:bg-gray-200'
                    >
                      <img
                        src={process.env.PUBLIC_URL + '/icons/crucible.png'}
                        className=' w-[19%] p-1'
                        alt='overview'
                      ></img>

                      <div className='ml-8 flex'>Crucibles</div>
                    </Link>
                  </div>
                </div>
              </nav>

              <div className=''>
                <div className='mt-[30px]   '>
                  <RiQrCodeFill size={130} color={'black'} className='m-auto' />
                </div>
              </div>
            </div>
          </div> */}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
