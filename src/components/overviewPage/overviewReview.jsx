import React, { useEffect, useState } from 'react';
import Checked from '../../icons/checked';
import PartCast from '../../icons/partsCast';
import FilamentPrinted from '../../icons/filamentPrinted';
import AlloyCast from '../../icons/alloyCast';
import { formatNumber } from './overviewWidgets/reviewBlock';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

function OverviewReview({ partsprinted, partscasted, alloycasted }) {
  const { t } = useTranslation(['Overview']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='overview-review  mx-auto my-0 mb-[10px] mt-0 overflow-hidden rounded-[10px]  px-[12px]  md:px-[1.2vw] lg:mb-[1.2vw] lg:mt-[1.2vw] xl:mb-6  3xl:my-[1.2vw]  3xl:pr-[0px]  '>
      <div className='overview-review-grid flex   grid-cols-[repeat(4,1fr)] flex-col flex-wrap items-center gap-[10px] rounded-[10px] text-[16px]  md:grid md:text-[20px] lg:grid-cols-[repeat(4,1fr)] xl:grid-rows-[10.8vh] lg:grid-rows-[repeat(2,1fr)]  lg:justify-items-center lg:gap-[1.2vw] 3xl:grid-rows-[7vh] 3xl:text-[0.9vw]'>
        <div
          className={`item box-border flex h-full w-full   flex-wrap items-center rounded-[10px] bg-white ${
            isLoading ? '' : 'p-[0.2rem]'
          }  text-center text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite`}
        >
          {!isLoading ? (
            <div className=' item box-border flex w-full flex-row items-center  justify-between rounded-[10px] bg-white p-[0.2rem] px-6  text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite md:justify-center  lg:h-full lg:px-0 '>
              <div className='item-img flex w-fit min-w-[25px] items-center overflow-hidden  '>
                <Checked />
              </div>
              <div className=' lg:min-w-auto  ml-3 min-w-[80%] whitespace-nowrap py-2 md:min-w-fit'>
                <p className='relative text-left'>
                  {t('partsPrinted')}
                  <span className='hidden w-full text-left font-semibold text-[black]  dark:text-[#7B7B7B] sm:ml-3 md:inline-block'>
                    {formatNumber(partsprinted)}
                  </span>
                </p>
              </div>
              <span className=' text-right	font-semibold  text-[black] dark:text-[#7B7B7B] md:hidden'>
                {formatNumber(partsprinted)}
              </span>
            </div>
          ) : (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='100%'
              animation='wave'
              sx={{ borderRadius: '10px', minHeight: '100%' }}
            />
          )}
        </div>

        <div
          className={`item box-border flex  h-full w-full flex-wrap  items-center rounded-[10px] bg-white ${
            isLoading ? '' : 'p-[0.2rem]'
          } text-center text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite`}
        >
          {!isLoading ? (
            <div className=' item box-border flex w-full flex-row items-center  justify-between rounded-[10px] bg-white p-[0.2rem] px-6  text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite md:justify-center  lg:h-full lg:px-0 '>
              <div className='item-img flex w-fit min-w-[25px] items-center overflow-hidden  '>
                <PartCast />
              </div>
              <div className=' lg:min-w-auto  ml-3 min-w-[80%] whitespace-nowrap py-2 md:min-w-fit'>
                <p className='relative text-left'>
                  {t('partsCast')}
                  <span className='hidden w-full text-left font-semibold text-[black]  dark:text-[#7B7B7B] sm:ml-3 md:inline-block'>
                    {formatNumber(partscasted)}
                  </span>
                </p>
              </div>
              <span className=' text-right	font-semibold  text-[black] dark:text-[#7B7B7B] md:hidden'>
                {formatNumber(partscasted)}
              </span>
            </div>
          ) : (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='100%'
              animation='wave'
              sx={{ borderRadius: '10px', minHeight: '100%' }}
            />
          )}
        </div>

        <div
          className={`item box-border flex h-full w-full  flex-wrap items-center rounded-[10px] bg-white ${
            isLoading ? '' : 'p-[0.2rem]'
          } text-center text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite`}
        >
          {!isLoading ? (
            <div className=' item box-border flex w-full flex-row items-center  justify-between rounded-[10px] bg-white p-[0.2rem] px-6  text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite md:justify-center  lg:h-full lg:px-0 '>
              <div className='item-img flex w-fit min-w-[25px] items-center overflow-hidden  '>
                <FilamentPrinted />
              </div>
              <div className=' lg:min-w-auto  ml-3 min-w-[80%] whitespace-nowrap py-2 md:min-w-fit'>
                <p className='relative text-left'>
                  {t('filamentPrinted')}
                  <span className='hidden w-full text-left font-semibold text-[black]  dark:text-[#7B7B7B] sm:ml-3 md:inline-block'>
                    0 g
                  </span>
                </p>
              </div>
              <span className=' relative whitespace-nowrap text-right	font-semibold  text-[black] dark:text-[#7B7B7B] md:hidden'>
                0 g
              </span>
            </div>
          ) : (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='100%'
              animation='wave'
              sx={{ borderRadius: '10px', minHeight: '100%' }}
            />
          )}
        </div>

        <div
          className={`item box-border flex  h-full w-full  flex-wrap items-center rounded-[10px] bg-white ${
            isLoading ? '' : 'p-[0.2rem]'
          }  text-center text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite`}
        >
          {!isLoading ? (
            <div className=' item box-border flex w-full flex-row items-center  justify-between rounded-[10px] bg-white p-[0.2rem] px-6  text-[gray] dark:bg-[#0D0D0D] dark:text-darkWhite md:justify-center  lg:h-full lg:px-0 '>
              <div className='item-img flex w-fit min-w-[25px] items-center overflow-hidden  '>
                <AlloyCast />
              </div>
              <div className=' lg:min-w-auto  ml-3 min-w-[80%] whitespace-nowrap py-2 md:min-w-fit'>
                <p className='relative text-left'>
                  {t('alloyCast')}
                  <span className='hidden w-full text-left font-semibold text-[black]  dark:text-[#7B7B7B] sm:ml-3 md:inline-block'>
                    {formatNumber(alloycasted)} cm³
                  </span>
                </p>
              </div>
              <span className=' text-right	font-semibold  text-[black] dark:text-[#7B7B7B] md:hidden'>
                {formatNumber(alloycasted)}
              </span>
            </div>
          ) : (
            <Skeleton
              variant='rectangular'
              width='100%'
              height='100px'
              animation='wave'
              sx={{ borderRadius: '10px', minHeight: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewReview;
