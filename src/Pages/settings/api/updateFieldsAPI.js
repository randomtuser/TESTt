import { supabase } from '../../../supabase';

export async function updateDataToGroupTable(companyName, user1) {
  return supabase.from('group').update({ name: companyName }).eq('id', user1.group.id);
}

export async function updateDataToProfileTable(update, user) {
  return supabase.from('profiles').update(update).eq('id', user.id);
}
