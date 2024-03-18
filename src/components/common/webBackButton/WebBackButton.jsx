import React from 'react';
import { useNavigate } from 'react-router-dom';

function WebBackButton({ onCustomClick }) {
  const navigate = useNavigate();

  function handleGoBack() {
    if (onCustomClick) {
      onCustomClick();
      return;
    } else {
      navigate(-1);
    }
  }
  return (
    <div className='flex items-center'>
      <button className='mr-5 flex items-center rounded bg-white p-2 pl-3' onClick={handleGoBack}>
        <span className='h-4 w-4 rotate-[225deg] transform border-t-2 border-r-2 border-[#393939] border-opacity-70 '></span>
      </button>
    </div>
  );
}

export default WebBackButton;
