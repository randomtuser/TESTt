import React from 'react';

const MachineInfo = ({ machineInfo }) => {
  return (
    <>
      <div className='w-full rounded-large bg-white  p-2 pt-2 pb-0 shadow-cardShadow'>
        <div className='flex justify-between border-b border-gray-400'>
          <p className='text-xl'>Machine information</p>
          <span>
            Alias: {machineInfo.alias}| ID: {machineInfo.machine_id}
          </span>
        </div>
      </div>
    </>
  );
};

export default MachineInfo;
