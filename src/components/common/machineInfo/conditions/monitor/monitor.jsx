import React, { useState } from 'react';
import Modal from '../../../Common/Modals/Modal';
import { supabase } from '../../../../supabase';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

const Monitor = ({ id }) => {
  const [monitorOpen, setMonitrOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadedImage, setLoadedImage] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const toggleMonitor = () => {
    setMonitrOpen(!monitorOpen);
  };

  async function sendMonitorCommand() {
    setLoadedImage(false);
    setErrorImage(false);
    setLoadingImage(true);

    let sendCommand = { cam: true };
    let { data, error } = await supabase
      .from('rl_machine_commands')
      .update({ command: sendCommand })
      .eq('machine', id);

    const { data: imgUrl, error: a } = supabase.storage
      .from('machines-files')
      .getPublicUrl(`${id}/monitor.jpg`);
    console.log(imgUrl.publicUrl);
    setImgUrl(imgUrl.publicUrl);
    setLoadingImage(false);
    setLoadedImage(true);
  }

  return (
    <>
      <button
        className=' flex items-center justify-center rounded-md bg-[#FB8500] text-white'
        onClick={() => {
          setMonitrOpen(true);
          sendMonitorCommand();
        }}
      >
        <div className='flex  w-[30%]  items-center justify-center gap-2 p-2   md:w-[30%] lg:w-full xl:w-full'>
          <img
            src={process.env.PUBLIC_URL + '/icons/videocam.svg'}
            alt='Monitor'
            className='w-full invert lg:w-[30%] '
          ></img>{' '}
          Monitor
        </div>
      </button>

      <Modal
        title='Monitor'
        isOpen={monitorOpen}
        toggleModal={toggleMonitor}
        defaultButtons={false}
      >
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <div className='text-center'>
            {loadingImage ? (
              <div className='grid justify-items-center justify-self-center'>
                Loading <LoadingSpinner />
              </div>
            ) : (
              ''
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
          {/*                 <div className="my-5 text-center">
                  <span>
                    
                  </span>
                </div> */}

          <div className=''>
            <button
              onClick={() => setMonitrOpen(false)}
              className='my-4 rounded-lg border-2 border-red-500 bg-red-500 px-4 py-2 text-white hover:border-red-600 hover:bg-red-600'
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
