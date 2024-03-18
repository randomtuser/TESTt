import React, { useState, useEffect } from 'react';
import StepIndicator from '../stepIndicator';
import { useNotifications } from 'reapop';
import sendCommandTemperature from '../../../../command/sendCommandTemperature';
import IdlingUI from './idlingUI';

const Idling = ({ machineInfo }) => {
  const { notify } = useNotifications();
  const [invalidTemperature, setInvalidTemperature] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const [desiredTemperature, setDesiredTemperature] = useState(700);
  const [idlingModalOpen, setIdlingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Checks every time the window its resized to see if its mobile
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  //Handles the changes on the temperature input
  function handleChange(event) {
    setDesiredTemperature(event.target.value);
  }

  //Modal of pre-heat confirmation
  function toggleModal() {
    setIdlingModalOpen(!idlingModalOpen);
  }

  //Would set a variable if the screen its mobile, so the input of the number changes on mobile
  function handleWindowSizeChange() {
    setMobile(window.innerWidth <= 500);
  }

  //Would send command of Pre-heat to the machine if the temperature its correct.
  function sendCommandMachine() {
    setIsLoading(true);
    try {
      sendCommandTemperature(machineInfo.machine_id, desiredTemperature);
      notify('Sending command to the machine, please wait!', 'loading');
      setIdlingModalOpen(false);
    } catch (e) {
      /*Send the error to internal log, or upload to db */
      notify('There was an error sending the command.', 'error');
      setIsLoading(false);
    }
  }

  //Check the temperature its a number between 500 and 1500 using regex.
  //If its valid it would call sendCommandMachine()
  function checkTemperature() {
    let regexTemperature = /^([5-9][0-9]{2}|1[0-4][0-9]{2}|1500)$/g;
    if (regexTemperature.test(desiredTemperature)) {
      toggleModal();
      setInvalidTemperature(false);
    } else {
      notify('Temperature must be between 500ºC and 1500ºC', 'error');
      setInvalidTemperature(true);
    }
  }

  //Function that raise the temperature input by 10
  function raiseSmall() {
    setDesiredTemperature(desiredTemperature + 10);
  }
  //Function that raise the temperature input by 50
  function raiseBig() {
    setDesiredTemperature(desiredTemperature + 50);
  }
  //Function that lower the temperature input by 10
  function lowerSmall() {
    setDesiredTemperature(desiredTemperature - 10);
  }
  //Function that lower the temperature input by 50
  function lowerBig() {
    setDesiredTemperature(desiredTemperature - 50);
  }

  return (
    <>
      {/* <div className='m-auto mt-4 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[65%] xl:w-[60%]'> */}
      {/* <div className='m-auto  mt-4 w-[100%] sm:w-[70%] md:w-[55%] lg:w-[65%] xl:w-[60%]'> */}
      <div className='m-auto mt-4 w-[100%] sm:w-[70%] md:w-[55%] lg:w-[65%] xl:w-[60%]'>
        {/* Step indicator at top of card */}
        <StepIndicator step={0} />
      </div>
      <IdlingUI
        lowerBig={lowerBig}
        lowerSmall={lowerSmall}
        invalidTemperature={invalidTemperature}
        mobile={mobile}
        desiredTemperature={desiredTemperature}
        handleChange={handleChange}
        raiseSmall={raiseSmall}
        raiseBig={raiseBig}
        isLoading={isLoading}
        checkTemperature={checkTemperature}
        toggleModal={toggleModal}
        idlingModalOpen={idlingModalOpen}
        sendCommandMachine={sendCommandMachine}
        setIdlingModalOpen={setIdlingModalOpen}
      />
    </>
  );
};
export default Idling;
