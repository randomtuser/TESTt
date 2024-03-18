import { supabase } from '../../../supabase';

export async function loadMachinesOfCompany(group) {
  return supabase.from('machines').select('machine_id').eq('client', group);
}
