import { supabase } from '../../../supabase';

export async function loadUserData(id, setUser1) {
    let { data } = await supabase.from('profiles').select().eq('id', id);

    setUser1(data[0]);
}

export async function loadPreferences(id, setPrefs){
    const { data } = await supabase.from('pref_user').select('*').eq('user_id', id);
    setPrefs(data[0]);
}

export async function update(id, val) {
    await supabase.from('pref_user').update({ via_pref: val }).eq('user_id', id);
}
