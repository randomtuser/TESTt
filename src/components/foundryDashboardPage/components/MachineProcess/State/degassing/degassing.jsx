import React, { useState } from 'react';
import StepIndicator from '../stepIndicator';
import sendCommandCancel from '../../../../command/sendCommandCancel';
import { useNotifications } from 'reapop';
import DegassingUI from './degassingUI';
const Loading = ({ machineInfo }) => {
  const { notify } = useNotifications();
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const toggleCancelModal = () => {
    setCancelModalOpen(!cancelModalOpen);
  };

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

  return (
    <>
      <div className='m-auto mt-4  flex w-[80%] flex-col sm:w-[60%] md:w-[55%] lg:w-[65%] xl:w-[60%]'>
        <StepIndicator step={3} />
      </div>
      <DegassingUI
        isCanceling={isCanceling}
        setCancelModalOpen={setCancelModalOpen}
        toggleCancelModal={toggleCancelModal}
        cancelModalOpen={cancelModalOpen}
        handleCancelProcess={handleCancelProcess}
      />
    </>
  );
};

export default Loading;
