import React from 'react';
import { useState, useEffect } from 'react';
import CrucibleTemperature from './crucibleTemperature';
import Volume from './volume';
import Alloy from './alloy';
import { supabase } from '../../../../supabase';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'reapop';
import { loadCrucibleData, realTimeSensor } from '../../api/crucible';

const Crucible = ({ machineInfo }) => {
  const [headerAlias, setHeaderAlias] = useState();
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(1800);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [maxVolume, setMaxVolume] = useState();
  const [materialName, setMaterialName] = useState('default');
  const [materialFormula, setMaterialFormula] = useState('default');
  const [lifespan, setLifespan] = useState();
  const [connectionsStatus, setConnnectionStatus] = useState(false);
  const { notify } = useNotifications();
  const { t } = useTranslation(['Dashboard']);

  /** Get all the info from the machine when component is rendered */
  async function getData() {
    let { data, error } = await loadCrucibleData(machineInfo.machine_id);
    if (error) {
      notify('There was an error getting the crucible information', 'error');
    } else {
      setMaxVolume(data[0].crucible_type.capacity);
      setHeaderAlias(data[0].machines.alias);
      setMaterialFormula(data[0].materials.material_acr.split('_')[1]);
      setMaterialName(data[0].materials?.material_name.trim().split(' ')[0]);
      setLifespan(data[0].lifespan);
    }
    let { data: sensors, error: sensorsError } = await realTimeSensor(machineInfo.machine_id);
    if (sensorsError) {
      notify('There was an error getting the sensors information', 'error');
    } else {
      setCurrentTemperature(sensors[0].crucible_temp);
      setCurrentVolume(sensors[0].crucible_volume);
    }
  }

  useEffect(() => {
    if (machineInfo.machine_id !== undefined) {
      const rlMachineSensors = supabase
        .channel('machine-sensors-realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: `rl_machine_sensors`,
            filter: `machine=eq.${machineInfo.machine_id}`,
          },
          (payload) => {
            setCurrentTemperature(payload.new.crucible_temp);
            setCurrentVolume(payload.new.crucible_volume);
          },
        )
        .subscribe((status, err) => {
          if (status === 'SUBSCRIBED') {
            setConnnectionStatus('SUBSCRIBED');
            console.log('Connected!');
          }
          if (status === 'CHANNEL_ERROR') {
            setConnnectionStatus('CHANNEL_ERROR');
            console.log(`There was an error subscribing to channel:`);
          }
          //${err.message}

          if (status === 'TIMED_OUT') {
            setConnnectionStatus('TIMED_OUT');

            console.log('Realtime server did not respond in time.');
          }

          if (status === 'CLOSED') {
            setConnnectionStatus('CLOSED');
            console.log('Realtime channel was unexpectedly closed.');
          }
        });
      getData();
      return () => {
        rlMachineSensors.unsubscribe();
      };
    }
  }, [machineInfo.machine_id]);

  return (
    <>
      <div className='row-span-3 h-full w-full overflow-hidden rounded-[10px] bg-white p-2 pt-4 dark:bg-[#0D0D0D] dark:text-darkWhite'>
        <div className='flex flex-col'>
          <span className='flex w-full justify-between pb-2 text-base font-bold'>
            {' '}
            <span>{t('crucibleI')}</span>
            <span>{connectionsStatus === 'SUBSCRIBED' ? ' Connected' : ' Disconnected'}</span>
          </span>{' '}
          <div className='flex h-full flex-row'>
            <div className='aspect-square w-1/3 rounded-[5px] border border-[#CCCCCCCC] p-2'>
              <CrucibleTemperature
                currentTemperature={currentTemperature}
                maxTemperature={maxTemperature}
              />
            </div>
            <div className='mx-2.5 aspect-square w-1/3 rounded-[5px] border border-[#CCCCCCCC] p-2 '>
              <Volume currentVolume={currentVolume} maxVolume={maxVolume} />
            </div>
            <div className='aspect-square w-1/3 rounded-[5px] border border-[#CCCCCCCC] p-2 '>
              <Alloy materialName={materialName} materialFormula={materialFormula} />
            </div>
          </div>
        </div>
        <div className='flex justify-between'></div>
      </div>
    </>
  );
};
export default Crucible;

// <div className='h-1/3 w-full rounded-large bg-white p-4 pb-2 shadow-cardShadow  dark:bg-[#0D0D0D] dark:text-darkWhite'>
//       <div className='flex flex-col'>
//         <span className='flex w-full justify-between text-base font-bold'>
//           {' '}
//           <span>{t('crucibleI')}</span>
//           <span>{connectionsStatus === 'SUBSCRIBED' ? ' connected' : ' disconnected'}</span>
//         </span>{' '}
//         <div className='flex justify-between'>
//           <span className='text-xs  '>
//             <span className='text-gray-500 dark:text-[#878787]'>{t('alias')}:</span> {headerAlias}
//           </span>
//           <span className='order-last text-xs'>
//             <span className='text-gray-500 dark:text-[#878787]'>Lifespan: </span>
//             {lifespan}%
//           </span>
//         </div>
//         {/* 3 Divs */}
//   <div className='flex justify-evenly pt-2 pb-4'>
//           <div className='aspect-square w-1/3 rounded-lg border p-2 '>
//             <CrucibleTemperature
//               currentTemperature={currentTemperature}
//               maxTemperature={maxTemperature}
//             />
//   </div>
//           <div className='mx-2.5 aspect-square w-1/3 rounded-lg border p-2 text-xs'>
//             <Volume currentVolume={currentVolume} maxVolume={maxVolume} />
//           </div>
//           <div className='aspect-square w-1/3 rounded-lg border p-2'>
//             <Alloy materialName={materialName} materialFormula={materialFormula} />
//           </div>
//         </div>
//       </div>
//     </div>
