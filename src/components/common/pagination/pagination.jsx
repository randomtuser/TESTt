import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PreviousIcon from './Icons/previousIcon';
import NextIcon from './Icons/nextIcon';

const PaginationWidget = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  let key = 1;
  const totalPages = Math.ceil(props.items / props.itemsPerPage);

  const { t } = useTranslation(['Pagination']);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      props.onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      props.onPageChange(currentPage - 1);
    }
  };

  const specificPage = (page) => {
    setCurrentPage(page);
    props.onPageChange(page);
  };

  function generateButtons(totalPages, range) {
    let start;

    if (totalPages <= 5 || currentPage <= range) {
      start = 1;
    } else if (currentPage >= totalPages - range) {
      start = totalPages - 2 * range;
    } else {
      start = currentPage - range;
    }

    let buttons = [];
    key++;

    buttons.push(
      <button
        key={key}
        disabled={currentPage === 1}
        className='inline-flex items-center rounded-l-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:bg-gray-200 dark:border-gray-500 dark:bg-transparent dark:text-darkWhite'
        onClick={goToPreviousPage}
      >
        <PreviousIcon />
        {t('prev')}
      </button>,
    );

    for (let i = start; i < Math.min(start + 2 * range + 1, totalPages + 1); i++) {
      buttons.push(
        <button
          key={'button' + i}
          className={
            'inline-flex items-center border border-gray-300 bg-neutral-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-orange-100 hover:text-gray-700 dark:border-gray-500 dark:text-darkWhite ' +
            (currentPage === i ? 'bg-orange-200 dark:bg-orange-500 ' : 'dark:bg-transparent')
          }
          onClick={() => specificPage(i)}
        >
          {i}
        </button>,
      );
    }

    buttons.push(
      <button
        key={99}
        disabled={currentPage === totalPages}
        className='inline-flex items-center rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:bg-gray-200 dark:border-gray-500 dark:bg-transparent dark:text-darkWhite'
        onClick={goToNextPage}
      >
        {t('next')}
        <NextIcon />
      </button>,
    );
    return buttons;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='xs:mt-0 mt-2 inline-flex'>{generateButtons(totalPages, props.range)}</div>
    </div>
  );
};

export default PaginationWidget;
