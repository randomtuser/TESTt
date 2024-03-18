import { supabase } from '../../../supabase';

export default function realTimeMachineLogsLoading(machine_id) {
  return supabase
    .from('rl_machine_logs')
    .select(
      `created_at,
       task:data->task,
       status:data->status
     `,
    )
    .eq('machine', machine_id);
}
