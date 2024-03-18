import PrintersCard from '../common/cards/printers/printersCard';
import { useTranslation } from 'react-i18next';

export default function PrinterCardList(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      <div className='flex w-full flex-col items-center md:mt-[30px]'>
        {props.searchResult
          ?.slice(
            (props.currentPage - 1) * props.itemsPerPage,
            props.currentPage * props.itemsPerPage,
          )
          .map((printer) => (
            <div key={printer.printer_id} className='w-full'>
              <PrintersCard
                printer={printer}
                handleDelete={props.handleDelete}
                localIp={props.userIp}
                notify={props.notify}
              />
            </div>
          ))}
        {props.loaded && props.searchResult?.length === 0 && (
          <div className='mt-24 text-center text-xl font-bold dark:text-darkWhite'>
            {t('dataPrinter')}
          </div>
        )}
      </div>
      <div className='h-[105px] md:hidden'></div>
    </>
  );
}
