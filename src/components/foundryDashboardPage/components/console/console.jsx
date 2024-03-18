import React from 'react';
import { supabase } from '../../../../supabase';
import { useState, useEffect } from 'react';
import Table from '../../../common/table/table';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'reapop';
import realTimeMachineLogsLoading from '../../api/console';
const Console = ({ machineInfo }) => {
  const { notify } = useNotifications();
  const [errorLog, setErrorLog] = useState([]);
  const { t } = useTranslation(['Dashboard']);

  /** Subscribe to realtime on rl_machine_logs */
  supabase
    .channel('monitor-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'rl_machine_logs',
        filter: `machine=eq.${machineInfo.machine_id}`,
      },
      (payload) => {
        getData();
      },
    )
    .subscribe();

  /** Get the logs when the component its loaded. */
  async function getData() {
    let { data, error } = await realTimeMachineLogsLoading(machineInfo.machine_id);
    /** If theres an error it would notify the user */
    if (error) {
      notify('There was an error getting the console messages.', 'error');
    } else {
      //Formating the date from the database
      data.forEach((element) => {
        element.created_at = element.created_at.replace('T', ' ').substr(5, 11);
      });
      setErrorLog(data);
    }
  }

  /** When component loads, if id its set get the logs */
  useEffect(() => {
    if (machineInfo.machine_id !== undefined) {
      getData();
    }
  }, [machineInfo.machine_id]);

  return (
    <div className='row-span-1 w-full overflow-scroll rounded-[10px] bg-white p-4  pb-2 dark:bg-[#0D0D0D] dark:text-darkWhite'>
      {' '}
      <div className='flex font-semibold'>{t('console')}</div>
      <div className='h-[160px]  md:h-[129px]'>
        <Table headers={[`${t('time')}`, `${t('message')}`]} data={errorLog} />
      </div>
    </div>
  );
};
export default Console;
