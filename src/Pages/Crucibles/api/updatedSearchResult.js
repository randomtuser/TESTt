import { supabase } from '../../../supabase';
export async function updatedSearchResult(setSearchResult) {
  let { data, error } = await supabase.from('crucibles').select('crucible_id, lifespan');
  setSearchResult((searchResult) => {
    return searchResult.map((result) => {
      const crucibleData = data.find((crucible) => crucible.crucible_id === result.crucible_id);
      // If the crucible is returned by the server, update its lifespan
      if (crucibleData) {
        return {
          ...result,
          lifespan: crucibleData.lifespan,
        };
      }
      // If not, the result is returned anyway
      return result;
    });
  });
}
