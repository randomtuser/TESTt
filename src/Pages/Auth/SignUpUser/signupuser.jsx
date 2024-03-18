import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PopupModal from './popupModal';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import TermsPopup from '../SignUp/termsPopup';
import { signOut, loadGroup, getName, getProfile, signup } from './api/signupuser';
export default function SignUpuser(props) {
  const { qr } = useParams();
  const [compId, setCompanyId] = useState();
  const [compName, setCompName] = useState();
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

  useEffect(() => {
    const deletePreviusSession = async () => {
      const { error } = await signOut();
      //supabase.auth.signOut();
      console.log(error);
    };
    if (user) {
      deletePreviusSession();
    }
    console.log(user);
  }, [user]);

  ///////////////////////////////////////////////

  async function loadgroup() {
    let { data, error } = await loadGroup(qr);
    if (error) {
      props.notify(`Error while fetching group`, 'error');
    }
    loadName(data[0].company);
    setCompanyId(data[0].company);
    console.log(compId);
  }

  useEffect(() => {
    if (qr !== undefined) {
      loadgroup();
    }
  }, [qr]);

  //////////////////////////////////////

  async function loadName() {
    if (compId) {
      let { data, error } = await getName(compId);
      // supabase.from('group').select('name').eq('id', compId);
      if (error) {
        props.notify(`Error while loading name`, 'error');
      } else if (data) {
        setCompName(data[0].name);
      }
    }
  }
  useEffect(() => {
    loadName();
  }, [compId]);

  ///////////////////////////////////////
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
    setTermsCheck(true);
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ///////////// CHECK IF EMAIL EXISTS \\\\\\\\\\\\\\\
    const { data: emailcheck, error: Check } = await getProfile(formik);
    // supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('email', formik.values.email);

    if (!emailcheck || emailcheck.length > 0) {
      props.notify(`${t('Notify:notifyEmailExisting')}`, 'error');
      return;
    }
    /////////////   END  OF CHECKING     \\\\\\\\\\\\\\\
    try {
      ////////////////////// REGISTER USER IN SUPABASE /////////////////////////////////

      const { data, error } = await signup(compId, formik);
      // supabase.auth.signUp({
      //   // fullName: formik.values.fullName,
      //   email: formik.values.email,
      //   password: formik.values.password,
      //   options: {
      //     data: {
      //       user_type: 'user',
      //       time: 'first',
      //       role: 2,
      //       group: compId,
      //       time: 'first',
      //       ////// RAW_USER_META_DATA TO SAY THAT THE TYPE OF USER ////////
      //     },
      //   },
      // });
      if (error) {
        props.notify(`Error while signing up`, 'error');
      } else {
        props.notify(`${t('Notify:notifyEmailVerify')}`, 'info');
      }
      ////////////////////// END OF REGISTER ///////////////////////////////////////////

      navigate(process.env.PUBLIC_URL + '/signin');
    } catch (error) {
      console.error(error);
    }
  };

  const PasswordRegEx = // Password RegEx //
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: '',
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
    }),
    onSubmit: async (values, bag) => {
      try {
        console.log(JSON.stringify(values, null, 2));
        navigate(process.env.PUBLIC_URL + '/afterregister');
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';
  return (
    <div
      className='flex h-screen w-full items-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className='mx-auto  grid  h-[70%] w-[90%] rounded-large bg-[#393939] bg-opacity-50 lg:grid-cols-2 xl:w-[90%] 2xl:w-[80%]'
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <div className=' flex h-full w-full items-center justify-center'>
          <div className='!-ml-20 block'>
            <div className='pb-6 text-center text-2xl font-semibold text-white 2xl:text-textLogin 2xl:font-textLogin'>
              {t('invitedTo')}
            </div>
            <div className='text-login-text flex w-full items-center justify-center text-white'>
              <span
                className=' rounded-md bg-[#FB8500] py-3 text-xl font-bold hover:bg-orange-500 md:px-12 xl:px-24'
                to={process.env.PUBLIC_URL + '/signin'}
              >
                {compName}
              </span>
            </div>
          </div>
        </div>
        <div className='w-full'></div>
      </div>
      {/** Sign up card */}
      <div className='absolute z-[1] flex h-max min-h-[85%] w-[100%] justify-center rounded-large bg-[white]   md:left-[45%] md:my-4 md:w-[45%]  xl:w-[45%] 2xl:w-[40%]'>
        <div className='mb-20 flex flex-col items-center justify-center '>
          <div className='flex items-center justify-center px-3'>
            {/* LOGO */}
            <div className='block'>
              <div className=' flex items-center justify-center gap-4 text-3xl font-bold'>
                <svg
                  width='35'
                  height='34'
                  viewBox='0 0 35 34'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M14.651 18.2031H20.3486V33.4435H14.651V18.2031Z' fill='#393939' />
                  <path d='M29.3023 18.2031H35V33.4435H29.3023V18.2031Z' fill='#393939' />
                  <path
                    d='M35 10.9842V16.5991L3.8147e-06 16.5991V10.9842L35 10.9842Z'
                    fill='#393939'
                  />
                  <path
                    d='M0.000571251 18.2031H5.69824V33.4435H0.000571251V18.2031Z'
                    fill='#393939'
                  />
                  <path
                    d='M25.2324 0.556641L20.3465 5.36941V9.38005H14.65V5.36941L9.76731 0.556641H25.2324Z'
                    fill='#393939'
                  />
                </svg>
                <p className='mt-1 text-center text-2xl text-black'>MetalMaker</p>
              </div>
            </div>
            {/* Logo end */}
          </div>
          <p className='mt-2 pb-2 pt-3 text-center text-4xl font-semibold text-black'>
            {t('createAcc')}
          </p>
          <div className='flex items-center justify-center pt-4'>
            <form onSubmit={handleSubmit} className='w-[350px] space-y-4 px-2'>
              <div className='mt-6'>
                <label class='my-1 block text-sm font-medium text-black ' for='email'>
                  {t('emailAddress')}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                <label class='my-1 block text-sm font-medium text-black ' for='confirmPassword'>
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
                    // value={termsCheck}
                    checked={termsCheck}
                    onClick={() => {
                      setTermsCheck(!termsCheck);
                    }}
                    id='terms'
                    required
                    type='checkbox'
                    class='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300'
                  />
                </div>
                <p className='text-[12px] text-black'>
                  {t('terms1')}{' '}
                  <button type='button' onClick={togglePopup} className='text-blue-600'>
                    {t('terms2')}
                  </button>{' '}
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
                  <p className=' text-white'>{t('createAcc')}</p>
                </button>
              </div>
              {/* ALREADY HAVE AN ACCOUNT PART */}
              <div className='h-[80px] flex-grow lg:hidden'></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
