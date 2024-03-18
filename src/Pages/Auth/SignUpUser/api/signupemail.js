import { supabase } from '../../../../supabase';

export async function getName(profile) {
  return supabase.from('group').select('name').eq('id', profile.group);
}
export async function updateUserpassword(formik) {
  return supabase.auth.updateUser({
    password: formik.values.password,
    data: { prov: 'done', time: 'second' },
  });
}
export async function updateUserTime() {
  return supabase.auth.updateUser({
    data: { time: 'second' },
  });
}
export async function updateUserName(formik, fullname, profile) {
  return supabase
    .from('profiles')
    .update({
      first_name: formik.values.firstName,
      last_name: formik.values.lastName,
      full_name: fullname,
    })
    .eq('id', profile.id);
}
