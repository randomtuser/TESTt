import { supabase } from '../../../supabase';

export function applyDateFilter(
  datefilter,
  query1,
  query2 = null,
  singleQuery = false,
  date = 'date',
) {
  if (datefilter) {
    if (!singleQuery) {
      query1 = query1.gte(date, datefilter[0].toISOString());
      query1 = query1.lt(date, datefilter[1].toISOString());
      query2 = query2.gte(date, datefilter[0].toISOString());
      query2 = query2.lt(date, datefilter[1].toISOString());
    } else {
      query1 = query1.gte(date, datefilter[0].toISOString());
      query1 = query1.lt(date, datefilter[1].toISOString());
    }

    query1 = query1.order(date, { ascending: true });

    if (!singleQuery) {
      query2 = query2.order(date, { ascending: true });
    }
  }

  if (singleQuery) {
    return { query1 };
  } else {
    return { query1, query2 };
  }
}

export function getDataFiltered(obj1, sval, obj2) {
  let date1f = 0;

  let date2f = 0;

  if (!Array.isArray(sval)) {
    date1f = 11;
    date2f = 5;
  } else {
    const diffInMs = sval[1].getTime() - sval[0].getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays >= 0 && diffInDays <= 1) {
      date1f = 11;
      date2f = 5;
    } else if (diffInDays > 1 && diffInDays <= 7) {
      date1f = 8;
      date2f = 2;
    } else if (diffInDays > 7 && diffInDays <= 30) {
      date1f = 5;
      date2f = 5;
    } else {
      date1f = 0;
      date2f = 7;
    }
  }

  let obj2dater = obj2;

  let obj1dater = obj1;

  if (obj2) {
    obj1dater = obj1.map((item) => ({ ...item, date: item.date.substr(date1f, date2f) }));

    obj2dater = obj2
      ? (obj2dater = obj2.map((item) => ({ ...item, date: item.date.substr(date1f, date2f) })))
      : '';

    return [obj1dater, obj2dater];
  } else {
    obj1dater.forEach((element) => {
      element.date = element.date.substr(date1f, date2f);
    });

    return obj1dater;
  }
}

export const modifyObj = (arr, key) => {
  const modifiedArr = arr.reduce((acc, item) => {
    const date = item.date;
    const value = item[key];
    acc[date] = (acc[date] || 0) + value;
    return acc;
  }, {});
  return Object.entries(modifiedArr)
    .map(([date, value]) => ({ date, [key]: value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export function filterChartsByDate(obj1, obj2, sval) {
  let obj1dater = obj1;
  let obj2dater = obj2;

  const modifiedObj1 = modifyObj(obj1dater, 'printers_material_usage');
  const modifiedObj2 = modifyObj(obj2dater, 'foundries_material_usage');

  const mergedObj = {};
  modifiedObj1.forEach((item1) => {
    const matchingItem2 = modifiedObj2.find((item2) => item2.date === item1.date);

    if (matchingItem2) {
      mergedObj[item1.date] = { ...item1, ...matchingItem2 };
    } else {
      mergedObj[item1.date] = { ...item1 };
    }
  });

  modifiedObj2.forEach((item2) => {
    const matchingItem1 = modifiedObj1.find((item1) => item1.date === item2.date);

    if (!matchingItem1) {
      mergedObj[item2.date] = { ...item2 };
    }
  });

  const orderedArr = Object.entries(mergedObj)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, obj]) => obj);

  return orderedArr;
}

export async function getCompletedJobs(datefilter, allfilter = { value: null }, usergroup) {
  let query1 = supabase
    .from('history_foundry')
    .select(`foundries_material_usage:material_usage,date`)
    .eq('client', usergroup);

  let query2 = supabase
    .from('history_printer')
    .select(`printers_material_usage:material_usage,date`)
    .eq('client', usergroup);

  const { query1: filterquery1, query2: filterquery2 } = applyDateFilter(
    datefilter,
    query1,
    query2,
  );

  let ffilterquery1 =
    allfilter.value !== null ? filterquery1.eq('part', allfilter.value) : filterquery1;

  let ffilterquery2 =
    allfilter.value !== null ? filterquery2.eq('part', allfilter.value) : filterquery2;

  const { data: data1, error: error1 } = await ffilterquery1;
  const { data: data2, error: error2 } = await ffilterquery2;

  let datefilterdata = getDataFiltered(data1, datefilter, data2);

  if (error1) throw error1;

  if (error2) throw error2;

  return filterChartsByDate(datefilterdata[1], datefilterdata[0], datefilter);
}
