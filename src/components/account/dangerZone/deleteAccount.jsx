import React, { useState } from 'react';
import Alert from '../../common/alert/alert';
import Modal from '../../common/modals/modal';
import { deleteAccount } from './api/deleteAccount';
export default function DeleteAccount({
  props,
  wrongText,
  isOpenDangerModal,
  setisOpenDangerModal,
  setConfirmText,
  user1,
  user,
  t,
}) {
  const [modConfirmDelete, setModConfirmDelete] = useState(false);

  const errorMsg = t('errorMatch');

  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };

  function toggleModConfirmDelete() {
    setModConfirmDelete(!modConfirmDelete);
  }
  const toggleDangerModal = () => {
    if (user1.role.name !== 'owner') {
      setisOpenDangerModal(!isOpenDangerModal);
    } else {
      props.props.notify(t('deleteOwner'), 'info');
    }
    setConfirmText('');
  };

  const handleDeleteAccount = () => {
    if (!wrongText) {
      toggleModConfirmDelete();
    }
  };

  return (
    <>
      <Modal
        title={t('sure')}
        isOpen={isOpenDangerModal}
        toggleModal={toggleDangerModal}
        defaultButtons={false}
        small
        handleDelete={handleDeleteAccount}
      >
        <div className='flex  w-full flex-col'>
          <div className='text-start text-[12px] lg:text-[20px]'>
            <span>{t('deleteText')}</span>
          </div>
          <div className='my-4 text-start text-[12px] lg:text-[16px]'>
            <span className='text-[#878787CC]'>
              {' '}
              {'To confirm this, type “Bye Metal Maker 3D”'}{' '}
            </span>
          </div>
          {wrongText && <span className='w-full text-left text-sm text-red-500'>{errorMsg}</span>}
          <div className='flex w-full flex-nowrap justify-start gap-3'>
            <input
              type='text'
              id='confirm'
              onChange={handleChange}
              className={`w-full rounded-lg border  ${
                wrongText
                  ? 'border-red-500 bg-red-50 bg-opacity-50 focus:border-red-500 focus:ring-red-500 dark:bg-transparent lg:text-[20px]'
                  : 'border-gray-200 bg-white dark:bg-transparent'
              } p-2 text-[12px] placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400`}
              placeholder='Please confirm...'
              required
            />

            <button
              onClick={() => handleDeleteAccount()}
              className='w-1/3 rounded-lg  border-2 border-red-500 bg-red-500 py-2 px-4  text-[12px] text-white hover:border-red-600 hover:bg-red-600 sm:min-w-fit lg:text-[20px]'
            >
              {t('deleteButton')}
            </button>
          </div>
        </div>
      </Modal>
      <Alert
        confirmDelete
        isOpen={modConfirmDelete}
        toggleModal={toggleModConfirmDelete}
        title={t('sure')}
        text={t('irreversible')}
        submitFunction={() => {
          deleteAccount(setisOpenDangerModal, user);
        }}
      />
    </>
  );
}
