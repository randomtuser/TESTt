import React from 'react';
import { useState, useEffect } from 'react';
import PopupAlloyCards from '../../popup/popupAlloyCard';
import { useTranslation } from 'react-i18next';
import MaterialComponent from '../../materialComponent/materialComponent';
import { Skeleton } from '@mui/material';
import DetailsLogo from '../../../../icons/detailsLogo';

function AlloysCard({ material, handleDelete }) {
  const [modal, setModal] = useState(false);
  const [loadedMaterial, setLoadedMaterial] = useState(null);
  const [materialIcon, setMaterialIcon] = useState('');
  const nocrucible = true;
  const [formula, setFormula] = useState('');
  const [time, setTime] = useState('');
  const { t } = useTranslation(['Machines']);

  useEffect(() => {
    if (material.materials) {
      setTime(material.assign_at);
      setLoadedMaterial(material.materials);
      //Since the material comes as something like "ZA_ZA12" the split is used so we can divide it and put the 1st part on top and the other on the bottom
      const val = material.materials.material_acr.split('_');
      setMaterialIcon(val[0]);
      setFormula(val[1]);
    }
  }, [material.materials]);

  const toggleModal = () => {
    setModal(!modal);
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
      {/* <div className='mb-[10px] flex w-full justify-center lg:mb-6 '> */}
      <div
        className={`mx-4 flex  h-[130px] w-[100%] items-center justify-between rounded-[10px] bg-white lg:mx-6 lg:h-[110px] ${
          isLoading ? '' : 'px-4   lg:px-8'
        } dark:bg-[#0D0D0D] dark:text-darkWhite ${isLoading ? '' : 'md:px-6'}`}
      >
        {!isLoading ? (
          <div className='relative flex w-full flex-row md:static'>
            <div className=' relative -top-5 flex w-fit items-center md:w-1/3 md:gap-x-5 lg:static'>
              <div className='hidden min-w-fit md:block'>
                <img src='icons/drag.svg' alt='' />
              </div>
              <div className=''>
                <div className='block md:hidden'>
                  <MaterialComponent material={loadedMaterial} onlySquare nocrucible={nocrucible} />
                </div>
                <div className='hidden md:block'>
                  <MaterialComponent material={loadedMaterial} nocrucible={nocrucible} />
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col items-start justify-between gap-y-1 px-5 md:w-1/3 md:items-center md:gap-y-0 '>
              <div className='flex items-center justify-center md:hidden'>
                <div className='relative top-0 -left-1 font-bold text-gray-800 dark:text-darkWhite lg:static'>
                  {loadedMaterial && loadedMaterial.material_name}
                </div>
              </div>
              <div className='hidden items-center  justify-center lg:flex'>
                <div className='flex flex-col text-[20px] text-gray-500 dark:text-[#FFFFFF]'>
                  <span className='text-gray-500'>{t('volume')}: </span>
                  <span className='text-gray-800'>{material.qty} cm³</span>
                </div>
              </div>
            </div>
            <div className='absolute flex   items-center justify-center lg:hidden'>
              <div className='relative top-12 left-0 flex  flex-row  text-[20px] text-gray-500 dark:text-[#FFFFFF]'>
                <span className='mr-1.5 text-gray-500 lg:mr-0'>{t('volume')}:</span>
                <span className='text-gray-800'>{material.qty} cm³</span>
              </div>
            </div>

            <div className=' my-auto justify-end gap-x-3 text-[18px] md:flex md:h-11 md:w-1/3'>
              <button
                className=' absolute  -top-4 right-1 scale-[1.5] items-center justify-center rounded-[5px] border-solid border-[#878787CC] text-[#878787CC] md:static md:top-0 md:flex md:w-28  md:scale-100 md:border-2 md:py-[10px] md:px-[12px]'
                onClick={toggleModal}
              >
                <span className='relative top-0 left-0 '>
                  <DetailsLogo />
                </span>
                <span className='ml-[10px] hidden md:block'>{t('details')}</span>
              </button>
              <PopupAlloyCards
                title={t('alloy')}
                material={loadedMaterial}
                time={time}
                name={material.materials.material_name}
                isOpen={modal}
                toggleModal={toggleModal}
              ></PopupAlloyCards>
            </div>
          </div>
        ) : (
          <Skeleton
            variant='rectangular'
            width='100%'
            height='100%'
            animation='wave'
            sx={{ borderRadius: '10px' }}
          />
        )}
      </div>
      {/* </div> */}
    </>
  );
}

export default AlloysCard;
