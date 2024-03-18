import React, { useState, useEffect } from 'react';
import PopupCardsTest from '../../popup/popupCardsTest';
import './crucibleCard.css';
import { useTranslation } from 'react-i18next';
import { CrucibleCardMobile } from './crucibleCardMobile';
import MaterialComponent from '../../materialComponent/materialComponent';
import Alert from '../../alert/alert';
import { Skeleton } from '@mui/material';
import { updateCrucibleName } from '../../../../Pages/Crucibles/api/updateCrucible';

function CrucibleCard({ crucible, handleDelete }) {
  const [modal, setModal] = useState(false);
  const [crucible_name, setCrucibleName] = useState('');
  const [loadedMaterial, setLoadedMaterial] = useState(null);
  const [materialIcon, setMaterialIcon] = useState('');
  const [formula, setFormula] = useState('');
  const [conformation, setConformation] = useState(false);
  const { t } = useTranslation(['Machines']);

  useEffect(() => {
    if (crucible.materials) {
      setCrucibleName(crucible.crucible_name);
      setLoadedMaterial(crucible.materials);
      //Since the material comes as something like "ZA_ZA12" the split is used
      //so we can divide it and put the 1st part on top and the other on the bottom
      const val = crucible.materials.material_acr.split('_');
      setMaterialIcon(val[0]);
      setFormula(val[1]);
    }
  }, [crucible.materials]);

  let connection;

  const toggleModal = () => {
    setModal(!modal);
  };

  if (crucible.connection === true) {
    connection = 'Connected';
  } else {
    connection = 'Offline';
  }

  const handleInputChange = (e) => {
    // Limit the input value to 10 characters
    if (e.target.value.length <= 12) {
      setCrucibleName(e.target.value);
    }
  };

  const deleteCrucible = () => {
    setConformation(true);
    toggleModal();
  };
  const toggleConformation = () => {
    setConformation(false);
  };
  const confirmedDeletion = () => {
    handleDelete(crucible.crucible_id);
    toggleConformation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (crucible_name) {
      setModal(!modal);
    }
    await updateCrucibleName(crucible, crucible_name);
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
      <div className='mb-[10px] flex w-full justify-center px-1 md:mb-[24px]'>
        <div
          className={`mx-[20px] hidden h-[110px] w-[100%] items-center justify-between rounded-[10px] bg-white ${
            isLoading ? '' : 'px-8'
          } dark:bg-[#0D0D0D] dark:text-darkWhite md:flex`}
        >
          {!isLoading ? (
            <>
              <div className='flex w-1/4 items-center gap-x-4'>
                <div className='min-w-fit'>
                  <img src='icons/drag.svg' alt='' />
                </div>
                <div className='min-w-fit'>
                  <img
                    src='icons/crucibleCard.svg'
                    className='selection:invert-0 dark:invert'
                    alt=''
                  />
                </div>
                <div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      crucible.connection == null
                        ? 'bg-yellow-500'
                        : crucible.connection === true
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                </div>
                <div className='font-semibold text-[#393939]'>
                  <div>{crucible.crucible_name}</div>
                </div>
              </div>
              <div className='ml-16 flex w-1/3 flex-col justify-start font-[500] text-gray-500'>
                <span className='mb-0.25'>Lifespan</span>
                <div className='relative flex h-1.5 w-[70%] items-center rounded bg-gray-300'>
                  <div
                    className='h-full rounded bg-[#FB8500]  transition-all duration-200'
                    style={{ width: `${crucible.lifespan}%` }}
                  ></div>
                  <div className='absolute left-[100%] top-1/2 -translate-y-1/2 transform pl-2'>
                    <div className='text-center'>{crucible.lifespan}%</div>
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <div className='flex w-1/4 items-center justify-center '>
                  <div className='flex '>
                    <MaterialComponent material={loadedMaterial} crucible={crucible} />
                  </div>
                </div>
              </div>
              <div className='flex h-11 w-1/4 justify-end gap-x-3 text-[18px]'>
                <button
                  className='hidden w-28 items-center justify-center rounded-[5px] border-2 border-solid border-[#878787CC] py-[10px] px-[12px] text-[#878787CC] md:flex'
                  onClick={toggleModal}
                >
                  <img src='icons/info.svg' alt=''></img>
                  <span className='ml-[10px]'>{t('details')}</span>
                </button>
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
        <CrucibleCardMobile
          loadedMaterial={loadedMaterial}
          onlySquare
          small
          crucible={crucible}
          toggleModal={toggleModal}
          t={t}
        />

        {!conformation ? (
          <PopupCardsTest
            title={`${crucible.crucible_name} ${t('details')}`}
            isOpen={modal}
            toggleModal={toggleModal}
            handleSubmit={handleSubmit}
            handleDelete={deleteCrucible}
          >
            <form onSubmit={handleSubmit}>
              <label>
                <div className='flex flex-col items-center justify-center '>
                  <div className='my-2 flex w-full flex-col items-center justify-between'>
                    <div className='flex w-full flex-col items-center md:flex-row'>
                      <span className='w-full dark:text-darkWhite md:w-1/4'>
                        {t('crucibleName')}
                      </span>
                      <input
                        value={crucible_name}
                        type='text'
                        id='name'
                        autoComplete='off'
                        className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:border-gray-500 dark:text-darkWhite'
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </label>
            </form>
          </PopupCardsTest>
        ) : (
          <Alert
            submitFunction={confirmedDeletion}
            cancelFunction={toggleConformation}
            isOpen={true}
            onlyConfirm={false}
            toggleModal
            title='Delete'
            text='Are you sure you want to delete'
            error={true}
            noCancel={false}
          />
        )}
      </div>
    </>
  );
}
export default CrucibleCard;
