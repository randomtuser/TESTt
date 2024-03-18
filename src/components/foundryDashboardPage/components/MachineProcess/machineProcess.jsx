import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabase';
import Idling from './State/idling/idling';
import Heating from './State/heating/heating';
import Adding from './State/adding/adding';
import Degassing from './State/degassing/degassing';
//import Waiting from './State/waiting/waiting';
import Pouring from './State/pouring/pouring';
import { Waveform } from '@uiball/loaders';
import { useTranslation } from 'react-i18next';
import getMachineState from '../../../../hooks/getMachineState';

const MachineProcess = ({ machineInfo }) => {
  const [state, setState] = useState('');
  const [fileName, setFileName] = useState('');
  const { t } = useTranslation(['Dashboard']);

  //Get the state of the machine when component its loaded
  useEffect(() => {
    const fetchMachineState = async () => {
      try {
        const state = await getMachineState(machineInfo.machine_id);
        if (state.state === 'Waiting') {
          setFileName(state.data.name);
        }
        setState(state.state);
      } catch (error) {
        console.log('error', error);
        //Error should be handled, and notified to the user
      }
    };

    if (machineInfo.machine_id !== undefined) {
      fetchMachineState();
    }
  }, [machineInfo.machine_id]);

  useEffect(() => {
    const realTimeStatus = supabase
      .channel('machine-state-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rl_machine_state',
          filter: `machine=eq.${machineInfo.machine_id}`,
        },
        (payload) => {
          setState(payload.new.state);
        },
      )
      .subscribe();
    return () => {
      realTimeStatus.unsubscribe();
    };
  }, [machineInfo.machine_id]);

  //Check what state is the machine and render the corresponding
  switch (state) {
    case 'Idling':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Idling machineInfo={machineInfo} />
        </>
      );
    case 'Heating':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Heating machineInfo={machineInfo} />
        </>
      );
    case 'Adding':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Adding machineInfo={machineInfo} />
        </>
      );
    case 'Probing':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Degassing machineInfo={machineInfo} />
        </>
      );
    case 'Degassing':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Degassing machineInfo={machineInfo} />
        </>
      );

    case 'Pouring':
      return (
        <>
          <div className='text-xl font-semibold '>
            <div>{t('machineP')} </div>
          </div>
          <Pouring machineInfo={machineInfo} />
        </>
      );

    default:
      return (
        <>
          <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
        </>
      );
  }
};
export default MachineProcess;
