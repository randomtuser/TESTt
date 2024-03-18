import React from 'react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';
import { useTranslation } from 'react-i18next';
import AlloyIcon from '../../icons/crucible/alloyIcon';

const Material = ({ materialName, materialFormula }) => {
  const { t } = useTranslation(['Dashboard']);

  return (
    <>
      <div className='flex max-h-full min-h-full flex-col justify-between rounded-lg'>
        <div className='flex justify-start'>
          <AlloyIcon />
          <span className='order-last ml-1 flex items-center text-[14px] text-gray-500 dark:text-[#878787]'>
            {t('alloy')}
          </span>
        </div>
        <div className='flex justify-between'>
          <div className='text-bold  text-lg font-bold text-gray-800 dark:text-[#FFFFFF]'>
            {materialFormula}
          </div>
        </div>
        <span className='flex justify-start text-xs text-gray-500 dark:text-[#878787]'>
          {materialName}
        </span>
      </div>
    </>
  );
};
Material.propTypes = {
  materialName: PropTypes.string,
  materialFormula: PropTypes.string,
};
Material.defaultProps = {
  materialName: 0,
  materialFormula: 0,
};
export default Material;
