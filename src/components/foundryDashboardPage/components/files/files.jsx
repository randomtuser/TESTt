import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import sendCommandFile from '../../command/sendCommandFile';
import FileContent from './fileContent';
import uploadFileToMachineFile from '../../api/files';

const Files = ({ machineInfo }) => {
  const { t } = useTranslation(['Dashboard']);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadEnd, setFileUploadEnd] = useState(false);
  const [uploadResult, setUploadResult] = useState('');

  /** Toggles the popup of file upload and resets the input so it's empty */
  const toggleFileUpload = () => {
    setFileUploadEnd(false);
    setFileModalOpen(!fileModalOpen);
  };

  /** Tries to upload the file to the bucket */
  async function uploadFile(event) {
    event.preventDefault();
    setIsLoading(true);

    //Get the form and get the input from the form
    const form = event.target;
    const formData = new FormData(form);
    const uploadedFile = formData.get('machine-info__files-input');

    /** Check if file is .stl (so bad 💀💀) */
    if (uploadedFile.name.slice(-4) !== '.stl') {
      setIsLoading(false);
      setUploadResult('Invalid File type');
      setFileUploadEnd(true);
      return;
    }

    //Tries to upload to the database
    const { error } = await uploadFileToMachineFile(
      machineInfo.machine_id,
      uploadedFile.name,
      uploadedFile,
    );

    //If there is an error it would display to the user
    if (error) {
      setUploadResult(t('error') + error.message);
    } else {
      //If the upload its sucesfull send the command to the machine with the filename and extension.
      let filename = uploadedFile.name.slice(0, uploadedFile.name.indexOf('.'));
      let extension = uploadedFile.name.slice(uploadedFile.name.indexOf('.'));
      sendCommandFile([filename, extension], machineInfo.machine_id);
      setUploadResult('The file has been uploaded');
    }
    setIsLoading(false);
    setFileUploadEnd(true);
  }

  return (
    <div className='row-span-3 h-[80px]  rounded-[10px] bg-white  p-4 pb-2 dark:bg-[#0D0D0D] dark:text-darkWhite'>
      <div className='text-left font-semibold'>{t('files')}</div>
      <FileContent
        uploadFile={uploadFile}
        toggleFileUpload={toggleFileUpload}
        cancelUpload={cancelUpload}
        fileModalOpen={fileModalOpen}
        isLoading={isLoading}
        fileUploadEnd={fileUploadEnd}
        uploadResult={uploadResult}
      />
    </div>
  );
};
/** Functions thats empties the input (should be changed) */
const cancelUpload = () => {
  document.getElementById('machine-info__files-input').value = '';
};
export default Files;
