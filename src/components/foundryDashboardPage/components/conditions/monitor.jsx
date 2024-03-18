import React, { useState } from 'react';
import Modal from '../../../common/modals/modal';
import { Waveform } from '@uiball/loaders';
import { useNotifications } from 'reapop';
import { realTimeCommandMonitorDisable } from '../../api/monitor';
import MonitorIcon from '../../icons/conditions/monitorIcon';
import VideoPlayer from './videoPlayer';

const Monitor = ({ machineInfo }) => {
  const [monitorOpen, setMonitrOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadedImage, setLoadedImage] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const { notify } = useNotifications();

  const toggleMonitor = () => {
    setMonitrOpen(!monitorOpen);
  };

  async function sendMonitorCommand() {
    setLoadedImage(false);
    setErrorImage(false);
    setLoadingImage(false);
  }

  async function disableCamera() {
    console.log('disable');
    let commandMonitor = { command: 'cam', value: false };
    let { error } = await realTimeCommandMonitorDisable(commandMonitor, machineInfo.machine_id);
    if (error) {
      console.log('error');
      notify('Thera was an error getting the camera.', 'error');
    }
  }

  return (
    <>
      <button
        className=''
        onClick={() => {
          setMonitrOpen(true);
          sendMonitorCommand();
        }}
      >
        <div className=''>
          <MonitorIcon />
        </div>
      </button>
      <Modal
        title='Monitor'
        isOpen={monitorOpen}
        toggleModal={toggleMonitor}
        defaultButtons={false}
      >
        <div className='flex flex-col items-center justify-center'>
          <div className='text-center'>
            {loadingImage ? (
              <Waveform size={40} lineWeight={3.5} speed={1} color='#FB8500' />
            ) : (
              <>
                <VideoPlayer />
              </>
            )}
            {loadedImage ? (
              <img
                src={imgUrl}
                onError={(e) => {
                  setErrorImage(true);
                  setLoadedImage(false);
                }}
                alt='Monitor'
                className='w-[650px]'
              ></img>
            ) : (
              ''
            )}
            {errorImage ? <div>There was an error loading the monitor</div> : ''}
          </div>
          <div className=''>
            <button
              onClick={() => {
                disableCamera();
                setMonitrOpen(false);
              }}
              className='my-4 rounded-lg border-2 border-red-500 bg-red-500 py-2 px-4 text-white hover:border-red-600 hover:bg-red-600'
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Monitor;
