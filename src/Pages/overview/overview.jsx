import React, { useState, useEffect, useRef } from 'react';
import './overview.css';
import { getAlloyConsumed } from '../../components/overviewPage/overviewWidgets/alloyConsumed';
import { getCompletedJobs } from '../../components/overviewPage/overviewWidgets/completedJobs';
import { getConsumables } from '../../components/overviewPage/overviewWidgets/consumables';
import { getJobHistory } from '../../components/overviewPage/overviewWidgets/jobHistory';
import { getAllOverviewWidgets } from '../../components/overviewPage/overviewWidgets/reviewBlock';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from '@tremor/react';
import HeaderContent from '../../components/common/headerContent/headerContent';
import AlloyConsumed from '../../components/overviewPage/alloyConsumed';
import CompletedJops from '../../components/overviewPage/completedJops';
import Consumables from '../../components/overviewPage/consumables';
import JopHistory from '../../components/overviewPage/jopHistory';
import OverviewReview from '../../components/overviewPage/overviewReview';
function Overview(props) {
  const [firstRender, setFirstRender] = useState(true);

  const usergroup = props.group;
  const today = new Date();

  const { t } = useTranslation(['Overview']);

  function resetDropdownNames() {
    document.getElementsByClassName('tremor-Dropdown-text');

    let dropdownText = document.getElementsByClassName('tremor-Dropdown-text');

    for (let i = 0; i < dropdownText.length; i++) {
      dropdownText[i].textContent = t('all');
    }
  }

  const [datevalue, setDateValue] = useState([today, today]);
  let dateaxischartalloy = [
    { date: '00:00', Volume: 0 },
    { date: '06:00', Volume: 0 },
    { date: '12:00', Volume: 0 },
    { date: '18:00', Volume: 0 },
    { date: '23:59', Volume: 0 },
  ];

  let dateaxischartcjobs = [
    { date: '00:00', printers_material_usage: 0, foundries_material_usage: 0 },
    { date: '06:00', printers_material_usage: 0, foundries_material_usage: 0 },
    { date: '12:00', printers_material_usage: 0, foundries_material_usage: 0 },
    { date: '18:00', printers_material_usage: 0, foundries_material_usage: 0 },
    { date: '23:59', printers_material_usage: 0, foundries_material_usage: 0 },
  ];

  const [alloy, setAlloyConsumed] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [partsprinted, setPartsPrinted] = useState([]);
  const [partscasted, setPartsCasted] = useState([]);
  const [alloycasted, setAlloyCasted] = useState([]);

  const [jobhistory, setJobHistory] = useState([]);
  const [completedjobs, setCompletedJobs] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const [isClickedPrinter, setIsClickedPrinter] = useState(false);

  const [isClickedFoundrie, setIsClickedFoundrie] = useState(false);

  const [allconchartdata, setAllconchartdata] = useState();

  const [cjobschartdata, setCjobschartdata] = useState();

  const handleClickFoundrie = () => {
    if (!isClickedPrinter) {
      setIsClickedFoundrie(!isClickedFoundrie);
    }
  };

  const handleClickPrinter = () => {
    if (!isClickedFoundrie) {
      setIsClickedPrinter(!isClickedPrinter);
    }
  };

  const handleSelect = (id, { value }) => {
    setSelectedValues((prevValues) => ({ ...prevValues, [id]: { value } }));
  };

  const dateRef = useRef(datevalue);
  const firstRenderRef = useRef(firstRender);
  const userGroupRef = useRef(usergroup);

  useEffect(() => {
    if (Array.isArray(datevalue) && datevalue[1] !== null && usergroup !== undefined) {
      dateRef.current = datevalue;
      Promise.all([
        getAllOverviewWidgets(datevalue, usergroup),
        getConsumables(datevalue, { value: 'All' }, usergroup),
      ]).then(([result, consumables]) => {
        setIsClickedFoundrie(false);
        setIsClickedPrinter(false);
        setPartsPrinted(result.review_block.partsprinter);
        setPartsCasted(result.review_block.partcasted);
        setAlloyCasted(result.review_block.alloycasted);
        setAlloyConsumed(result.allc);
        setCompletedJobs(result.cjobs);
        setAllconchartdata(result.filters.alloychartfilter);
        setCjobschartdata(result.filters.cjobsfilter);
        setJobHistory(result.jobhistory);
        setConsumables(consumables);
        userGroupRef.current = usergroup;
        firstRenderRef.current = false;
        setSelectedValues({});
        resetDropdownNames();
      });
    }
  }, [datevalue, usergroup]);

  useEffect(() => {
    if (!firstRenderRef.current && userGroupRef.current && selectedValues.cjobs) {
      getCompletedJobs(dateRef.current, selectedValues.cjobs, userGroupRef.current).then(
        (completedjobs) => {
          setCompletedJobs(completedjobs);
        },
      );
    }
  }, [selectedValues.cjobs]);

  useEffect(() => {
    if (!firstRenderRef.current && userGroupRef.current && selectedValues.allc) {
      getAlloyConsumed(dateRef.current, selectedValues.allc, userGroupRef.current).then((alloy) => {
        setAlloyConsumed(alloy);
      });
    }
  }, [selectedValues.allc]);

  useEffect(() => {
    if (!firstRenderRef.current && userGroupRef.current && selectedValues.jobh) {
      getJobHistory(dateRef.current, selectedValues.jobh, userGroupRef.current).then(
        (jobhistory) => {
          setJobHistory(jobhistory);
        },
      );
    }
  }, [selectedValues.jobh]);

  useEffect(() => {
    if (!firstRenderRef.current && userGroupRef.current && selectedValues.consumables) {
      getConsumables(dateRef.current, selectedValues.consumables, userGroupRef.current).then(
        (consumables) => {
          setConsumables(consumables);
        },
      );
    }
  }, [selectedValues.consumables]);

  const alloyConsumedProps = { allconchartdata, handleSelect, alloy, dateaxischartalloy };
  const consumablesProps = { handleSelect, selectedValues, consumables };
  const completedJopsProps = {
    handleSelect,
    cjobschartdata,
    handleClickPrinter,
    isClickedPrinter,
    handleClickFoundrie,
    completedjobs,
    isClickedFoundrie,
    dateaxischartcjobs,
  };
  const jopHistoryProps = { handleSelect, jobhistory };
  const overviewReviewProps = { partsprinted, partscasted, alloycasted };
  return (
    <>
      <HeaderContent className='bg relative'>
        <DateRangePicker
          className='datepicker mx-auto mt-[15px] w-full px-3 md:w-full lg:w-[30vw] 3xl:mt-[1.2vw] 3xl:text-[0.9vw]'
          value={datevalue}
          onValueChange={setDateValue}
          dropdownPlaceholder='Select'
          maxDate={new Date()}
          placeholder={'Today'}
          color='gray'
        />
      </HeaderContent>

      <div className={`overview-container m-0   w-full select-none  p-0 dark:bg-[#1B1B1B] `}>
        {/* <div className='overview-review rounded-2xl mx-auto my-0 w-[95%] pb-[10px] pt-4 lg:pb-[24px]'> */}
        <OverviewReview {...overviewReviewProps} />
        {/* </div> */}
        <div className='overview-charts 3xl:!pr-[0px]'>
          <div className='overview-charts-grid gap-[10px] lg:gap-[1.2vw]'>
            <AlloyConsumed {...alloyConsumedProps} />
            <CompletedJops {...completedJopsProps} />
            <Consumables {...consumablesProps} />
            <JopHistory {...jopHistoryProps} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
