import { supabase } from '../../../../supabase';
export const updateDb = async (user1, defaultPic, setPhotoUrl) => {
  await supabase
    .from('profiles')
    .update({
      avatar_url: null,
    })
    .eq('id', user1.id);

  user1.avatar_url = defaultPic;
  setPhotoUrl(defaultPic);
};
