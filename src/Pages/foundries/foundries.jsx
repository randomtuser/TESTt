import React, { useEffect, useState } from 'react';
import {
  loadFoundriesData,
  loadFoundriesDataFromCrucibles,
  loadFoundriesDataFromMaterials,
  deleteFoundriesData,
  listFiles,
  removeFile,
  removeFolder,
  createFoundry,
  updateToGroupNotification,
} from '../../components/foundriesPage/api/foundriesAPI';
import FoundryHeader from '../../components/foundriesPage/header';
import Page from '../../components/foundriesPage/page';
import MobileButton from '../../components/foundriesPage/mobileButton';
import FoundryData from '../../components/foundriesPage/foundryData';
import FoundryAlert from '../../components/foundriesPage/foundryAlert';

export default function Foundriess(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [userList, setUserList] = useState([]);
  const [crucibles, setCrucibles] = useState([{}]);
  const [materials, setMaterials] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [rangePagination, setRangePagination] = useState(2);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenPairing, setIsOpenPairing] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [loaded, setLoaded] = useState(false);
  const group = props.group;
  const user = props.user;

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  /** useState that opens the Delete popup */
  const toggleDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };
  /** useState that opens a popup that warns the user theres already a foundry waiting to be paired */
  const togglePairing = () => {
    setIsOpenPairing(!isOpenPairing);
  };

  /** Fetches data from table machines and conditions it so it only shows from that user */
  async function loadFoundries() {
    let { data: machines } = await loadFoundriesData(group);

    setUserList(machines);
    setSearchResult(machines);

    /** Fetches data from table crucibles */
    let { data: crucibles } = await loadFoundriesDataFromCrucibles();
    setCrucibles(crucibles);

    /** Fetches data from table materials */
    let { data: materials } = await loadFoundriesDataFromMaterials();
    setMaterials(materials);
    setLoaded(true);
  }

  useEffect(() => {
    /** Loads the foundries according to the client */
    if (group) {
      loadFoundries();
    }
  }, [group]);

  /** Get ID of the foundry you want to delete from the modal, then opens the "are you sure" modal */
  async function handleDelete(foundryId) {
    setDeleteId(foundryId);
    toggleDelete();
  }

  /** Deletes the foundry using deleteId state. Called after "are you sure" modal */
  async function deleteFoundry() {
    const { error: lol } = await deleteFoundriesData(deleteId);
    if (lol) alert(lol.message);
    // List all files in the '19' folder
    const { data, error } = await listFiles(deleteId);
    if (error) {
      console.log('Error:', error.message);
    } else {
      if (data.length === 0) {
        console.log('No files found in folder 19');
      } else {
        // Remove each file (data: removedData,)
        const filesToRemove = data.map((x) => `${deleteId}/${x.name}`);
        const { error: removedError } = await removeFile(filesToRemove);
        if (removedError) {
          console.log(removedError.message);
        }
        // Remove folder
        await removeFolder([deleteId]);
      }
    }
    const totalPages = Math.ceil((searchResult.length - 1) / itemsPerPage);
    const resLength = searchResult.length - 1;

    setSearchResult(userList.filter((result) => result.machine_id !== deleteId));
    setUserList(userList.filter((result) => result.machine_id !== deleteId));

    if (resLength === totalPages * itemsPerPage) {
      setCurrentPage(totalPages);
    }
    toggleDelete();
  }

  /** Changes the amount of pages u can skip */
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

  useEffect(() => {
    const search = () => {
      if (searchTerm !== null && searchTerm !== undefined) {
        const filteredFoundries = userList.filter((foundry) => {
          const alias = foundry.alias ? foundry.alias.toLowerCase() : '';
          return alias.includes(searchTerm.toLowerCase());
        });
        setSearchResult(filteredFoundries);
        setCurrentPage(1);
      }
    };
    console.log('day la trang so may:', currentPage);

    search();
  }, [searchTerm]);

  /** Creates the pairing code used to pair the foundry to the application */
  function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let cadena = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      cadena += chars[randomIndex];
    }
    const repeatedCode = userList.some((result) => result.code === cadena);
    if (repeatedCode) {
      // Recursive call if the code exists
      return generateCode();
    }
    return cadena;
  }

  /** Creates a new foundry with pairing code */
  const newFoundry = async () => {
    toggleModal();
    const hasNullType = userList.some((obj) => obj.client === group && obj.machine_type === null);

    //checks if foundry is waiting to be paired
    if (hasNullType) {
      toggleModal();
      setTimeout(() => {
        togglePairing();
        //without the timeout, user interaction looks weird value can be lowered
      }, 200);
    } else {
      const { data } = await createFoundry(generateCode, user, group);
      setSearchResult([data[0], ...userList]);
      setUserList((prevList) => [data[0], ...prevList]);

      const { data1 } = await updateToGroupNotification(group);
      setSearchResult([data1[0], ...userList]);
      setUserList((prevList) => [data1[0], ...prevList]);
    }
  };

  return (
    <>
      <FoundryAlert
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
        newFoundry={newFoundry}
        isOpenDelete={isOpenDelete}
        toggleDelete={toggleDelete}
        deleteFoundry={deleteFoundry}
        isOpenPairing={isOpenPairing}
        togglePairing={togglePairing}
      />
      <div className='h-full w-full'>
        <div className='w-full'>
          <Page
            toggleModal={toggleModal}
            searchResult={searchResult}
            itemsPerPage={itemsPerPage}
            rangePagination={rangePagination}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
          <MobileButton />
          <FoundryHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleModal={toggleModal}
          />
          <FoundryData
            materials={materials}
            searchResult={searchResult}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            crucibles={crucibles}
            handleDelete={handleDelete}
            loaded={loaded}
          />
        </div>
      </div>
    </>
  );
}
