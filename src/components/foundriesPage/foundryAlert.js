import Alert from '../common/alert/alert';
import { useTranslation } from 'react-i18next';
export default function FoundryAlert(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      {/* This alert confirms the creation of a foundry */}
      <Alert
        isOpen={props.isOpenModal}
        toggleModal={props.toggleModal}
        submitFunction={props.newFoundry}
        title={t('sure')}
        text={t('confirmFoundry')}
      />
      {/* This alert confirms if the user wants to delete a foundry */}
      <Alert
        isOpen={props.isOpenDelete}
        toggleModal={props.toggleDelete}
        submitFunction={props.deleteFoundry}
        title={t('sure')}
        text={t('deleteFoundry')}
      />
      {/* this alert only appears if theres already a foundry waiting to be paired */}
      <Alert
        confirmDelete
        noCancel
        isOpen={props.isOpenPairing}
        toggleModal={props.togglePairing}
        title={t('careful')}
        text={t('carefulFoundry')}
      />
    </>
  );
}
