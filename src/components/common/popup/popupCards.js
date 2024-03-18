import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiTrash, BiSave } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

function PopupCards({
  isOpen,
  toggleModal,
  children,
  confirmModal,
  handleDelete,
  handleSubmit,
  defaultFormat = false,
  title = '',
}) {
  const deleteFunction = () => {
    handleDelete();
  };
  const { t } = useTranslation(['Machines']);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[90] flex items-center justify-center'>
          <div onClick={toggleModal} className='absolute inset-0 bg-gray-700 opacity-50'></div>
          <div
            className={`relative  flex flex-col rounded-[10px] bg-white ${
              !defaultFormat ? ' w-4/5 p-6 md:w-1/2' : 'h-1/5 w-4/5 md:w-1/4'
            }`}
          >
            <div
              className={`mb-4 flex w-full items-center justify-between  ${
                !defaultFormat ? 'border-b-2 border-gray-400 pb-4' : 'hidden'
              }`}
            >
              {!defaultFormat && <div className='w-1/12'></div>}
              {!defaultFormat && <span className='w-8/12 text-center text-2xl'>{title}</span>}

              {!defaultFormat && (
                <div className='w-1/12'>
                  <button className='p-2 font-sans text-2xl font-thin' onClick={toggleModal}>
                    <AiOutlineCloseCircle />
                  </button>
                </div>
              )}
            </div>
            <div className={`h-full${!defaultFormat ? 'p-4' : ''}`}>{children}</div>
            {!defaultFormat && (
              <form onSubmit={handleSubmit}>
                <label>
                  <div className='mt-2 flex h-14 justify-end align-bottom'>
                    <button
                      className='mr-4 flex items-center rounded border border-red-600 bg-red-500 px-4 text-white'
                      onClick={deleteFunction}
                      type='button'
                    >
                      <BiTrash className='mr-2' />
                      {t('remove')}
                    </button>
                    <button
                      className=' flex items-center rounded border border-gray-400 bg-white px-4 text-gray-400'
                      onClick={confirmModal}
                      type='submit'
                    >
                      <BiSave className='mr-2' />
                      {t('save')}
                    </button>
                  </div>
                </label>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PopupCards;
