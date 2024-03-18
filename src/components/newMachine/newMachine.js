import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const NewMachine = ({ isOpen, toggleModal, printer, foundry, title }) => {
  const [pairingCode, setPairingCode] = useState('');
  const handleSubmit = () => {};

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-[90] flex items-center justify-center'>
          <div onClick={toggleModal} className='absolute inset-0 bg-gray-700 opacity-50'></div>
          <div className='relative flex w-4/5 flex-col rounded-[10px] bg-white p-6 md:w-1/2'>
            <div className='mb-4 flex w-full items-center justify-between border-b-2 border-gray-400 pb-4'>
              <div className='w-1/12'></div>
              <span className='w-8/12 text-center text-2xl'>{title}</span>
              <div className='w-1/12'>
                <button className='p-2 font-sans text-2xl font-thin' onClick={toggleModal}>
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </div>
            <div className='flex h-full items-center p-4'>
              {/* CONTENT */}
              <div className='w-1/5'>Printer pairing code:</div>
              <input
                readOnly
                className='w-4/5 rounded-lg border border-gray-200 p-2.5 focus:border-gray-400 focus:ring-gray-400'
                type='text'
                value={pairingCode}
                onChange={(e) => setPairingCode(e.target.value)}
              />
              {/* CONTENT */}
            </div>
            <label>
              <div className='mt-2 flex h-12 justify-end align-bottom'>
                <button
                  className='mr-4 flex items-center rounded border border-gray-400 bg-white px-4 text-gray-400'
                  onClick={handleSubmit}
                  type='submit'
                >
                  Add
                </button>
                <button
                  className=' flex items-center rounded border border-red-600 bg-red-500 px-4 text-white'
                  onClick={toggleModal}
                  type='button'
                >
                  Cancel
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default NewMachine;
