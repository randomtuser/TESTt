import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../../supabase';
import { useTranslation } from 'react-i18next';

const ResetPassword = (props) => {
  const { t } = useTranslation(['Notify']);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.resetPasswordForEmail(formik.values.email);
    if (error) {
      console.log(error.message);
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
      >
        <div className='w-full'></div>
        <div className='flex h-full w-full items-center justify-end pr-24'></div>
      </div>

      <div className='absolute left-[35%] z-[1] h-[45%] w-[35%] rounded-large bg-[white] xl:w-[35%] 2xl:w-[30%]'>
        <div className='block h-full pt-[7%]'>
          <div className='px-3'>
            <p className='my-2 text-center text-4xl font-semibold text-black'> Password Reset</p>
            <p className='my-3 grid place-items-center text-center text-sm text-[#878787]'>
              {' '}
              Enter the email address you used to create your account and we will send you an email
              to reset your password.{' '}
            </p>
          </div>
          <div className='my-8 flex justify-center'>
            <form onSubmit={handleSubmit} className='w-[80%]'>
              <div>
                <label
                  class='my-4 block text-sm font-medium text-black dark:text-black'
                  for='email'
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
};

export default ResetPassword;
