import HeaderContent from './headerContent/headerContent';
import PaginationWidget from './pagination/pagination';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function DefaultComps(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      <div className='flex items-center md:hidden'>
        <Link to={process.env.PUBLIC_URL + `/`}>
          <button className='mx-3 flex items-center rounded bg-white p-2  pl-3 dark:invert'>
            <span className='h-4 w-4  rotate-[225deg] transform border-r-2 border-t-2 border-[#393939] border-opacity-70 '>
              {' '}
            </span>
          </button>
        </Link>
        <p className='text-[#393939] text-opacity-50 dark:text-[#878787]'>Back to Overview</p>
      </div>

      <div className='fixed bottom-3 flex w-full flex-col justify-center lg:left-[98px]'>
        {props.searchResult.length !== 0 && (
          <PaginationWidget
            items={props.searchResult.length}
            itemsPerPage={props.itemsPerPage}
            range={props.rangePagination}
            onPageChange={props.handlePageChange}
            currentPage={props.currentPage}
          />
        )}
      </div>

      <HeaderContent>
        <div className='mt-[15px] flex h-11 w-full justify-center 3xl:mt-[1.9vh] 3xl:mx-auto 3xl:w-[70%] 3xl:h-[3.7vh]'>
          <div className='flex h-full w-full items-center justify-center md:w-3/4'>
            <div className='relative ml-3 mr-3 w-full text-gray-400'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <button type='submit' className='focus:shadow-outline p-1 focus:outline-none'>
                  <BiSearch />
                </button>
              </span>
              <input
                type='search'
                name='s'
                className='w-full rounded-[5px] border border-[#CCC] bg-[#e5e5e5] p-2.5 pl-10 placeholder-gray-400 dark:border-[#404040] dark:bg-[#1B1B1B] dark:text-gray-500'
                placeholder={t('search')}
                autoComplete='off'
                value={props.searchTerm}
                onChange={props.handleInputChange}
              />
            </div>
          </div>
        </div>
      </HeaderContent>
    </>
  );
}
