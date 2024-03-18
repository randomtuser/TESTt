import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/auth';
import CompanyIcon from '../../../components/authPage/AfterRegister/icons/companyIcon';
import {
  checkExistedCompany,
  createNewCompany,
  checkCompanyById,
  updateUserById,
  updateClientById,
  changeMedata,
} from '../../../components/authPage/AfterRegister/api/afterRegister';

const bgImage = process.env.PUBLIC_URL + '/icons/lastStepsBG.jpg';
function AfterRegister(props) {
  const user = props.user;
  const { t } = useTranslation(['Auth', 'Notify']);
  const navigate = useNavigate();
  const { profile } = useAuth();

  if (!user) {
    navigate(process.env.PUBLIC_URL + '/signin');
  }
  if (user.user_metadata.prov === 'invited') {
    navigate(process.env.PUBLIC_URL + '/signUpusermail');
  } else if (profile.role === 2) {
    navigate(process.env.PUBLIC_URL + '/afterregisteruser');
  }
  if (user.user_metadata.time === 'second') {
    navigate(process.env.PUBLIC_URL + '/');
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, t('nameLong')).required(t('requiredField')),
      lastName: Yup.string().max(20, t('lastNameLong')).required(t('requiredField')),
      companyName: Yup.string().max(30, t('companyLong')).required(t('requiredField')),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formik.values.lastName || !formik.values.firstName || !formik.values.companyName) {
      props.notify(`${t('Notify:notifyValues')}`, 'info');
      return;
    } else {
      const name = formik.values.companyName;
      const compname = name.toUpperCase();

      // check if compnay exists
      const { data: nameData } = await checkExistedCompany(compname);
      if (nameData.length > 0) {
        props.notify(`${t('Notify:notifyCompanyName')}`, 'error');
      } else {
        // CREATE THE COMPANY
        let { error: ei } = await createNewCompany(compname);
        if (ei) alert(ei.message);
        const {
          data: [{ id }],
        } = await checkCompanyById(compname);
        const group_id = id;

        // saving full name and updating profiles with the values
        const full_name = formik.values.firstName + ' ' + formik.values.lastName;
        await updateUserById(formik, full_name, group_id, user);

        // saving client to who assign and used the code
        let { error } = await updateClientById(group_id, user);
        if (error) alert(error.message);

        // changing metadata to second time so he doesnt have to enter afterregister again
        const { error: e } = await changeMedata();
        navigate(process.env.PUBLIC_URL + '/');
      }
    }
  };

  return (
    <div
      className='flex h-screen w-full items-center justify-center md:bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className='mx-auto  grid  h-[70%] w-[90%] rounded-large bg-none md:bg-[#393939] md:bg-opacity-50 lg:grid-cols-2 xl:w-[90%] 2xl:w-[80%]'
      >
        <div className='hidden w-full'></div>
        <div className='hidden h-full w-full items-center justify-center md:flex '>
          <div className=' block'></div>
        </div>
      </div>
      <div className='absolute z-[1] flex h-max min-h-[85%] w-full justify-center rounded-large bg-transparent text-xl md:w-[43%] md:bg-[white] xl:w-[43%] 2xl:w-[38%]'>
        <div className='flex w-2/3 flex-col items-center justify-start gap-4'>
          <CompanyIcon />
          <div className='flex w-full text-center'>
            <p>{t('steps')}</p>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className='w-full space-y-2 px-0 md:w-[350px]'
          >
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
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className='text-xs text-red-500'>{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div>
              <label class='my-1 block text-xl  ' for='lastName'>
                {t('company')}
              </label>
              <input
                id='companyName'
                name='companyName'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder=' '
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className='text-xs text-red-500'>{formik.errors.companyName}</div>
              ) : null}
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='mb-1 mt-4 h-[48px] w-full rounded bg-[#FB8500] text-center hover:bg-orange-500  '
              >
                <p className='text-xl  text-white'>{t('createAcc')}</p>
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
export default AfterRegister;
