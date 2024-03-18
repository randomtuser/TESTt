import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileBackButton() {
  return (
    <div className='flex items-center md:hidden'>
      <Link to={process.env.PUBLIC_URL + `/`}>
        <button className='mx-3 flex items-center rounded bg-white p-2 pl-3'>
          <span className='h-4 w-4 rotate-[225deg] transform border-t-2 border-r-2 border-[#393939] border-opacity-70 '></span>
        </button>
      </Link>
      <p className='text-[#393939] text-opacity-50'>Back to Overview</p>
    </div>
  );
}
