import React, { Fragment, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { Menu, Transition, Switch } from '@headlessui/react';
import CSSTransition from 'react-transition-group/CSSTransition';

const Modal = ({
  isOpen,
  toggleModal,
  confirmModal,
  children,
  defaultFormat = false,
  title = '',
  small,
  defaultButtons = true,
  onlySubmitButton,
  submitText,
  cancelText,
  handleDelete,
}) => {
  const { t } = useTranslation(['Users']);
  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[1] flex items-center justify-center'>
          <div
            onClick={toggleModal}
            className='absolute inset-0 bg-black opacity-50 dark:opacity-25'
          ></div>
          <CSSTransition>
            <div
              className={`${
                isOpen ? 'test' : 'test-out'
              } relative flex flex-col items-center justify-center rounded-[10px] bg-white shadow-2xl dark:bg-[#1B1B1B] dark:text-[#FFFFFFDE] ${
                !defaultFormat
                  ? small
                    ? 'w-4/5 md:w-1/2 lg:w-1/3'
                    : 'w-4/5 md:w-3/4 lg:w-1/2'
                  : 'w-4/5 md:w-2/4 lg:w-1/4'
              } `}
            >
              <div className='w-11/12'>
                <div
                  className={`flex h-full w-full items-center justify-between py-4 ${
                    !defaultFormat ? 'border-b border-gray-300' : 'hidden'
                  }`}
                >
                  {!defaultFormat && (
                    <span className='w-8/12 text-left text-lg font-semibold md:text-xl lg:text-xl'>
                      {title}
                    </span>
                  )}
                  {!defaultFormat && <div className='w-2/12'></div>}
                  {!defaultFormat && (
                    <div className='flex w-2/12 justify-end'>
                      <button className='p-2 font-sans text-2xl font-thin' onClick={toggleModal}>
                        {/* <img src='icons/closingModal.svg' /> */}
                        <RiCloseLine className='fill-[#737373] dark:fill-darkWhite' size={28} />
                      </button>
                    </div>
                  )}
                </div>
                <div className={`h-full w-full ${!defaultFormat ? 'pt-5 pb-4' : ''}`}>
                  {children}
                  {!defaultFormat && defaultButtons ? (
                    <div className='mt-2 flex h-11 justify-end gap-3'>
                      {!onlySubmitButton && (
                        <button className=' flex items-center rounded px-3' onClick={handleDelete}>
                          {/* <BiTrash className='mr-2' /> */}
                          {t('remove')}
                          {cancelText}
                        </button>
                      )}
                      <button
                        className='flex items-center rounded-[10px] bg-[#FB8500] px-5 font-semibold text-white hover:bg-orange-500'
                        onClick={confirmModal}
                      >
                        {/* <BiSave className='mr-2' /> */}
                        {t('save')}
                        {submitText}
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      )}
    </>
  );
};

export default Modal;
