import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CompantLogoText from '../../../icons/compantLogoText';
import CompanyLogoSmall from '../../../icons/companyLogoSmall';
import { updateUser, signOut } from './api/newPasswordApi';

export default function NewPassword(props) {
  const { t } = useTranslation(['Notify']);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const PasswordRegEx =
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    }, // Validation //
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Enter Your Password')
        .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
        .min(8, 'Password Should be minimum 8 character')
        .max(50, 'Too long'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password does not matched')
        .required('Confirm Password is Required'),
    }),
    onSubmit: async (values, bag) => {
      try {
        console.log(JSON.stringify(values, null, 2));
        navigate(process.env.PUBLIC_URL + '/signup');
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formik.values.confirmPassword !== formik.values.password) {
      props.notify(`${t('notifyPasswordMatch')}`, 'error');
      return;
    }
    const updateError = updateUser(formik.values.password);

    if (updateError) {
      props.notify(`${t('notifyPasswordError')}`, 'error');
    } else {
      signOut();
      props.notify(`${t('notifyPasswordUpdate')}`, 'success');
      // navigate(process.env.PUBLIC_URL + '/signin');
    }
  };

  return (
    <div className='flex h-screen w-full items-center'>
      <div className='mx-auto grid h-[70%] grid-cols-2 rounded-large bg-[#393939] md:w-[90%] xl:w-[90%] 2xl:w-[80%]'></div>

      <div className='absolute z-[1] w-full rounded-large bg-transparent pt-4 pb-4 md:top-[30%] md:left-[35%] md:w-[35%] md:bg-[white] xl:w-[35%] 2xl:w-[30%] '>
        {/* LOGO */}
        <div className='flex h-fit w-full items-center justify-center gap-3 '>
          <CompanyLogoSmall />
          <CompantLogoText />
        </div>
        {/* Logo end */}
        <div className='block h-fit  pt-[4%]'>
          <div className='px-3'>
            <p className='my-2 w-full text-center text-4xl font-semibold text-black'>
              Reset Password{' '}
            </p>
          </div>
          <div className='my-3 flex justify-center'>
            <form onSubmit={handleSubmit} className='w-[80%]'>
              <div>
                <label
                  class='my-1 block text-sm font-medium text-black dark:text-black'
                  for='password'
                >
                  New Password
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-darkWhite dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                    placeholder=''
                    required
                    onChange={formik.handleChange}
                  />
                  <div
                    className='absolute right-2 top-1/2 z-10 -translate-y-1/2 transform bg-transparent focus:outline-none'
                    onClick={() => {
                      setShowPassword1(!showPassword1);
                    }}
                  >
                    {showPassword1 ? (
                      <AiOutlineEye color='grey' size={24} />
                    ) : (
                      <AiOutlineEyeInvisible color='grey' size={24} />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  class='mt-4 block text-sm font-medium text-black dark:text-black'
                  for='confirmPassword'
                >
                  Confirm New Password
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-darkWhite dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                    placeholder=''
                    required
                    onChange={formik.handleChange}
                  />
                  <div
                    className='absolute right-2 top-1/2 z-10 -translate-y-1/2 transform bg-transparent focus:outline-none'
                    onClick={() => {
                      setShowPassword2(!showPassword2);
                    }}
                  >
                    {showPassword2 ? (
                      <AiOutlineEye color='grey' size={24} />
                    ) : (
                      <AiOutlineEyeInvisible color='grey' size={24} />
                    )}
                  </div>
                </div>
              </div>
              <div className='justify-bottom flex'>
                <button
                  type='submit'
                  className='mt-7 h-[42px] w-[100%] rounded bg-[#FB8500] text-center hover:bg-orange-500'
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
