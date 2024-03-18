import SignOutAlert from '../alert/signOutAlert';
import { useTranslation } from 'react-i18next';

export default function LogOutAlert(props) {
  const { t } = useTranslation(['Settings']);
  return (
    <>
      <SignOutAlert
        isOpen={props.isOpenModal}
        toggleModal={props.toggleModal}
        logoutFunction={props.logoutFunction}
        title={t('sure')}
        text={t('confirmLogout')}
      />
    </>
  );
}
