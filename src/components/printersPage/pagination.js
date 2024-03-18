import PaginationWidget from '../common/pagination/pagination';
import { useTranslation } from 'react-i18next';

export default function Pagination(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      <div className='fixed bottom-3 w-full flex-col justify-center lg:left-[98px]'>
        <button
          onClick={props.toggleModal}
          className='relative z-10 mr-4  ml-auto flex w-fit items-center  gap-1 rounded bg-[#FB8500] p-2 px-2 text-center text-white hover:bg-orange-500 md:hidden md:min-w-[190px] md:px-3'
        >
          <div>
            <img src='icons/addPrinterLight.svg' alt='plusIcon' />
          </div>
          <div className='block font-thin'>{t('addPrinter')}</div>
        </button>

        {props.searchResult?.length !== 0 && (
          <PaginationWidget
            items={props.searchResult?.length}
            itemsPerPage={props.itemsPerPage}
            range={props.rangePagination}
            onPageChange={props.handlePageChange}
            currentPage={props.currentPage}
          />
        )}
      </div>
    </>
  );
}
