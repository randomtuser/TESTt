import { updateDb } from './api/updateDb';
import React, { useState } from 'react';
import Modal from '../../common/modals/modal';
import { updateAvatar } from './api/updateAvatar';
export default function UploadPicture({
  props,
  s3,
  setPhotoUrl,
  user1,
  Alert,
  toggleModal,
  isOpenModal,
  t,
}) {
  const [modDeletePic, setModDeletePic] = useState(false);
  const defaultPic = 'https://f005.backblazeb2.com/file/MetalMaker3D-Storage/default.png';
  const bucketName = 'MetalMaker3D-Storage';
  const handleRemovePicture = () => {
    setModDeletePic(!modDeletePic);
  };
  function toggleModDeletePic() {
    setModDeletePic(!modDeletePic);
  }

  const removePicture = async (fileUrl, silent = false) => {
    console.log(fileUrl);
    if (!fileUrl) return;
    const filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    const params = {
      Bucket: bucketName,
      Key: filename,
    };
    if (filename !== 'default.png') {
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log('a');
          props.props.notify(`${t('Notify:notifyImageRemoveError')}`, 'error');
        } else {
          // SILENT MEANS CALL FROM CHANGE PICTURE, NO NOTIFY NOR UPDATEDB NEEDED
          if (!silent) {
            updateDb();
            props.props.setPictureProp(defaultPic);
            setPhotoUrl(defaultPic);
            props.props.notify(`${t('Notify:notifyImageRemove')}`, 'success');
          }
        }
      });
    } else {
      if (!silent) {
        console.log('a');
        props.props.notify(`${t('Notify:notifyImageRemoveCant')}`, 'error');
      }
    }

    if (!silent) {
      toggleModDeletePic();
    }
    toggleModal();

    updateDb(user1, defaultPic, setPhotoUrl);
  };

  const uploadFileToB2 = async (file) => {
    const params = {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
      ContentType: 'image/png',
    };

    return s3.upload(params).promise();
  };

  const uploadPicture = async (e) => {
    try {
      await removePicture(user1.avatar_url, true);
    } catch (error) {
      props.props.notify(`${t('Notify:notifyImageRemoveError')}`, 'error');
      return;
    }
    let fileName = 'file' + Date.now() + '.png';
    const file = new File([e.target.files[0]], fileName);

    uploadFileToB2(file, bucketName)
      .then((result) => {
        setPhotoUrl(result.Location);
        updateAvatar(result.Location, user1);
        props.props.setPictureProp(result.Location);
        props.props.notify(`${t('Notify:notifyUpload')}`, 'success');
      })
      .catch((error) => {
        props.props.notify(`${t('Notify:notifyUploadError')}` + error, 'error');
      });
    toggleModal();
  };

  return (
    <>
      <Modal isOpen={isOpenModal} toggleModal={toggleModal} defaultFormat>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='flex h-2/5 w-full items-center justify-center p-3 text-2xl'>
            <span>{t('change')}</span>
          </div>
          <div className='flex h-1/3 w-full items-center justify-center border-b-2 border-t-2 text-lg'>
            <label for='file-upload' className='w-full p-2 text-center hover:cursor-pointer'>
              {t('uploadPhoto')}
            </label>
            <input
              className='hidden w-min cursor-pointer'
              id='file-upload'
              type='file'
              onChange={uploadPicture}
            />
          </div>
          <button
            onClick={handleRemovePicture}
            className='flex h-1/3 w-full items-center justify-center border-b-2 p-2 text-lg text-red-600'
          >
            {t('removePhoto')}
          </button>
          <button
            onClick={toggleModal}
            className='flex h-1/3 w-full items-center justify-center p-2 text-center text-lg text-gray-400'
          >
            {t('cancel')}
          </button>
        </div>
      </Modal>
      <Alert
        isOpen={modDeletePic}
        toggleModal={toggleModDeletePic}
        title={t('sure')}
        text={t('picRemove')}
        submitFunction={() => {
          removePicture(user1.avatar_url);
        }}
        cancelFunction={() => {
          toggleModDeletePic();
          toggleModal();
        }}
      />
    </>
  );
}
