import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MaterialComponent = ({
  crucible,
  material,
  small = false,
  onlySquare = false,
  nocrucible = false,
  onlyText = false,
}) => {
  const [name, setName] = useState('');
  const [formula, setFormula] = useState('');
  const [nameMat, setnameMat] = useState('');
  const { t } = useTranslation(['Machines']);

  useEffect(() => {
    if (material != null) {
      if (material.material_acr !== '') {
        if (material.material_name != null) {
          setnameMat(material.material_name);
        }
        let data = material.material_acr.split('_');
        setName(data[0]);
        setFormula(data[1]);
      }
    }
  }, [material]);

  return (
    <>
      {
        <div
          className={`flex ${
            onlySquare || onlyText ? 'w-fit' : 'w-72'
          } items-center justify-center md:justify-start`}
        >
          {!onlyText && (
            <div
              className={`flex ${
                !small ? 'h-14 w-14' : 'h-12 w-12'
              }  mt-1 flex-col items-center justify-start rounded-sm  border-[3.5px] border-neutral-700  dark:border-darkWhite`}
            >
              {crucible == null && nocrucible === false ? (
                <div className='flex h-full items-center dark:text-darkWhite'>
                  <img
                    src='icons/nocrucible.svg'
                    className='selection:invert-0 dark:invert'
                    alt=''
                  />
                </div>
              ) : (
                <>
                  {material != null && material.material_id === 0 ? (
                    <div className='flex h-full items-center dark:text-darkWhite'>
                      <img
                        className='selection:invert-0 dark:invert'
                        src='icons/nomaterial.svg'
                        alt=''
                      />
                    </div>
                  ) : (
                    <div className='flex h-full w-full flex-col items-center justify-center'>
                      <div className='flex items-center justify-center text-lg font-semibold text-neutral-700 dark:text-darkWhite'>
                        {name}
                      </div>
                      <div className='flex w-full justify-center dark:text-darkWhite'>
                        <hr className='h-[2px] w-1/2 border-0 bg-neutral-700 dark:bg-white' />
                      </div>
                      <div className='text-sm text-neutral-700 dark:text-darkWhite'>{formula}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {!onlySquare && (
            <div className='md:ml-3 '>
              {crucible == null && nocrucible === false ? (
                <div className='flex-row whitespace-nowrap text-left text-[15px] md:text-[20px]'>
                  <div>
                    {t('noCrucible')} {t('connected')}
                  </div>
                </div>
              ) : nocrucible === false ? (
                <div className='w-full flex-col text-left text-[15px] md:text-[20px] '>
                  <div className='text-[20px] font-[500] text-gray-500 dark:text-darkWhite'>
                    Volume
                  </div>
                  <div className='w-fit text-[#393939]  dark:text-darkWhite'>
                    {material != null && material.material_id !== 0
                      ? crucible.qty + ' cm³'
                      : t('noMaterialAssigned')}
                  </div>
                </div>
              ) : (
                <div className='font-bold dark:text-darkWhite'>{nameMat}</div>
              )}
            </div>
          )}
        </div>
      }
    </>
  );
};

export default MaterialComponent;
