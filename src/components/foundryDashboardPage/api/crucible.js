import { supabase } from '../../../supabase';

export async function loadCrucibleData(machine_id) {
  return supabase
    .from('crucibles')
    .select(
      `crucible_name, lifespan,machines(alias,serial_number),crucible_type(capacity), materials(material_acr,material_name)`,
    )
    .eq('machine', machine_id);
}

export async function realTimeSensor(machine_id) {
  return supabase
    .from('rl_machine_sensors')
    .select(`crucible_temp,crucible_volume`)
    .eq('machine', machine_id);
}
