import React from 'react';
import { useTranslation } from 'react-i18next';

const Temperature = ({ conditionTemperature }) => {
  const { t } = useTranslation(['Dashboard']);

  return (
    <div className='flex items-center justify-center  '>
      <div className=' h-full '>
        <img src={'/icons/device_thermostat.svg'} alt='Temperature' className=''></img>
      </div>

      <div className='h-full w-full'>{t('temperature')}</div>
      <div className='flex h-full w-full items-center justify-center sm:justify-start '>
        {conditionTemperature}ºC
      </div>
    </div>
  );
};
export default Temperature;
