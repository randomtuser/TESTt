import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopupCardsTest from '../../popup/popupCardsTest';
import { useTranslation } from 'react-i18next';
import MaterialComponent from '../../materialComponent/materialComponent';
import { updateFoundryName } from '../../../foundriesPage/api/foundriesAPI';
import { useNotifications } from 'reapop';
import ExclamationLogo from '../../../../icons/exclamationLogo';
import DashboardLogo from '../../../../icons/dashboardLogo';
import WaitPairing from '../../../../icons/waitPairing';
import { Skeleton } from '@mui/material';

function FoundriesCard({ foundry, crucible, material, handleDelete }) {
  const [modal, setModal] = useState(false);
  const [alias, setAlias] = useState(foundry.alias);

  const [loadedMaterial, setLoadedMaterial] = useState(null);
  const [materialIcon, setMaterialIcon] = useState('');
  const [formula, setFormula] = useState('');
  const { t } = useTranslation(['Machines']);
  const { notify } = useNotifications();

  useEffect(() => {
    if (material) {
      setLoadedMaterial(material);
      //Since the material comes as something like "ZA_ZA12" the split is used so we can divide it and put the 1st part on top and the other on the bottom
      const val = material.material_acr.split('_');
      setMaterialIcon(val[0]);
      setFormula(val[1]);
    }
  }, [material]);

  let connection;
  //opens and closes popup to see the details of the foundry
  const toggleModal = () => {
    setModal(!modal);
  };

  if (foundry.connection === true) {
    connection = 'Connected';
  } else {
    connection = 'Offline';
  }

  //doesnt let the user to put more than 12 characters as a name
  const handleInputChange = (e) => {
    if (e.target.value.length <= 30) {
      setAlias(e.target.value);
    }
  };

  const deleteFoundry = () => {
    handleDelete(foundry.machine_id);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alias) {
      setModal(!modal);
    }
    //updates the name of the foundry
    const { data, error } = await updateFoundryName(alias, foundry);
    if (error) {
      notify('Error while updating the name', 'error');
    }
    // supabase
    //   .from('machines')
    //   .update({ alias: alias })
    //   .eq('machine_id', foundry.machine_id)
    //   .then((foundry.alias = alias));
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
      <div className='mb-[10px] flex w-full justify-center md:mb-[24px]'>
        <div
          className={`mx-4 flex h-fit w-[100%] flex-col items-center justify-between rounded-[10px] bg-white lg:mx-6 ${
            isLoading ? '' : 'p-[15px] lg:py-4 lg:px-8'
          }  dark:bg-[#0D0D0D] dark:text-darkWhite md:h-[110px] md:flex-row ${
            isLoading ? '' : 'md:px-6'
          } md:py-0`}
        >
          {!isLoading ? (
            <>
              <div className='flex h-[40px] w-full items-center justify-between gap-x-5 md:w-1/3 md:justify-start'>
                <div className='relative -top-1 -left-1 flex w-fit items-center gap-3 lg:static lg:left-0 lg:top-0'>
                  <div className='hidden min-w-fit md:block'>
                    <img src='icons/drag.svg' className='gray-white' alt='' />
                  </div>
                  <div className='min-w-fit '>
                    <img
                      className='fill-current text-white selection:invert-0 dark:invert'
                      src='icons/foundryCard.svg'
                      alt=''
                    />
                  </div>
                  <div>
                    <div
                      className={`h-2 w-2 rounded-full md:h-3 md:w-3 ${
                        foundry.machine_assign == null
                          ? 'bg-yellow-500'
                          : foundry.connection === true
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  {foundry.machine_assign != null ? (
                    foundry.alias
                  ) : (
                    <div className='font-bold'>{t('pairing')}</div>
                  )}
                </div>
                <div className='block md:hidden'>
                  <button
                    className='flex w-fit items-center justify-end rounded-md border-solid border-gray-500 text-neutral-500 md:justify-center md:border-2 md:px-5'
                    onClick={toggleModal}
                  >
                    <div className='w-6'>
                      <ExclamationLogo />
                    </div>
                    <span className='ml-2 hidden md:block'>{t('details')}</span>
                  </button>
                </div>
              </div>
              <div className='flex w-full items-center pt-2 md:pt-0'>
                <div className='ml-0 flex w-full justify-center md:ml-16 md:w-1/2 md:py-0'>
                  <div className='w-full md:w-fit'>
                    {foundry.machine_type != null ? (
                      <>
                        <div className='hidden md:block'>
                          <MaterialComponent material={loadedMaterial} crucible={crucible} />
                        </div>
                        <div className='block md:hidden'>
                          <MaterialComponent
                            material={loadedMaterial}
                            onlyText
                            crucible={crucible}
                          />
                        </div>
                      </>
                    ) : (
                      <div className='flex flex-row text-[15px] text-neutral-500 dark:text-darkWhite md:w-72 md:text-[20px]'>
                        <div className='mr-6 ml-3 hidden md:block'>
                          <WaitPairing />
                        </div>
                        {t('code')} {foundry.code}
                      </div>
                    )}
                  </div>
                </div>
                <div className='ml-0 flex h-9 w-full justify-end gap-x-3 text-[18px] md:ml-20 md:h-11 md:w-1/3 md:gap-x-6'>
                  <button
                    className='hidden w-28 items-center justify-center rounded-[5px] border-2 border-solid border-[#878787CC] px-[12px] py-[10px] text-[#878787CC] md:flex'
                    onClick={toggleModal}
                  >
                    <span className=' w-4 p-0  '>
                      <ExclamationLogo />
                    </span>

                    <span className='ml-[10px]'>{t('details')}</span>
                  </button>
                  <Link
                    to={process.env.PUBLIC_URL + `/foundries/dashboard/${foundry.machine_id}`}
                    className='flex w-28 items-center justify-center rounded-[5px]  bg-neutral-700 px-[12px] py-[10px] text-white'
                    // onClick={(event) => foundry.type == null && event.preventDefault()}
                  >
                    <DashboardLogo />
                    <span className='ml-[10px]'>{t('panels')}</span>
                  </Link>
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

        {/* end card */}
        <PopupCardsTest
          title={`${foundry.alias} ${t('details')}`}
          isOpen={modal}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          handleDelete={deleteFoundry}
        >
          <form onSubmit={handleSubmit}>
            <label>
              <div className='flex w-full flex-col items-center justify-center'>
                <div className='my-2 flex w-full flex-col items-center justify-between gap-y-3'>
                  <div className='flex w-full flex-col items-center md:flex-row'>
                    <span className='w-full md:w-1/4'>{t('foundryName')}</span>
                    <input
                      value={alias}
                      type='text'
                      id='name'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-darkWhite md:w-full'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='flex w-full flex-col items-center md:flex-row'>
                    <span className='w-full md:w-1/4'>{t('pairingCode')}</span>
                    <input
                      value={foundry.code}
                      disabled
                      type='text'
                      id='name'
                      autoComplete='off'
                      className='w-full rounded-lg border border-gray-300 bg-transparent p-2.5 text-sm text-slate-500 dark:text-neutral-400 md:w-full'
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
export default FoundriesCard;
