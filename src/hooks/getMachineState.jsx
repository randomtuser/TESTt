import { supabase } from '../supabase';
import { FetchingError } from '../errors';

export const getMachineState = async (id) => {
  try {
    const { data } = await supabase.from('rl_machine_state').select('*').eq('machine', id);
    return data[0];
  } catch (e) {
    throw new FetchingError(e.name);
  }
};

export default getMachineState;
