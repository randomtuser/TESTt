import React from 'react';
import { useState, useEffect } from 'react';
import Temperature from './temperature/temperature';
import Volume from './volume/volume';
import Material from './material/material';
import { supabase } from '../../../supabase';
import { useTranslation } from 'react-i18next';

const Crucible = ({ id }) => {
  const [serialNumber, setSerialNumber] = useState();
  const [crucibleName, setCrucibleName] = useState();
  const [headerAlias, setHeaderAlias] = useState();
  const [currentTemperature, setCurrentTemperature] = useState();
  const [maxTemperature, setMaxTemperature] = useState(1800);
  const [currentVolume, setCurrentVolume] = useState();
  const [maxVolume, setMaxVolume] = useState();
  const [materialName, setMaterialName] = useState();
  const [materialFormula, setMaterialFormula] = useState();

  const { t } = useTranslation(['Dashboard']);

  const rlMachineSensors = supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: `rl_machine_sensors`,
        filter: `machine=eq.${id}`,
      },
      (payload) => {
        setCurrentTemperature(payload.new.crucible_temp);

        setCurrentVolume(payload.new.crucible_volume);
      },
    )
    .subscribe();

  async function getData() {
    let { data, error } = await supabase
      .from('crucibles')
      .select(
        `
      crucible_name,
      machines(alias,serial_number),
      crucible_type(capacity),
      materials(material_acr)
  
    `,
      )
      .eq('machine', id);

    setCrucibleName(data[0].crucible_name);
    setMaxVolume(data[0].crucible_type.capacity);
    setSerialNumber(data[0].machines.serial_number);
    setHeaderAlias(data[0].machines.alias);
    const [material, formula] = data[0].materials.material_acr.split('_');
    setMaterialName(material);
    setMaterialFormula(formula);

    let { data: sensors, error: sensorsErros } = await supabase
      .from('rl_machine_sensors')
      .select(`crucible_temp,crucible_volume`)
      .eq('machine', id);

    setCurrentTemperature(sensors[0].crucible_temp);
    setCurrentVolume(sensors[0].crucible_volume);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='border-1 w-full rounded-large border-2 border-solid bg-white p-2 pt-2 pb-0 shadow-cardShadow '>
        <div className='border-b-2 border-gray-500 bg-white'>
          <div className='flex items-center justify-between text-xl font-semibold  '>
            <div>{t('machineI')}</div> <div>{headerAlias} </div>
          </div>
        </div>
        <div className=' '>
          <div className=' text-l font-semibold'>{t('crucible')}</div>
          <div className='text-md flex-nowrap justify-between text-gray-400 sm:flex'>
            <div>
              {t('serial')}: {serialNumber}
            </div>
            <div>
              {t('alias')}: {crucibleName}
            </div>
          </div>
          <div className='text-md  flex-nowrap justify-between text-gray-400   sm:flex'>
            <div>
              {t('volume')}: {maxVolume}cm³
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 justify-items-center gap-6   pt-7 md:grid-cols-2 xl:grid-cols-3 '>
          <div className='w-[30%] sm:w-[30%] md:w-[40%] lg:w-[80%] '>
            <Temperature currentTemperature={currentTemperature} maxTemperature={maxTemperature} />
          </div>

          <div className='w-[30%] sm:w-[30%] md:w-[40%] lg:h-[100%] lg:w-[80%]'>
            <Volume currentVolume={currentVolume} maxVolume={maxVolume} />
          </div>

          <div className='col-auto mb-0 flex w-[30%]  self-center  text-xl sm:w-[220px]   md:col-span-2  md:w-[20%] lg:w-[40%] xl:col-auto  xl:h-[70%]  xl:w-[100%]  '>
            <Material materialName={materialName} materialFormula={materialFormula} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Crucible;
