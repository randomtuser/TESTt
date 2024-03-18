import { supabase } from '../../../../supabase';
export const submitTransfer = async (
  props,
  selectedTransfer,
  user1,
  setUser1,
  user,
  setIsOpenConfirmTransfer,
  isOpenConfirmTransfer,
  t,
) => {
  const { error } = await supabase.from('profiles').update({ role: 1 }).eq('id', selectedTransfer);
  const { error2 } = await supabase.from('profiles').update({ role: 2 }).eq('id', user.id);
  let userCopy = user1;
  userCopy.role = { id: 2, name: 'user' };
  setUser1(userCopy);
  if (!error && !error2) {
    props.props.notify(t('roleSuccess'), 'success');
  } else {
    props.props.notify(t('error'), 'error');
  }
  setIsOpenConfirmTransfer(!isOpenConfirmTransfer);
};
