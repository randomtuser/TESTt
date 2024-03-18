import Alert from '../common/alert/alert';
import { useTranslation } from 'react-i18next';

export default function PrinterAlert(props) {
  const { t } = useTranslation(['Machines']);
  return (
    <>
      <Alert
        isOpen={props.isOpenModal}
        toggleModal={props.toggleModal}
        submitFunction={props.newPrinter}
        title={t('sure')}
        text={t('confirmPrinter')}
      />
      {/* this alert confirms if the user wants to delete a printer */}
      <Alert
        isOpen={props.isOpenDelete}
        toggleModal={props.toggleDelete}
        submitFunction={props.deletePrinter}
        title={t('sure')}
        text={t('deletePrinter')}
      />
      {/* this alert only appears if theres already a printer waiting to be paired */}
      <Alert
        confirmDelete
        noCancel
        isOpen={props.isOpenPairing}
        toggleModal={props.togglePairing}
        title={t('careful')}
        text={t('carefulPrinter')}
      />
    </>
  );
}
