import { supabase } from '../../../supabase';
export async function loadCrucibles(setSearchResult, setLoaded, group, UserList) {
  let { data: crucibles, error } = await supabase
    .from('crucibles')
    .select(
      'crucible_name, qty ,connection, crucible_id, lifespan, materials(material_acr, material_id)',
    )
    .eq('client', group);

  crucibles.forEach((crucible) => {
    if (crucible.crucible_name === null) {
      crucible.crucible_name = '';
    }
  });

  UserList = crucibles;
  setSearchResult(UserList);
  setLoaded(true);
}
