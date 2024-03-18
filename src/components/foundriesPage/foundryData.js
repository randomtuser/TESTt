import FoundriesCard from '../common/cards/foundries/foundriesCard';
import { useTranslation } from 'react-i18next';

export default function FoundryData(props) {
  const { t } = useTranslation(['Machines']);

  return (
    <>
      <div className='flex h-full  w-full flex-col items-center dark:bg-[#1B1B1B] md:mt-[30px]'>
        {/* Maps all the data and sends the same data to the FoundriesCard as props */}
        {props.materials &&
          props.searchResult
            .slice(
              (props.currentPage - 1) * props.itemsPerPage,
              props.currentPage * props.itemsPerPage,
            )
            .map((foundry) => {
              //matches the crucible data to his connected foundry
              const matchingCrucible =
                props.crucibles.find((crucible) => crucible.machine === foundry.machine_id) ?? null;

              ////matches the material data to his crucible thats using that material
              const material = matchingCrucible
                ? props.materials.find(
                    (material) => material.material_id === matchingCrucible.material,
                  )
                : null;

              return (
                <div key={`${foundry.machine_id}`} className='w-full'>
                  <FoundriesCard
                    foundry={foundry}
                    crucible={matchingCrucible}
                    material={material}
                    handleDelete={props.handleDelete}
                  />
                </div>
              );
            })}
        {/* If there no names as what the user looks for it will say theres no foundries */}
        {props.loaded && props.searchResult.length === 0 && (
          <div className='mt-24 text-center text-xl font-bold dark:text-darkWhite'>
            {t('dataFoundry')}
          </div>
        )}
      </div>
      <div className='h-24 md:hidden'></div>
    </>
  );
}
