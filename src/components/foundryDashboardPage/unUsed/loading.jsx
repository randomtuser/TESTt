import React, { useState, useEffect } from 'react';
import StepIndicator from '../StepIndicator';
import { useTranslation } from 'react-i18next';
import getMachineSensors from '../../../hooks/getMachineSensors';
import { supabase } from '../../../supabase';
import Modal from '../../Modals/Modal';
import { Waveform } from '@uiball/loaders';
import sendCommandCancel from '../Hooks/sendCommandCancel';
import { useNotifications } from 'reapop';

const Loading = ({ machineInfo }) => {
  const { t } = useTranslation(['Dashboard']);
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
      <div className='m-auto w-[80%] sm:w-[60%] md:w-[55%] lg:w-[65%] xl:w-[60%]'>
        <StepIndicator step={2} />
      </div>
      <div className=''>
        <div className=' text-center  text-4xl'>{t('adding')}</div>
        <div className='flex items-center justify-center'>
          <img className='dark:invert' src={`/icons/loading.png`} alt='Adding' />
        </div>
        <label
          htmlFor='userTemperatureIdling'
          className='flex items-center justify-center pt-8 text-3xl'
        >
          {t('amount')}
        </label>

        <div className='ml-12 flex items-center justify-center  justify-items-end pt-2 text-3xl'>
          <div className='mr-2 w-[120px] rounded-large border border-black text-center dark:border-white sm:ml-12'>
            {crucibleVolume}
          </div>

          <label htmlFor='userTemperatureIdling' className='mr-4 sm:mr-12'>
            cm³
          </label>
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button
            disabled={isCanceling}
            onClick={(e) => {
              setCancelModalOpen(true);
            }}
            className='black mb-8 w-[40%] rounded-lg border-2 border-black bg-black text-xl text-white dark:invert md:w-[30%]'
          >
            {isCanceling ? (
              <>
                <div className='flex justify-center p-2'>
                  <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center  justify-center'>
                  <img src='/icons/cancel_48pxorange.png' className='  ' alt='Cancel'></img>

                  <div>{t('cancel')}</div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>

      <Modal
        toggleModal={() => {
          toggleCancelModal();
        }}
        title='Cancel process'
        isOpen={cancelModalOpen}
        defaultButtons={false}
      >
        <div className={''}>
          <p className='text-center text-xl'>{t('confirmCancel')}</p>
          <div className={`flex justify-center gap-6 `}>
            <button
              onClick={() => {
                handleCancelProcess();
              }}
              className='my-4 rounded-lg  bg-[#FB8500] py-2 px-4 text-white  '
            >
              {t('yes')}
            </button>
            <button
              onClick={() => {
                setCancelModalOpen(false);
              }}
              className='my-4 rounded-lg  bg-red-400 py-2 px-4 text-white '
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Loading;
