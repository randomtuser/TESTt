import React, { useEffect, useState } from 'react';
import { AreaChart, DropdownItem, Title, Dropdown } from '@tremor/react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

function AlloyConsumed({ allconchartdata, handleSelect, alloy, dateaxischartalloy }) {
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
    <div className='chart1 rounded-[5px] !border-none bg-white p-0 dark:bg-[#0D0D0D]'>
      {!isLoading ? (
        <>
          <Title className='flex justify-between px-[20px] pt-[20px] 3xl:pt-[1vw] 3xl:px-[1vw] text-center'>
            <span className='pt-1 text-xl 3xl:text-[0.9vw] font-bold dark:text-darkWhite'>{t('alloyConsumed')}</span>
            <Dropdown
              className='custom-dropdown w-10 !min-w-[5rem] md:w-36'
              placeholder={t('all')}
              onValueChange={(value) => handleSelect('allc', { value })}
            >
              {allconchartdata && allconchartdata.length > 0 ? (
                [
                  <DropdownItem key={`${t('all')}`} value={null} text={`${t('all')}`} />,
                  ...allconchartdata.map((element) => (
                    <DropdownItem key={element} value={element} text={element} />
                  )),
                ]
              ) : (
                <DropdownItem text='-' />
              )}
            </Dropdown>
          </Title>
          <AreaChart
            className=' m-0 h-[83%] 3xl:h-[25vh] w-full pb-1 pr-6 pt-8  text-[3rem]'
            data={alloy && alloy.length > 0 ? alloy : dateaxischartalloy}
            index='date'
            categories={['Volume']}
            colors={['orange']}
            showXAxis={true}
            showYAxis={true}
            yAxisWidth={35}
            showLegend={false}
          />
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

export default AlloyConsumed;
