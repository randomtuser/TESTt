import { supabase } from '../../../../supabase';

export async function updateUser(passwordValue) {
  const { error: updateError } = await supabase.auth.updateUser({
    password: passwordValue,
  });
  return updateError;
}

export async function signOut() {
  await supabase.auth.signOut();
}
