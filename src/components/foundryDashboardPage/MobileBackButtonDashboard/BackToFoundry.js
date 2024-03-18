import { Link } from 'react-router-dom';
import BackButtonMobile from '../../../icons/backButton';

export default function MobileBackButtonDashboard() {
  return (
    <>
      <div className='flex items-center md:hidden '>
        <Link to={process.env.PUBLIC_URL + `/foundries`}>
          <button className='flex items-center pl-1 dark:invert'>
            <BackButtonMobile />
          </button>
        </Link>
        <p className='text-[#393939] text-opacity-50 dark:text-darkWhite'>Back to Foundries</p>
      </div>
    </>
  );
}
