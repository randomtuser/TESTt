import { supabase } from '../../../supabase';

export async function commandCancel(command, id) {
  return supabase.from('rl_machine_commands').update({ command: command }).eq('machine', id);
}

export async function commandCast(command, id) {
  return supabase.from('rl_machine_commands').update({ command: command }).eq('machine', id);
}

export async function commandFile(command, id) {
  return supabase.from('rl_machine_commands').update({ command: command }).eq('machine', id);
}

export async function commandTemperature1(commandTemperature, id) {
  return supabase
    .from('rl_machine_commands')
    .update({ command: commandTemperature })
    .eq('machine', id);
}
