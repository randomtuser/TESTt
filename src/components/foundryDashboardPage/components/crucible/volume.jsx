import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import VolumeIcon from '../../icons/crucible/volumeIcon';

const Volume = ({ currentVolume, maxVolume }) => {
  const { t } = useTranslation(['Dashboard']);

  return (
    <>
      <div className='flex max-h-full min-h-full flex-col justify-between rounded-lg'>
        <div className='flex justify-start'>
          <VolumeIcon />
          <span className='order-last ml-1 flex items-center text-[14px] text-gray-500 dark:text-[#878787]'>
            {t('volume')}
          </span>
        </div>
        <div className='flex justify-start'>
          <div className=' text-lg font-bold text-gray-800 dark:text-[#FFFFFF]'>
            {currentVolume === null ? 'No data read from sensor' : `${currentVolume} cm³`}
          </div>
        </div>
        <div className='flex justify-start'>
          <div className='flex justify-start text-xs text-gray-800 dark:text-[#FFFFFF]'>
            <span className='text-xs'>
              <span className='text-gray-500 dark:text-[#878787]'>Max: </span>
              {maxVolume} cm³
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
Volume.propTypes = {
  currentVolume: PropTypes.number,
  maxVolume: PropTypes.number,
};
Volume.defaultProps = {
  currentVolume: 0,
  maxVolume: 0,
};
export default Volume;
