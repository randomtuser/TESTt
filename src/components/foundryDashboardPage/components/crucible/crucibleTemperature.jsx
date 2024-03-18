import React from 'react';
import PropTypes from 'react';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import { useTranslation } from 'react-i18next';
import CrucibleTemperatureIcon from '../../icons/crucible/crucibleTemperatureIcon';

const Temperature = ({ currentTemperature, maxTemperature }) => {
  const { t } = useTranslation(['Dashboard']);

  return (
    <>
      <div className='flex max-h-full min-h-full flex-col justify-between rounded-lg'>
        <div className='flex justify-start'>
          <CrucibleTemperatureIcon />
          <span className='order-last flex items-center text-[13px] text-gray-500 dark:text-[#878787]'>
            {t('temperature')}
          </span>
        </div>
        <div className='flex justify-between'>
          <div className=' text-lg font-bold text-gray-800 dark:text-[#FFFFFF]'>
            {currentTemperature === null ? 'No data read from sensor' : `${currentTemperature} °C`}
          </div>
        </div>
        <div className='flex justify-start'>
          <div className='flex justify-start text-xs text-gray-800 dark:text-[#FFFFFF]'>
            <span className='text-xs'>
              <span className='text-gray-500 dark:text-[#878787]'>{t('target')}: </span>
              {maxTemperature} °C
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
Temperature.propTypes = {
  currentTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
};
Temperature.defaultProps = {
  currentTemperature: '0',
  maxTemperature: '0',
};
export default Temperature;
