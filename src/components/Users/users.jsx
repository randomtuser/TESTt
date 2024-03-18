import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import UserCard from '../common/cards/userCard/userCard';
import PaginationWidget from '../common/pagination/pagination';
import { supabase } from '../../supabase';
import Modal from '../common/modals/modal';
import QrCode, { generateCode, sha256 } from '../common/qrCode/qrCode';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { FiMail, FiRefreshCcw } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import HeaderContent from '../common/headerContent/headerContent';
import { RiFileCopyLine } from 'react-icons/ri';

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
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    if (profile.group) {
      loadUsers();
      loadCompany();
      loadRoles();
    }
  }, [profile]);

  async function loadUsers() {
    let { data: profiles } = await supabase.from('profiles').select('*').eq('group', profile.group);

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
    const { data, error } = await supabase.from('role').select('*');
    setRoleArray(data);
  };

  async function loadCompany() {
    let { data: company } = await supabase
      .from('profiles')
      .select('role, group(name, id)')
      .eq('id', profile.id);
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
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        data: {
          user_type: 'user',
          group: profile.group,
          role: 2,
          prov: 'invited',
          time: 'first',
        },
      },
    });
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
    await supabase.from('profiles').delete().eq('id', userId);
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

    // if (sortDirection === true) {
    //   setSortedUsers(
    //     sortedUsers.sort((a, b) => b[col.toLowerCase()].localeCompare(a[col.toLowerCase()])),
    //   );
    // } else {
    //   setSortedUsers(
    //     sortedUsers.sort((a, b) => a[col.toLowerCase()].localeCompare(b[col.toLowerCase()])),
    //   );
    // }

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
      let { data: qr_codes } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('company', companyId)
        .eq('type', 'invite');
      if (qr_codes !== '' && qr_codes !== null && qr_codes.length > 0) {
        setQrVal(qr_codes[0].code);
        await supabase.from('qr_codes').update({ valid: val }).eq('code', qr_codes[0].code);
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
    await supabase.from('qr_codes').delete().eq('company', companyId).eq('type', 'invite');
    await supabase.from('qr_codes').insert([
      {
        code: newCode,
        valid: true,
        company: companyId,
        type: 'invite',
        object: item,
        enc_object: enc_item,
      },
    ]);
    setQrVal(newCode);
  };

  return (
    <>
      <div className='mb-8 h-full w-full dark:bg-[#1B1B1B] dark:text-darkWhite'>
        <HeaderContent>
          <div className='flex h-11 w-full justify-center'>
            <div className='flex w-3/4 items-center justify-center px-2'>
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
            {userRole === 3 || userRole === 1 ? (
              <button
                onClick={toggleModal}
                type='button'
                className='flex h-full w-fit min-w-fit items-center justify-between gap-1 rounded-[5px] bg-[#FB8500] p-2.5 px-4 text-white hover:bg-orange-500'
              >
                <img src='icons/addNewUser.svg' width={20} alt='' />
                <div className='hidden md:block'>{t('add')}</div>
              </button>
            ) : (
              ''
            )}
          </div>
        </HeaderContent>

        {userRole === 3 || userRole === 1 ? (
          <div className='relative h-full w-full'>
            <Modal
              title={t('Invite') + companyName}
              isOpen={isOpenModalInvite}
              toggleModal={toggleModal}
              defaultButtons={false}
            >
              <div className='flex h-full w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth sm:snap-none sm:overflow-hidden'>
                {/** need to fix */}
                <div className='h-full w-full shrink-0 snap-center flex-col sm:shrink' id='email'>
                  <div className='flex content-center justify-center pb-4 sm:hidden'>
                    <a href='#qr'>
                      <div className='flex w-min rounded-lg border bg-gray-200 p-1 hover:bg-gray-600'>
                        <p>QR</p>
                        <RxDoubleArrowRight size={23} />
                      </div>
                    </a>
                  </div>
                  <div className='h-min w-full text-center text-lg dark:text-darkWhite md:text-xl'>
                    {t('email')}
                  </div>
                  <div className='max-h-12 w-full flex-col px-1 py-3 sm:px-8'>
                    <textarea
                      type='text'
                      id='input-group-1'
                      className='flex h-8 w-full resize-none overflow-hidden whitespace-nowrap rounded-lg border-2 border-gray-300 bg-transparent pl-11 pt-0.5 text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:text-darkWhite sm:h-8 sm:pt-0 sm:text-xl'
                      placeholder='example@gmail.com'
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <div className='relative -inset-y-[29px] ml-[2px] w-min items-center rounded-lg bg-white px-2 py-0.5 dark:bg-[#1B1B1B]'>
                      <FiMail size={22} />
                    </div>
                  </div>
                  <div className='my-3 flex max-h-32 w-full flex-wrap-reverse gap-1 overflow-auto px-4'>
                    {emails.map((email) => (
                      <div className='flex w-min rounded-lg bg-gray-200 p-1 dark:border dark:border-darkWhite dark:bg-transparent'>
                        <div key={email} className='m-1 text-sm'>
                          {email}
                        </div>
                        <button
                          onClick={() => {
                            setEmails(emails.filter((e) => e !== email));
                          }}
                        >
                          <AiOutlineCloseCircle size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='h-min w-full text-center'>
                    <button
                      className='focus:shadow-outline rounded-md bg-[#FB8500] px-7 py-3 text-xl text-white hover:bg-orange-500 focus:outline-none'
                      type='button'
                      onClick={sendInvitationEmail}
                    >
                      {t('inviteButton')}
                    </button>
                  </div>
                </div>
                <div className='hidden w-min xl:block'>
                  <div className='flex h-full items-center justify-center '>
                    <hr className='h-full w-[2px] border-gray-300 bg-gray-300' />
                    <div className='absolute'>
                      <div className='bg-white py-2 text-lg text-gray-400 dark:bg-[#1B1B1B]'>
                        {t('or')}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='h-full w-full shrink-0 snap-center flex-col pl-3 sm:w-fit sm:shrink '
                  id='qr'
                >
                  <div className='flex content-center justify-center pb-4 sm:hidden'>
                    <a href='#email'>
                      <div className='flex w-min rounded-lg border bg-gray-200 p-1 hover:bg-gray-600'>
                        <RxDoubleArrowLeft size={23} />
                        <p>Mail</p>
                      </div>
                    </a>
                  </div>
                  <div className='flex w-full flex-col gap-y-2'>
                    <div className='flex items-center justify-center text-lg md:text-xl'>
                      <p className=''>QR Code</p>
                      <button className='ml-1' onClick={reloadQr}>
                        <FiRefreshCcw size={20} />
                      </button>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='flex items-center justify-center gap-x-2 rounded-lg border border-gray-400 px-4 py-2'>
                        <a
                          className='text-blue-500 hover:text-blue-800'
                          href={
                            `
                            ${BASE_URL}invite/` + qrVal
                          }
                        >
                          {companyName} link
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${BASE_URL}invite/` + qrVal).then(() => {
                              props.notify('Link copied.', 'success');
                            });
                          }}
                          className='flex items-center justify-center gap-x-1 text-gray-800 dark:text-darkWhite'
                        >
                          <RiFileCopyLine size={18} orientation={10} />
                          {t('copy')} link
                        </button>
                      </div>

                      <QrCode code={`${BASE_URL}` + qrVal} />
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <div className='flex w-full justify-center'>
              <div className='fixed bottom-3 flex w-full justify-center lg:left-[98px]'>
                {sortedUsers.length !== 0 && (
                  <PaginationWidget
                    items={sortedUsers.length}
                    itemsPerPage={itemsPerPage}
                    range={rangePagination}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                )}
              </div>
            </div>
            <div className='mt-5 hidden w-full justify-between px-6 text-left font-bold md:flex'>
              {sortOptions.map((option) => (
                <div
                  key={option.data}
                  className={`${option.width} flex`}
                  data={option.data}
                  onClick={(e) => orderBy(e)}
                >
                  <button className='flex'>
                    {option.label}
                    {sortBy === option.data && (
                      <BiChevronDown
                        size={20}
                        className={`transform ${sortDirection ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                </div>
              ))}
              <div className='w-1/12'></div>
            </div>
            <div className='flex flex-wrap'>
              {sortedUsers
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user, index) => {
                  return (
                    <UserCard
                      onDelete={deleteUser}
                      key={user.id}
                      user={user}
                      roles={roleArray}
                      notify={props.notify}
                    />
                  );
                })}
            </div>
            <div className='mt-2 flex w-full justify-center text-2xl font-bold'>{errorMsg}</div>
          </div>
        ) : userRole === 2 ? (
          <div className='w-full p-6 text-center font-sans text-xl font-semibold'>
            You are not allowed to access to this page. Please, contact and administrator.
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Users;
