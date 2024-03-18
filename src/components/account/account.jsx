import React, { useEffect, useState } from 'react';
import Alert from '../common/alert/alert';
import { useAuth } from '../../hooks/auth';
import AWS from 'aws-sdk';
import { useTranslation } from 'react-i18next';
import { BiPencil } from 'react-icons/bi';
import UploadPicture from './uploadPicture/uploadPicture';
import { DangerZone } from './dangerZone/dangerZone';
import { UpdateFields } from './updateFields/updateFields';
import MobileButton from '../foundriesPage/mobileButton';
import { loadUsersDataByID, loadUsersDataByGroup } from '../../Pages/settings/api/accountAPI';

const Account = (props) => {
  const [confirmText, setConfirmText] = useState('');
  const [wrongText, setWrongText] = useState(false);
  const [user1, setUser1] = useState({});
  const [photoUrl, setPhotoUrl] = useState('');
  const [isOpenModal, setisOpenModal] = useState(false);
  const [users, setUsers] = useState([]);

  const [modChangeEmailSuccess, setModChangeEmailSuccess] = useState(false);

  const [editDetails, setEditDetails] = useState(false);

  const { t } = useTranslation(['Account', 'Notify']);

  const toggleModal = () => {
    setisOpenModal(!isOpenModal);
    console.log(isOpenModal);
  };
  const defaultPic = 'https://f005.backblazeb2.com/file/MetalMaker3D-Storage/default.png';
  const { user } = useAuth();
  const id = user?.id;

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    endpoint: 's3.us-east-005.backblazeb2.com',
    s3ForcePathStyle: true,
  });

  async function loadUserData() {
    if (id !== undefined) {
      let { data: profiles } = await loadUsersDataByID(id);
      if (profiles[0].avatar_url == null) {
        profiles[0].avatar_url = defaultPic;
      }

      setPhotoUrl(profiles[0].avatar_url);
      setUser1(profiles[0]);
    }
  }

  useEffect(() => {
    loadUserData(setUser1);
  }, [user]);

  const loadUsers = async () => {
    let { data: profiles } = await loadUsersDataByGroup(user1);

    profiles = profiles.map((profile) => {
      for (const key in profile) {
        if (key !== 'avatar_url') {
          if (profile[key] == null) {
            profile[key] = '';
          }
        }
      }
      return profile;
    });
    setUsers(profiles);
  };

  useEffect(() => {
    if (confirmText === 'Bye Metal Maker 3D') {
      setWrongText(false);
    } else {
      setWrongText(true);
    }
  }, [confirmText]);

  const toggleModChangeEmailSuccess = () => {
    setModChangeEmailSuccess(!modChangeEmailSuccess);
  };

  return (
    <>
      <div className='h-full w-full dark:bg-[#1B1B1B] dark:text-[#FFFFFFDE]'>
        <div className=' w-full '>
          <Alert
            onlyConfirm
            isOpen={modChangeEmailSuccess}
            toggleModal={toggleModChangeEmailSuccess}
            title='Success'
            text='Check your inbox to confirm your new email.'
          />
          <div className=''>
            <MobileButton />
          </div>
          <div className='flex w-full flex-col items-center justify-center'>
            {user1 ? (
              <div className='mb-2 flex w-[96%] flex-wrap rounded-[10px] bg-[#FFFFFF] pb-[20px] pt-2 dark:bg-[#0D0D0D] md:mt-7 md:px-6 md:pb-6'>
                <div className='flex w-full flex-col sm:w-1/2'>
                  <div className='my-4 flex px-4 text-gray-400 md:px-0'>{t('heading')}</div>
                  <div className='flex'>
                    <div className='flex min-w-fit px-4 md:px-0'>
                      <img
                        className='h-28 w-28 rounded-large object-cover'
                        alt={user1.full_name ? `${user1.full_name} profile` : 'profile picture'}
                        src={photoUrl}
                      ></img>
                    </div>
                    <div className='ml-1 flex flex-col gap-6  md:ml-5'>
                      <div className='relative -top-1 text-3xl font-semibold'>
                        {user1.full_name ? user1.full_name : 'Fill your name.'}
                      </div>
                      <div>
                        <button onClick={toggleModal} className='text-xl text-blue-500'>
                          {t('change')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full items-center gap-x-2 pl-4 pt-4 text-xl sm:w-1/2 md:pl-5 md:pt-0'>
                  <button
                    onClick={() => setEditDetails(!editDetails)}
                    className='flex items-center gap-x-2 text-gray-400'
                  >
                    <BiPencil className='text-gray-400' />
                    <p className=' text-gray-400'>{t('edit')}</p>
                  </button>
                </div>
                <UploadPicture
                  props={props}
                  s3={s3}
                  setPhotoUrl={setPhotoUrl}
                  user1={user1}
                  Alert={Alert}
                  toggleModal={toggleModal}
                  isOpenModal={isOpenModal}
                  t={t}
                />
                <UpdateFields
                  props={props}
                  loadUsers={loadUsers}
                  setEditDetails={setEditDetails}
                  editDetails={editDetails}
                  user={user}
                  users={users}
                  setUser1={setUser1}
                  user1={user1}
                  t={t}
                />
              </div>
            ) : (
              ''
            )}
            {editDetails ? (
              <>
                <div className='mt-4 mb-4 flex w-[96%] gap-24 rounded bg-[#FFFFFF] pb-4 pt-5 dark:bg-[#0D0D0D] md:mb-5 md:mt-4 md:px-6 md:pt-4 md:pb-6'>
                  <DangerZone
                    props={props}
                    wrongText={wrongText}
                    setConfirmText={setConfirmText}
                    setUser1={setUser1}
                    users={users}
                    user1={user1}
                    user={user}
                    t={t}
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
