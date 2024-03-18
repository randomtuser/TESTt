import { supabase } from '../../../../supabase';
export function GroupSubscription(handleDatabaseEvent, profile) {
  return supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'group_notifications',
        filter: `group_id=eq.${profile.group}`,
      },
      (payload) => {
        handleDatabaseEvent(payload);
      },
    )
    .subscribe();
}
