import { supabase } from '../../../supabase';

export async function realTimeMachineSensor(machine_id) {
  return supabase
    .from('rl_machine_sensors')
    .select('ambient_temp,humidity')
    .eq('machine', machine_id);
}
