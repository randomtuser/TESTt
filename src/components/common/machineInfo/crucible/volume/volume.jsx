import React from 'react';
import PropTypes from 'prop-types';

const Volume = ({ currentVolume, maxVolume }) => {
  let volumePercentage;

  if (currentVolume >= maxVolume) {
    volumePercentage = '100';
  } else {
    volumePercentage = (currentVolume * 100) / maxVolume;
    volumePercentage = volumePercentage.toString();
  }

  return (
    <>
      <div className='relative md:h-full md:w-full '>
        <div className='absolute mt-[26%] h-full w-full  flex-nowrap text-center  sm:text-xl xl:text-lg '>
          {/*<div className='mt-1 text-black font-semibold'>{maxVolume} cm³</div>*/}

          <div className='mt-[5%] font-semibold text-black'> {currentVolume} ml </div>
        </div>

        <div className='h-full w-full'>
          <img src={process.env.PUBLIC_URL + '/icons/volumeCrucible.svg'} alt='Volume level'></img>
        </div>

        <div
          className=' absolute bottom-0 z-[-1]  h-[]  w-full bg-gray-400 transition-[height]'
          style={{ height: volumePercentage + '%' }}
        ></div>
      </div>
    </>
  );
};

Volume.propTypes = {
  currentVolume: PropTypes.number,
  maxVolume: PropTypes.number,
};
Volume.defaultProps = {
  currentVolume: 0,
  maxVolume: 0,
};

export default Volume;
