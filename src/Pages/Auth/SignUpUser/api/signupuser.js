import { supabase } from '../../../../supabase';

export async function signOut() {
  return supabase.auth.signOut();
}
export async function loadGroup(qr) {
  return supabase.from('qr_codes').select().eq('code', qr);
}

export async function getName(compId) {
  return supabase.from('group').select('name').eq('id', compId);
}
export async function getProfile(formik) {
  return supabase.from('profiles').select('*').eq('email', formik.values.email);
}

export async function signup(compId, formik) {
  return supabase.auth.signUp({
    // fullName: formik.values.fullName,
    email: formik.values.email,
    password: formik.values.password,
    options: {
      data: {
        user_type: 'user',
        time: 'first',
        role: 2,
        group: compId,
        ////// RAW_USER_META_DATA TO SAY THAT THE TYPE OF USER ////////
      },
    },
  });
}
