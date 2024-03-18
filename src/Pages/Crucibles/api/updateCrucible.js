import { supabase } from '../../../supabase';

export async function updateCrucibleName(crucible, crucible_name) {
  return supabase
    .from('crucibles')
    .update({ crucible_name: crucible_name })
    .eq('crucible_id', crucible.crucible_id)
    .then((crucible.crucible_name = crucible_name));
}
