import React from 'react';

const ProgressBar = ({ value }) => {
  // Set the initial value of the progress bar

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div className='relative h-9 w-full rounded-lg border border-black bg-gray-500 sm:h-8'>
        <div
          className='absolute top-0 left-0 h-full w-full rounded-md border border-black bg-green-500'
          style={{ width: `${value}%`, transition: 'width 0.5s' }}
        ></div>
      </div>
      <span className='text-md absolute font-bold text-white'>lifespan: {`${value}%`}</span>
    </div>
  );
};

export default ProgressBar;
