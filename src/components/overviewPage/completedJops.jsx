import React, { useEffect, useState } from 'react';
import { DropdownItem, Title, Dropdown, BarChart } from '@tremor/react';
import { TbPointFilled } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
function CompletedJops({
  handleSelect,
  cjobschartdata,
  handleClickPrinter,
  isClickedPrinter,
  handleClickFoundrie,
  completedjobs,
  isClickedFoundrie,
  dateaxischartcjobs,
}) {
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
    <div className='chart2 rounded   !border-none bg-white p-0 dark:bg-[#0D0D0D]'>
      {!isLoading ? (
        <>
          <Title className='flex justify-between px-[20px] pt-[20px] 3xl:px-[1vw] 3xl:pt-[1vw]'>
            <span className='pt-1 text-xl font-bold dark:text-darkWhite 3xl:text-[0.9vw]'>
              {t('completeJobs')}
            </span>
            <Dropdown
              className='custom-dropdown w-10 !min-w-[5rem] pb-2 md:w-36 3xl:text-[0.9vw]'
              placeholder={t('all')}
              onValueChange={(value) => handleSelect('cjobs', { value })}
            >
              {cjobschartdata && cjobschartdata.length > 0 ? (
                [
                  <DropdownItem key={`${t('all')}`} value={null} text={`${t('all')}`} />,
                  ...cjobschartdata.map((element) => (
                    <DropdownItem key={element} value={element} text={element} />
                  )),
                ]
              ) : (
                <DropdownItem text='-' />
              )}
            </Dropdown>
          </Title>
          <div className='mr-9 flex items-center justify-end  gap-2 pt-0 '>
            <div
              onClick={handleClickPrinter}
              className={`gap-0.25 flex cursor-pointer items-center text-[14px] font-semibold 3xl:text-[0.7vw]  ${
                isClickedPrinter === false
                  ? '  text-[#727272] hover:text-slate-700'
                  : 'text-gray-300'
              }`}
            >
              <TbPointFilled color='#FFA559' size={12} /> {t('printerFilter')}
            </div>
            <div
              onClick={handleClickFoundrie}
              className={`gap-0.25 flex cursor-pointer items-center text-[14px] font-semibold 3xl:text-[0.7vw]  ${
                isClickedFoundrie === false
                  ? '  text-[#1D2228] hover:text-slate-700'
                  : 'text-gray-300'
              }`}
            >
              <TbPointFilled color='#FB8500' size={12} />
              {t('foundryFilter')}
            </div>
          </div>

          <BarChart
            className=' relative right-[15px] -top-[5px] m-0   h-[74%] w-full  scale-y-[1] scale-x-[0.95]   pr-0 3xl:mt-[3%]  3xl:h-[71.5%] '
            data={completedjobs && completedjobs.length > 0 ? completedjobs : dateaxischartcjobs}
            index='date'
            categories={
              !isClickedFoundrie && !isClickedPrinter
                ? ['printers_material_usage', 'foundries_material_usage']
                : isClickedFoundrie
                ? ['printers_material_usage']
                : ['foundries_material_usage']
            }
            colors={
              !isClickedFoundrie && !isClickedPrinter
                ? ['amber', 'orange']
                : isClickedFoundrie
                ? ['amber']
                : ['orange']
            }
            showXAxis={true}
            yAxisWidth={40}
            showYAxis={true}
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

export default CompletedJops;
