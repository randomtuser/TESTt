import { supabase } from '../../../supabase';

export async function submitEmail(formik) {
  return supabase.from('profiles').select('email').eq('email', formik.values.email);
}

export async function logInWithPassword(formik) {
  return supabase.auth.signInWithPassword({
    email: formik.values.email,
    password: formik.values.password,
  });
}

export async function fetchDataFromProfile1(id) {
  return supabase.from('profiles').select('*').eq('id', id);
}

export async function fetchDataFromProfile2(id) {
  return supabase.from('profiles').select('*').eq('id', id);
}
