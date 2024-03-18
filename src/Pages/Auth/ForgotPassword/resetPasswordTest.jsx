import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { restPassword, restpasswordforEmail } from './api/resetPassword';
import CompanyLogoSmall from '../../../icons/companyLogoSmall';
import CompantLogoText from '../../../icons/compantLogoText';
export default function ResetPasswordTest(props) {
  const { t } = useTranslation(['Notify']);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: emailcheck, error: check } = await restPassword(formik);

    if (!emailcheck || emailcheck.length <= 0) {
      props.notify(`${t('notifyEmailNotExisting')}`, 'error');
      return;
    }
    const { data, error } = await restpasswordforEmail(formik);
    if (error || check) {
      console.log(error?.message);
      console.log(check?.message);
    }
    props.notify(`${t('notifyVerify')}`, 'success');
  };

  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a Vaid Email').required('Email is Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      className='flex h-screen w-full items-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className='mx-auto grid h-[70%] w-[90%] grid-cols-2 rounded-large bg-[#393939] bg-opacity-50 xl:w-[90%] 2xl:w-[80%]'
      ></div>

      <div className='absolute  top-20 z-[1] rounded-large bg-transparent  md:left-[35%] md:top-[30%] md:w-[35%] md:bg-[white] xl:w-[35%] 2xl:w-[30%] '>
        <div className='mb-5 mt-10 block h-fit'>
          {/* LOGO */}

          <div className='flex h-fit w-full items-center justify-center gap-3 '>
            <CompanyLogoSmall />
            <CompantLogoText />
          </div>
          {/* Logo end */}

          <div className='px-3'>
            <p className='my-2 text-center text-4xl font-semibold text-black'> Reset Password</p>
            <p className='my-3 grid place-items-center text-center text-sm text-[#878787]'>
              {' '}
              Enter the email address you used to create your account and we will send you an email
              to reset your password.{' '}
            </p>
          </div>
          <div className='my-3 flex justify-center'>
            <form onSubmit={handleSubmit} className='w-[80%]'>
              <div>
                <label
                  className='my-4 block text-sm font-medium text-black dark:text-black'
                  htmlFor='email'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className='block w-[100%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-darkWhite dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='example@mail.com'
                  required
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-xs text-red-500'>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='my-3 h-[42px] w-[100%] rounded bg-[#FB8500] text-center hover:bg-orange-500'
                >
                  <p className=' text-white'>Reset Password</p>
                </button>{' '}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
