import React, { useEffect, useState } from 'react';
import Modal from '../../modals/modal';
import { supabase } from '../../../../supabase';
import Alert from '../../alert/alert';
import { useTranslation } from 'react-i18next';
import EditButton from '../../../../icons/EditButton';

const UserCard = (props) => {
  const [avatarUrl, setAvatarUrl] = useState(props.user.avatar_url);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [roleField, setRoleField] = useState(props.user.role);
  const [roleName, setRoleName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [modConfirmDelete, setModConfirmDelete] = useState(false);

  const { t } = useTranslation(['Users', 'Modals']);

  useEffect(() => {
    if (props.user.avatar_url == null) {
      props.user.avatar_url = 'https://f003.backblazeb2.com/file/MetalMaker3D/default.png';
    }
    setAvatarUrl(props.user.avatar_url);

    if (props.user.last_sign_in !== '') {
      const date = new Date(props.user.last_sign_in);
      setUserDate(getTimeElapsed(date));
    } else {
      setUserDate(t('never'));
    }
  }, []);

  useEffect(() => {
    if (props.user.last_sign_in !== '') {
      const date = new Date(props.user.last_sign_in);
      setUserDate(getTimeElapsed(date));
    } else {
      setUserDate(t('never'));
    }
  }, [t]);

  function getTimeElapsed(date) {
    const now = new Date();
    const timeDiff = now - date;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${t('hace')} ${weeks} ${t('week')}${weeks > 1 ? 's' : ''} ${t('ago')}`;
    } else if (days > 0) {
      return `${t('hace')} ${days} ${t('day')}${days > 1 ? 's' : ''} ${t('ago')}`;
    } else if (hours > 0) {
      return `${t('hace')} ${hours} ${t('hour')}${hours > 1 ? 's' : ''} ${t('ago')}`;
    } else if (minutes > 0) {
      return `${t('hace')} ${minutes} ${t('minute')}${minutes > 1 ? 's' : ''} ${t('ago')}`;
    } else {
      return t('now');
    }
  }

  useEffect(() => {
    if (
      props.roles != null &&
      props.roles.length > 0 &&
      props.user.role != null &&
      props.user.role !== ''
    ) {
      if (props.roles.find((role) => role.id === props.user.role)?.name)
        setRoleName(capitalize(props.roles.find((role) => role.id === props.user.role).name));
    }
  }, [props.user.role, props.roles]);

  const handleDelete = () => {
    setModConfirmDelete(!modConfirmDelete);
  };

  const deleteUser = () => {
    props.onDelete(props.user.id);
    setModConfirmDelete(!modConfirmDelete);
    setisOpenModal(!isOpenModal);
  };

  const toggleModal = () => {
    setisOpenModal(!isOpenModal);
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async () => {
    if (props.user.role === roleField) {
      props.notify(t('cantUpdateOwner'), 'info');
    } else {
      if (props.user.role === 1 && roleField !== 1) {
        props.notify(t('errorTryAgain'), 'error');
      } else if (props.user.role !== 1 && roleField === 1) {
        props.notify(t('errorTryAgain'), 'error');
      } else {
        if (roleField !== props.user.role) {
          props.user.role = roleField;
          const { data, error } = await supabase
            .from('profiles')
            .update({ role: roleField })
            .eq('id', props.user.id);
          if (!error) {
            props.notify(t('userUpdated'), 'success');
          } else {
            props.notify(t('errorTryAgain'), 'error');
          }
        }
      }
    }
    setisOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className='flex h-fit w-full border-neutral-700 px-6 py-2 font-poppins md:h-20 md:py-0'>
        <Alert
          confirmDelete
          isOpen={modConfirmDelete}
          toggleModal={() => setModConfirmDelete(!modConfirmDelete)}
          title={t('Modals:sure')}
          text={t('Modals:irreversible')}
          submitFunction={deleteUser}
        />
        <Modal
          title={t('userDetails')}
          isOpen={isOpenModal}
          toggleModal={toggleModal}
          confirmModal={handleSubmit}
          handleDelete={handleDelete}
        >
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-2 flex w-full flex-col items-center justify-between md:flex-row'>
              <span className='w-full md:w-1/6'>{t('fname')}</span>
              <input
                disabled
                name='full_name'
                value={props.user.full_name}
                type='text'
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-slate-500 dark:border-gray-500 dark:bg-transparent dark:text-darkWhite md:w-5/6 '
                // onChange={(e) => setNameField(e.target.value)}
              />
            </div>
            <div className='my-2 flex w-full flex-col items-center justify-between md:flex-row'>
              <span className='w-full md:w-1/6'>Email</span>
              <input
                disabled
                name='email'
                value={props.user.email}
                type='email'
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-slate-500 dark:border-gray-500 dark:bg-transparent dark:text-darkWhite md:w-5/6'
                // onChange={(e) => setEmailField(e.target.value)}
              />
            </div>
            <div className='my-2 flex w-full flex-col items-center justify-between md:flex-row'>
              <span className='w-full md:w-1/6'>{t('role')}</span>
              <select
                name='role'
                value={roleField}
                id='role'
                disabled={props.user.role === 1}
                className='block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-slate-500 dark:border-gray-500 dark:bg-transparent dark:text-darkWhite md:w-5/6'
                onChange={(e) => setRoleField(e.target.value)}
              >
                {props.roles.map((role) =>
                  (props.user.role === 1 && role.id !== 1) ||
                  (props.user.role !== 1 && role.id === 1) ||
                  role.id === 4 ? null : (
                    <option className='dark:bg-[#0D0D0D]' value={role.id} key={role.id}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>
        </Modal>
        <div className='flex w-full border-b border-[#878787CC]'>
          <div className='flex w-full items-center justify-between pb-2 text-sm md:text-base'>
            <div className='flex w-7/12 items-center md:w-3/12'>
              <img
                src={avatarUrl}
                alt={`${props.user.full_name}'s profile`}
                className='mr-4 h-10 w-10 min-w-[24px] rounded-md object-cover md:h-12 md:w-12 md:min-w-[32px]'
              />
              <div className='hidden md:flex'>{props.user.full_name}</div>
              <div className='flex flex-col overflow-hidden text-ellipsis md:hidden'>
                <div>{props.user.first_name}</div>
                <div className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm'>
                  {props.user.email}
                </div>
              </div>
            </div>
            <div className='hidden w-4/12 text-[#878787CC] dark:text-darkWhite md:flex'>
              {props.user.email}
            </div>
            <div className={`w-fit md:w-1/6`}>
              <div
                className={`w-fit rounded-[100px] text-[#878787CC] dark:text-darkWhite ${
                  roleName === 'Owner' && '-ml-4  p-2 px-4 '
                }`}
              >
                {t(roleName.toLowerCase())}
              </div>
            </div>
            <div className='hidden w-2/12 text-[#878787CC] dark:text-darkWhite md:block'>
              {userDate}
            </div>
            <div className='flex h-full w-1/12  justify-center'>
              <button className='flex h-full items-center' onClick={toggleModal}>
                <EditButton />
                <div className='mx-2 hidden text-[#878787CC] dark:text-darkWhite md:block'>
                  {t('edit')}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
