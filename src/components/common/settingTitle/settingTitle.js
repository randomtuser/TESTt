import React from 'react';

const SettingTitle = ({ title, boton = '' }) => {
  return (
    <>
      <div className='flex items-center justify-between p-4'>
        <div className='text-2xl'>{title}</div>
        {boton}
      </div>
      <hr></hr>
    </>
  );
};

export default SettingTitle;
