import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  updateUserData,
  updateUserById,
} from '../../Pages/Auth/AfterRegisterUser/api/afterRegisterUser';
import CompanyLogo from '../../icons/companyLogo';
function Register(props) {
  const user = props.user;
  const navigate = useNavigate();
  // const [gp, setGroupname] = useState({});
  const { t } = useTranslation(['Auth', 'Notify']);

  // async function loadUs() {
  //   let { data } = await supabase.from('group').select('name').eq('id', group);
  //   setGroupname(data[0]);
  // }
  // useEffect(() => {
  //   loadUs(setGroupname);
  // }, [group]);

  // UPDATING USER WITH FIRST NAME AND LAST NAME
  /////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateUserData();

    const full_name = formik.values.firstName + ' ' + formik.values.lastName;

    await updateUserData();

    const { error } = await updateUserById(formik, user, full_name);

    if (error) {
      alert(error.message);
    }
    navigate(process.env.PUBLIC_URL + '/');
  };
  /////////////////////////////////////////////////////////////////////////////////////////
  // END OF UPDATING USER WITH FIRST NAME AND LAST NAME
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, t('nameLong')).required(t('requiredField')),
      lastName: Yup.string().max(20, t('lastNameLong')).required(t('requiredField')),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';

  return (
    <div
      className='flex h-screen w-full items-center justify-center md:bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className='mx-auto  grid  h-[70%] w-[90%] rounded-large bg-transparent md:bg-[#393939] md:bg-opacity-50 lg:grid-cols-2 xl:w-[90%] 2xl:w-[80%]'
      >
        <div className='hidden w-full'></div>
        <div className='hidden h-full w-full items-center justify-center md:flex '>
          <div className=' block'></div>
        </div>
      </div>
      <div className='absolute z-[1] flex h-max min-h-[85%] w-full justify-center rounded-large bg-transparent text-xl md:w-[43%] md:bg-[white] xl:w-[43%] 2xl:w-[38%]'>
        <div className='flex w-2/3 flex-col items-center justify-start gap-4'>
          <CompanyLogo />{' '}
          <div className='text-center md:w-full'>
            <p>{t('almostFinished')}</p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4 px-2 md:w-[350px]'>
            <div className='mt-6'>
              <label class='my-1 block text-xl  ' for='firstName'>
                {t('name')}
              </label>
              <input
                id='firstName'
                name='firstName'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder=' '
                required
              />

              {formik.touched.firstName && formik.errors.firstName ? (
                <div className='text-xs text-red-500'>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className='mt-6'>
              <label class='my-1 block text-xl  ' for='lastName'>
                {t('lastName')}
              </label>
              <input
                id='lastName'
                name='lastName'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder=''
                required
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className='text-xs text-red-500'>{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='mb-1 mt-4 h-[48px] w-full rounded bg-[#FB8500] text-center hover:bg-orange-500  '
              >
                <p className='text-xl  text-white'>{t('continue')}</p>
              </button>
            </div>
            {/* ALREADY HAVE AN ACCOUNT PART */}
            <div className='h-[80px] flex-grow lg:hidden'></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
