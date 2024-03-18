import { supabase } from '../../../../supabase';
export async function loadUserData(setPhotoUrl, setFullName, setUser1, userPic, id) {
  let { data, error } = await supabase.from('profiles').select().eq('id', id);
  if (data) {
    if (userPic != null) {
      setPhotoUrl(userPic);
    } else if (data[0].avatar_url == null) {
      setPhotoUrl('https://f003.backblazeb2.com/file/MetalMaker3D/default.png');
    } else {
      setPhotoUrl(data[0].avatar_url);
    }
    setFullName(data[0].first_name);
    setUser1(data[0]);
  }
}
