import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ name, time }) => {
  const date = time.slice(0, 10);
  const hour = time.slice(11, 19);
  const dateHour = `${date} ${hour}`;
  return (
    <li className='border-b-2 border-gray-500  bg-gray-100 md:ml-5 md:mr-5  md:text-lg'>
      <div className='grid-col-1 grid  md:grid-cols-2'>
        <span className='justify-self-center md:text-sm  '>{name}</span>
        <span className='justify-self-center md:text-sm  '>{dateHour}</span>
      </div>
    </li>
  );
};

Message.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
};

Message.defaultProps = {
  name: '',
  time: '',
};

export default Message;
