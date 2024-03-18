import { useTranslation } from 'react-i18next';
import Modal from '../../../../../common/modals/modal';
import { Waveform } from '@uiball/loaders';
export default function WaitingUI(props) {
  const { t } = useTranslation(['Dashboard']);
  return (
    <>
      <div className=''>
        <div className='mb-6 mt-10 text-center  text-4xl'>{t('waiting')}</div>
        <div className='mx-auto  flex aspect-square w-[25%] items-center justify-center'>
          <img
            className='dark:invert'
            src={process.env.PUBLIC_URL + `/icons/waiting.png`}
            alt='Idling'
          />
        </div>
        <label
          htmlFor='userTemperatureIdling'
          className='mt-8 flex items-center justify-center pt-8 text-3xl'
        >
          {props.partName}
        </label>
        <div className='flex items-center justify-center justify-items-end  pt-2 text-3xl '>
          <div className='mr-2 w-[150px] rounded-large border border-black text-center dark:border-white '>
            <p>{props.volume}cm³</p>
            {/* {desgassingTime} */}
          </div>
          <div className='mr-2 w-[150px] rounded-large border border-black text-center dark:border-white '>
            <p>{props.volumeFlow}cm³/s </p>
            {/* {desgassingTime} */}
          </div>
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button
            disabled={props.isLoading}
            onClick={(e) => {
              props.toggleModal();
            }}
            className={`  ${
              props.isLoading ? '' : ''
            } black mb-8 w-[40%] rounded-lg border-2 border-black bg-black text-xl text-white dark:invert md:w-[20%]`}
          >
            {props.isLoading ? (
              <>
                <div className='flex justify-center p-2'>
                  <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center  justify-start '>
                  <img
                    src='/icons/play_arrow.svg'
                    className=' invert filter md:ml-6'
                    alt='Pre-heat'
                  ></img>
                  <div>{t('cast')}</div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
      <Modal
        toggleModal={() => {
          props.toggleModal();
        }}
        title='Cast'
        isOpen={props.idlingModalOpen}
        defaultButtons={false}
      >
        <div className={`flex h-full w-full flex-col items-center `}>
          <div className='text-center'>
            <span>{t('confirmCast')}</span>
          </div>
          <div className='flex gap-6'>
            <>
              <button
                onClick={() => {
                  props.sendCommandMachine();
                }}
                className='my-4 rounded-lg  bg-[#FB8500] py-2 px-4 text-white  '
              >
                {t('yes')}
              </button>
              <button
                onClick={() => {
                  props.setIdlingModalOpen();
                }}
                className='my-4 rounded-lg  bg-red-400 py-2 px-4 text-white '
              >
                No
              </button>
            </>
          </div>
        </div>
      </Modal>
    </>
  );
}
