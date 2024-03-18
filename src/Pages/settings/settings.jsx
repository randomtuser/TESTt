import React from 'react';
import Account from '../../components/account/account';

export default function Settings(props) {
  return (
    <>
      <div className='w-full '>
        <Account props={props} notify={props.notify} />
      </div>
    </>
  );
}
