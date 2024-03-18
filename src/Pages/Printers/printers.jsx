import React, { useState, useEffect } from 'react';
import {
  loadPrintersData,
  createNewPrinter,
  deletePrinterData,
  updateToGroupNotification,
} from './api/printersAPI';
import PrinterAlert from '../../components/printersPage/alerts';
import MobileBackButton from '../../components/printersPage/mobileBackButton';
import PrinterHeader from '../../components/printersPage/header';
import Pagination from '../../components/printersPage/pagination';
import PrinterCardList from '../../components/printersPage/printerCardList';

export default function Printers(props) {
  const userGroup = props.group;
  const userId = props.user.id;
  const [searchResult, setSearchResult] = useState([]);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [rangePagination, setRangePagination] = useState(2);
  const [deleteId, setDeleteId] = useState();
  const [userIp, setUserIp] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenPairing, setIsOpenPairing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userGroup) {
      loadPrinters();
      loadUserIp();
    }
  }, [userGroup]);

  //changes the amount of pages u can skip
  useEffect(() => {
    const handleWindowResize = () => {
      setRangePagination(window.innerWidth > 768 ? 2 : 1);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function loadUserIp() {
    fetch('https://api.ipify.org/?format=json')
      .then((response) => response.json())
      .then((data) => {
        setUserIp(data.ip);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async function loadPrinters() {
    let { data } = await loadPrintersData(userGroup);
    setSearchResult(data);
    setUserList(data);
    setLoaded(true);
  }

  const search = (e) => {
    const filteredFoundries = userList.filter((printer) => {
      const hasAlias =
        printer.alias && printer.alias.toLowerCase().includes(e.target.value.toLowerCase());
      const hasIp = printer.ip && printer.ip.toLowerCase().includes(e.target.value.toLowerCase());
      const hasId =
        printer.printer_id &&
        printer.printer_id.toString().toLowerCase().includes(e.target.value.toLowerCase());
      return hasAlias || hasIp || hasId;
    });
    setSearchResult(filteredFoundries);
    setCurrentPage(1);
  };

  //Creates the pairing code used to pair the printer to the application
  function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let cadena = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      cadena += chars[randomIndex];
    }
    const repeatedCode = searchResult.some((result) => result.code === cadena);
    if (repeatedCode) {
      // Recursive call if the code exists
      return generateCode();
    }
    return cadena;
  }

  //creates a new printer with pairing code
  const newPrinter = async () => {
    toggleModal();
    const hasNullIp = userList.some((obj) => obj.client === userGroup && obj.ip === '');
    if (hasNullIp) {
      toggleModal();
      togglePairing();
      // setTimeout(() => {
      //   //without the timeout, user interaction looks weird, value can be lowered
      // }, 200);
    } else {
      const { data } = await createNewPrinter(generateCode, userId, userGroup);
      setSearchResult([data[0], ...userList]);
      setUserList((prevList) => [data[0], ...prevList]);

      const { data1 } = await updateToGroupNotification(userGroup);
      setSearchResult([data1[0], ...userList]);
      setUserList((prevList) => [data1[0], ...prevList]);
    }
  };

  const toggleModal = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  //useState that opens the Delete popup
  const toggleDelete = () => {
    setIsOpenDelete((prevIsOpenDelete) => !prevIsOpenDelete);
  };

  //useState that opens a popup that warns the user theres already a printer waiting to be paired
  const togglePairing = () => {
    setIsOpenPairing((prevIsOpenPairing) => !prevIsOpenPairing);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //gets ID of the printer you want to delete from the modal, then opens the "are you sure" modal
  const handleDelete = (printer_id) => {
    setDeleteId(printer_id);
    toggleDelete();
  };

  //deletes the printer using deleteId state. Called after "are you sure" modal
  const deletePrinter = async () => {
    await deletePrinterData(deleteId);
    const totalPages = Math.ceil((searchResult.length - 1) / itemsPerPage);
    const resLength = searchResult.length - 1;

    setSearchResult(userList.filter((result) => result.printer_id !== deleteId));
    setUserList(userList.filter((result) => result.printer_id !== deleteId));

    if (resLength === totalPages * itemsPerPage) {
      setCurrentPage(totalPages);
    }
    toggleDelete();
  };

  return (
    <>
      <PrinterAlert
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        newPrinter={newPrinter}
        isOpenDelete={isOpenDelete}
        toggleDelete={toggleDelete}
        deletePrinter={deletePrinter}
        isOpenPairing={isOpenPairing}
        togglePairing={togglePairing}
      />
      <MobileBackButton />
      <div className='h-full w-full'>
        <PrinterHeader search={search} toggleModal={toggleModal} />
        <div className='w-full dark:bg-[#1B1B1B] '>
          <Pagination
            toggleModal={toggleModal}
            searchResult={searchResult}
            itemsPerPage={itemsPerPage}
            rangePagination={rangePagination}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
          <PrinterCardList
            searchResult={searchResult}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleDelete={handleDelete}
            userIp={userIp}
            loaded={loaded}
          />
        </div>
      </div>
    </>
  );
}
