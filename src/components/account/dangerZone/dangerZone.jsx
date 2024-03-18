import React, { useState } from 'react';
import DeleteAccount from './deleteAccount';
import Transfer from './transfer';

export const DangerZone = ({
  props,
  wrongText,
  setConfirmText,
  setUser1,
  user1,
  users,
  user,
  t,
}) => {
  const [isOpenDangerModal, setisOpenDangerModal] = useState(false);
  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  console.log(user1);
  const toggleDangerModal = () => {
    if (user1.role.name !== 'owner') {
      setisOpenDangerModal(!isOpenDangerModal);
    } else {
      props.props.notify(t('deleteOwner'), 'info');
    }
    setConfirmText('');
  };

  const toggleTransferModal = () => {
    setIsOpenModalTransfer(!isOpenModalTransfer);
    console.log(isOpenModalTransfer);
  };

  return (
    <>
      {' '}
      <DeleteAccount
        props={props}
        wrongText={wrongText}
        setConfirmText={setConfirmText}
        user1={user1}
        user={user}
        t={t}
        isOpenDangerModal={isOpenDangerModal}
        setisOpenDangerModal={setisOpenDangerModal}
      />
      <Transfer
        props={props}
        isOpenModalTransfer={isOpenModalTransfer}
        setIsOpenModalTransfer={setIsOpenModalTransfer}
        setUser1={setUser1}
        user1={user1}
        users={users}
        user={user}
        t={t}
      />
      <div className='flex w-full flex-col justify-start  px-4  md:px-0'>
        <span className='text-2xl text-red-500'>{t('danger')}</span>
        <span className='text-base text-gray-400'>{t('info2')}</span>
        <div className='mt-4 rounded border-2 border-red-500'>
          {user1.role.name === 'owner' && (
            <div className='flex flex-col justify-between py-2 pr-4 pl-4 sm:flex-row  md:py-1 md:pr-6'>
              <div className='flex w-full flex-col justify-center sm:w-1/2'>
                <span className='text-xl'>{t('transfer')}</span>
                <span className='text-base text-gray-400'>{t('info4')}</span>
              </div>
              <button
                onClick={toggleTransferModal}
                className={`my-4 rounded-lg border-2 border-gray-400 py-2 px-4 text-xl text-gray-400 hover:bg-gray-400 hover:text-white ${
                  user1.role.name !== 'owner' ? 'bg-slate-300 text-gray-500' : ''
                }`}
                disabled={user1.role.name !== 'owner'}
              >
                {t('transfer')}
              </button>
            </div>
          )}
          <div className='flex flex-col justify-between py-[2px] pr-4 pl-4 sm:flex-row md:py-1 md:pr-6'>
            <div className='flex w-full flex-col justify-center sm:w-1/2'>
              <span className='text-xl'>{t('delete')}</span>
              <span className='text-base text-gray-400'>{t('info3')}</span>
            </div>
            <button
              // onClick={handleDeleteAccount}
              onClick={toggleDangerModal}
              className='my-4 w-full rounded-lg border-2 border-red-500 py-2 px-4 text-xl text-red-500 hover:bg-red-500 hover:text-white sm:w-auto'
            >
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
