import HeaderContent from '../common/headerContent/headerContent';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

export default function FoundryHeader(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      <HeaderContent>
        <div className='mt-[15px] flex h-11 w-full justify-center 3xl:mt-[1.9vh] 3xl:mx-auto 3xl:w-[70%] 3xl:h-[3.7vh]'>
          <div className='ml-4 mr-2 flex h-full w-full items-center justify-center pr-4 md:w-3/4 '>
            <div className='relative h-full w-full text-gray-400'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <button type='submit' className='focus:shadow-outline p-1 focus:outline-none'>
                  <BiSearch />
                </button>
              </span>
              <input
                type='search'
                name='s'
                className='h-full w-full rounded-[5px] border border-[#CCC] bg-[#e5e5e5] p-2.5 pl-10 placeholder-gray-400 dark:border-[#404040] dark:bg-[#1B1B1B] dark:text-gray-500'
                placeholder={t('search')}
                autoComplete='off'
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={props.toggleModal}
            className='mr-4 hidden h-full  w-fit items-center justify-center gap-1 rounded-[5px] bg-[#FB8500] p-2.5 px-5 text-center text-white hover:bg-orange-500 md:flex md:min-w-[160px] md:px-2'
          >
            <div>
              <img src='icons/addFoundryLight.svg' alt='' />
            </div>
            <div className='hidden md:block'>{t('addFoundry')}</div>
          </button>
        </div>
      </HeaderContent>
    </>
  );
}
