import { supabase } from '../../../supabase';

export async function getMaterials(setUserList, setSearchResult, setLoaded, group) {
  let { data: materials, error } = await supabase
    .from('material_stock')
    .select(
      `
    *,
    materials (
      *
    )
  `,
    )
    .eq('client', group);

  setUserList(materials);
  setSearchResult(materials);
  setLoaded(true);
}
