import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import {
  updateDataToGroupTable,
  updateDataToProfileTable,
} from '../../../Pages/settings/api/updateFieldsAPI';
export const UpdateFields = ({
  props,
  loadUsers,
  setEditDetails,
  editDetails,
  user,
  users,
  setUser1,
  user1,
  t,
}) => {
  const [nameField, setNameField] = useState('');
  const [surnameField, setSurnameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [phoneField, setPhoneField] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');

  const fields = [
    { name: 'first_name', variable: nameField },
    { name: 'last_name', variable: surnameField },
    { name: 'email', variable: emailField },
    { name: 'phone_number', variable: phoneField },
  ];

  const setInputs = () => {
    setNameField(user1.first_name ? user1.first_name : t('fillName'));
    setSurnameField(user1.last_name ? user1.last_name : t('fillLast'));
    setEmailField(user1.email);
    setPhoneField(user1.phone_number ? user1.phone_number : t('fillPhone'));
    setRole(user1.role.name);
  };

  useEffect(() => {
    if (user1.group !== undefined && users.length === 0) {
      setInputs();
      loadUsers();
      setCompanyName(user1.group.name);
    }
  }, [user1]);

  const handleSubmit = async () => {
    if (companyName !== user1.group.name) {
      if (user1.role.name === 'owner') {
        await updateDataToGroupTable(companyName, user1);
        props.props.notify(t('renameSuccess'), 'success');
      } else {
        setCompanyName(user1.group.name);
        props.props.notify(t('onlyOwner'), 'error');
      }
    }
    let update = [];
    fields.forEach((field) => {
      if (
        field.variable !== user1[field.name] &&
        field.variable !== '' &&
        field.variable !== t('fillPhone')
      ) {
        setUser1((user) => ({ ...user, [field.name]: field.variable }));
        update = { ...update, [field.name]: field.variable };
      }
    });

    if (companyName === user1.group.name) {
      if (update.length === 0) {
        props.props.notify(`${t('Notify:notifyUpdateWarning')}`, 'info');
      } else {
        if (nameField !== user1['first_name'] || surnameField !== user['last_name']) {
          update = { ...update, full_name: nameField + ' ' + surnameField };

          let userCopy = user1;
          userCopy.first_name = nameField;
          userCopy.last_name = surnameField;
          userCopy.full_name = nameField + ' ' + surnameField;
          setUser1(userCopy);
          props.props.setFullNameProp(nameField);
        }
        await updateDataToProfileTable(update, user);
        props.props.notify(`${t('Notify:notifyUpdate')}`, 'success');
        setEditDetails(!editDetails);
      }
    }
  };

  return (
    <>
      <div className='mt-[40px] mb-[5px] flex w-full items-start justify-start px-4 md:px-0'>
        <p className='text-xl font-bold'>{t('personalDetails')}</p>
      </div>
      <div className='flex w-full flex-col justify-between px-4 text-xl sm:w-1/2 md:py-5 md:pl-0 md:pr-5 '>
        <div className='text-gray-400'>{t('name')}</div>
        <input
          value={nameField}
          disabled={!editDetails}
          className={`${
            !editDetails ? 'border-none py-[9px] ' : 'rounded-lg border border-gray-400 p-1 '
          } bg-transparent `}
          onChange={(e) => setNameField(e.target.value)}
          placeholder={user1.first_name}
        />
      </div>
      <div className='flex w-full flex-col justify-between px-4 text-xl sm:w-1/2 md:py-5 md:pl-5 md:pr-0'>
        <div className='text-gray-400'>{t('surname')}</div>
        <input
          value={surnameField}
          disabled={!editDetails}
          className={`${
            !editDetails ? 'border-none py-[9px]' : 'rounded-lg border border-gray-400 p-1 '
          } bg-transparent `}
          onChange={(e) => setSurnameField(e.target.value)}
          placeholder={user1.last_name}
        />
      </div>
      <div className='flex w-full flex-col justify-between px-4 text-xl sm:w-1/2 md:py-5 md:pl-0 md:pr-5 '>
        <div className='text-gray-400'>Email</div>
        <input
          value={emailField}
          disabled={!editDetails}
          className={`${
            !editDetails ? 'border-none py-[9px]' : 'rounded-lg border border-gray-400 p-1 '
          } bg-transparent `}
          onChange={(e) => setEmailField(e.target.value)}
          placeholder={user1.email}
        />
      </div>
      <div className='flex w-full flex-col justify-between px-4 text-xl sm:w-1/2 md:py-5 md:pl-5 md:pr-0 '>
        <div className='text-xl text-gray-400'>{t('phone')}</div>
        {!editDetails ? (
          <input
            value={phoneField}
            disabled
            className='border-none bg-transparent py-[10px] text-xl'
          />
        ) : (
          <div className='text-base dark:text-black'>
            <PhoneInput
              specialLabel={''}
              country={'pl'}
              onChange={(e) => {
                setPhoneField(e);
              }}
              value={phoneField}
            />
          </div>
        )}
      </div>
      <div className='flex w-full flex-col justify-between px-4 text-xl sm:w-1/2 md:py-5 md:pl-0 md:pr-5'>
        <div className='text-gray-400'>{t('companyName')}</div>
        <input
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
          disabled={!(editDetails && user1.role.name.toLowerCase() === 'owner')}
          className={`${
            !editDetails
              ? 'border-none py-[9px] text-[#2D9CDB]'
              : 'rounded-lg border border-gray-400 p-1 text-[#2D9CDB]'
          } bg-transparent `}
          placeholder={user1.group != null ? user1.group.name : ''}
        />
      </div>
      {editDetails}
      <div className='relative -top-1 flex w-full flex-col gap-2 px-4 text-xl sm:w-1/2 md:py-5 md:pl-5 md:pr-0 '>
        <div className='text-gray-400 '>{t('role')}</div>
        <input
          value={t(role).charAt(0).toUpperCase() + t(role).slice(1)}
          disabled
          className='bg-transparent '
        />
      </div>{' '}
      <div
        className={`${
          !editDetails ? 'hidden' : 'sm:flex-row2 mt-6 flex w-full flex-col pr-5 '
        } bg-transparent `}
      >
        <div className='flex w-full items-center py-2 px-4 text-gray-400 md:px-0'>{t('info1')}</div>
        <div className='flex w-full justify-end md:ml-5'>
          <button
            className='px-6 py-3 text-xl font-semibold'
            onClick={() => {
              setEditDetails(!editDetails);
            }}
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className='flex items-center space-x-2 rounded bg-[#FB8500] px-6 py-3 text-xl text-white hover:bg-orange-500'
          >
            <img src='icons/updateButton.svg' alt='' />
            <span>{t('update')}</span>
          </button>
        </div>
      </div>
    </>
  );
};
