import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopupModal from './popupModal';
import TermsPopup from './termsPopup';
import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  checkEmail,
  checkCode,
  registerUserToDatabase,
  updateCode,
  updateProfiles,
} from '../../../components/signUpPage/api/signUp';
import Logo from '../../../components/signUpPage/icons/logo';
import WordLogo from '../../../components/signUpPage/icons/wordLogo';

export default function SignUp(props) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const { t } = useTranslation(['Auth', 'Notify']);

  const user = props.user;

  if (user !== undefined) {
    navigate(process.env.PUBLIC_URL + '/signin');
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const acceptTerms = () => {
    setShowPopup(!showPopup);
    setTermsCheck(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: emailcheck, error: Check } = await checkEmail(formik);

    if (!emailcheck || emailcheck.length > 0) {
      props.notify(`${t('Notify:notifyEmailExisting')}`, 'error');
      return;
    }
    const enteredCode = formik.values.code;
    // Check if code exists in the table
    const { data: codeData } = await checkCode(enteredCode);
    if (!codeData || codeData.length === 0) {
      props.notify(`${t('Notify:notifyCode')}`, 'error');
      return;
    } else if (codeData[0].user_assign !== null) {
      props.notify(`${t('Notify:notifyCodeUsed')}`, 'error');
      return;
    } else {
      try {
        /** REGISTER USER IN SUPABASE */
        const { data, error } = await registerUserToDatabase(formik);

        let { error: d } = await updateCode(data, enteredCode);
        if (d) console.log(d.message);
        if (error) {
          throw error;
        }

        const { error: yui } = await updateProfiles(data);
        if (yui) {
          console.log(yui);
        }
        props.notify(`${t('Notify:notifyEmailVerify')}`, 'info');
        navigate(process.env.PUBLIC_URL + '/signin');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const PasswordRegEx = // Password RegEx //
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: '',
      code: '',
      terms: false,
    }, // Validation //
    validationSchema: Yup.object({
      email: Yup.string().email(t('validEmail')).required(t('requiredField')),
      password: Yup.string()
        .required(t('enterPassword'))
        .matches(PasswordRegEx, t('passRequirements'))
        .min(8, t('passShort'))
        .max(20, t('passLong')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('passwordNoMatch'))
        .required(t('requiredField')),
      code: Yup.string().min(4, t('codeShort')).required(t('missingCode')),
      terms: Yup.bool().oneOf([true], t('acceptTerms')),
    }),
    onSubmit: async (values, bag) => {
      try {
        console.log(JSON.stringify(values, null, 2));
        navigate('  ');
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';

  return (
    <div
      className='flex h-screen w-full items-center  md:bg-cover '
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style jsx>{}</style>
      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className='mx-auto grid h-[70%] grid-cols-2 rounded-[5px] bg-transparent md:w-[90%] md:bg-[#393939] md:bg-opacity-50 xl:w-[90%] 2xl:w-[80%]'
      >
        <div className='hidden h-full w-full items-center justify-center pr-14 md:flex'>
          <div className=' block'>
            <div className='w-full pb-12 text-center text-3xl font-semibold tracking-widest text-white 2xl:text-textLogin 2xl:font-textLogin'>
              {t('haveAcc')}
            </div>
            <div className='text-login-text flex w-full items-center justify-center text-white'>
              <Link
                className='rounded-[5px] bg-[#FB8500] py-3 text-xl hover:bg-orange-500 md:px-12 xl:px-24'
                to={process.env.PUBLIC_URL + '/signin'}
              >
                {t('signIn')}
              </Link>
            </div>
          </div>
        </div>
        <div className='hidden w-full'></div>
      </div>
      {/** Sign up card */}
      <div className='absolute z-[1] flex h-max min-h-[85%] w-[100%] justify-center rounded-[5px] bg-transparent pt-6 md:left-[45%] md:my-4  md:w-[45%] md:bg-[white] md:pt-0  xl:w-[45%] 2xl:w-[40%]'>
        <div className='mb-5 mt-10 block h-fit'>
          <div className='flex items-center justify-center px-3'>
            {/* LOGO */}
            <div className='flex h-fit w-fit items-center justify-center gap-3 '>
              <Logo />
              <WordLogo />
            </div>
            {/* Logo end */}
          </div>
          <p className='mt-2 pb-0 pt-3 text-center text-2xl font-semibold text-black md:pb-2 md:pt-3 md:text-4xl'>
            {t('createAcc')}
          </p>
          <div className='flex items-center justify-center pt-4'>
            <form onSubmit={handleSubmit} className='space-y-4 px-2 md:w-[350px]'>
              <div className='mt-6'>
                <label class='my-1 block text-sm font-medium text-black' for='email'>
                  {t('emailAddress')}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className='block w-full rounded-[5px] border-[2px] border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  placeholder=''
                  required
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-xs text-red-500'>{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label class='my-1 block text-sm font-medium text-black' for='password'>
                  {t('pass')}
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-[5px] border-[2px] border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-xs text-red-500'>{formik.errors.password}</div>
                ) : null}
              </div>
              <div>
                <label class='my-1 block text-sm font-medium text-black' for='confirmPassword'>
                  {t('confirmPass')}
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-[5px] border-[2px] border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className='text-xs text-red-500'>{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div>
                <label class='my-1 block text-sm font-medium text-black' for='code'>
                  {t('code')}
                </label>
                <input
                  id='code'
                  name='code'
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.code}
                  className='block w-full rounded-[5px] border-[2px] border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  placeholder=' '
                  required
                />
                {formik.touched.code && formik.errors.code ? (
                  <div className='text-xs text-red-500'>{formik.errors.code}</div>
                ) : null}
              </div>
              <div className='flex'>
                <div class='mr-1 flex h-5 items-center  '>
                  <input
                    checked={termsCheck}
                    onClick={() => {
                      setTermsCheck(!termsCheck);
                    }}
                    id='terms'
                    name='terms'
                    required
                    type='checkbox'
                    class='focus:ring-3 h-4 w-4 rounded-[5px] border-[2px] border-gray-300 bg-gray-50 focus:ring-blue-300'
                  />
                </div>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className='text-xs text-red-500'>{formik.errors.terms}</div>
                ) : null}
                <p className='text-[12px] text-black'>
                  {t('terms1')}{' '}
                  <button type='button' onClick={togglePopup} className='text-blue-600'>
                    {t('terms2')}
                  </button>
                  {showPopup && (
                    <div
                      onClick={togglePopup}
                      class='popup user-select relative inline-block cursor-pointer select-none'
                    >
                      <PopupModal class='popup-content' show={showPopup}>
                        <div class='scroll-bar fixed inset-0 z-10 overflow-y-auto'>
                          <div class='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
                            <div class='fixed inset-0 transition-opacity' aria-hidden='true'>
                              <div class='absolute inset-0 bg-gray-500 opacity-75'></div>
                            </div>
                            <span
                              class='hidden sm:inline-block sm:h-screen sm:align-middle'
                              aria-hidden='true'
                            >
                              &#8203;
                            </span>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              class='inline-block max-h-96 transform overflow-y-auto rounded-[5px] bg-white px-6 pb-1 pt-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'
                            >
                              <div className='px-10 pt-5'>
                                <p className='text-xs text-gray-400'>{t('agreement')}</p>
                                <VscChromeClose
                                  onClick={togglePopup}
                                  className='float-right text-black'
                                />
                                <div>
                                  <p className='text-xl font-semibold text-black '>{t('tos')}</p>
                                </div>
                                <div class='mt-3 sm:mt-5'>
                                  <TermsPopup
                                    closeTermPopup={togglePopup}
                                    acceptTerms={acceptTerms}
                                    title={'Title for termspopup'}
                                  />
                                </div>
                              </div>
                              <div class='mt-5 sm:mt-6'></div>
                            </div>
                          </div>
                        </div>
                      </PopupModal>
                    </div>
                  )}
                </p>
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='mb-1 h-[42px] w-full rounded-[5px] bg-[#FB8500] text-center hover:bg-orange-500  '
                >
                  <p className=' text-white'>{t('createAcc')}</p>
                </button>
              </div>
              <p className='text-center md:hidden'>
                Already have an account?{' '}
                <a
                  className='... text-md mt-1 text-blue-700 hover:text-blue-500 '
                  href={process.env.PUBLIC_URL + '/signin'}
                >
                  {' '}
                  Sign in
                </a>
              </p>
              {/* ALREADY HAVE AN ACCOUNT PART */}
              <div className='h-[80px] flex-grow lg:hidden'></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
