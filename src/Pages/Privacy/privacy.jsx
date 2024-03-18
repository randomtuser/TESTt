import React from 'react';
import PrivacyData from './api/privacyData';
import MobileButton from '../../components/foundriesPage/mobileButton';
function Privacy() {
  const privacyData = PrivacyData();

  return (
    <>
      <div className=''>
        <MobileButton />
      </div>
      <div className='bg-emphasis max-h-[80%] w-full dark:text-darkWhite'>
        <div className='flex w-full  '>
          <div className=' '>
            <div className=' overflow-hidden '>
              <div className=' ml-6  font-poppins text-[16px] text-gray-500 dark:text-[#878787]'>
                Last updated: 2023-06-17
              </div>

              <div className='flex w-full flex-col items-center justify-center'>
                <div className='mb-4 flex h-[82vh]  w-[96%]  flex-col flex-wrap overflow-auto rounded-[10px] border-gray-300  bg-[#FFFFFF] px-4 pb-3  pt-2 dark:bg-[#0D0D0D] md:mt-4 md:mb-0 md:px-5'>
                  <div className='flex w-full flex-col'>
                    <div id='Introduction' className=' mt-4 mb-6 flex flex-col gap-0 text-justify'>
                      <h1 className=' font-popins flex justify-start text-2xl  font-medium	text-gray-800 dark:text-[#FFFFFF]'>
                        {privacyData.introduction.lable}{' '}
                      </h1>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.introduction.description[0]}{' '}
                        {privacyData.introduction.description[1]}{' '}
                        {privacyData.introduction.description[2]}{' '}
                        {privacyData.introduction.description[3]}{' '}
                        {privacyData.introduction.description[4]}{' '}
                      </p>
                    </div>
                    <div id='Definitions' className=' mb-6 flex flex-col  text-justify'>
                      <h1 className='my-b font-popins flex justify-start text-2xl  font-medium	text-gray-800 dark:text-[#FFFFFF]'>
                        {privacyData.definitions.lable}{' '}
                      </h1>
                      <p className='font-popins  text-md my-0 text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[0]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[1]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[2]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[3]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[4]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[5]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[6]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.definitions.description[7]}
                      </p>
                    </div>
                    <div
                      id='Information Collection and Use'
                      className=' mb-6 flex flex-col  text-justify'
                    >
                      <h1 className='my-b font-popins flex justify-start text-2xl  font-medium	text-gray-800 dark:text-[#FFFFFF]'>
                        {privacyData.informationCollection.lable}
                      </h1>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.informationCollection.description[0]}
                      </p>
                    </div>
                    <div id='Types of Data Collected' className='flex flex-col pb-6  text-justify'>
                      <h1 className='my-b font-popins flex justify-start text-2xl  font-medium	text-gray-800 dark:text-[#FFFFFF]'>
                        {privacyData.typesOfDataCollected.lable}
                      </h1>
                      <p className='font-popins text-md my-2 font-semibold text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[0]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[1]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[2]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[3]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[4]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[5]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[6]}
                      </p>
                      <p className='font-popins   text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.typesOfDataCollected.description[7]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        <b>{privacyData.typesOfDataCollected.description[8]}</b>
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[0]}
                      </p>
                      <p className='font-popins   text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[1]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[2]}
                      </p>
                      <p className='font-popins text-md my-2 font-semibold text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[3]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[4]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[5]}
                      </p>
                      <p className='font-popins text-md my-2 font-semibold text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[6]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[7]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[8]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[9]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[10]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[11]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[12]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[13]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[14]}
                      </p>
                      <p className='font-popins text-md my-2  font-semibold text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[15]}
                      </p>
                      <p className='font-popins  text-md text-gray-500 dark:text-[#878787]'>
                        {privacyData.usageData.description[16]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;
