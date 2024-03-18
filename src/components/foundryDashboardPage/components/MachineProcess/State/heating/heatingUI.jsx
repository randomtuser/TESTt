import { useTranslation } from 'react-i18next';
import Modal from '../../../../../common/modals/modal';
import { Waveform } from '@uiball/loaders';
export default function HeatingUI(props) {
  const { t } = useTranslation(['Dashboard']);
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='mt-8 text-center text-4xl md:text-2xl'>{t('heating')}</div>
        <div className='mx-auto flex aspect-square w-[25%] items-center justify-center'>
          <img
            className='dark:invert'
            src={process.env.PUBLIC_URL + '/icons/heating.png'}
            alt='Heating'
          />
        </div>
        <label
          htmlFor='userTemperatureIdling'
          className='mt-14 flex items-center justify-center text-3xl md:text-xl'
        >
          {t('temperature')}
        </label>
        <div className='ml-12 flex items-center justify-center  justify-items-end pt-2 text-3xl'>
          <div className='mr-2 w-[120px] rounded-large border border-black text-center dark:border-white sm:ml-12'>
            {props.crucibleTemp}
          </div>

          <label htmlFor='userTemperatureIdling' className='mr-4 sm:mr-12'>
            ºC
          </label>
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <button
            disabled={props.isCanceling}
            onClick={(e) => {
              props.setCancelModalOpen(true);
            }}
            className='black mb-8 w-[180px] rounded-md border-2 border-[#cccccc80] bg-[#cccccc80] p-1 text-xl text-black dark:invert'
          >
            {props.isCanceling ? (
              <>
                <div className='flex justify-center p-2'>
                  <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center justify-center'>
                  <img src='/icons/cancel.png' className='dark:invert' alt='Cancel'></img>
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
          <p className='text-center text-xl'>{t('confirmHeat')}</p>
          <div className={`flex justify-center gap-6 `}>
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
