export default function PopupAlloyCardComp(props) {
  return (
    <div className='flex flex-row items-center'>
      <img className='dark:invert' src={props.icon} alt='' />
      <div className='ml-5'>
        <div className='whitespace-nowrap text-gray-500 dark:text-darkWhite'>{props.name}</div>
        <div>{props.value}</div>
      </div>
    </div>
  );
}
