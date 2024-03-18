import { useTranslation } from 'react-i18next';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import SubmitButton from './Icons/SubmitButton';
export default function SecurityUI(props) {
  const { t } = useTranslation(['Security', 'Notify']);
  return (
    <>
      <div className='mb-4 w-full px-4 pt-4 dark:bg-[#0D0D0D] md:px-2'>
        <div className='pb-4 text-[15px] text-gray-400'>{t('heading')}</div>
        <div className='mt-3 flex flex-col gap-y-3'>
          <div className='flex w-full flex-col md:flex-row'>
            <label className='w-full text-lg text-gray-900  dark:text-white md:w-1/2'>
              {t('currentPassword')}
            </label>
            <input
              value={props.passwordField}
              onChange={(e) => props.setPasswordField(e.target.value)}
              type={props.showPassword1 ? 'text' : 'password'}
              name='password'
              id='password'
              className='w-full rounded-[5px] border border-gray-400 bg-transparent p-2.5 text-gray-900 dark:border-darkWhite dark:bg-transparent  dark:text-darkWhite dark:placeholder-gray-400 md:w-2/3'
              placeholder='••••••••'
              required=''
            />
            <div className='relative'>
              <button
                className='absolute right-3 bottom-3 transform bg-transparent focus:outline-none'
                onClick={props.togglePasswordVisibility1}
              >
                {props.showPassword1 ? (
                  <AiOutlineEye color='grey' size={24} />
                ) : (
                  <AiOutlineEyeInvisible color='grey' size={24} />
                )}
              </button>
            </div>
          </div>
          <div className=' flex w-full flex-col md:flex-row'>
            <label className='w-full text-lg text-gray-900  dark:text-white md:w-1/2'>
              {t('newPassword')}
            </label>
            <input
              value={props.newPasswordField}
              onChange={(e) => props.setNewPasswordField(e.target.value)}
              type={props.showPassword2 ? 'text' : 'password'}
              name='new-password'
              id='new-password'
              placeholder='••••••••'
              className='w-full rounded-[5px] border border-gray-400 bg-transparent p-2.5 text-gray-900 dark:border-darkWhite dark:text-darkWhite dark:placeholder-gray-400 md:w-2/3'
              required=''
            />
            <div className='relative'>
              <button
                className='absolute right-3 bottom-3 transform bg-transparent focus:outline-none'
                onClick={props.togglePasswordVisibility2}
              >
                {props.showPassword2 ? (
                  <AiOutlineEye color='grey' size={24} />
                ) : (
                  <AiOutlineEyeInvisible color='grey' size={24} />
                )}
              </button>
            </div>
          </div>
          <div className='flex w-full flex-col md:flex-row'>
            <label className='w-full text-lg text-gray-900  dark:text-white md:w-1/2'>
              {t('confirmPassword')}
            </label>
            <input
              value={props.confirmPasswordField}
              onChange={(e) => props.setConfirmPasswordField(e.target.value)}
              type={props.showPassword3 ? 'text' : 'password'}
              name='confirm-password'
              id='confirm-password'
              placeholder='••••••••'
              className='w-full rounded-[5px] border border-gray-400 bg-transparent p-2.5 text-gray-900 dark:border-darkWhite dark:text-darkWhite dark:placeholder-gray-400 md:w-2/3'
              required=''
            />
            <div className='relative'>
              <button
                className='absolute right-3 bottom-3 transform bg-transparent focus:outline-none'
                onClick={props.togglePasswordVisibility3}
              >
                {props.showPassword3 ? (
                  <AiOutlineEye color='grey' size={24} />
                ) : (
                  <AiOutlineEyeInvisible color='grey' size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className='mt-[30px] flex w-full items-end justify-end'>
          <div className=' flex w-3/5 items-end justify-end'>
            <button
              onClick={props.resetInputs}
              type='button'
              className='flex h-full  items-center justify-center rounded-[5px] p-2.5 dark:text-darkWhite'
            >
              {t('cancel')}
            </button>
            <button
              onClick={props.handleChangePass}
              type='button'
              className='flex h-full  items-center justify-center rounded-[5px] bg-[#FB8500] py-2 pr-[14px] text-white hover:bg-orange-500'
            >
              <div className='px-[10px]'>
                <SubmitButton />
              </div>
              {t('submit')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
