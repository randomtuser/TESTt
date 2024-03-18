import { supabase } from '../../../supabase';
import { applyDateFilter } from './completedJobs';
import { createDateFilter } from './consumables';

function flattenData(data) {
  if (!data) {
    return [];
  }

  function flatten(obj) {
    let flat = {};

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const flattened = flatten(item);
          Object.entries(flattened).forEach(([k, v]) => {
            flat[`${key}[${index}].${k}`] = v;
          });
        });
      } else if (value !== null && typeof value === 'object') {
        const flattened = flatten(value);
        Object.entries(flattened).forEach(([k, v]) => {
          flat[`${key}_${k}`] = v;
        });
      } else {
        flat[key] = value;
      }
    }

    return flat;
  }

  const flattened = data.map(flatten);
  return flattened;
}

export async function getJobHistory(datefilter, allfilter = { value: 'All' }, usergroup) {
  const [startdate, enddate] = createDateFilter(datefilter);

  if (allfilter.value === 'All' || allfilter.value === 'Foundries') {
    let query1 = supabase
      .from('history_foundry')
      .select('part,machine(alias),crucible(material),material_usage,date')
      .eq('client', usergroup);

    const { query1: filterquerymusage } = applyDateFilter(
      [startdate, enddate],
      query1,
      null,
      true,
      'date',
    );

    var { data: jdf, error } = await filterquerymusage;

    /*     console.log(jdf);
     */ let mergeData = flattenData(jdf);
    var jobdatafoundries = mergeData?.map(
      ({ part, material_usage, machine_alias, date, crucible_material, ...rest }) => ({
        Part: part,
        Machine: machine_alias,
        Material: crucible_material,
        Amount: material_usage,
        Date: date.substring(0, 10) + ' ' + date.substring(11, 19),
        ...rest,
      }),
    );
  }

  if (allfilter.value === 'All' || allfilter.value === 'Printers') {
    let query2 = supabase
      .from('history_printer')
      .select('part,printer(alias),material_usage,date')
      .eq('client', usergroup); /**crucibles(material(name) */
    const { query1: filterquerymusage2 } = applyDateFilter(
      [startdate, enddate],
      query2,
      null,
      true,
      'date',
    );

    var { data: jdp, error } = await filterquerymusage2;

    let mergeData2 = flattenData(jdp);
    var jobdataprinters = mergeData2?.map(
      ({ part, material_usage, printer_alias, date, ...rest }) => ({
        Part: part,
        Machine: printer_alias,
        Material: 'Filament',
        Amount: material_usage,
        Date: date.substring(0, 10) + ' ' + date.substring(11, 19),

        ...rest,
      }),
    );
  }

  /**
   * Add Printers also
   */

  /* console.log(jobdatafoundries);

  console.log(jobdataprinters); */
  /*   console.log(allfilter.value);
   */
  if (allfilter.value === 'All') {
    let mergedArr = jobdatafoundries.concat(jobdataprinters);
    return mergedArr;
  } else if (allfilter.value === 'Foundries') {
    return jobdatafoundries;
  } else if (allfilter.value === 'Printers') {
    return jobdataprinters;
  }
}
