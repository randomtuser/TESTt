import React, { useState, useEffect } from 'react';
import CrucibleCard from '../../components/common/cards/crucibles/crucibleCard';
import { useTranslation } from 'react-i18next';
import DefaultComps from '../../components/common/defaultComps';
import { loadCrucibles } from './api/loadCrucibles';
import { handleDelete } from './api/handleDelete';
import { updatedSearchResult } from './api/updatedSearchResult';
let UserList = [];

export default function Crucibles(props) {
  const group = props.group;
  const [searchResult, setSearchResult] = useState(UserList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [rangePagination, setRangePagination] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation(['Machines']);

  useEffect(() => {
    if (group) {
      loadCrucibles(setSearchResult, setLoaded, group, UserList);
    }
  }, [group]);

  useEffect(() => {
    const handleWindowResize = () => {
      setRangePagination(window.innerWidth > 768 ? 2 : 1);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // EVERY 10 MINUTES
  const INTERVAL_MS = 600000;
  useEffect(() => {
    const interval = setInterval(() => {
      updatedSearchResult(setSearchResult);
    }, INTERVAL_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <>
      <div className='h-full w-full'>
        <div className='w-full'>
          <DefaultComps
            searchResult={searchResult}
            itemsPerPage={itemsPerPage}
            rangePagination={rangePagination}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
          />

          <div className='flex w-full flex-col items-center dark:bg-[#1B1B1B] md:mt-[30px]'>
            {searchResult
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((crucible) => (
                <div key={crucible.id} className='w-full'>
                  <CrucibleCard
                    crucible={crucible}
                    handleDelete={() =>
                      handleDelete(crucible.crucible_id, setSearchResult, searchResult)
                    }
                  />
                </div>
              ))}
            {loaded && searchResult.length === 0 ? (
              <div className='mt-24 text-center text-xl font-bold dark:text-darkWhite'>
                {t('dataCrucible')}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
