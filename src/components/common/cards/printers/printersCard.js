import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabase';
//import PopupCards from '../../Popup/PopupCards.js';
import PopupCardsTest from '../../popup/popupCardsTest';
import { useTranslation } from 'react-i18next';
import DetailsLogo from '../../../../icons/detailsLogo';
import { Skeleton } from '@mui/material';
import PrintersCardPanelsLogo from '../../../../icons/printersCardPanelsLogo';
import MobileDetailsLogo from '../../../../icons/mobileDetailsLogo';

function PrintersCard({ printer, handleDelete, localIp, notify }) {
  const [modal, setModal] = useState(false);
  const [alias, setAlias] = useState(printer.alias || '');

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const { t } = useTranslation(['Machines']);

  //doesnt let the user to put more than 12 characters as a name
  const handleInputChange = (e) => {
    if (e.target.value.length <= 12) {
      setAlias(e.target.value);
    }
  };

  const deletePrinter = async () => {
    // console.log('delete in card');
    handleDelete(printer.printer_id);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('printers')
      .update({ alias: alias })
      .eq('printer_id', printer.printer_id);
    printer.alias = alias;
    toggleModal();
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className='mb-[10px] flex w-full justify-center md:mb-[24px] '>
        <div
          className={`mx-4 flex h-fit w-[100%] flex-col items-center justify-between rounded-[10px] bg-white lg:mx-6 ${
            isLoading ? '' : 'p-[15px] lg:py-4 lg:px-8'
          } dark:bg-[#0D0D0D] dark:text-darkWhite  md:h-[110px]  md:flex-row ${
            isLoading ? '' : 'md:px-6'
          } md:py-0`}
        >
          {/* <div className='flex h-fit w-[95%] flex-col items-center justify-between rounded-large bg-white py-4 px-6 shadow-[0px_8px_24px_rgba(0,0,0,0.1)] dark:bg-[#0D0D0D] dark:text-darkWhite md:h-[110px] md:w-[97%] md:flex-row md:px-8 md:py-0'> */}
          {!isLoading ? (
            <>
              <div className='flex h-[40px] w-full items-center justify-between gap-x-5 md:w-1/3 md:justify-start lg:h-auto '>
                <div className='relative -top-2 -left-2 flex w-fit items-center gap-3 lg:static lg:left-0 lg:top-0'>
                  <div className='hidden min-w-fit md:block '>
                    <img src='icons/drag.svg' className='gray-white' alt='' />
                  </div>
                  <div className='min-w-fit scale-[0.6] lg:scale-100 '>
                    <img
                      src='icons/printerCard.svg'
                      className='selection:invert-0 dark:invert '
                      alt=''
                    />
                  </div>
                  <div>
                    <div
                      className={`h-[6px] w-[6px] rounded-full lg:h-[10px] lg:w-[10px] ${
                        printer.ip !== '' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  {printer.ip != null && printer.ip !== '' ? (
                    <div className='text-sm font-bold md:text-base'>{printer.alias}</div>
                  ) : (
                    <span className='text-sm font-bold md:text-base'>{t('pairing')}</span>
                  )}
                </div>

                <div className='relative -top-2 left-0 block md:static md:hidden'>
                  <button
                    className='flex w-fit items-center justify-end rounded-md border-solid border-gray-500 text-neutral-500 md:justify-center md:border-2 md:px-5'
                    onClick={toggleModal}
                  >
                    <div className='w-6'>
                      <MobileDetailsLogo />
                    </div>
                    <span className='ml-2 hidden md:block'>{t('details')}</span>
                  </button>
                </div>
              </div>
              <div className='flex w-full items-center pt-1 md:pt-0'>
                <div className='ml-0 flex w-full justify-center md:ml-16 md:w-1/2 md:py-0'>
                  <div className='w-full md:w-fit'>
                    {printer.ip != null && printer.ip !== '' ? (
                      <div className='text-[16px] text-neutral-500 md:w-72 md:text-[20px]'>
                        {printer.printer_model.material}
                      </div>
                    ) : (
                      <div className='text-[16px] text-neutral-500 md:w-72 md:text-[20px]'>
                        {'Pairing code: '} {printer.code}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex h-9 w-full justify-end gap-x-3 text-[18px] md:h-11 md:w-1/2 md:gap-x-6'>
                  <button
                    className='hidden w-28 items-center justify-center rounded-[5px] border-2 border-solid border-[#878787CC] py-[10px] px-[1px] text-[#878787CC] md:flex'
                    onClick={toggleModal}
                  >
                    <DetailsLogo />
                    <span className='ml-[10px]'>{t('details')}</span>
                  </button>

                  <a
                    href={'http://' + printer.ip}
                    target='_blank'
                    className='flex w-20 items-center justify-center rounded-[5px] bg-neutral-700 py-[8px] px-[12px] text-white lg:w-28'
                    rel='noreferrer'
                  >
                    <span className='scale-[0.95] lg:scale-100 '>
                      <PrintersCardPanelsLogo localIp={localIp} public_ip={printer.public_ip} />
                    </span>
                    <span className='ml-[6px] text-[14px] lg:ml-[10px] lg:text-[20px]'>
                      {t('panels')}
                    </span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='110px'
              animation='wave'
              sx={{ borderRadius: '10px' }}
            />
          )}
        </div>

        {/* <div className=' h-fit w-[97%] flex-col items-center justify-between rounded-large bg-white py-3 px-8 shadow-[0px_8px_24px_rgba(0,0,0,0.1)] dark:bg-[#0D0D0D] dark:text-darkWhite md:flex md:h-[110px] md:flex-row md:py-0'>
          <div>
            <div className='flex w-full items-center justify-center gap-x-5 md:w-1/3 md:justify-start'>
              <div className='hidden min-w-fit md:block'>
                <img src='icons/drag.svg' />
              </div>
              <div className='min-w-fit'>
                <img src='icons/printerCard.svg' className='selection:invert-0 dark:invert' />
              </div>
              <div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    printer.ip != '' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
              </div>
              <div>
                <div>
                  {printer.ip != null && printer.ip != '' ? (
                    <div className='text-sm font-bold md:text-base'>{printer.alias}</div>
                  ) : (
                    <span className='text-sm font-bold md:text-base'>{t('waitPairing')}</span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex w-1/2 justify-center md:w-1/3'>
              <div>
                <div>
                  {printer.ip != null ? (
                    ''
                  ) : (
                    <div className='w-72 text-lg text-neutral-500'>
                      {t('pairing')} {printer.code}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-3 flex h-9 w-full justify-center gap-x-3 md:my-0 md:h-11 md:w-1/3'>
            <button
              className='flex w-28 items-center justify-center rounded-md border-2 border-solid border-gray-500 p-[10px] text-neutral-500'
              onClick={toggleModal}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.25 12H8.75V7H7.25V12ZM7.9956 5.5C8.20687 5.5 8.38542 5.42855 8.53125 5.28565C8.67708 5.14273 8.75 4.96565 8.75 4.7544C8.75 4.54313 8.67855 4.36458 8.53565 4.21875C8.39273 4.07292 8.21565 4 8.0044 4C7.79313 4 7.61458 4.07145 7.46875 4.21435C7.32292 4.35727 7.25 4.53435 7.25 4.7456C7.25 4.95687 7.32145 5.13542 7.46435 5.28125C7.60727 5.42708 7.78435 5.5 7.9956 5.5ZM8.00575 16C6.9047 16 5.86806 15.7917 4.89583 15.375C3.92361 14.9583 3.07292 14.3854 2.34375 13.6562C1.61458 12.9271 1.04167 12.0767 0.625 11.105C0.208333 10.1334 0 9.09519 0 7.99046C0 6.88571 0.208333 5.85069 0.625 4.88542C1.04167 3.92014 1.61458 3.07292 2.34375 2.34375C3.07292 1.61458 3.92332 1.04167 4.89496 0.625C5.86661 0.208333 6.90481 0 8.00954 0C9.11429 0 10.1493 0.208333 11.1146 0.625C12.0799 1.04167 12.9271 1.61458 13.6562 2.34375C14.3854 3.07292 14.9583 3.92169 15.375 4.89008C15.7917 5.85849 16 6.89321 16 7.99425C16 9.09531 15.7917 10.1319 15.375 11.1042C14.9583 12.0764 14.3854 12.9271 13.6562 13.6562C12.9271 14.3854 12.0783 14.9583 11.1099 15.375C10.1415 15.7917 9.10679 16 8.00575 16ZM8 14.5C9.80556 14.5 11.3403 13.8681 12.6042 12.6042C13.8681 11.3403 14.5 9.80556 14.5 8C14.5 6.19444 13.8681 4.65972 12.6042 3.39583C11.3403 2.13194 9.80556 1.5 8 1.5C6.19444 1.5 4.65972 2.13194 3.39583 3.39583C2.13194 4.65972 1.5 6.19444 1.5 8C1.5 9.80556 2.13194 11.3403 3.39583 12.6042C4.65972 13.8681 6.19444 14.5 8 14.5Z'
                  fill='#878787'
                />
              </svg>
              <span className='ml-2'>{t('details')}</span>
            </button>
            <a
              href={'http://' + printer.ip}
              target='_blank'
              className='flex w-28 items-center justify-center rounded-md bg-neutral-700 p-[10px] text-white'
            >
              <svg
                className={`fill-current ${
                  localIp == ''
                    ? ''
                    : localIp == printer.public_ip
                    ? 'text-green-300'
                    : 'text-red-300'
                }`}
                width='14'
                height='14'
                viewBox='0 0 14 14'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M0 6V0H6V6H0ZM0 14V8H6V14H0ZM8 6V0H14V6H8ZM8 14V8H14V14H8ZM1.5 4.5H4.5V1.5H1.5V4.5ZM9.5 4.5H12.5V1.5H9.5V4.5ZM9.5 12.5H12.5V9.5H9.5V12.5ZM1.5 12.5H4.5V9.5H1.5V12.5Z' />
              </svg>

              <span className='ml-2'>{t('panels')}</span>
            </a>
          </div>
        </div> */}
        <PopupCardsTest
          title={`${printer.alias} ${t('details')}`}
          isOpen={modal}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          handleDelete={deletePrinter}
        >
          <form onSubmit={handleSubmit}>
            <label>
              <div className='flex flex-col items-center justify-center '>
                <div className='my-2 flex w-full flex-col items-center justify-between '>
                  <div className='flex w-full flex-col items-center md:flex-row '>
                    <span className='w-full md:w-1/4'>{t('printerName')}</span>
                    <input
                      value={alias}
                      type='text'
                      id='alias'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-darkWhite'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center md:flex-row'>
                    <span className='w-full md:w-1/4'>{t('ip')}</span>
                    <input
                      value={printer.ip}
                      disabled
                      type='text'
                      id='ip'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-neutral-400'
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center md:flex-row'>
                    <span className='w-full md:w-1/4'>{t('code')}</span>
                    <input
                      value={printer.code}
                      disabled
                      type='text'
                      id='paircode'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-neutral-400'
                    />
                  </div>
                  <div className='mt-3 flex w-full flex-col items-center md:flex-row'>
                    <span className='w-full md:w-1/4'>Id:</span>
                    <input
                      value={printer.printer_id}
                      disabled
                      type='text'
                      id='printer_id'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-neutral-400'
                    />
                  </div>
                </div>
              </div>
            </label>
          </form>
        </PopupCardsTest>
      </div>
    </>
  );
}

export default PrintersCard;

/**
 * plane A:
 * 1-stay with bader
 * 2-if I found a jop, stuck with it
 */

/**
 * 1-seek ref : think about it in logical way
 * 2-germany
 * 3-poland
 */
