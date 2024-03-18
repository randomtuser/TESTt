import React from 'react';
import { useTranslation } from 'react-i18next';

const Humidity = ({ conditionHumidity }) => {
  const { t } = useTranslation(['Dashboard']);

  return (
    <div className='flex items-center justify-center'>
      <div className=' h-full '>
        <img
          src={process.env.PUBLIC_URL + '/icons/humidity_low.svg'}
          alt='Humidity'
          className=''
        ></img>
      </div>
      <div className='h-full w-full'>{t('humidity')}</div>
      <div className='flex h-full w-full items-center justify-center sm:justify-start '>
        {conditionHumidity} %
      </div>
    </div>
  );
};
export default Humidity;
