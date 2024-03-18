import MaterialComponent from '../../materialComponent/materialComponent';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

export function CrucibleCardMobile(props) {
  const { t } = useTranslation(['Machines']);
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
    <div
      className={`flex w-[95%] items-center justify-between rounded-[10px] ${
        isLoading ? '' : 'bg-white'
      } 
      md:h-[150px] ${isLoading ? '' : 'p-[15px]'}  dark:bg-[#0D0D0D] dark:text-darkWhite md:hidden`}
    >
      {!isLoading ? (
        <div className='relative flex w-full flex-col md:flex-row'>
          <div className='flex w-2/3 flex-col'>
            <div className='flex max-h-[28px] w-full min-w-fit items-center gap-3'>
              <img
                src='icons/crucibleCard.svg'
                className='relative -left-3 scale-[0.6] selection:invert-0 dark:invert md:block md:scale-100'
                alt=''
              />
              <div
                className={`relative -left-6 h-1.5  w-1.5 rounded-full md:left-0 md:h-3 md:w-3 ${
                  props.crucible.connection == null
                    ? 'bg-yellow-500'
                    : props.crucible.connection === true
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              ></div>
              <div className='relative -left-6 md:left-0 '>{props.crucible.crucible_name}</div>
            </div>
            <div className='hidden w-full items-center justify-center bg-blue-300 md:flex'>
              <div className='mt-2 flex w-full items-center justify-start gap-2'>
                <MaterialComponent
                  material={props.loadedMaterial}
                  onlySquare={props.onlySquare}
                  small={props.small}
                  crucible={props.crucible}
                />
                <div>
                  {t('volume')}: {props.crucible ? props.crucible.qty : '0'}cm3
                </div>
              </div>
            </div>
            <div className='flex w-fit items-center justify-center md:hidden'>
              <div className='mt-2 flex w-fit flex-col items-start justify-start gap-2 '>
                <div>
                  {props.loadedMaterial &&
                    props.loadedMaterial.material_acr.split('_')[0] +
                      ' - ' +
                      props.loadedMaterial.material_acr.split('_')[1]}
                </div>
                <div>
                  <span className='font-[500] text-gray-500'>{t('volume')}</span> :{' '}
                  {props.crucible ? props.crucible.qty : '0'}cm3
                </div>
              </div>
            </div>
          </div>
          <div className=' flex h-full w-[40%]  flex-col items-end justify-center md:w-1/3'>
            <button
              className=' absolute -top-1 -right-3 flex w-fit scale-[1.5] items-center justify-center rounded-md border-solid border-gray-500 p-[10px] text-neutral-500 md:block md:scale-100 md:border-2 md:px-5'
              onClick={props.toggleModal}
            >
              <div className='w-6'>
                <img src='icons/info.svg' alt=''></img>
              </div>
              <span className='ml-2 hidden md:block'>{t('details')}</span>
            </button>
            <div className='mt-[8px] w-full text-[16px] font-[500] text-gray-500 md:text-[20px]'>
              Lifespan:
              <div className='flex w-full items-center gap-1'>
                <div className='relative flex h-1.5 w-full items-center rounded bg-gray-300'>
                  <div
                    className='h-full rounded bg-orange-500 transition-all duration-200 '
                    style={{ width: `${props.crucible.lifespan}%` }}
                  ></div>
                </div>
                <div className=''>
                  <div className='text-center'>{props.crucible.lifespan}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          variant='rectangular'
          width='100%'
          height='150px'
          animation='wave'
          sx={{ borderRadius: '10px' }}
        />
      )}
      {/* <div className='h-24 md:hidden'></div> */}
    </div>
  );
}
