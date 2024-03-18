import { useTranslation } from 'react-i18next';
import Modal from '../../../../../common/modals/modal';
import { Waveform } from '@uiball/loaders';
export default function PouringUI(props) {
  const { t } = useTranslation(['Dashboard']);
  return (
    <>
      <div className=''>
        <div className='mb-6 mt-8 text-center  text-4xl'>{t('pouring')}</div>
        <div className='mx-auto flex aspect-square w-[25%] items-center justify-center'>
          <img
            className='dark:invert'
            src={process.env.PUBLIC_URL + '/icons/pouring.png'}
            alt='pouring'
          />
        </div>
        <label
          htmlFor='userTemperatureIdling'
          className='flex items-center justify-center pt-6 text-3xl'
        >
          {t('time')}
        </label>
        <div className='flex items-center justify-center  justify-items-end  text-3xl'>
          <div className='mr-2 w-[150px] rounded-large border border-black text-center dark:border-white'>
            00:00:00
            {/* {pouringTime} */}
          </div>
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <button
            disabled={props.isCanceling}
            onClick={(e) => {
              props.setCancelModalOpen(true);
            }}
            className='black mb-8 w-[40%] rounded-lg border-2 border-black bg-black text-xl text-white dark:invert md:w-[30%]'
          >
            {props.isCanceling ? (
              <>
                <div className='flex justify-center p-2'>
                  <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center  justify-center '>
                  <img src='/icons/cancel.png' className='' alt='Cancel'></img>
                  <div>{t('cancel')}</div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
      <Modal
        toggleModal={() => {
          props.toggleCancelModal();
        }}
        title='Cancel process'
        isOpen={props.cancelModalOpen}
        defaultButtons={false}
      >
        <div className={''}>
          <p className='text-center text-xl'>{t('confirmCancel')}</p>
          <div className={`flex justify-center gap-6`}>
            <button
              onClick={() => {
                props.handleCancelProcess();
              }}
              className='my-4 rounded-lg  bg-[#FB8500] py-2 px-4 text-white  '
            >
              {t('yes')}
            </button>
            <button
              onClick={() => {
                props.setCancelModalOpen(false);
              }}
              className='my-4 rounded-lg  bg-red-400 py-2 px-4 text-white '
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
