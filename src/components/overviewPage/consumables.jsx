import React, { useEffect, useState } from 'react';
import { DropdownItem, Title, Dropdown } from '@tremor/react';
import Table from '../common/table/table';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

function Consumables({ handleSelect, selectedValues, consumables }) {
  const { t } = useTranslation(['Overview']);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='chart3 rounded !border-none bg-white p-0 dark:bg-[#0D0D0D]'>
      {!isLoading ? (
        <>
          <Title className='flex justify-between px-[20px] pt-[20px] 3xl:px-[1vw] 3xl:pt-[1vw]'>
            <span className='pt-1 text-xl font-bold dark:text-darkWhite 3xl:text-[0.9vw]'>
              {t('consumables')}{' '}
            </span>
            <Dropdown
              key={'mondongon'}
              className='custom-dropdown w-10 !min-w-[5rem] md:w-36 3xl:text-[0.9vw] '
              placeholder={t('all')}
              onValueChange={(value) => handleSelect('consumables', { value })}
            >
              <DropdownItem text={t('all')} value='All' />

              <DropdownItem text={t('alloyFilter')} value='Alloys' />
              <DropdownItem text={t('crucibleFilter')} value='Crucibles' />
            </Dropdown>
          </Title>
          <div className='tableFluid consumTable px-[1rem] text-left'>
            <Table
              headers={[
                selectedValues['consumables']?.value
                  ? t(selectedValues['consumables']?.value)
                  : 'Alloy',
                t('Volum (cm³)'),
              ]}
              data={consumables}
              icon={true}
            />
          </div>
          {consumables.length === 0 ? (
            <div className='mt-24 text-center text-xl font-bold dark:text-darkWhite 3xl:text-[0.9vw]'>
              {t('data')}
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <Skeleton
          variant='rectangular'
          width='100%'
          height='100%'
          animation='wave'
          sx={{ borderRadius: '10px' }}
        />
      )}
    </div>
  );
}

export default Consumables;
