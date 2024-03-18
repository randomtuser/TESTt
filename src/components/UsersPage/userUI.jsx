import { useTranslation } from 'react-i18next';
import HeaderContent from '../common/headerContent/headerContent';
import { BiSearch, BiChevronDown } from 'react-icons/bi';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx';
import { FiMail, FiRefreshCcw } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiFileCopyLine } from 'react-icons/ri';
import QrCode from '../common/qrCode/qrCode';
import UserCard from '../common/cards/userCard/userCard';
import PaginationWidget from '../common/pagination/pagination';
import Modal from '../common/modals/modal';
export default function UserUI(props) {
  const { t } = useTranslation(['Users']);
  return (
    <div className='flex flex-col'>
      <div className='h-12'>
        <HeaderContent>
          <div className='mx-6 flex justify-center gap-7 border-b border-gray-300 py-2 text-[12px] md:hidden'>
            <div className='relative -left-14'>Name</div>
            <div className='relative -right-8'>Role</div>
          </div>
        </HeaderContent>
      </div>

      {props.userRole === 3 || props.userRole === 1 ? (
        <div className='relative h-full w-full'>
          <Modal
            title={t('Invite') + props.companyName}
            isOpen={props.isOpenModalInvite}
            toggleModal={props.toggleModal}
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
                    value={props.inputValue}
                    onChange={props.handleInputChange}
                  />
                  <div className='relative -inset-y-[29px] ml-[2px] w-min items-center rounded-lg bg-white px-2 py-0.5 dark:bg-[#1B1B1B]'>
                    <FiMail size={22} />
                  </div>
                </div>
                <div className='my-3 flex max-h-32 w-full flex-wrap-reverse gap-1 overflow-auto px-4'>
                  {props.emails.map((email) => (
                    <div className='flex w-min rounded-lg bg-gray-200 p-1 dark:border dark:border-darkWhite dark:bg-transparent'>
                      <div key={email} className='m-1 text-sm'>
                        {email}
                      </div>
                      <button
                        onClick={() => {
                          props.setEmails(props.emails.filter((e) => e !== email));
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
                    onClick={props.sendInvitationEmail}
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
                    <button className='ml-1' onClick={props.reloadQr}>
                      <FiRefreshCcw size={20} />
                    </button>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center gap-x-2 rounded-lg border border-gray-400 px-4 py-2'>
                      <a
                        className='text-blue-500 hover:text-blue-800'
                        href={
                          `
                            https://metalmakerinternal.vercel.app/invite/` + props.qrVal
                        }
                      >
                        {props.companyName} link
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard
                            .writeText(
                              'https://metalmakerinternal.vercel.app/invite/' + props.qrVal,
                            )
                            .then(() => {
                              props.notify('Link copied.', 'success');
                            });
                        }}
                        className='flex items-center justify-center gap-x-1 text-gray-800 dark:text-darkWhite'
                      >
                        <RiFileCopyLine size={18} orientation={10} />
                        {t('copy')} link
                      </button>
                    </div>

                    <QrCode code={'https://metalmakerinternal.vercel.app/' + props.qrVal} />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <div className='flex w-full justify-center'>
            <div className='fixed bottom-3 flex w-full justify-center lg:left-[98px]'>
              {props.sortedUsers.length !== 0 && (
                <PaginationWidget
                  items={props.sortedUsers.length}
                  itemsPerPage={props.itemsPerPage}
                  range={props.rangePagination}
                  onPageChange={props.handlePageChange}
                  currentPage={props.currentPage}
                />
              )}
            </div>
          </div>
          <div className='mt-5 hidden w-full justify-between border-b border-neutral-500 px-6 pb-5 text-left font-bold md:flex'>
            {props.sortOptions.map((option) => (
              <div
                key={option.data}
                className={`${option.width} flex`}
                data={option.data}
                onClick={(e) => props.orderBy(e)}
              >
                <button className='flex'>
                  {option.label}
                  {props.sortBy === option.data && (
                    <BiChevronDown
                      size={20}
                      className={`transform ${props.sortDirection ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
              </div>
            ))}
            <div className='w-1/12'></div>
          </div>
          <div className='flex flex-wrap'>
            {props.sortedUsers
              .slice(
                (props.currentPage - 1) * props.itemsPerPage,
                props.currentPage * props.itemsPerPage,
              )
              .map((user, index) => {
                return (
                  <UserCard
                    onDelete={props.deleteUser}
                    key={user.id}
                    user={user}
                    roles={props.roleArray}
                    notify={props.notify}
                  />
                );
              })}
          </div>
          <div className='mt-2 flex w-full justify-center text-2xl font-bold'>{props.errorMsg}</div>
        </div>
      ) : props.userRole === 2 ? (
        <div className='w-full p-6 text-center font-sans text-xl font-semibold'>
          You are not allowed to access to this page. Please, contact and administrator.
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
