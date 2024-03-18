import React from 'react';
import Monitor from './monitor/monitor';
import { supabase } from '../../../supabase';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Conditions = ({ id }) => {
  const [conditionHumidity, setConditionHumidity] = useState(0);
  const [conditionTemperature, setConditionTemperature] = useState(0);

  const { t } = useTranslation(['Dashboard']);

  const rlMachineSensors = supabase
    .channel('changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'rl_machine_sensors', filter: `machine=eq.${id}` },
      (payload) => {
        setConditionTemperature(payload.new.ambient_temp);
        setConditionHumidity(payload.new.humidity);
      },
    )
    .subscribe();

  async function getData() {
    let { data, error } = await supabase
      .from('rl_machine_sensors')
      .select('ambient_temp,humidity')
      .eq('machine', id);

    setConditionTemperature(data[0].ambient_temp);
    setConditionHumidity(data[0].humidity);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className=' h-full w-full rounded-large bg-white  p-2 pb-0 pt-2 shadow-cardShadow '>
        <div className='flex pl-3 pt-1 font-semibold'>{t('conditions')}</div>
        <div className=' grid-cols-3 grid-rows-1 pb-7  pl-6  pt-6 md:grid '>
          <div className='col-span-2 flex w-[100%] flex-col gap-5'>
            <div className='flex items-center justify-center'>
              <div className=' h-full '>
                <img
                  src={process.env.PUBLIC_URL + '/icons/humidity_low.svg'}
                  alt='Humidity'
                  className=''
                ></img>
              </div>
              <div className='h-full w-full'>{t('humidity')}</div>
              <div className='flex h-full w-full items-center justify-center sm:justify-start '>
                {conditionHumidity} %
              </div>
            </div>
            <div className='flex items-center justify-center  '>
              <div className=' h-full '>
                <img
                  src={process.env.PUBLIC_URL + '/icons/device_thermostat.svg'}
                  alt='Temperature'
                  className=''
                ></img>
              </div>

              <div className='h-full w-full'>{t('temperature')}:</div>
              <div className='flex h-full w-full items-center justify-center sm:justify-start '>
                {conditionTemperature}ºC
              </div>
            </div>
          </div>
          <div className='mx-auto flex items-center justify-center pt-5    md:pt-0'>
            <Monitor id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Conditions;
