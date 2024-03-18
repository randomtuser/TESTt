import { supabase } from '../../../../supabase';

export async function restPassword(formik){
    return supabase
    .from('profiles')
    .select('*')
    .eq('email', formik.values.email);
}
export async function restpasswordforEmail(formik){
    return supabase.auth.resetPasswordForEmail(formik.values.email)
}