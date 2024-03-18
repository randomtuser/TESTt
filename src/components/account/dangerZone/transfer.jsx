import React, { useState } from 'react';
import Alert from '../../common/alert/alert';

import Modal from '../../common/modals/modal';
import { submitTransfer } from './api/submitTransfer';

export default function Transfer({
  props,
  isOpenModalTransfer,
  setIsOpenModalTransfer,
  setUser1,
  user1,
  users,
  user,
  t,
}) {
  const [isOpenConfirmTransfer, setIsOpenConfirmTransfer] = useState(false);

  const [selectedTransfer, setSelectedTransfer] = useState('');

  const handleTransfer = () => {
    if (selectedTransfer !== '') {
      setIsOpenConfirmTransfer(!isOpenConfirmTransfer);
      toggleTransferModal();
    } else {
      props.props.notify(`${t('Notify:selecTransfer')}`, 'info');
    }
  };

  const toggleTransferModal = () => {
    setIsOpenModalTransfer(!isOpenModalTransfer);
  };

  return (
    <>
      <Modal
        title={'Transfer Ownership'}
        isOpen={isOpenModalTransfer}
        toggleModal={toggleTransferModal}
        //submitText='Move'
        //cancelText='Cancel'
        confirmModal={handleTransfer}
        cancelFunction={toggleTransferModal}
      >
        <div className='flex h-full w-full flex-col content-center text-xl'>
          <div className='text-[12px] text-gray-400 lg:text-[20px]'>{t('info4')}</div>
          <div className='my-4 flex w-full text-gray-700'>
            <div className=' flex w-1/5 flex-col justify-center gap-y-4'>
              <div className='flex h-1/2 w-fit items-center justify-center overflow-hidden whitespace-nowrap text-center text-[12px] dark:text-darkWhite lg:text-[20px]'>
                {t('company')}
              </div>
              <div className='flex h-1/2 w-fit items-center justify-center overflow-hidden whitespace-nowrap text-center text-[12px] dark:text-darkWhite lg:text-[20px]'>
                {t('transferTo')}
              </div>
            </div>
            <div className='flex w-full flex-col gap-y-4 text-[12px] lg:text-[20px]'>
              {users.length > 0 && (
                <>
                  <input
                    value={user1.group.name}
                    type='text'
                    className='ml-4  rounded-md border border-gray-300 bg-white p-1 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 dark:bg-transparent dark:text-darkWhite'
                    disabled
                  />
                  <select
                    value={selectedTransfer}
                    type='text'
                    id='confirm'
                    className='ml-4  rounded-md border border-gray-300 bg-white p-1 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 dark:bg-transparent dark:text-darkWhite'
                    required
                    onChange={(e) => {
                      setSelectedTransfer(e.target.value);
                    }}
                  >
                    <option value=''>{t('select')}</option>
                    {users.map(
                      (user) =>
                        user1.id !== user.id && (
                          <option key={user.id} value={user.id}>
                            {user.full_name}
                          </option>
                        ),
                    )}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Alert
        isOpen={isOpenConfirmTransfer}
        toggleModal={() => {
          setIsOpenConfirmTransfer(!isOpenConfirmTransfer);
        }}
        title={t('sure')}
        text={t('irreversibleTransfer')}
        submitFunction={() => {
          submitTransfer(
            props,
            selectedTransfer,
            user1,
            setUser1,
            user,
            setIsOpenConfirmTransfer,
            isOpenConfirmTransfer,
            t,
          );
        }}
      ></Alert>
    </>
  );
}
