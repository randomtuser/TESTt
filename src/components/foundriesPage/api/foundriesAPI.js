import { supabase, supabaseAdmin } from '../../../supabase';

export async function loadFoundriesData(group) {
  return supabase
    .from('machines')
    .select()
    .eq('client', group)
    .order('machine_type', { ascending: false });
}

export async function loadFoundriesDataFromCrucibles() {
  return supabase.from('crucibles').select();
}

export async function loadFoundriesDataFromMaterials() {
  return supabase.from('materials').select();
}

export async function deleteFoundriesData(deleteId) {
  return supabase.from('machines').delete().eq('machine_id', deleteId);
}

export async function listFiles(deleteId) {
  return supabaseAdmin.storage.from('machines-files').list(deleteId);
}

export async function removeFile(filesToRemove) {
  return supabase.storage.from('machines-files').remove(filesToRemove);
}

export async function removeFolder([deleteId]) {
  return supabase.storage.from('machines-files').remove([deleteId], { recursive: true });
}

export async function createFoundry(generateCode, user, group) {
  return supabase
    .from('machines')
    .insert([
      {
        code: generateCode(),
        user_assign: user.id,
        client: group,
      },
    ])
    .select();
}

export async function updateToGroupNotification(group) {
  return supabase
    .from('group_notifications')
    .insert({
      group_id: group,
      type: 6,
      data: 'New foundry has been added',
    })
    .select();
}

export async function updateFoundryName(alias, foundry) {
  return supabase
    .from('machines')
    .update({ alias: alias })
    .eq('machine_id', foundry.machine_id)
    .then((foundry.alias = alias));
}
