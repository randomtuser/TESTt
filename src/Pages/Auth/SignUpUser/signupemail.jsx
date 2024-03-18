import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopupModal from './popupModal';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/auth';
import TermsPopup from '../SignUp/termsPopup';
import { getName, updateUserpassword, updateUserTime, updateUserName } from './api/signupemail';
import CompanyLogo from '../../../icons/companyLogo';
export default function SignUpmail(props) {
  const profile = props.profile;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation(['Auth', 'Notify']);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [compName, setCompName] = useState();
  const { user } = useAuth;

  if (user && user.user_metadata.time === 'second') {
    navigate(process.env.PUBLIC_URL + '/');
  }
  async function loadName() {
    let { data, error } = await getName(props.profile);
    // supabase.from('group').select('name').eq('id', profile.group);
    if (error) {
      console.log(error);
      // props.notify(`${t('error while getting user name')}`, 'error');
    } else {
      setCompName(data[0].name);
    }
  }
  useEffect(() => {
    if (profile !== undefined || !profile) {
      loadName();
    }
  }, [profile]);
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const acceptTerms = () => {
    setShowPopup(!showPopup);
    setTermsCheck(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formik.values.password) {
      props.notify(`make sure you insert a password`, 'error');
      return;
    } else {
      try {
        ////////////////////// update user's password /////////////////////////////////

        const { error } = await updateUserpassword(formik);

        if (error) {
          props.notify(`make sure you insert a password`, 'error');
        }

        const { error: err } = await updateUserTime();

        if (err) {
          props.notify(`erro on updating user`, 'error');
        }

        ////////////////////// end of updating user's password ///////////////////////////////////////////

        /////////////////////  updating user's values        ///////////////////////////////////////////

        const fullname = formik.values.firstName + ' ' + formik.values.lastName;
        let { error: updatingvalues } = await updateUserName(formik, fullname, profile);
        if (updatingvalues) {
          alert(updatingvalues.message);
          props.notify(updatingvalues.message, 'error');
        } else {
          props.notify(`Welcome to the metalmaker 3D app`, 'info');
          navigate(process.env.PUBLIC_URL + '/signin');
        }
        /////////////////////  end ofupdating user's values        ///////////////////////////////////////////
      } catch (error) {
        console.error(error);
      }
    }
  };

  const PasswordRegEx = // Password RegEx //
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    }, // Validation //
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, t('nameLong')).required(t('requiredField')),
      lastName: Yup.string().max(20, t('lastNameLong')).required(t('requiredField')),
      password: Yup.string()
        .required(t('enterPassword'))
        .matches(PasswordRegEx, t('passRequirements'))
        .min(8, t('passShort'))
        .max(20, t('passLong')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('passwordNoMatch'))
        .required(t('requiredField')),
    }),
    onSubmit: async (values, bag) => {
      try {
        console.log(JSON.stringify(values, null, 2));
        navigate('');
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';

  return (
    <>
      <div
        className='flex h-screen w-full items-center justify-center md:bg-cover'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div
          style={{ backdropFilter: 'blur(6px)' }}
          className='rounded-largebg-transparent  mx-auto  grid h-[70%] w-[90%] md:bg-[#393939] md:bg-opacity-50 lg:grid-cols-2 xl:w-[90%] 2xl:w-[80%]'
        >
          <div className='hidden w-full'></div>
          <div className='hidden h-full w-full items-center justify-center md:flex '>
            <div className=' block'></div>
          </div>
        </div>
        <div className='absolute z-[1] flex h-max min-h-[85%] w-full justify-center rounded-large bg-transparent text-xl md:w-[43%] md:bg-[white] xl:w-[43%] 2xl:w-[38%]'>
          <div className='flex w-2/3 flex-col items-center justify-start gap-4'>
            <CompanyLogo />
            <div className='flex w-full flex-col gap-y-2 text-center'>
              <p className='text-lg md:text-xl'>
                {t('welcome')}, {profile.email}
              </p>
              <p className='text-base'>{t('almostFinished')}</p>
            </div>

            <form onSubmit={handleSubmit} className='w-full space-y-4 px-2 md:w-[350px]'>
              <div className='mt-3'>
                <label
                  class='my-1 block text-sm font-medium text-black dark:text-black'
                  for='firstname'
                >
                  {t('name')}
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  placeholder=''
                  required
                  onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className='text-xs text-red-500'>{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className='mt-6'>
                <label
                  class='my-1 block text-sm font-medium text-black dark:text-black'
                  for='lastname'
                >
                  {t('lastName')}
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  placeholder=''
                  required
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className='text-xs text-red-500'>{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div>
                <label
                  class='my-1 block text-sm font-medium text-black dark:text-black'
                  for='password'
                >
                  {t('pass')}
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder=''
                    required
                    onChange={formik.handleChange}
                  />
                  <div
                    className='absolute right-2 top-1/2 z-10 -translate-y-1/2 transform bg-transparent focus:outline-none'
                    onClick={togglePasswordVisibility1}
                  >
                    {showPassword1 ? (
                      <AiOutlineEye color='gray' size={24}></AiOutlineEye>
                    ) : (
                      <AiOutlineEyeInvisible color='gray' size={24} />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-xs text-red-500'>{formik.errors.password}</div>
                ) : null}
              </div>
              <div>
                <label
                  class='my-1 block text-sm font-medium text-black dark:text-black'
                  for='confirmPassword'
                >
                  {t('confirmPass')}
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    placeholder=''
                    required
                    onChange={formik.handleChange}
                  />
                  <div
                    className='absolute right-2 top-1/2 z-10 -translate-y-1/2 transform bg-transparent focus:outline-none'
                    onClick={togglePasswordVisibility2}
                  >
                    {showPassword2 ? (
                      <AiOutlineEye color='gray' size={24}></AiOutlineEye>
                    ) : (
                      <AiOutlineEyeInvisible color='gray' size={24} />
                    )}
                  </div>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className='text-xs text-red-500'>{formik.errors.confirmPassword}</div>
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
                    class='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                </div>
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
                              class='inline-block max-h-96 transform overflow-y-auto rounded-lg bg-white px-6 pb-1 pt-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'
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
                  className='mb-1 h-[42px] w-full rounded bg-[#FB8500] text-center hover:bg-orange-500  '
                >
                  <p className=' text-white'>{t('continue')}</p>
                </button>
              </div>
              <div className='h-[80px] flex-grow lg:hidden'></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
