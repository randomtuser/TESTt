import React, { useState, useEffect } from 'react';
import StepIndicator from '../stepIndicator';
import { useNotifications } from 'reapop';
import sendCommandCast from '../../../../command/sendCommandCast';
import getMachineSensors from '../../../../../../hooks/getMachineSensors';
import WaitingUI from './waitingUI';

const Waiting = ({ machineInfo, fileName }) => {
  const { notify } = useNotifications();
  const [partName, setPartName] = useState('');
  const [volumeFlow, setVolumeFlow] = useState(25);
  const [volume, setVolume] = useState(0);
  const [idlingModalOpen, setIdlingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPartName(fileName);
  }, [fileName]);

  useEffect(() => {
    getSensors();
  }, [machineInfo.machine_id]);

  async function getSensors() {
    let sensors = await getMachineSensors(machineInfo.machine_id);
    setVolume(sensors.crucible_volume);
  }

  const toggleModal = () => {
    setIdlingModalOpen(!idlingModalOpen);
  };

  function sendCommandMachine() {
    setIsLoading(true);
    try {
      sendCommandCast(machineInfo.machine_id);
      notify(`Sending command to the machine, please wait!.`, 'loading');
      setIdlingModalOpen(false);
    } catch (e) {
      notify('There was an error sending the command.', 'error');
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='m-auto mt-4 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[65%] xl:w-[60%]'>
        <StepIndicator step={4} />
      </div>
      <WaitingUI
        partName={partName}
        volume={volume}
        volumeFlow={volumeFlow}
        isLoading={isLoading}
        toggleModal={toggleModal}
        idlingModalOpen={idlingModalOpen}
        sendCommandMachine={sendCommandMachine}
        setIdlingModalOpen={setIdlingModalOpen}
      />
    </>
  );
};
export default Waiting;
