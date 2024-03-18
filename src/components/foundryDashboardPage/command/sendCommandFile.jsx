import { UploadBucketError } from '../../../errors';
import { commandFile } from '../api/command';

async function sendCommandFile(fileInfo, id) {
  try {
    let command = { command: 'stl', value: fileInfo };
    await commandFile(command, id);
  } catch (e) {
    throw new UploadBucketError(e.name);
  }
}

export default sendCommandFile;
