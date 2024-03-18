import { supabase } from '../supabase';
import { FetchingError } from '../errors';

export const getMachineById = async (id) => {
  try {
    const { data } = await supabase.from('machines').select('*').eq('machine_id', id);

    return data[0];
  } catch (e) {
    throw new FetchingError(e.name);
  }
};

export default getMachineById;
