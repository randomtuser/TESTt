import React, { useEffect, useState } from 'react';
import { DropdownItem, Title, Dropdown } from '@tremor/react';
import Table from '../common/table/table';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

function JopHistory({ handleSelect, jobhistory }) {
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
    <div className='chart4 rounded !border-none bg-white p-0 dark:bg-[#0D0D0D]'>
      {!isLoading ? (
        <>
          <Title className='flex justify-between px-[20px] pt-[20px]'>
            <span className='text-xl 3xl:text-[0.9vw] font-bold dark:text-darkWhite'>{t('jobHistory')}</span>
            <Dropdown
              className='custom-dropdown w-10 !min-w-[5rem] pb-2 md:w-36'
              placeholder={t('all')}
              onValueChange={(value) => handleSelect('jobh', { value })}
            >
              <DropdownItem text={t('all')} value='All' />

              <DropdownItem text={t('foundryFilter')} value='Foundries' />
              <DropdownItem text={t('printerFilter')} value='Printers' />
            </Dropdown>
          </Title>
          <div className='tableFluid px-2 text-center'>
            <Table
              headers={[
                `${t('part')}`,
                `${t('machine')}`,
                `${t('material')}`,
                `${t('amount')}`,
                `${t('date')}`,
              ]}
              data={jobhistory}
              icon={false}
            />{' '}
          </div>
          {jobhistory.length === 0 ? (
            <div className='mt-24 text-center text-xl 3xl:text-[0.9vw] font-bold dark:text-darkWhite'>
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

export default JopHistory;
