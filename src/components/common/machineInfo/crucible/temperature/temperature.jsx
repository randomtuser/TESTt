import React from 'react';
import PropTypes from 'react';
import _ from 'lodash';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Temperature = ({ currentTemperature, maxTemperature }) => {
  const rotation = 0.625;
  const circleRatio = 0.75;
  const numSeparators = 8;

  function RadialSeparator(props) {
    return (
      <div
        className=' h-[95%] sm:h-[90%]'
        style={{
          position: 'absolute',

          transform: `rotate(${props.turns}turn)`,
        }}
      >
        <div style={props.style} />
      </div>
    );
  }

  function RadialSeparators(props) {
    return props.values.map((value) => <RadialSeparator turns={value} style={props.style} />);
  }
  return (
    <CircularProgressbarWithChildren
      value={currentTemperature}
      maxValue={maxTemperature}
      circleRatio={circleRatio}
      styles={buildStyles({
        pathColor: `rgba(0, 0, 0, ${currentTemperature / 100})`,
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: 'butt',
        textColor: 'red',
        trailColor: 'gray',
      })}
    >
      <RadialSeparators
        values={_.range(numSeparators + 1).map(
          (index) => (circleRatio / numSeparators) * index + rotation,
        )}
        style={{
          background: '#888',
          width: '1px',
          height: '3%',
          marginTop: 10,
        }}
      />
      <div className='sm: ml-1 flex-nowrap text-base sm:text-xl lg:text-base'>
        <div className='font-semibold text-orange-500'>{currentTemperature}ºC</div>
        <div>
          <div className='font-semibold text-black'>{maxTemperature}ºC</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></div>
    </CircularProgressbarWithChildren>
  );
};

Temperature.propTypes = {
  currentTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
};

Temperature.defaultProps = {
  currentTemperature: '0',
  maxTemperature: '0',
};

export default Temperature;
