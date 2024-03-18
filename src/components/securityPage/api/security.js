import { supabase } from '../../../supabase';

export async function logInWithPassword(email, passwordField) {
  return supabase.auth.signInWithPassword({
    email: email,
    password: passwordField,
  });
}

export async function updatePassword(newPasswordField) {
  return supabase.auth.updateUser({
    password: newPasswordField,
  });
}

export async function updatePasswordToProfile(update, id) {
  return supabase.from('profiles').update(update).eq('id', id);
}
