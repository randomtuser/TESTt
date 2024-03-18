import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { generateCode, sha256 } from '../../components/common/qrCode/qrCode';
import { useTranslation } from 'react-i18next';
import {
  loadUser,
  loadUserRole,
  loadUserCompany,
  inviteByEmail,
  deleteUserById,
  inviteByQR,
  updateQR,
  deleteQR,
  insertQR,
} from '../../components/UsersPage/api/user';
import UserUI from '../../components/UsersPage/userUI';
import MobileButton from '../../components/foundriesPage/mobileButton';
import { BiSearch, BiChevronDown } from 'react-icons/bi';

let UserList = [];
let companyName;
let companyId;

const Users = (props) => {
  const [searchResult, setSearchResult] = useState(UserList);
  const [sortedUsers, setSortedUsers] = useState(UserList);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); //PAGINATIOn
  const [rangePagination, setRangePagination] = useState(2);
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [qrVal, setQrVal] = useState('');
  const [isOpenModalInvite, setIsOpenModalInvite] = useState(false);
  const [sortDirection, setSortDirection] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [roleArray, setRoleArray] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { t } = useTranslation(['Users']);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile.group) {
      loadUsers();
      loadCompany();
      loadRoles();
    }
  }, [profile]);

  async function loadUsers() {
    let { data: profiles } = await loadUser(profile);
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
    UserList = profiles;
    setSearchResult(UserList);
    setSortedUsers(UserList);
  }

  const loadRoles = async () => {
    const { data, error } = await loadUserRole();
    setRoleArray(data);
  };

  async function loadCompany() {
    let { data: company } = await loadUserCompany(profile);
    setUserRole(company[0].role);
    companyName = company[0].group.name;
    companyId = company[0].group.id;
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setRangePagination(window.innerWidth > 768 ? 2 : 1);
    };
    window.addEventListener('resize', handleWindowResize);
  }, []);

  const toggleModal = () => {
    loadQr();
    setIsOpenModalInvite(!isOpenModalInvite);
    setEmails([]);
    setInputValue('');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // -- SEARCHBAR FUNCTION --
  const search = (e) => {
    const filteredUsers = UserList.filter((profile) =>
      (profile.full_name.toLowerCase() + ' ' + profile.email.toLowerCase()).includes(
        e.target.value.toLowerCase(),
      ),
    );
    filteredUsers.length === 0 ? setErrorMsg('No users found.') : setErrorMsg('');
    setSortedUsers(filteredUsers);
    setSearchResult(filteredUsers);
  };

  // -- INVITE FOR EMAIL --
  const sendEmail = async (email) => {
    const { data, error } = await inviteByEmail(email, profile);
  };

  const sendInvitationEmail = async () => {
    if (emails.length === 0) {
      props.notify(`Add the e-mails by entering 'space' or 'enter'`, 'error');
    } else {
      emails.forEach((email) => {
        sendEmail(email);
      });
      toggleModal();
      props.notify('Invitation sent', 'success');
    }
  };
  // -- END OF INVITE FOR EMAIL --

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}\s*$/;
    if (value.includes(' ') || value.includes('\n') || value.includes('\r')) {
      if (regex.test(value) && !emails.includes(value.trim())) setEmails([...emails, value.trim()]);
      setInputValue('');
    }
  };

  async function deleteUser(userId) {
    await deleteUserById(userId);
    const totalPages = Math.ceil((sortedUsers.length - 1) / itemsPerPage);
    const resLength = sortedUsers.length - 1;
    setSortedUsers(sortedUsers.filter((user) => user.id !== userId));
    if (resLength === totalPages * itemsPerPage) {
      setCurrentPage(totalPages);
    }
  }

  const sortOptions = [
    { data: 'full_name', label: t('name'), width: 'w-3/12' },
    { data: 'email', label: 'Email', width: 'w-4/12' },
    { data: 'role', label: t('role'), width: 'w-2/12' },
    { data: 'last_sign_in', label: t('lastLoggedIn'), width: 'w-2/12' },
  ];

  function orderBy(e) {
    const col = e.currentTarget.getAttribute('data');
    console.log(sortedUsers);
    if (sortDirection === true) {
      setSortedUsers(
        sortedUsers.sort((a, b) => {
          if (typeof a[col.toLowerCase()] === 'number') {
            return b[col.toLowerCase()] - a[col.toLowerCase()];
          } else {
            return b[col.toLowerCase()].localeCompare(a[col.toLowerCase()]);
          }
        }),
      );
    } else {
      setSortedUsers(
        sortedUsers.sort((a, b) => {
          if (typeof a[col.toLowerCase()] === 'number') {
            return a[col.toLowerCase()] - b[col.toLowerCase()];
          } else {
            return a[col.toLowerCase()].localeCompare(b[col.toLowerCase()]);
          }
        }),
      );
    }
    setSortDirection(!sortDirection);
    setSortBy(col);
  }

  const loadQr = () => {
    const manageInvite = async (val) => {
      let { data: qr_codes } = await inviteByQR(companyId);
      if (qr_codes !== '' && qr_codes !== null && qr_codes.length > 0) {
        setQrVal(qr_codes[0].code);
        await updateQR(val, qr_codes);
      } else {
        reloadQr();
      }
    };
    if (!isOpenModalInvite) {
      manageInvite(true);
    } else {
      manageInvite(false);
    }
  };

  const reloadQr = async () => {
    let newCode = generateCode(30);
    let item = { code: newCode, type: 'invite', company: companyId };
    let enc_item = await sha256(JSON.stringify(item));
    await deleteQR(companyId);
    await insertQR(newCode, companyId, item, enc_item);
    setQrVal(newCode);
  };

  return (
    <>
      <div className=''>
        <MobileButton />
      </div>
      <div className='mt-1 mb-[15px] flex h-11 w-full justify-center px-2 md:mb-0 3xl:mx-auto 3xl:mt-[1.9vh] 3xl:h-[3.7vh] 3xl:w-[70%]'>
        <div className='flex w-full items-center justify-center pl-0 pr-4'>
          <div className='relative ml-3 w-full text-gray-400'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <button type='submit' className='focus:shadow-outline p-1 focus:outline-none'>
                <BiSearch />
              </button>
            </span>
            <input
              type='search'
              name='s'
              className='w-full rounded-[5px] border border-[#CCC] bg-[#e5e5e5] p-2.5 pl-10 placeholder-gray-400 dark:bg-[#0D0D0D]'
              placeholder={t('search')}
              autoComplete='off'
              onChange={search}
            />
          </div>
        </div>
        <button
          onClick={toggleModal}
          type='button'
          className='mr-4 flex h-full w-fit min-w-fit items-center justify-between gap-1 rounded-[5px] bg-[#FB8500] p-2.5 px-4 text-white hover:bg-orange-500'
        >
          <img src='icons/addNewUser.svg' alt='' width={20} />
          <div className='hidden md:block'>{t('add')}</div>
        </button>
      </div>
      <div className='mt-4 flex w-full flex-col items-center justify-center px-4 md:mt-0 md:px-0'>
        <div className='flex w-[96%] flex-wrap rounded-[5px] bg-[#FFFFFF] pb-3 pt-2 dark:bg-[#0D0D0D] dark:text-[#FFFFFFDE]  md:mt-6 md:rounded-[10px] md:px-5'>
          <div className='w-full '>
            <UserUI
              search={search}
              toggleModal={toggleModal}
              userRole={userRole}
              companyName={companyName}
              isOpenModalInvite={isOpenModalInvite}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              emails={emails}
              setEmails={setEmails}
              sendInvitationEmail={sendInvitationEmail}
              reloadQr={reloadQr}
              qrVal={qrVal}
              sortedUsers={sortedUsers}
              itemsPerPage={itemsPerPage}
              rangePagination={rangePagination}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              sortOptions={sortOptions}
              orderBy={orderBy}
              sortBy={sortBy}
              sortDirection={sortDirection}
              deleteUser={deleteUser}
              roleArray={roleArray}
              errorMsg={errorMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
