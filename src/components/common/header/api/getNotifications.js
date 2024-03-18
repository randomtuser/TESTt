import { supabase } from '../../../../supabase';
export const getNotifications = async (setNotificationList, profile) => {
  let { data: notifications, error } = await supabase
    .from('group_notifications')
    .select('*')
    .eq('group_id', profile.group)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  } else {
    setNotificationList(notifications);
  }
};
