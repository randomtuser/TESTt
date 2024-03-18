import { supabase } from '../../../supabase';
import { applyDateFilter, getDataFiltered } from './completedJobs';
import { createDateFilter } from './consumables';

export async function getAlloyConsumed(datefilter, allfilter = { value: null }, usergroup) {
  const [startdate, enddate] = createDateFilter(datefilter);

  let query = supabase
    .from('material_usage')
    .select(
      `Volume:qty ,date:last_change, materials!inner (
      material_acr
    )`,
    )
    .eq('client', usergroup);

  query = allfilter.value !== null ? query.eq('materials.material_acr', allfilter.value) : query;

  // console.log(query);
  // console.log(usergroup);

  const { query1: m_usageunsum } = applyDateFilter(
    [startdate, enddate],
    query,
    null,
    true,
    'last_change',
  );

  const { data: m_usageres, error: error1 } = await m_usageunsum;

  let m_usageus = getDataFiltered(m_usageres, datefilter);

  let resarr = m_usageus.reduce((acc, item) => {
    const date = item.date;
    const value = item.Volume;
    acc[date] = (acc[date] || 0) + value;
    return acc;
  }, {});

  let m_usagedata = Object.entries(resarr).map(([date, value]) => ({
    date,
    Volume: value,
  }));

  return m_usagedata;
}
