import { supabase } from '../../../supabase';

export async function checkEmail(formik) {
  return supabase.from('profiles').select('*').eq('email', formik.values.email);
}

export async function checkCode(enteredCode) {
  return supabase.from('code').select('*').eq('code', enteredCode);
}

export async function registerUserToDatabase(formik) {
  return supabase.auth.signUp({
    email: formik.values.email,
    password: formik.values.password,
    options: {
      data: {
        user_type: 'user',
        time: 'first',
      },
    },
  });
}

export async function updateCode(data, enteredCode) {
  return supabase.from('code').update({ user_assign: data.user.id }).eq('code', enteredCode);
}

export async function updateProfiles(data) {
  return supabase.from('profiles').update({ role: 1 }).eq('id', data.user.id);
}
