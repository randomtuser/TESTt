import { Waveform } from '@uiball/loaders';
import Modal from '../../../common/modals/modal';
import { useTranslation } from 'react-i18next';
import FileIcon from '../../icons/files/fileIcon';
const FileContent = (props) => {
  const { t } = useTranslation(['Dashboard']);
  return (
    <>
      <div className='h-full w-full text-center'>
        <form
          className='relative h-full w-full'
          action=''
          method='get'
          id='machine-info__files-input-form'
          name='machine-info__files-input-form'
          encType='multipart/form-data'
          onSubmit={props.uploadFile}
        >
          <div className='relative -top-4 h-full w-full scale-90'>
            <div className=' rounded-2xl border-1 absolute flex h-[70%] w-full flex-col items-center  justify-center border-dashed border-gray-400 align-middle '>
              <span className='relative  '>
                <FileIcon />
              </span>
              <div className='text-xs'>
                {t('drop1')}
                <br></br>
                <b className='text-xs	text-blue-500'>{t('drop2')}</b>
              </div>
            </div>
            <div className='absolute  w-[100%]'>
              <input
                style={{ height: '100%!important' }}
                className=' machine-info__files-input z-10  w-[100%]  cursor-pointer   opacity-0  '
                id='machine-info__files-input'
                type='file'
                name='machine-info__files-input'
                title=''
                required
                onChange={(e) => props.toggleFileUpload()}
              ></input>
            </div>
          </div>
        </form>
        <Modal
          toggleModal={() => {
            props.toggleFileUpload();
            props.cancelUpload();
          }}
          title='File Upload'
          isOpen={props.fileModalOpen}
          defaultButtons={false}
        >
          <div className='flex h-full w-full flex-col items-center '>
            <div className='text-center'>
              <span hidden={props.isLoading || props.fileUploadEnd}>{t('sureFile')}</span>
            </div>
            <div className='flex gap-6'>
              <button
                form='machine-info__files-input-form'
                hidden={props.isLoading || props.fileUploadEnd}
                type='submit'
                className='my-4 rounded-lg  bg-[#FB8500] py-2 px-4 text-white '
              >
                Yes
              </button>
              <button
                onClick={() => {
                  props.toggleFileUpload();
                  props.cancelUpload();
                }}
                hidden={props.isLoading || props.fileUploadEnd}
                className='my-4 rounded-lg  bg-red-400 py-2 px-4 text-white '
              >
                No
              </button>
            </div>
          </div>
          {props.isLoading ? (
            <>
              <div className='flex justify-center '>
                <Waveform size={40} lineWeight={3.5} speed={1} color='#FB8500' />
              </div>
            </>
          ) : (
            <></>
          )}
          {props.fileUploadEnd ? (
            <>
              <p>{props.uploadResult}</p>
              <button
                onClick={() => {
                  props.toggleFileUpload();
                  props.cancelUpload();
                }}
                className='my-4 rounded-lg  bg-[#FB8500] py-2 px-4 text-white '
              >
                {t('accept')}
              </button>
            </>
          ) : (
            <></>
          )}
        </Modal>
      </div>
    </>
  );
};
export default FileContent;
