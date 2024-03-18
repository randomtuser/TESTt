import { supabase } from '../../../supabase';
import { applyDateFilter } from './completedJobs';

export function createDateFilter(datevalues) {
  let startdate;
  let enddate;

  startdate = new Date(datevalues[0]);

  /*   let timezoneoff = Math.abs(startdate.getTimezoneOffset());

  startdate.setHours(startdate.getHours() + timezoneoff / 60); */

  enddate = new Date(datevalues && datevalues[1] !== null ? datevalues[1] : datevalues[0]);
  enddate.setHours(23 /* + timezoneoff / 60 */, 59, 59, 999);

  return [startdate, enddate];
}

export async function getConsumables(datefilter, allfilter = { value: 'All' }, usergroup) {
  const [startdate, enddate] = createDateFilter(datefilter);

  if (allfilter.value === 'All' || allfilter.value === 'Alloys') {
    let query = supabase
      .from('material_stock')
      .select('materials(material_acr),qty')
      .eq('client', usergroup);

    const { query1: filterquerymusage } = applyDateFilter(
      [startdate, enddate],
      query,
      null,
      true,
      'assign_at',
    );

    const { data, error } = await filterquerymusage;

    var newData = data?.map((obj) => {
      return {
        Icon: obj.materials.material_acr,
        Name: obj.materials.material_acr,
        'Amount (cm³)': obj.qty,
      };
    });
    if (error) throw error;
  }

  if (allfilter.value === 'All' || allfilter.value === 'Crucibles') {
    let query2 = supabase.from('crucibles').select('crucible_name,qty').eq('client', usergroup);
    const { data: data2, error: error2 } = await query2;
    var newData2 = data2?.map((obj) => {
      return {
        Icon: '',
        Name: obj.crucible_name,
        'Amount (cm³)': obj.qty,
      };
    });

    if (error2) throw error2;
  }

  if (allfilter.value === 'All') {
    let mergedArr = newData.concat(newData2);
    return mergedArr;
  } else if (allfilter.value === 'Alloys') {
    return newData;
  } else {
    return newData2;
  }
}
