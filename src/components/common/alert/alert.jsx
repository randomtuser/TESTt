import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { RiAlertFill } from 'react-icons/ri';
import { RxQuestionMarkCircled } from 'react-icons/rx';

const Alert = ({
  isOpen,
  toggleModal,
  title = '',
  text = '',
  onlyConfirm = false,
  submitFunction = toggleModal,
  cancelFunction = toggleModal,
  confirmDelete,
  error = false,
  noCancel = false,
}) => {
  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center font-poppins'>
          <div onClick={cancelFunction} className='absolute inset-0 bg-gray-700 opacity-50' />
          <div className='relative flex w-4/6 flex-col items-center  rounded-[10px] bg-white p-6 dark:bg-[#1B1B1B] dark:text-darkWhite md:w-3/5 lg:w-1/3'>
            <div className='h-2/6'>
              {error && onlyConfirm ? (
                <RiAlertFill color='red' size={70} />
              ) : onlyConfirm ? (
                <AiOutlineCheckCircle color='darkgreen' size={70} />
              ) : (
                confirmDelete && <RiAlertFill color='red' size={70} />
              )}
            </div>
            <div className='flex h-3/6 flex-col gap-2'>
              <div className='text-start text-[18px] font-bold lg:text-[24px]'>{title}</div>
              <div className='border-t-2 border-[#CCCCCCCC]'></div>
              <div className='split-text whitespace-pre-line text-start text-[15px] lg:text-[20px]'>
                {text}
              </div>
            </div>
            <div className='flex h-1/6 w-full justify-center'>
              {error && onlyConfirm ? (
                <button
                  className='flex w-1/4 items-center justify-center rounded bg-red-300 px-3 text-lg text-black'
                  onClick={cancelFunction}
                >
                  <p>Ok</p>
                </button>
              ) : onlyConfirm ? (
                <button
                  className='flex w-1/4 items-center justify-center rounded bg-green-200 px-3 text-lg text-black'
                  onClick={cancelFunction}
                >
                  <p>Ok</p>
                </button>
              ) : (
                <div className='flex w-full justify-end gap-2 p-2 pt-4'>
                  {!noCancel && (
                    <button
                      className='flex w-2/6 items-center justify-center gap-1 rounded py-2 font-bold hover:bg-gray-100 md:w-1/6 lg:w-3/12'
                      onClick={cancelFunction}
                    >
                      <p>Cancel</p>
                    </button>
                  )}
                  <button
                    className='flex w-2/6 items-center justify-center gap-1 rounded bg-[#FB8500] py-2 text-white hover:bg-orange-500 md:w-1/6 lg:w-3/12'
                    onClick={submitFunction}
                  >
                    <p>Ok</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
