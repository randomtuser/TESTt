import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import AlloysCard from '../../components/common/cards/alloys/alloysCard';
import QrReader from '../../components/common/qrReader/qrReader';
import Modal from '../../components/common/modals/modal';
import DefaultCompsAlloys from '../../components/common/defaultCompsAlloys';
import { useTranslation } from 'react-i18next';
import Traducciones from '../../components/alloysPage/traducciones';
import { getMaterials } from './api/getMaterials';

function Alloys(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [rangePagination, setRangePagination] = useState(2);

  const [loaded, setLoaded] = useState(false);

  const [isOpenModalScan, setIsOpenModalScan] = useState(false);
  const [display, setDisplay] = useState(false);
  const { group } = useAuth();

  const { t } = useTranslation(['Machines']);

  const toggleModalScan = () => {
    setDisplay(!display);
    setIsOpenModalScan(!isOpenModalScan);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (group) {
      getMaterials(setUserList, setSearchResult, setLoaded, group);
    }
  }, [group]);

  useEffect(() => {
    const search = () => {
      const filteredMaterial = userList.filter((material) =>
        material.materials.material_name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      filteredMaterial.length === 0 ? setErrorMsg('No Alloy found.') : setErrorMsg('');
      setSearchResult(filteredMaterial);
      setCurrentPage(1);
    };
    search();
  }, [searchTerm]);

  useEffect(() => {
    const handleWindowResize = () => {
      setRangePagination(window.innerWidth > 768 ? 2 : 1);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div className='h-full w-full'>
      <Modal
        title={`${t('scan')}`}
        isOpen={isOpenModalScan}
        toggleModal={toggleModalScan}
        defaultButtons={false}
      >
        <div className=''>
          <QrReader
            toggleModalScan={toggleModalScan}
            notify={props.notify}
            display={display}
            trad={Traducciones}
          />
        </div>
      </Modal>

      <div className='w-full'>
        <DefaultCompsAlloys
          searchResult={searchResult}
          itemsPerPage={itemsPerPage}
          rangePagination={rangePagination}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          toggleModalScan={toggleModalScan}
          t={t}
        />

        <div className='fixed bottom-14 flex w-full flex-col justify-center lg:left-[97px] '>
          {' '}
          <button
            onClick={() => {
              toggleModalScan();
            }}
            className='mr-3 ml-auto flex w-fit items-center gap-1 rounded bg-[#FB8500] p-2 px-2 text-center text-white hover:bg-orange-500 md:hidden md:min-w-[190px] md:px-3'
          >
            <img src='icons/scanMaterial.svg' alt='' />

            <div className='text- block font-thin'>{t('scan')}</div>
          </button>{' '}
        </div>
        <div className='mx-4 flex flex-col items-center justify-center gap-[10px] dark:bg-[#1B1B1B] md:mx-6 md:mt-[30px] md:gap-[24px]'>
          {searchResult
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((material) => (
              // <div key={material.id} className='mx-[16px] w-full'>
              <AlloysCard material={material} />
              // </div>
            ))}
          {loaded && searchResult.length === 0 ? (
            <div className='mt-24 text-center text-xl font-bold dark:text-darkWhite'>
              {t('dataMaterial')}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='h-24 md:hidden'></div>
    </div>
  );
}

export default Alloys;
