import React, { useState, useEffect } from 'react';
import StepIndicator from '../stepIndicator';
import getMachineSensors from '../../../../../../hooks/getMachineSensors';
import { supabase } from '../../../../../../supabase';
import sendCommandCancel from '../../../../command/sendCommandCancel';
import { useNotifications } from 'reapop';
import AddingUI from './addingUI';

const Adding = ({ machineInfo }) => {
  const { notify } = useNotifications();
  const [isCanceling, setIsCanceling] = useState(false);
  const [crucibleVolume, setCrucibleVolume] = useState('');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const toggleCancelModal = () => {
    setCancelModalOpen(!cancelModalOpen);
  };

  useEffect(() => {
    const fetchMachineState = async () => {
      try {
        const state = await getMachineSensors(machineInfo.machine_id);
        setCrucibleVolume(state.crucible_volume);
      } catch (error) {}
    };
    if (machineInfo.machine_id !== undefined) {
      fetchMachineState();
    }
  }, [machineInfo.machine_id, machineInfo]);

  function handleCancelProcess() {
    setIsCanceling(true);
    try {
      sendCommandCancel(machineInfo.machine_id);
      setCancelModalOpen(false);
      notify('Sending command to the machine, please wait!', 'loading');
    } catch {
      notify('There was an error canceling the procces!', 'error');
    }
  }

  useEffect(() => {
    const changesHeating = supabase
      .channel('changesLoading')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rl_machine_sensors',
          filter: `machine=eq.${machineInfo.machine_id}`,
        },
        (payload) => {
          console.log(payload);
          setCrucibleVolume(payload.new.crucible_volume);
        },
      )
      .subscribe();
    return () => {
      changesHeating.unsubscribe();
    };
  }, [machineInfo.machine_id]);

  return (
    <>
      <div className='m-auto mt-4  w-[80%] sm:w-[60%] md:w-[55%] lg:w-[65%] xl:w-[60%]'>
        <StepIndicator step={2} />
      </div>
      <AddingUI
        crucibleVolume={crucibleVolume}
        isCanceling={isCanceling}
        setCancelModalOpen={setCancelModalOpen}
        toggleCancelModal={toggleCancelModal}
        cancelModalOpen={cancelModalOpen}
        handleCancelProcess={handleCancelProcess}
      />
    </>
  );
};
export default Adding;
