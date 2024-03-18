import { supabase } from '../../../../supabase';
export const updateAvatar = async (url, user1) => {
  await supabase
    .from('profiles')
    .update({
      avatar_url: url,
    })
    .eq('id', user1.id);
};
