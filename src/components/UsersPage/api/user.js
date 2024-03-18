import { supabase } from '../../../supabase';

export async function loadUser(profile) {
  return supabase.from('profiles').select('*').eq('group', profile.group);
}

export async function loadUserRole() {
  return supabase.from('role').select('*');
}

export async function loadUserCompany(profile) {
  return supabase.from('profiles').select('role, group(name, id)').eq('id', profile.id);
}

export async function inviteByEmail(email, profile) {
  return supabase.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        user_type: 'user',
        group: profile.group,
        role: 2,
        prov: 'invited',
        time: 'first',
      },
    },
  });
}

export async function deleteUserById(userId) {
  return supabase.from('profiles').delete().eq('id', userId);
}

export async function inviteByQR(companyId) {
  return supabase.from('qr_codes').select('*').eq('company', companyId).eq('type', 'invite');
}

export async function updateQR(val, qr_codes) {
  return supabase.from('qr_codes').update({ valid: val }).eq('code', qr_codes[0].code);
}

export async function deleteQR(companyId) {
  return supabase.from('qr_codes').delete().eq('company', companyId).eq('type', 'invite');
}

export async function insertQR(newCode, companyId, item, enc_item) {
  return supabase.from('qr_codes').insert([
    {
      code: newCode,
      valid: true,
      company: companyId,
      type: 'invite',
      object: item,
      enc_object: enc_item,
    },
  ]);
}
