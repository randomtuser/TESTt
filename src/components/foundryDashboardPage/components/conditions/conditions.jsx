import React from 'react';
import Monitor from './monitor';
import { supabase } from '../../../../supabase';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'reapop';
import { realTimeMachineSensor } from '../../api/conditions';
import HumidityIcon from '../../icons/conditions/humidityIcon';
import AmbientIcon from '../../icons/conditions/ambientIcon';
const Conditions = ({ machineInfo }) => {
  const [conditionHumidity, setConditionHumidity] = useState(0);
  const [conditionTemperature, setConditionTemperature] = useState(0);
  const { notify } = useNotifications();
  const { t } = useTranslation(['Dashboard']);

  /** Fetching current sensors when components loads */
  async function getData() {
    let { data, error } = await realTimeMachineSensor(machineInfo.machine_id);
    if (error) {
      notify('There was an error getting the conditions.', 'error');
    } else {
      setConditionTemperature(data[0].ambient_temp);
      setConditionHumidity(data[0].humidity);
    }
  }
  useEffect(() => {
    if (machineInfo.machine_id !== undefined) {
      //Realtime subscription
      const rlMachineSensors = supabase
        .channel('changes_conditions_dashboard')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'rl_machine_sensors',
            filter: `machine=eq.${machineInfo.machine_id}`,
          },
          (payload) => {
            setConditionTemperature(payload.new.ambient_temp);
            setConditionHumidity(payload.new.humidity);
          },
        )
        .subscribe();
      //Fetch current values
      getData();
      return () => {
        rlMachineSensors.unsubscribe();
      };
    }
  }, [machineInfo.machine_id]);

  return (
    <>
      <div className='row-span-3 h-full w-full overflow-hidden rounded-[10px] bg-white p-2 pt-4  dark:bg-[#0D0D0D] dark:text-darkWhite'>
        <div className='flex flex-col'>
          <span className='flex w-full justify-between pb-2 text-base font-bold'>
            {t('ambient')} {t('conditions')}
          </span>
          <div className='flex h-full flex-row'>
            <div className='aspect-square w-1/3 rounded-[5px] border border-[#CCCCCCCC] p-2 '>
              <div className='flex justify-start'>
                <HumidityIcon />
                <span className='order-last ml-1 flex items-center text-[14px] text-gray-500 dark:text-[#878787]'>
                  {t('humidity')}
                </span>
              </div>
              <div className='flex justify-start pt-3'>
                <div className='text-lg font-bold text-gray-800 dark:text-[#FFFFFF]'>
                  {conditionHumidity === null
                    ? 'No data read from sensor'
                    : `${conditionHumidity} %`}
                </div>
              </div>
              <span className='flex pt-3 text-[12px] dark:text-[#878787]'>{t('perfect')}</span>
            </div>
            <div className='mx-2.5 aspect-square w-1/3 rounded-[5px] border border-[#CCCCCCCC] p-2'>
              <div className='flex justify-start'>
                <AmbientIcon />
                <span className='order-last ml-1 flex items-center text-[14px] text-gray-500 dark:text-[#878787]'>
                  {t('ambient')}
                </span>
              </div>
              <div className='flex justify-start pt-3'>
                <div className='text-lg font-bold text-gray-800 dark:text-[#FFFFFF]'>
                  {conditionTemperature === null
                    ? 'No data read from sensor'
                    : `${conditionTemperature} ºC`}
                </div>
              </div>
              <span className='flex pt-3 text-[12px] dark:text-[#878787] '>{t('perfect')}</span>
            </div>
            <div className='flex w-1/3 items-center justify-center rounded-lg p-2'>
              <Monitor machineInfo={machineInfo} />
            </div>
          </div>
        </div>
        <div className='flex justify-between'></div>
      </div>
    </>
  );
};
export default Conditions;

// {/* <div className='h-1/3 w-full rounded-large bg-white  p-4  pb-0 shadow-cardShadow dark:bg-[#0D0D0D] dark:text-darkWhite'>
//         <span className='text-base font-bold'>
//           {t('ambient')} {t('conditions')}
//         </span>
//         {/* 3 divs */}
//         <div className='flex justify-evenly pt-2 pb-4 '>
//           {/* HUMIDITY */}
//           <div className='aspect-square  w-1/3 rounded-lg border p-2 '>
//             <div className='flex justify-start'>
//               <HumidityIcon />
//               <span className='order-last ml-1 text-xs text-gray-500 dark:text-[#878787]'>
//                 {t('humidity')}
//               </span>
//             </div>
//             <div className='flex justify-start'>
//               <div className='my-2 text-xs font-bold text-gray-800 dark:text-[#FFFFFF]'>
//                 {conditionHumidity === null ? 'No data read from sensor' : `${conditionHumidity} %`}
//               </div>
//             </div>
//             <span className='text-xs dark:text-[#878787] '>{t('perfect')}</span>
//           </div>
//           {/* AMBIENT */}
//           <div className='mx-2.5 aspect-square w-1/3 rounded-lg border p-2'>
//             <div className='flex justify-start'>
//               <AmbientIcon />
//               <span className='order-last ml-1 text-xs text-gray-500 dark:text-[#878787]'>
//                 {t('ambient')}
//               </span>
//             </div>
//             <div className='flex justify-start'>
//               <div className='my-2 text-xs font-bold text-gray-800 dark:text-[#FFFFFF]'>
//                 {conditionTemperature === null
//                   ? 'No data read from sensor'
//                   : `${conditionTemperature} ºC`}
//               </div>
//             </div>
//             <span className='text-xs dark:text-[#878787] '>{t('perfect')}</span>
//           </div>
//           {/* MONITOR */}
//           <div className='flex aspect-square  w-1/3 items-center justify-center '>
//             <Monitor machineInfo={machineInfo} />
//           </div>
//         </div>
//       </div> */}
