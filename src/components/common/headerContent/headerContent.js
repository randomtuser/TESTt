import React from 'react';

function HeaderContent({ children }) {
  return (
    <div
      className={`pointer-events-none top-0 right-0 mx-auto flex h-20 w-full items-center justify-center dark:bg-[#1B1B1B] xl:absolute xl:w-[calc(100%-288px)] dark:xl:bg-transparent`}
    >
      <div className='pointer-events-auto relative -top-2 h-[55px] w-full xl:w-2/5 '>{children}</div>
    </div>

    // <div className='absolute top-0 flex h-16 w-full items-center 2xl:m-0'>{children}</div>
  );
}

export default HeaderContent;
