import { supabase } from '../../../../supabase';
export const deleteAccount = async (setisOpenDangerModal, user) => {
  setisOpenDangerModal(false);
  await supabase.from('profiles').delete().eq('id', user.id);
  await supabase.auth.signOut();
};
