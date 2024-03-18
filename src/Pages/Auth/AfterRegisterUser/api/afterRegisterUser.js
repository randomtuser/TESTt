import { supabase } from '../../../../supabase';

export async function updateUserData(){
return supabase.auth.updateUser({
    data: { time: 'second' },
  });
}
export async function updateUserById(formik,user,full_name){
    return supabase
      .from('profiles')
      .update({
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        full_name: full_name,
      })
      .eq('id', user.id);
}