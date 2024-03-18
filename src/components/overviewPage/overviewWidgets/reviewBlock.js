import { supabase } from '../../../supabase';
import { applyDateFilter, filterChartsByDate, getDataFiltered, modifyObj } from './completedJobs';
import { createDateFilter } from './consumables';

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'M';
  } else {
    return num.toLocaleString('en-US');
  }
}

export async function getPartsCasted(datefilter) {
  let query = supabase.from('history_foundry').select('part', { count: 'exact', head: true });

  if (datefilter) {
    if (!Array.isArray(datefilter.value)) {
      query = query.eq('date', datefilter.value.toISOString());
    } else {
      query = query.gte('date', datefilter.value[1].toISOString());
      query = query.lt('date', datefilter.value[0].toISOString());
    }
  }

  const { count, error } = await query;

  if (error) throw error;
  return count;
}

export async function getAlloyCasted(datefilter) {
  let query = supabase.from('history_foundry').select('material_usage');

  if (datefilter) {
    if (!Array.isArray(datefilter.value)) {
      query = query.eq('date', datefilter.value.toISOString());
    } else {
      query = query.gte('date', datefilter.value[1].toISOString());
      query = query.lt('date', datefilter.value[0].toISOString());
    }
  }

  const { data, error } = await query;

  const totalMaterialUsage = data.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.material_usage;
  }, 0);

  if (error) throw error;
  return totalMaterialUsage;
}

/**
 *
 * @param {*} datefilter
 * @returns
 */
export async function getAllOverviewWidgets(datefilter, usergroup) {
  const [startdate, enddate] = createDateFilter(datefilter);

  /**
   * History_Printer
   */

  const { data: hprinter, error: hprintererror } = await supabase.rpc('call_history_printer', {
    client_id: usergroup,
    start_date: startdate.toISOString(),
    end_date: enddate.toISOString(),
  });

  /**
   * History_Foundry
   */

  const { data: hfoundry, error: hfoundryerror } = await supabase.rpc('call_history_foundry', {
    client_id: usergroup,
    start_date: startdate.toISOString(),
    end_date: enddate.toISOString(),
  });

  let hfoundryunf = getDataFiltered(hfoundry, datefilter);
  let hfoundrydata = modifyObj(hfoundryunf, 'foundries_material_usage');

  /**
   * Material_Usage
   */

  let m_usage = supabase
    .from('material_usage')
    .select(`Volume:qty ,date:last_change,materials(material_acr)`)
    .eq('client', usergroup);
  const { query1: filterquerymusage } = applyDateFilter(
    [startdate, enddate],
    m_usage,
    null,
    true,
    'last_change',
  );

  const { data: m_usageres, error: error1 } = await filterquerymusage;

  let m_usageunsum = getDataFiltered(m_usageres, datefilter);

  let resarr = m_usageunsum.reduce((acc, item) => {
    const date = item.date;
    const value = item.Volume;
    acc[date] = (acc[date] || 0) + value;
    return acc;
  }, {});

  let m_usagedata = Object.entries(resarr).map(([date, value]) => ({
    date,
    Volume: value,
  }));

  /**
   *  Alloy-Cast
   *
   */
  const totalAlloyCast = hfoundrydata.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.foundries_material_usage;
  }, 0);

  /**
   * Filters
   */
  const allchartfil = [];
  const seen = new Set();

  m_usageres.forEach((element) => {
    const material_acr = element.materials.material_acr;
    if (!seen.has(material_acr)) {
      allchartfil.push(material_acr);
      seen.add(material_acr);
    }
  });

  const cjobsfil = [];
  const seen2 = new Set();

  hprinter.forEach((element) => {
    const hprinterpart = element.part;
    if (!seen2.has(hprinterpart)) {
      cjobsfil.push(hprinterpart);
      seen2.add(hprinterpart);
    }
  });

  hfoundry.forEach((element) => {
    const hfoundrypart = element.part;
    if (!seen2.has(hfoundrypart)) {
      cjobsfil.push(hfoundrypart);
      seen2.add(hfoundrypart);
    }
  });

  /**
   * Job-History
   */

  var jhistoryprinter = hprinter?.map(({ part, printers_material_usage, printer_alias, date }) => ({
    Part: part,
    Machine: printer_alias,
    Material: 'Filament',
    Amount: printers_material_usage,
    Date: date,
  }));

  var jhistoryfoundry = hfoundry?.map(
    ({ part, foundries_material_usage, machine_alias, date, crucible_material }) => ({
      Part: part,
      Machine: machine_alias,

      Material: crucible_material,
      Amount: foundries_material_usage,
      Date: date,
    }),
  );

  const jobh = jhistoryfoundry.concat(jhistoryprinter);

  return {
    filters: { alloychartfilter: allchartfil, cjobsfilter: cjobsfil },
    cjobs: filterChartsByDate(hprinter, hfoundry, datefilter),
    allc: m_usagedata,
    review_block: {
      partcasted: hfoundry.length,
      partsprinter: hprinter.length,
      alloycasted: totalAlloyCast,
    },
    jobhistory: jobh,
  };
}
