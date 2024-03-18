import { Link } from 'react-router-dom';
import BackButtonMobile from '../../icons/backButton';
export default function MobileButton() {
  return (
    <>
      <div className='flex items-center px-4 md:hidden'>
        <Link to={process.env.PUBLIC_URL + `/`}>
          <button className='relative right-1 flex items-start dark:invert'>
            <BackButtonMobile />
          </button>
        </Link>
        <p className='text-[#393939] text-opacity-50 dark:text-darkWhite'>Back to Overview</p>
      </div>
    </>
  );
}
