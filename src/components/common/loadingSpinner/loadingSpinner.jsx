import React from 'react';
import './spinner.css';

export default function LoadingSpinner() {
  return (
    <div className='spinner-container '>
      <div className={`loading-spinner h-[30px] w-[30px]`}></div>
    </div>
  );
}
