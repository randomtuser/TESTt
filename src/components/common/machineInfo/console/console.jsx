import React from 'react';
import { supabase } from '../../../supabase';
import { useState, useEffect } from 'react';
import Table from '../../common/table/table';
import { useTranslation } from 'react-i18next';

const Console = ({ id }) => {
  const [errorLog, setErrorLog] = useState([]);
  const { t } = useTranslation(['Dashboard']);
  const condition = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'rl_machine_logs',
        filter: `machine=eq.${id}`,
      },
      (payload) => {
        getData();
      },
    )
    .subscribe();

  async function getData() {
    let { data, error } = await supabase
      .from('rl_machine_logs')
      .select(`Message:data,Time:created_at`)
      .eq('machine', id);

    data.forEach((element) => {
      element.Time = element.Time.replace('T', ' ').substr(5, 11);
    });

    setErrorLog(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=' w-full rounded-large bg-white  p-2 pt-2 pb-0 shadow-cardShadow '>
      <div className='flex   font-semibold'>{t('console')}</div>
      <div className='h-[160px] overflow-y-scroll md:h-[129px]'>
        <Table headers={[`${t('message')}`, `${t('time')}`]} data={errorLog} />
        {errorLog.length === 0 ? (
          <div className='mt-10  text-center text-xl font-bold'>No Data</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Console;
