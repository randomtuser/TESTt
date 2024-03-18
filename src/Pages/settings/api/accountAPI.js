import { supabase } from '../../../supabase';

export async function loadUsersDataByID(id) {
  return supabase.from('profiles').select(`*,group(name, id),role(name)`).eq('id', id);
}

export async function loadUsersDataByGroup(user1) {
  return supabase.from('profiles').select('*').eq('group', user1.group.id);
}
