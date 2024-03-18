import { useTranslation } from 'react-i18next';
// import { MdKeyboardArrowRight } from 'react-icons/md';
// import { MdKeyboardArrowLeft } from 'react-icons/md';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
// import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Modal from '../../../../../common/modals/modal';
import { Waveform } from '@uiball/loaders';
import PlusButton from '../../../../../../icons/PlusButton';
import MinusButton from '../../../../../../icons/MinusButton';
export default function IdlingUI(props) {
  const { t } = useTranslation(['Dashboard']);
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className=' mb-6 mt-10 text-center text-4xl md:text-2xl'>{t('idling')}</div>
        <div className='mx-auto flex aspect-square w-[25%] items-center justify-center'>
          <img
            className='dark:invert'
            src={process.env.PUBLIC_URL + `/icons/idling.png`}
            alt='Idling'
          />
        </div>
        <label
          htmlFor='userTemperatureIdling'
          className='mt-12 flex items-center justify-center text-3xl md:text-xl'
        >
          {t('temperature')}
        </label>
        <div className='flex items-center justify-center justify-items-end pt-2 text-3xl md:text-xl '>
          <div className=' mr-2 flex gap-3 bg-[#cccccc80] p-2 sm:gap-6'>
            <button onClick={props.lowerSmall} className='flex h-4 w-4 items-center justify-center'>
              <MinusButton />
            </button>
          </div>

          {/* Input of the temperpature */}
          <div
            className={`mr-2 flex w-[130px] flex-row items-center justify-center  ${
              props.invalidTemperature ? 'border-2 border-red-700' : ''
            }  ml-2 flex w-[90px] items-center rounded-large  text-center`}
          >
            <input
              pattern='[0-9]*'
              type={props.mobile ? 'tel' : 'number'}
              id='userTemperatureIdling'
              value={props.desiredTemperature}
              onChange={props.handleChange}
              className='h-full w-full  rounded-large  p-1 text-center focus:outline-none dark:text-black'
              maxLength='4'
            />
            <label htmlFor='userTemperatureIdling' className='scale-[0.9] lg:relative '>
              ºC
            </label>
          </div>

          <div className=' ml-2  flex items-center justify-center gap-3 bg-[#cccccc80] p-2 sm:gap-6'>
            {/* Button to raise temperature by 10 */}
            <button onClick={props.raiseSmall} className='flex h-4 w-4 items-center justify-center'>
              {/* <MdKeyboardArrowRight /> */}
              <PlusButton />
            </button>
            {/* Button to raise temperature by 50 */}
            {/* <button onClick={props.raiseBig}>
              <MdKeyboardDoubleArrowRight />
            </button> */}
          </div>
        </div>
        <div className='mt-6 flex items-center justify-center'>
          {/* Button that will first check the  temperature and then send the command */}
          <button
            disabled={props.isLoading}
            onClick={(e) => {
              props.checkTemperature();
            }}
            className={`  ${
              props.isLoading ? '' : ''
            } black mb-8 w-[180px] rounded-md border-2 border-[#cccccc80] bg-[#cccccc80] p-1 text-xl text-black dark:invert `}
          >
            {/* If the command has been sent display a loading icon */}
            {props.isLoading ? (
              <>
                <div className='flex justify-center p-2'>
                  <Waveform size={35} lineWeight={3.5} speed={1} color='white' />
                </div>
              </>
            ) : (
              <>
                {/* If the command is not sent display a the button for pre-heat */}
                <div className='flex items-center  justify-start'>
                  <img
                    src={process.env.PUBLIC_URL + '/icons/local_fire.svg'}
                    className=' ml-6 filter dark:invert'
                    alt=''
                  />
                  <div>{t('preheat')}</div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
      {/*Modal to confirm the pre-heat */}
      <Modal
        toggleModal={() => {
          props.toggleModal();
        }}
        title='Pre-Heat'
        isOpen={props.idlingModalOpen}
        defaultButtons={false}
      >
        <div className={`flex h-full w-full flex-col items-center `}>
          <div className='text-center'>
            <span>{`${t('confirmTemp')}` + props.desiredTemperature + 'ºC ?'}</span>
          </div>
          <div className='flex gap-6'>
            <>
              <button
                onClick={() => {
                  props.sendCommandMachine();
                }}
                className='my-4 rounded-lg  bg-[#FB8500] px-4 py-2 text-white  '
              >
                {t('yes')}
              </button>
              <button
                onClick={() => {
                  props.setIdlingModalOpen();
                }}
                className='my-4 rounded-lg  bg-red-400 px-4 py-2 text-white '
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
