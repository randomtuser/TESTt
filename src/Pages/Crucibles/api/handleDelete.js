import { supabase } from '../../../supabase';
export async function handleDelete(crucibleid, setSearchResult, searchResult) {
  await supabase.from('crucibles').delete().eq('crucible_id', crucibleid);
  setSearchResult(searchResult.filter((result) => result.crucible_id !== crucibleid));
}
