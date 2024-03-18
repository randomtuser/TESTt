import React from 'react';

import { useTranslation } from 'react-i18next';
import PopupAlloyCardComp from './popupAlloyCardComp';

function PopupAlloyCards({
  isOpen,
  toggleModal,
  material,
  time,
  defaultFormat = false,
  title = '',
  name = '',
}) {
  const date = time.substring(0, 10);
  const { t } = useTranslation(['Machines']);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[90] flex items-center justify-center p-[24px]'>
          <div onClick={toggleModal} className='absolute inset-0 bg-gray-700 opacity-50'></div>
          <div
            className={`relative flex max-h-[520px] flex-col rounded-[10px] bg-white dark:bg-[#1B1B1B] 
            ${
              !defaultFormat ? 'w-11/12  justify-center p-6 px-5 pb-5 md:w-auto' : ' w-4/5 md:w-1/4'
            }
            `}
          >
            <div
              className={`flex w-full flex-row justify-between ${
                !defaultFormat ? 'pb-4' : 'hidden'
              }`}
            >
              {!defaultFormat && (
                <div className='flex-col text-left text-xl'>
                  <div className='flex flex-row justify-between font-bold text-gray-800 dark:text-darkWhite'>
                    {title}:
                    <div className='ml-3 flex-nowrap  text-lg font-normal text-[#FB8500]'>
                      {name}
                    </div>
                  </div>
                </div>
              )}
              {!defaultFormat && (
                <div className='flex w-1/12 items-end justify-end'>
                  <button
                    className='justify-end p-2 font-sans text-2xl font-thin'
                    onClick={toggleModal}
                  >
                    <img src='icons/closingModal.svg' alt='' />
                  </button>
                </div>
              )}
            </div>
            <div
              className={`grid min-h-min grid-cols-1 overflow-x-hidden overflow-y-scroll md:grid-cols-2 md:overflow-hidden ${
                !defaultFormat
                  ? ' flex flex-col  border-t border-[#CCCCCC] pt-4 text-[#393939] dark:text-darkWhite md:flex-row'
                  : ''
              }`}
            >
              <div className='grid h-fit w-full grid-rows-6 gap-2 border-r-0 md:border-r-2 md:border-[#CCCCCC] md:pr-10 md:pb-0'>
                <div className='flex items-center justify-start text-xl font-bold'>
                  {t('mechanical')}
                </div>
                <PopupAlloyCardComp
                  name={t('ultimate')}
                  value={material.u_tensil_strenght}
                  icon={'icons/ultimate.svg'}
                />
                <PopupAlloyCardComp
                  name={t('yield')}
                  value={material.yield_tensile_strenght}
                  icon={'icons/yieldIcon.svg'}
                />
                <PopupAlloyCardComp
                  name={t('elangation')}
                  value={material.elongation_at_break}
                  icon={'icons/elegation.svg'}
                />
                <PopupAlloyCardComp
                  name={t('hardness')}
                  value={material.hardness}
                  icon={'icons/hardness.svg'}
                />
                <PopupAlloyCardComp
                  name={t('modulus')}
                  value={material.moe}
                  icon={'icons/modulus.svg'}
                />
                <div className='border-b border-[#CCCCCC] sm:hidden sm:border-0'></div>
              </div>

              <div className='grid h-fit grid-rows-5 gap-2 md:mt-0 md:pl-9'>
                <div className='flex items-center justify-start border-t-2 border-[#CCCCCC] text-xl  font-bold md:border-t-0 lg:border-t-0'>
                  {t('physical')}
                </div>
                <PopupAlloyCardComp
                  name={t('density')}
                  value={material.density_m}
                  icon={'icons/density.svg'}
                />

                <PopupAlloyCardComp
                  name={t('pouring')}
                  value={material.pouring_temp}
                  icon={'icons/pouring.svg'}
                />
                <div className='flex items-center justify-start border-t-2 border-[#CCCCCC] text-xl  font-bold md:border-t-0 lg:border-t-0'>
                  {t('alloy')}
                </div>
                <PopupAlloyCardComp
                  name={t('volume')}
                  value={material.pouring_temp}
                  icon={'icons/volume.svg'}
                />
                <PopupAlloyCardComp name={t('last')} value={date} icon={'icons/change.svg'} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupAlloyCards;
