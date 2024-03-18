import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getMachineById from '../../hooks/getMachineById';
import Console from '../../components/foundryDashboardPage/components/console/console';
import Files from '../../components/foundryDashboardPage/components/files/files';
import MachineProcess from '../../components/foundryDashboardPage/components/MachineProcess/machineProcess';
import Conditions from '../../components/foundryDashboardPage/components/conditions/conditions';
import Crucible from '../../components/foundryDashboardPage/components/crucible/crucible';
import { loadMachinesOfCompany } from '../../components/foundryDashboardPage/api/dashboard';
import { notify } from 'reapop';
import { useAuth } from '../../hooks/auth';
import CSSTransition from 'react-transition-group/CSSTransition';
import MobileBackButtonDashboard from '../../components/foundryDashboardPage/MobileBackButtonDashboard/BackToFoundry';

export const FoundriesDashboard = () => {
  const { group } = useAuth();
  const { id } = useParams();
  const [machineInfo, setMachineInfo] = useState({});
  const [isUserAllowed, setIsUserAllowed] = useState(false);

  /** Fetch the all the data from the machine and pass them as a prop on the sections */
  useEffect(() => {
    const fetchMachineInfo = async () => {
      try {
        const machineData = await getMachineById(id);
        setMachineInfo(machineData);
      } catch (error) {}
    };
    fetchMachineInfo();
  }, [id]);

  useEffect(() => {
    if (machineInfo.machine_id) {
      getMachinesOfCompany();
    }
  }, [machineInfo]);

  async function getMachinesOfCompany() {
    let { data: machines, error } = await loadMachinesOfCompany(group);
    if (error) {
      notify('There was an error loading the dashboard. Try again later.', 'error');
      return;
    }

    const filteredData = machines.filter((obj) => obj.machine_id === parseInt(id));
    if (filteredData.length !== 0) {
      setIsUserAllowed(true);
    }
  }
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    function handleClickBackButton() {
      setShow(false);
      setTimeout(() => {
        navigate(`/foundries`);
      }, 500);
    }
    const DashboardBackButton = document.getElementById('dashboardBackButton');
    DashboardBackButton.addEventListener('click', handleClickBackButton);
  }, []);

  return (
    <div className=' w-full overflow-hidden'>
      <div className='pr-6'>
        <MobileBackButtonDashboard />
      </div>
      <CSSTransition in={show} timeout={1000} classNames='slide' unmountOnExit>
        {id && isUserAllowed ? (
          <div className='h-[102%] w-full bg-[#E5E5E5] px-4 pb-4 dark:bg-[#1B1B1B] dark:text-darkWhite xl:h-[85vh] xl:px-6'>
            <div className='mt-6 flex h-full w-full flex-col gap-5 xl:flex-row'>
              <div className='grid-rows-10 grid h-full w-full flex-col gap-5 xl:w-[600px]'>
                {/* <HeaderContent>
                  <WebBackButton onCustomClick={handleClickBackButton} />
                </HeaderContent> */}

                <Crucible machineInfo={machineInfo} />
                <Conditions machineInfo={machineInfo} />
                <Console machineInfo={machineInfo} />
                <Files machineInfo={machineInfo} />
              </div>
              <div className='mb-6 flex h-full w-full flex-col rounded-[10px]  bg-white p-4  dark:bg-[#0D0D0D] dark:text-darkWhite xl:mb-0'>
                <MachineProcess machineInfo={machineInfo} />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </div>
  );
};
