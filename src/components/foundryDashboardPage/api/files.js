import { supabase } from '../../../supabase';

export default function uploadFileToMachineFile(machine_id, name, uploadedFile) {
  return supabase.storage.from('machines-files').upload(machine_id + '/' + name, uploadedFile);
}

// const { error } = await supabase.storage
//       .from('machines-files')
//       .upload(machineInfo.machine_id + '/' + uploadedFile.name, uploadedFile);
