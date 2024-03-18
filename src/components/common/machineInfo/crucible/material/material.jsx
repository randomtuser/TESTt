import React from 'react';

const Material = ({ materialName, materialFormula, width, height }) => {
  return (
    <div class='grid h-full w-full items-center justify-center rounded-md border-2 border-black align-middle text-black '>
      <div class='text-center text-2xl '>{materialName}</div>
      <hr class='w-full border-[1px] border-black' />
      <div class=' text-center'>{materialFormula}</div>
    </div>

    /*     {/*
    <div
      className={`grid pb-2 h-${height ? height : 'full'} w-[${
        width ? width : 100
      }%]  grid-rows-2 content-between  border-4  border-slate-500 py-3 text-center`}
    >
      <div className='flex items-end justify-center text-2xl text-slate-500 sm:text-2xl xl:text-3xl'>
        {materialName}
      </div>
      <div className=''>
        <span className='border-t-4 border-slate-500 text-xl text-slate-500 sm:text-2xl xl:text-2xl'>
          {materialFormula}
        </span>
      </div>
    </div> */
  );
};

export default Material;
