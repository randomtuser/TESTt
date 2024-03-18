import { supabase } from '../../../../supabase';

export async function checkExistedCompany(compname) {
  return supabase.from('group').select('*').eq('name', compname);
}

export async function createNewCompany(compname) {
  return supabase.from('group').insert([{ name: compname }]);
}

export async function checkCompanyById(compname) {
  return supabase.from('group').select('id').eq('name', compname);
}

export async function updateUserById(formik, full_name, group_id, user) {
  return supabase
    .from('profiles')
    .update({
      first_name: formik.values.firstName,
      last_name: formik.values.lastName,
      full_name: full_name,
      group: group_id,
    })
    .eq('id', user.id);
}

export async function updateClientById(group_id, user) {
  return supabase.from('code').update({ client: group_id }).eq('user_assign', user.id);
}

export async function changeMedata() {
  return supabase.auth.updateUser({
    data: { time: 'second' },
  });
}
