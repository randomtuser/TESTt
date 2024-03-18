import React from 'react';
import { useTranslation } from 'react-i18next';

function PopupCardsTest({
  isOpen,
  toggleModal,
  children,
  confirmModal,
  handleDelete,
  handleSubmit,
  defaultFormat = false,
  title = '',
  small,
  defaultButtons = true,
  onlySubmitButton,
  submitText = 'Save',
}) {
  const deleteFunction = () => {
    handleDelete();
  };
  const { t } = useTranslation(['Machines']);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[1] flex items-center justify-center px-[24px] py-[24px]'>
          <div onClick={toggleModal} className='absolute inset-0 bg-gray-700 opacity-50'></div>
          <div
            className={`relative flex flex-col items-center justify-center rounded-[10px] bg-white shadow-2xl dark:bg-[#1B1B1B] dark:text-darkWhite ${
              !defaultFormat
                ? small
                  ? 'w-4/5 md:w-1/2 lg:w-1/3'
                  : 'w-11/12 md:w-3/4 lg:w-1/2'
                : 'w-4/5 md:w-2/4 lg:w-1/4'
            }`}
          >
            <div className='w-10/12 md:w-11/12'>
              <div
                className={`flex h-full w-full items-center justify-between py-4 ${
                  !defaultFormat ? 'border-b border-gray-300' : 'hidden'
                }`}
              >
                {!defaultFormat && (
                  <span className='w-8/12 text-left text-lg font-semibold dark:text-darkWhite md:text-xl lg:text-xl'>
                    {title}
                  </span>
                )}
                {!defaultFormat && <div className='w-2/12'></div>}
                {!defaultFormat && (
                  <div className='flex w-2/12 justify-end'>
                    <button className='p-2 font-sans text-2xl font-thin' onClick={toggleModal}>
                      <img src='icons/closingModal.svg' alt='' />
                    </button>
                  </div>
                )}
              </div>
              <div className={`h-full w-full ${!defaultFormat ? 'pt-1 pb-4 md:pt-2' : ''}`}>
                {children}
                {!defaultFormat && defaultButtons ? (
                  <form className='mt-2 flex h-11 justify-end gap-3' onSubmit={handleSubmit}>
                    {!onlySubmitButton && (
                      <button
                        className=' flex items-center rounded px-3'
                        onClick={deleteFunction}
                        type='button'
                      >
                        {/* <BiTrash className='mr-2' /> */}
                        {t('remove')}
                      </button>
                    )}
                    <button
                      className='flex items-center rounded-[5px] bg-[#FB8500] px-5 font-semibold text-white hover:bg-orange-500'
                      onClick={confirmModal}
                      type='submit'
                    >
                      {/* <BiSave className='mr-2' /> */}
                      {t('save')}
                    </button>
                  </form>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupCardsTest;
