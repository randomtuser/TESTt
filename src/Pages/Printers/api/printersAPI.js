import { supabase } from '../../../supabase';

export async function loadPrintersData(userGroup) {
  return supabase
    .from('printers')
    .select('*, printer_model!inner(material)')
    .eq('client', userGroup)
    .order('printer_id', { ascending: false });
}

export async function createNewPrinter(generateCode, userId, userGroup) {
  return supabase
    .from('printers')
    .insert([{ code: generateCode(), user_assign: userId, client: userGroup, alias: '', ip: '' }])
    .select();
}

export async function updateToGroupNotification(userGroup) {
  return supabase
    .from('group_notifications')
    .insert({
      group_id: userGroup,
      type: 7,
      data: 'New printer has been added',
    })
    .select();
}

export async function deletePrinterData(deleteId) {
  return supabase.from('printers').delete().eq('printer_id', deleteId);
}
