import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Waveform } from '@uiball/loaders';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {
  submitEmail,
  logInWithPassword,
  fetchDataFromProfile1,
  fetchDataFromProfile2,
} from '../../../components/signInPage/api/signIn';
import Logo from '../../../components/signInPage/icons/logo';
import WordLogo from '../../../components/signInPage/icons/wordLogo';
export default function SignIn(props) {
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  if (user != null) {
    navigate(process.env.PUBLIC_URL + '/');
  }
  const { t } = useTranslation(['Auth', 'Notify']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    let { data: ciao, error: err } = await submitEmail(formik);
    if (err) {
      props.notify(t('Notify:notifyError'), 'error');
      setisLoading(false);
    } else if (!ciao || ciao.length === 0) {
      props.notify(t('Notify:notifyNotAllowed'), 'error');
      setisLoading(false);
      return;
    } else {
      try {
        const { data, error } = await logInWithPassword(formik);
        if (error) {
          if (error.message === 'Invalid login credentials') {
            props.notify(`${t('Notify:notifyIncorrect')}`, 'error');
          } else {
            props.notify(`${t('Notify:notifyVerify')}`, 'info');
          }
          setisLoading(false);
          return;
        }
        if (!data.user) {
          props.notify(`${t('Notify:notifyError')}` + error.message, 'error');
          setisLoading(false);
          return;
        }
        const id = data.user.id;
        const { data: profiles2, error: zekz } = await fetchDataFromProfile1(id);
        if (!zekz && profiles2.length > 0 && !profiles2[0].group && profiles2[0].role === 1) {
          navigate(process.env.PUBLIC_URL + '/afterregister');
        }
        const { data: profiles, error: zek } = await fetchDataFromProfile2(id);
        if (!zek && profiles.length > 0 && !profiles[0].full_name && profiles[0].role === 2) {
          navigate(process.env.PUBLIC_URL + '/afterregisteruser');
        }
        if (zek) {
          console.log(zek);
        }
      } catch (error) {
        props.notify(error.message, 'error');
      }
      setisLoading(false);
    }
  };

  const [rememberMe, setRememberMe] = useState(false);
  const PasswordRegEx =
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('validEmail')).required(t('requiredField')),
      password: Yup.string()
        .required(t('enterPassword'))
        .matches(PasswordRegEx, t('passRequirements'))
        .min(8, t('passShort'))
        .max(20, t('passLong')),
    }),
  });
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleFormSubmit = (values) => {
    if (rememberMe) {
      Cookies.set('rememberMe', true, { expires: 7 }); // 7 days
    } else {
      Cookies.remove('rememberMe');
    }
  };
  const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';

  return (
    <div
      className='flex h-screen w-full items-center  md:bg-cover '
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className='mx-auto  grid  h-[70%] grid-cols-2 rounded-large  bg-transparent   md:w-[90%] md:bg-[#393939] md:bg-opacity-50  2xl:w-[80%]'
      >
        <div className='w-full bg-transparent '></div>
        <div className=' hidden h-full  w-full items-center justify-center md:flex '>
          <div className=' block'>
            <div className='w-full pb-12 text-center text-3xl font-semibold tracking-widest text-white 2xl:text-textLogin 2xl:font-textLogin'>
              {t('noAcc')}
            </div>
            <div className='text-login-text flex w-full items-center justify-center text-white'>
              <Link
                className='flex w-fit justify-center rounded-md bg-[#FB8500] py-3 text-xl hover:bg-orange-500 md:px-12 xl:px-24'
                to={process.env.PUBLIC_URL + '/signup'}
              >
                {t('createAcc')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute z-[1] h-max min-h-[85%] w-full rounded-large bg-transparent md:right-[49%] md:w-[43%] md:bg-[white] xl:w-[43%] 2xl:w-[38%]'>
        <div className='block h-fit w-full pt-[7%]'>
          <div className='flex items-center justify-center  px-3'>
            <div className='flex h-fit w-fit items-center justify-center gap-3 '>
              <Logo />
              <WordLogo />
            </div>
          </div>
          <p className='mt-6 pt-3 text-center text-3xl font-semibold text-black md:text-4xl 2xl:mt-14'>
            {t('welcomeBack')}
          </p>
          {/* Form Init */}
          <div className='flex items-center justify-center pt-4'>
            <form onSubmit={handleSubmit} className='items-center justify-center pt-4 md:w-[350px]'>
              <div>
                <label className='text-md mt-3 mb-1 block font-medium text-black' htmlFor='email'>
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
                <label
                  className='text-md mt-3 mb-1  block font-medium text-black'
                  htmlFor='password'
                >
                  {t('pass')}
                </label>
                <div className='relative w-full'>
                  <input
                    type={showPassword ? 'text' : 'password'}
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
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
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
              <div className='mt-5 flow-root'>
                <div className='float-left'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className='accent-[#dd7b0d]'
                  />
                  <label className='ml-1 text-black'>{t('remember')}</label>
                </div>
                <div className='float-right'>
                  <a
                    href='/resetPasswordtest'
                    className='... text-md mt-1 text-blue-700 hover:text-blue-500'
                  >
                    {t('forgotPass')}
                  </a>
                </div>
              </div>
              <div className='mt-5 flex justify-center'>
                <button
                  onClick={() => handleFormSubmit(formik.values)}
                  type='submit'
                  className=' mb-2 flex w-full justify-center rounded bg-[#FB8500] px-5 py-2.5 text-center text-sm font-medium hover:bg-orange-500 focus:outline-none focus:ring-4 md:min-w-[180px]'
                >
                  {isLoading ? (
                    <Waveform
                      className='mx-auto'
                      size={25}
                      lineWeight={3.5}
                      speed={1}
                      color='white'
                    />
                  ) : (
                    <p className=' text-xl font-medium text-white'>{t('signIn')}</p>
                  )}
                </button>
              </div>
              <p className='text-center md:hidden'>
                Don't have an account?{' '}
                <a
                  className='... text-md mt-1 text-blue-700 hover:text-blue-500'
                  href={process.env.PUBLIC_URL + '/signup'}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
